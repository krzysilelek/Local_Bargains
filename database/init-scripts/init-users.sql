CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);
INSERT INTO Users(username, email)
VALUES
  ('Goodman', 'goodman@kindacode.com'),
  ('Badman', 'badman@kindacode.com'),
  ('Invisible Man', 'invisibleman@kindacode.com');
