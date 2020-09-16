CREATE DATABASE zen_db;

USE zen_db;

-- Create the table tasks.
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hidden BOOLEAN NOT NULL,
  created_at DATETIME NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE checklist (
  id int NOT NULL AUTO_INCREMENT,
  body VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL,
  hidden BOOLEAN NOT NULL,
  user_id int NOT NULL,
    CONSTRAINT fk_user
	FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE favorite_quote (
  id int NOT NULL AUTO_INCREMENT,
  quote VARCHAR(255) NOT NULL,
  liked BOOLEAN NOT NULL,
  user_id int NOT NULL,
    CONSTRAINT fk_users
	FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);