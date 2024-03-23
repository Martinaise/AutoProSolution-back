CREATE TABLE User (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(20),
    is_admin BOOLEAN
);

CREATE TABLE Service (
    id_service INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255),
    description TEXT,
    picture VARCHAR(255)
);

CREATE TABLE Car (
    id_car INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    year_of_manufacture DATE,
    mileage VARCHAR(255)
);

CREATE TABLE Testimonial (
    id_testimonial INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    comment TEXT,
    rating INT,
    testimonial_date DATE,
    approved BOOLEAN
);

CREATE TABLE Contact (
    id_contact INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    message TEXT,
    subject VARCHAR(255),
    contact_date DATE
);

CREATE TABLE Schedule (
    id_schedule INT PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(255),
    morning_opening_time TIME,
    morning_closing_time TIME,
    afternoon_opening_time TIME,
    afternoon_closing_time TIME,
    is_open BOOLEAN,
    is_on_break BOOLEAN
);

CREATE TABLE Image (
    id_image INT PRIMARY KEY AUTO_INCREMENT,
    id_car INT,
    url_images VARCHAR(255),
    FOREIGN KEY (id_car) REFERENCES Car(id_car)
);

CREATE TABLE Characteristic (
    id_characteristic INT PRIMARY KEY AUTO_INCREMENT,
    characteristic_name VARCHAR(255)
);

CREATE TABLE Equipment_option (
    id_equipment_option INT PRIMARY KEY AUTO_INCREMENT,
    option_name VARCHAR(255)   
);

CREATE TABLE Association_car_characteristic (
    id_association_car_characteristic INT AUTO_INCREMENT,
    id_characteristic INT,
    id_car INT,
    PRIMARY KEY (id_association_car_characteristic),
    FOREIGN KEY (id_car) REFERENCES Car(id_car),
    FOREIGN KEY (id_characteristic) REFERENCES Characteristic(id_characteristic)
);

CREATE TABLE Association_car_equipment_option (
    id_association_car_option INT AUTO_INCREMENT,
    option_value VARCHAR(255),
    id_car INT,
    id_equipment_option INT,
    PRIMARY KEY (id_association_car_option),
    FOREIGN KEY (id_car) REFERENCES Car(id_car),
    FOREIGN KEY (id_equipment_option) REFERENCES Equipment_option(id_equipment_option)
);
