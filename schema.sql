CREATE DATABASE zen_db;

USE zen_db;

-- Create the table users.
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  hidden BOOLEAN NOT NULL,
--   created_at is handled by Sequelize.
  created_at DATETIME NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create the table checklist
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

-- Create the table likes
CREATE TABLE likes (
  id int NOT NULL AUTO_INCREMENT,
  quote_id int NOT NULL,
  reflection VARCHAR(255),
  liked BOOLEAN NOT NULL,
  user_id int NOT NULL,
  CONSTRAINT fk_quotes
	FOREIGN KEY (quote_id)
    REFERENCES quotes(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT fk_users
	FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);

-- Create the table quotes.
CREATE TABLE quotes (
  id int NOT NULL AUTO_INCREMENT,
  quote VARCHAR(255) NOT NULL,
  quote_author VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);