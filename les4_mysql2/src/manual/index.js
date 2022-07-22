async function main() {
  const mysql = require('mysql2/promise');

  const pool = await mysql.createPool({
    host: 'localhost',
    port: 333,
    user: 'root',
    password: 'password',
    database: 'employees',
    connectionLimit: 10,
  });

  const [result] = await pool.query('SELECT 1+1 AS sum;');

  console.log(result); // [ TextRow { sum: 2 } ]

  const [employeeCount] = await pool.query('SELECT COUNT(1) AS count FROM employees;');
  console.log('\nFound', employeeCount[0].count, 'employees');

  const [employeeWithTitles] = await pool.query(`
	SELECT e.emp_no, first_name, last_name, title
	FROM employees e
	JOIN titles t ON e.emp_no = t.emp_no
	WHERE e.emp_no = ?;
`, [12601]);
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);

  let [employeesWithDepartments] = await pool.query(`
	SELECT *
	FROM employees e
	  JOIN dept_emp de ON e.emp_no = de.emp_no
	  JOIN departments d ON d.dept_no = de.dept_no
	LIMIT 1000; -- for performance reasons
`);

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

  console.log(employeesWithDepartments);

  const [nextEmpNo] = await pool.query('SELECT MAX(emp_no) + 1 AS emp_no FROM employees');
  const {
    emp_no
  } = nextEmpNo[0];

  const [employeeAll] = await pool.query(`SELECT * FROM employees WHERE last_name = ?;`, ['Aelbrecht']);
  console.log('\nFound', employeeAll[0].first_name);


}

main();