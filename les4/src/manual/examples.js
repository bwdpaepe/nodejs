const getConnection = require('./_connection');

const main = async () => {
  const pool = await getConnection();

  // 1. Example query
  // first item contains all rows the query returned (objects with column names as keys)
  // second item in the array contains column information
  const [result] = await pool.query('SELECT 1+1 AS sum;');
  console.log(result, '-> sum should be 2');

  // 2. Get the number of employees
  const [employeeCount] = await pool.query('SELECT COUNT(1) AS count FROM employees;');
  console.log('\nFound', employeeCount[0].count, 'employees');
  console.log('The exact query result was:', employeeCount);

  // 3. Get and print the first three employees
  const [firstThree] = await pool.query('SELECT * FROM employees LIMIT 3;');
  console.log('\nFirst three employees:');
  console.table(firstThree);

  // 4. Get one employee's titles
  const [employeeWithTitles] = await pool.query(`
    SELECT e.emp_no, first_name, last_name, title
    FROM employees e
      JOIN titles t ON e.emp_no = t.emp_no
    WHERE e.emp_no = ?;
  `, [12601]);
  console.log('\nTitles of employee with emp_no 12601:');
  console.table(employeeWithTitles);

  // 5. Fetch all titles per employee with only one object per employee
  // -> need to map this in JS, not possible with MySQL client
  const [employeesWithTitles] = await pool.query(`
    SELECT e.emp_no, first_name, last_name, gender, birth_date, title, from_date, to_date
    FROM employees e
      JOIN titles t ON e.emp_no = t.emp_no
    LIMIT 1000; -- for performance reasons
  `);
  let employees = Object.values(employeesWithTitles.reduce((employeesGrouped, { title, from_date, to_date, ...employee }) => {
    if (!(employee.emp_no in employeesGrouped)) {
      employeesGrouped[employee.emp_no] = {
        ...employee,
        titles: [],
      };
    }

    employeesGrouped[employee.emp_no].titles.push({
      title,
      from_date,
      to_date,
    });
    return employeesGrouped;
  }, {}));
  console.log('\nFirst employee with titles:');
  console.dir(employees[0]);

  // 6. Get all employees' departments
  // -> also needs JS to map result
  const [employeesWithDepartments] = await pool.query(`
    SELECT *
    FROM employees e
      JOIN dept_emp de ON e.emp_no = de.emp_no
      JOIN departments d ON d.dept_no = de.dept_no
    LIMIT 1000; -- for performance reasons
  `);
  employees = Object.values(employeesWithDepartments.reduce((employeesGrouped, { dept_no, dept_name, from_date, to_date, ...employee }) => {
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
  }, {}));
  console.log('\nFirst employee with departments:');
  console.dir(employees[0]);

  // 7. Add a new employee
  // Determine the next emp_no
  const [nextEmpNo] = await pool.query('SELECT MAX(emp_no) + 1 AS emp_no FROM employees');
  const { emp_no } = nextEmpNo[0];
  const [insertResult] = await pool.query(`
    INSERT INTO employees(emp_no, birth_date, first_name, last_name, gender, hire_date)
    VALUES (?, ?, ?, ?, ?, ?);
  `, [emp_no, '1997-11-14', 'Thomas', 'Aelbrecht', 'M', '2021-01-01']);
  console.dir(insertResult);

  // Close the connection
  await pool.end();
};

main();
