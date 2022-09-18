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
    endDate date NOT NULL,
    primary key(id)
)

create table comment(
    id int NOT NULL AUTO_INCREMENT,
    description varchar(250) NOT NULL,
    projectId int NOT NULL,
    timeCreated date NOT NULL,
    primary key(id)
)

create table hotel(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    address varchar(250),
    image varchar(250),
    primary key(id)
)

create table room(
    id int NOT NULL AUTO_INCREMENT,
    type varchar(250) NOT NULL,
    hotelId int NOT NULL,
    availableCount int NOT NULL,
    primary key(id)
)

create table reservation(
    id int NOT NULL AUTO_INCREMENT,
    inbound date NOT NULL,
    outbound date NOT NULL,
    roomId int NOT NULL,
    personFName varchar(250) NOT NULL,
    primary key(id)
)