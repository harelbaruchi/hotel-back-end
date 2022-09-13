create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
)

insert into user(name, contactNumber, email, password, status,role) values('Admin','4804091581','admin@gmail.com','admin','true','admin');

create table project(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    address varchar(250),
    image varchar(250),
    status varchar(20),
    endDate datetime NOT NULL,
    primary key(id)
)

create table comment(
    id int NOT NULL AUTO_INCREMENT,
    description varchar(250) NOT NULL,
    projectId int NOT NULL,
    timeCreated date NOT NULL,
    primary key(id)
)