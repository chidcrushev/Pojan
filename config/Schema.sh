#!/bin/bash

sudo mysql -u root

CREATE SCHEMA project;
USE project;

-- Table structure for 'DEPARTMENT'
CREATE TABLE department (
dept_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(45) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(dept_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for 'USER'
CREATE TABLE user (
user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
phone VARCHAR(50),
isStudent BOOLEAN NOT NULL,
avatar TEXT,
student_id BIGINT UNSIGNED,
password VARCHAR(100) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(user_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for 'DEPARTMENT_USER'
CREATE TABLE department_user(
department_user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
fk_user_id INT UNSIGNED NOT NULL UNIQUE,
fk_dept_id INT UNSIGNED NOT NULL UNIQUE,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(department_user_id),
FOREIGN KEY (fk_user_id) REFERENCES user (user_id) ON DELETE CASCADE,
FOREIGN KEY (fk_dept_id) REFERENCES department (dept_id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for 'ASSISTANTSHIP'
CREATE TABLE assistantship (
assistantship_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
assistantship_title VARCHAR(25) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(assistantship_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for 'REQUISITE'-True signifies "Open To All" and False signifies "Closed To All"
CREATE TABLE requisite (
requisite_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
requisite_title VARCHAR(50) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(requisite_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for 'POST'
CREATE TABLE post (
post_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
post_title VARCHAR(45) NOT NULL,
description text NOT NULL,
requirement text NOT NULL,
status BOOLEAN NOT NULL,
fk_user_id INT UNSIGNED NOT NULL,
fk_dept_id INT UNSIGNED NOT NULL,
fk_assistantship_id INT UNSIGNED NOT NULL,
fk_requisite_id INT UNSIGNED NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (post_id),
FOREIGN KEY (fk_user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (fk_dept_id) REFERENCES department (dept_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (fk_assistantship_id) REFERENCES assistantship (assistantship_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (fk_requisite_id) REFERENCES requisite (requisite_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for 'POST_VIEW'
CREATE TABLE post_view(
post_view_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
fk_user_id INT UNSIGNED NOT NULL,
fk_post_id INT UNSIGNED NOT NULL,
PRIMARY KEY(post_view_id),
FOREIGN KEY (fk_user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (fk_post_id) REFERENCES post (post_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for 'POST_APPLICANT'
CREATE TABLE post_applicant(
post_applicant_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
post_applicant_message TEXT NOT NULL,
fk_user_id INT UNSIGNED NOT NULL,
fk_post_id INT UNSIGNED NOT NULL,
file_path TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(post_applicant_id),
FOREIGN KEY (fk_user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (fk_post_id) REFERENCES post (post_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Table Structure for 'NOTIFICATION'
CREATE TABLE notification(
notification_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
description TEXT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(notification_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Department Table Values
INSERT INTO department(dept_name)values('Computer Science'),
('Astronomy'),
('Physics'),
('Chemistry'),
('Biology'),
('Agriculture'),
('Arts'),
('Geology'),
('Mathematical Sciences'),
('Social Sciences');

-- Assitantship Table Values
INSERT INTO assistantship(assistantship_title) values ('Graduate Assistant'),
('Teaching Assistant'),
('Research Assistant');

-- Requisite Table Values- True signifies "Open To All" and False signifies "Closed To All"
INSERT INTO requisite(requisite_title)values('Closed To All'),
('Open To All');