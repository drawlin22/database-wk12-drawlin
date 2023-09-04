const mysql = require('mysql2');
const inquirer = require('inquirer');
const addDepartment = ""
const role = ""
const salary = ""
const belongTo = ""
const firstName = ""
const lastName = ""
const currentRole = ""
const currentManager = ""
const allEmployees = ""
const allDepartments = ""
const allRoles = ""

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nicholas12',
  database: 'Employee_Records',
});

inquirer
  .prompt([

    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'toDo',
        choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'View All Employees', 'View All Departments', 'View All Roles'
    ]
      },
      {
        type: 'list',
        message: 'Confirm View all Employees',
        name: 'allEmployees',
        choices: ['View All Employees'],
        when: (answers) => answers['toDo'] === 'View All Employees'
      },
      {
        type: 'list',
        message: 'Confirm View all Departments',
        name: 'allDepartments',
        choices: ['View All Departments'],
        when: (answers) => answers['toDo'] === 'View All Departments'
      },
      {
        type: 'list',
        message: 'Confirm View all Roles',
        name: 'allRoles',
        choices: ['View All Roles'],
        when: (answers) => answers['toDo'] === 'View All Roles'
      },
      {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDepartment',
        when: (answers) => answers['toDo'] === 'Add Department'
        
      },
      {
        type: 'list',
        message: 'What is the name of the role?',
        name: 'role',
        choices: ['Software Engineer', 'Account Manager', 'Accountant','Legal Team Lead', 'Lawyer'],
        when: (answers) => answers['toDo'] === 'Add Role'
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
        when: (answers) => answers['toDo'] === 'Add Role'
      },
      {
        type: 'list',
        message: 'What department does the role belong to?',
        name: 'belongTo',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
        when: (answers) => answers['toDo'] === 'Add Role'
      },
      {
        type: 'input',
        message: 'What is your first name?',
        name: 'firstName',
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'input',
        message: 'What is your last name?',
        name: 'lastName',
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'What is the employees current Role?',
        name: 'currentRole',
        choices: ['Software Engineer', 'Account Manager', 'Accountant','Legal Team Lead', 'Lawyer'],
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'Who is the employees current manager?',
        name: 'currentManager',
        choices: ['null', 'John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'Which employees role do you want to update?',
        name: 'update',
        choices: ['dept1'],
        when: (answers) => answers['toDo'] === 'Update Employee Role'
      },
  ])
  
  .then((response) => {
    const addDepartment = response.addDepartment;
    const role = response.role;
    const salary = response.salary;
    const belongTo = response.belongTo;
    const firstName = response.firstName;
    const lastName = response.lastName;
    const currentRole = response.currentRole;
    const currentManager = response.currentManager;
    const allEmployees = response.allEmployees;
    const allDepartments = response.allDepartments;
    const allRoles = response.allRoles; 


if (allEmployees === 'View All Employees') {
    const viewAllEmployees = "select * from Employees"
    connection.query(viewAllEmployees, (error,response) => {
      if (error) throw error;
      console.table(response);
    });
  }
if (allRoles === 'View All Roles') {
  const viewAllRoles = "select * from Roles"
  connection.query(viewAllRoles, (error,response) => {
    if (error) throw error;
    console.table(response);
  });
}
if (allDepartments === 'View All Departments') {
  const viewAllDepartments = "select * from Departments"
  connection.query(viewAllDepartments, (error,response) => {
    if (error) throw error;
    console.table(response);
  });
}
  });




    // const query = `INSERT INTO Employees (first_name, last_name, currentRole, currentManager) VALUES ('${firstName}', '${lastName}','${currentRole},'${currentManager})`;
    //  connection.query(query),(error, result) => {
    //   if(error) {
    //     console.error(error)
    //   } else {
    //     console.log('Data inserted successfully')
    //   }
    // }
  
  

  /*
  const addDepartment = response.addDepartment;
const role = response.role;
const salary = response.salary;
const belongTo = response.belongTo;
const firstName = response.firstName;
const lastName = response.lastName;
const currentRole = response.currentRole;
const currentManager = response.currentManager;
*/

/*

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

*/