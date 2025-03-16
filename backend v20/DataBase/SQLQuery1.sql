use RailwayTrain
create table ticket_payment
( 
	RNR_NO int primary key,
	train_no int,
    Date_time datetime, -- Use datetime for date and time
	passenger_name varchar(50),
	class varchar(10),
	source varchar(20),
	distination varchar(20),
	seat_no int,
	transaction_id int,
    Amount decimal(10,2), -- Adjust data type as needed
	bank varchar(20),
	card_no varchar(20)

);
create table User_
(	
	userID varchar(20) primary key,
	F_name varchar(10),
	L_name varchar(10),
	Gender varchar(5),
	city varchar(10),
	state varchar(10),
	pincode varchar(10)	
);

create table mobileuser
(
	userId varchar(20) foreign key REFERENCES User_(userID),
	mobile_no varchar(20) ,
	primary key( mobile_no, userID)
);


create table booking
(
	RNR_no_tik_pay int foreign key REFERENCES ticket_payment(RNR_NO),
	userID varchar(20) foreign key REFERENCES User_(userID),
	primary key (RNR_no_tik_pay)
);

create table cancel
(
	RNR_no_tik_pay int foreign key REFERENCES ticket_payment(RNR_NO),
	userID varchar(20) foreign key REFERENCES User_(userID),
	primary key (RNR_no_tik_pay)
);
create table Route
(
	stop_no int primary key,
	stop_name varchar(20),
);


create table Train
(	
	train_no int primary key,
	train_name varchar(20),
	Dep_time Datetime,
	Distance int ,
	Distination varchar(20),
	seat_avaliable int,
	source varchar(20),
	Arr_time datetime,
	stop_no_route int foreign key REFERENCES Route(stop_no),
	userID varchar(20) foreign key REFERENCES User_(userID)
);



-- Insert random data into ticket_payment table
INSERT INTO ticket_payment (RNR_NO, train_no, Date_time, passenger_name, class, source, distination, seat_no, transaction_id, Amount, bank, card_no)
VALUES 
    -- Generate more random data
    (3, 103, '2023-03-03 10:00:00', 'Alice Johnson', 'First', 'CityA', 'CityC', 5, 67890, 180.00, 'BankC', '5678-9012-3456'),
    (4, 104, '2023-04-04 11:30:00', 'Bob Williams', 'Second', 'CityB', 'CityD', 9, 98765, 220.50, 'BankD', '4321-0987-6543'),
	(5, 104, '2023-05-04 11:30:00', 'Bob waleed', 'Second', 'CityB', 'CityD', 9, 98765, 220.50, 'BankE', '5555-0987-6543'),
	(6, 104, '2023-06-04 11:40:00', 'Bob nafee', 'Second', 'CityB', 'CityD', 9, 98765, 220.50, 'BankD', '7777-0987-6543'),
	(7, 104, '2023-07-04 12:30:00', 'Bob Hams', 'Second', 'CityB', 'CityD', 9, 98765, 220.50, 'BankD', '8888-0987-6543')
  

-- Insert random data into User_ table
INSERT INTO User_ (userID, F_name, L_name, Gender, city, state, pincode)
VALUES 
    -- Generate more random data
    (1, 'Alice', 'Johnson', 'Femal', 'CityX', 'StateY', '67890'),
    (2, 'Bob', 'Williams', 'Male', 'CityZ', 'StateW', '09876')
    -- Add more rows as needed with random data


-- Insert data into mobileuser table
INSERT INTO mobileuser (userId, mobile_no)
VALUES 
    (1, '1234567890'),
    (2, '9876543210')
    -- Add more rows as needed with user IDs and mobile numbers
    


-- Insert random data into Train table
INSERT INTO Train (train_no, train_name, Dep_time, Distance, Distination, seat_avaliable, source, Arr_time, stop_no_route, userID)
VALUES 
    -- Generate more random data
    (104, 'Express 1', '2023-01-01 08:00:00', 200, 'CityB', 50, 'CityA', '2023-01-01 12:00:00', 1, 1),
    (103, 'Express 2', '2023-02-02 10:00:00', 250, 'CityD', 70, 'CityC', '2023-02-02 15:00:00', 2, 2)
    -- Add more rows as needed with random data
    


-- Insert random data into Route table
INSERT INTO Route (stop_no, stop_name)
VALUES 
    -- Generate more random data
    (1, 'StopA'),
    (2, 'StopB')
    -- Add more rows as needed with random data
    


alter table Train
alter column seat_avaliable int not NULL;

alter table ticket_payment
alter column transaction_id int not null;








