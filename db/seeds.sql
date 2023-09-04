insert into Departments(id, name)
values  ('1','Sales'),
        ('2','Engineering'),
        ('3', 'Finance'),
        ('4', 'Legal');

insert into Roles(id,title,department_id,salary)
values  ('1', 'Sales Lead','1','100000'),
        ('2', 'Sales Person','1','80000'),
        ('3', 'Lead Engineer','2','150000'),
        ('4', 'Software Engineer','2','120000'),
        ('5', 'Account Manager','3','160000'),
        ('6', 'Accountant','3','125000'),
        ('7', 'Legal Team lead','4','250000'),
        ('8', 'Lawyer','4','190000');

insert into Employees(first_name,last_name,role_id,manager_id)
values  ('John','Doe','1',null),
        ('Mike','Chan','2','1'),
        ('Ashley','Rodriguez','3',null),
        ('Kevin','Tupik','4','3'),
        ('Kunal','Singh','5',null),
        ('Malia','Brown','6','5'),
        ('Sarah','Lourd','7',null),
        ('Tom','Allen','8','7');