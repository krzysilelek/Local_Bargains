CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL
);
INSERT INTO Roles(role_name)
VALUES
  ('Administrator'),
  ('User');
