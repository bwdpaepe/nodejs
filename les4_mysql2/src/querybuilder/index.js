async function main() {
  const Knex = require('knex');

  const knex = Knex({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 333,
      user: 'root',
      password: 'password',
      database: 'employees',
    },
    debug: true,
  });

  const [sum] = await knex.raw('SELECT 1+1 AS result');
  console.log(sum, '-> sum should be 2');

  const [employeeCount] = await knex('employees').count('*', {
    as: 'count'
  });
  console.log('\nFound', employeeCount.count, 'employees');

  const employeeWithTitles = await knex('employees AS e').select()
    .join('titles AS t', 'e.emp_no', '=', 't.emp_no')
    .where('e.emp_no', 12601);
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);

  let employeesWithDepartments = await knex('employees').select()
    .join('dept_emp', 'dept_emp.emp_no', '=', 'employees.emp_no')
    .join('departments', 'departments.dept_no', '=', 'dept_emp.dept_no')
    .limit(1000);

  // opnieuw groepen (idem als vorige voorbeeld)
  employeesWithDepartments = Object.values(
    employeesWithDepartments.reduce((employeesGrouped, {
      dept_no,
      dept_name,
      from_date,
      to_date,
      ...employee
    }) => {
      if (!(employee.emp_no in employeesGrouped)) {
        employeesGrouped[employee.emp_no] = {
          ...employee,
          departments: [],
        };
      }

      employeesGrouped[employee.emp_no].departments.push({
        dept_no,
        dept_name,
        from_date,
        to_date,
      });
      return employeesGrouped;
    }, {})
  );
  console.log('\nFirst employee with departments:');
  console.dir(employeesWithDepartments[0]);

  const [nextEmpNo] = await knex('employees').select(knex.raw('MAX(emp_no) + 1 AS emp_no'));
  const {
    emp_no
  } = nextEmpNo;
  const insertResult = await knex('employees').insert({
    emp_no,
    birth_date: '1997-11-14',
    first_name: 'Bart',
    last_name: 'De Paepe',
    gender: 'M',
    hire_date: '2021-01-01',
  });
  console.dir(insertResult);
}

main();