DROP DATABASE playlist_db IF EXISTS;

CREATE DATABASE playlist_db;

use playlist_db;

CREATE TABLE songs (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  artist VARCHAR(45) NULL,
  genre VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

INSERT INTO songs (title, artist, genre)
VALUES ("Sanctuary", "Joji", "R&B");

INSERT INTO songs (title, artist, genre)
VALUES ("Trailer Trash", "Modest Mouse", "Indie");

INSERT INTO songs (title, artist, genre)
VALUES ("Hurt", "Oliver Tree", "Alternative Rock");

INSERT INTO songs (title, artist, genre)
VALUES ("Jinji", "Sunset Rollercoaster", "Indie");