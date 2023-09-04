DROP DATABASE IF EXISTS Employee_Records;
create database Employee_Records;

use Employee_Records;

create table Departments (
    id int not null auto_increment primary key,
    name VARCHAR(30) not null
);

create table Roles (
    id int not null auto_increment primary key,
    title VARCHAR(300) not null,
    salary DECIMAL,
    department_id int,
    foreign key (department_id) references Departments(id) 
);
create table Employees (
    id int not null auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int, 
    foreign key (role_id) references Roles(id),
    foreign key (manager_id) references Employees(id)
);

  

    