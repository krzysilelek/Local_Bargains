CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR(50) NOT NULL
);
INSERT INTO Users(username, password, email)
VALUES
  ('walidator03', '$2b$10$KIODl6YVXpq4QDWxou7rBusYT9/bwJu6F8N2CajsuAFVxaIgKnjTS', 'walidator03@gmail.com'),
  ('userek', '$2y$10$zU1AFbOgYC7s9daDIbcZN.AwiwhkZ388ZHmqz2vgj1IDN6fSdQh8K', 'user@user.com');
