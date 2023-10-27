CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);
INSERT INTO Users(username, email)
VALUES
  ('walidator03', 'walidator03@gmail.com'),
  ('userek', 'user@user.com');
