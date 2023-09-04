SELECT *
FROM Roles
JOIN Departments ON Roles.department_id = Departments.id;

SELECT *
FROM Employees
JOIN Roles ON Employees.role_id = Roles.id;

