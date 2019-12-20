
DROP TABLE IF EXISTS spotters;

CREATE TABLE spotters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  animal_id INTEGER -- foreign key: this is the primary key of the animals table
);

INSERT INTO spotters ( name, location, animal_id )
  VALUES ( 'Mikaela', 'Sydney', 1 );

INSERT INTO spotters ( name, location, animal_id )
  VALUES ( 'Joel', 'Glasgow', 1 );

INSERT INTO spotters ( name, location, animal_id )
  VALUES ( 'Lay', 'Sydney', 2 );

INSERT INTO spotters ( name, location, animal_id )
  VALUES ( 'Josh', 'Perth', 3 );

SELECT * FROM spotters;
