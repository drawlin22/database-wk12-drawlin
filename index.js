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

console.log(`
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                                     
    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗         
    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗        
       ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝        
       ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗        
       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║        
       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝        
                                                                
  `)


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
        message: 'What is the name of the department to add?',
        name: 'addDepartment',
        when: (answers) => answers['toDo'] === 'Add Department'
        
      },
      {
        type: 'input',
        message: 'What is the name of the role to add?',
        name: 'role',
        when: (answers) => answers['toDo'] === 'Add Role'
      },
      {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
        when: (answers) => answers['toDo'] === 'Add Role'
      },
      {
        type: 'input',
        message: 'What department number does the role belong to? 1= Sales, 2= Engineering, 3=Finance, 4=Legal',
        name: 'belongTo',
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
        message: 'What is the employees Role_number? 1=Sales Lead, 2=Salesperson, 3=Lead Engineer, 4= Software Engineer, 5= Account Manager, 6= Accountant, 7=Legal Team Lead, 8=Lawyer',
        name: 'currentRole',
        choices: ['1', '2', '3','4', '5','6','7','8'],
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'Who is the employees manager_id? 1=null, 2=John Doe, 3=Ashley Rodriguez, 4=Kunal Singh, 5= Sarah Lourd',
        name: 'currentManager',
        choices: ['1', '2', '3', '4', '5'],
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
else if (allRoles === 'View All Roles') {
  const viewAllRoles = "select * from Roles"
  connection.query(viewAllRoles, (error,response) => {
    if (error) throw error;
    console.table(response);
  });
}
else if (allDepartments === 'View All Departments') {
  const viewAllDepartments = "select * from Departments"
  connection.query(viewAllDepartments, (error,response) => {
    if (error) throw error;
    console.table(response);
  });
}
else if (response.addDepartment) {
  const userAddDepartments = `INSERT INTO Departments(name) Values ('${addDepartment}')`
  connection.query(userAddDepartments, (error,response) => {
    if (error) throw error;
    console.table(response);
  });
}
else if (response.role && response.salary && response.belongTo) {
    const userAddRole = `INSERT INTO Roles(title, salary, department_id) Values ('${role}','${salary}','${belongTo}')`
    connection.query(userAddRole, (error,response) => {
      if (error) throw error;
      console.table(response);
    });
  }
  else if (response.firstName && response.lastName && response.currentRole && response.currentManager) {
    const addUser = `INSERT INTO Employees(first_name, last_name, role_id, manager_id) Values ('${firstName}','${lastName}','${currentRole}','${currentManager}')`
    connection.query(addUser, (error,response) => {
      if (error) throw error;

      console.table(response);
    });
  }
  else if (response.firstName && response.lastName && response.currentRole && response.currentManager) {
    const userUpdate = `update Employees(first_name, last_name, role_id, manager_id) Values ('${firstName}','${lastName}','${currentRole}','${currentManager}')`
    connection.query(userUpdate, (error,response) => {
      if (error) throw error;
      console.table(response);
    });
  }
});

  