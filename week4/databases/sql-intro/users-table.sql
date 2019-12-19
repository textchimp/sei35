
-- This file defines the structure of the 'users' table.
-- It's also known as a 'schema'.

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT,
  name TEXT,
  password TEXT,
  image TEXT,
  verified BOOLEAN,
  age INTEGER
);
