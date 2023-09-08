const mysql = require('mysql2');
const inquirer = require('inquirer');
let arrayEmployees=[];
let arrayRoles = [];
let arrayManagers = [];
let deptbelongto = [];

const connection = mysql.createConnection({ /* creates mysequel connection */
  host: 'localhost',
  user: 'root',
  password: 'nicholas12',
  database: 'Employee_Records',
});

function populatedManagers() { /* function for identifying array of managers from Employee table */
  return new Promise((resolve, reject) => {
    let arrayM = "SELECT * FROM Employees";
    connection.query(arrayM, (error, response) => {
      if (error) reject(error);
      arrayManagers = response.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.manager_id
      }));
      resolve();
    });
  });
}

function populatedRoles() { /* function for identifying array of roles from Roles table */
  return new Promise((resolve, reject) => {
  let arrayR = "SELECT * FROM Roles";
  connection.query(arrayR, (error, response) => {
    if (error) throw error;
    arrayRoles = response.map((role) => ({
      name: `${role.title}`,
      value: role.id
    }));
    resolve();
  });
})
.then (() => populateDepartments())
.then(() => populatedManagers());
}

function populateDepartments() { /* function for identifying array of departments from Departments table */
  return new Promise((resolve, reject) => {
    let arrayD = "SELECT * FROM Departments";
    connection.query(arrayD, (error, response) => {
      if (error) reject(error);
      deptbelongto = response.map((department) => ({
        name: `${department.name}`,
      value: department.id
      }));
      resolve();
    });
  });
}

function populatedEmployees() { /* function for identifying array of employees from Employee table */
let arrayE = " select * from Employees";
connection.query(arrayE, (error,response) => {
  arrayEmployees = response.map((employee) => ({
  name: `${employee.first_name} ${employee.last_name}`,
  value: employee.id
  
}));

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
                                                                
  `) /* adds the ASCII art to the terminal*/

const questions = () => { /* setting all questions to a function to call after each promise is complete */
populatedRoles()

.then(() => {
inquirer
  .prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'toDo',
        choices: [ 'View All Employees', 'View All Departments', 'View All Roles','Add Department', 'View Employees by Manager','View Employees by Department','Add Role', 'Add Employee', 'Update Employee Role', 'Update Employee Manager','quit']
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
        type: 'list',
        message: 'What department does the role belong to?',
        name: 'belongTo',
        choices: deptbelongto,
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
        message: 'What is the employees role?',
        name: 'currentRole',
        choices: arrayRoles,
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'Who is the employees manager_id?',
        name: 'currentManager',
        choices: arrayManagers,
        when: (answers) => answers['toDo'] === 'Add Employee'
      },
      {
        type: 'list',
        message: 'Which employees role do you want to update?',
        name: 'update',
        choices: arrayEmployees,
        when: (answers) => answers['toDo'] === 'Update Employee Role'
      },
      {
        type: 'list',
        message: 'What do you want their new role to be?',
        name: 'newRole',
        choices: arrayRoles,
        when: (answers) => answers['update'],
      },
      {
        type: 'list',
        message: 'Which Employee do you want to update?',
        name: 'updateManager',
        choices: arrayEmployees,
        when: (answers) => answers['toDo'] === 'Update Employee Manager',
      },
      {
        type: 'list',
        message: 'Who do you want their new manager to be?',
        name: 'newManager',
        choices: arrayManagers,
        when: (answers) => answers['updateManager'],
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
    const allEmployees = response.toDo;
    const allDepartments = response.toDo;
    const allRoles = response.toDo; 
    const employeeId = response.updateManager;
    const newManagerId = response.newManager;

   
    
if (allEmployees === 'View All Employees') { /* displays table of all Employees */
    const viewAllEmployees = "select * from Employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id"
    connection.query(viewAllEmployees, (error,response) => {
      if (error) throw error;
      console.table(response);
      questions();
    });
  }
 else if (response.toDo === 'View Employees by Manager'){
  const viewbyManger = "select * from Employees order by manager_id ASC"
  connection.query(viewbyManger, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  })
 }
 else if (response.toDo === 'View Employees by Department'){
  const viewbyDept = "select * from Employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id order by department_id ASC"
  connection.query(viewbyDept, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  })
 }
else if (allRoles === 'View All Roles') { /* displays table of all Roles */
  const viewAllRoles = "select * from Roles"
  connection.query(viewAllRoles, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  });
}
else if (allDepartments === 'View All Departments') { /* displays table of all Departments */
  const viewAllDepartments = "select * from Departments"
  connection.query(viewAllDepartments, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  });
}
else if (response.addDepartment) { /* If addDepartment is selected then entered values are added to the Departments Table */
  const userAddDepartments = `INSERT INTO Departments(name) Values ('${addDepartment}')`
  connection.query(userAddDepartments, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  });
}
else if (response.role && response.salary && response.belongTo) { /* if all role questions are answered then they are added to the Roles Table */
    const userAddRole = `INSERT INTO Roles(title, salary, department_id) Values ('${role}','${salary}','${belongTo}')`
    connection.query(userAddRole, (error,response) => {
      if (error) throw error;
      console.table(response);
      questions();
    });
  }
  else if (response.firstName && response.lastName && response.currentRole && response.currentManager) { /* if all Employee questions are answered then they are added to the Employees Table */
    const addUser = `INSERT INTO Employees(first_name, last_name, role_id, manager_id) Values ('${firstName}','${lastName}','${currentRole}','${currentManager}')`
    connection.query(addUser, (error,response) => {
      if (error) throw error;
      console.table(response);
      questions();
    });
  }
  else if (response.newRole && response.update) { /* updates employee role from selected employee */
    const userUpdate = `update Employees set role_id = ${ response.newRole} where id = ${response.update}`;
    connection.query(userUpdate, (error,response) => {
      if (error) throw error;
      console.table(response);
      questions();
    });
  }
  else if (response.toDo === 'Update Employee Manager') { /* updates employee role from selected employee */
  const userManagerUpdate = `update Employees set manager_id = ${newManagerId} where id = ${employeeId}`;
  connection.query(userManagerUpdate, (error,response) => {
    if (error) throw error;
    console.table(response);
    questions();
  });
}
  
  
  else if (response.toDo === "quit") { /* ends the connection if quit is selected */
    connection.end();
  }
}); /* ends the .thens */
})
} /* ends const questions */

questions();
});
} /* ends the populated Employees function */

populatedEmployees();

  