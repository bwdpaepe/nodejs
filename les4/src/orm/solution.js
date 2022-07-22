const getConnection = require('./_connection');
const { Department, Employee, Salary } = require('./model');

const main = async () => {
  const sequelize = await getConnection();

  // 1. Get all departments
  const departments = await Department.findAll();
  console.log('EXERCISE 1\n----------');
  console.table(departments.map((department) => department.toJSON()));

  // 2. Get all active managers of each department (order by from_date and then to_date)
  let managers = await Department.findAll({
    include: 'managers',
  });
  managers = managers.map((manager) => manager.toJSON());
  console.log('\nEXERCISE 2\n----------');
  console.table(managers);
  console.table(managers[0]?.managers);
  console.table(managers[0]?.managers[0].DepartmentManager);

  // 3. Get the salary for the active manager per department (order by salary)
  let salaries = await Department.findAll({
    include: {
      model: Employee,
      as: 'managers',
      include: {
        model: Salary,
        as: 'salaries',
      },
    },
  });
  salaries = salaries.map((salary) => salary.toJSON());
  console.log('\nEXERCISE 3\n----------');
  console.table(salaries);
  console.table(salaries[0]?.managers)
  console.table(salaries[0]?.managers[0].salaries);

  // Close the connection
  await sequelize.close();
};

main();
