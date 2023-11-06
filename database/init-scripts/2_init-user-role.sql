CREATE TABLE User_Role (
    user_id INT,
    role_id INT NOT NULL,
    PRIMARY KEY(user_id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	      REFERENCES Users(user_id),
    CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	      REFERENCES Roles(role_id)
);

INSERT INTO User_Role(user_id, role_id)
VALUES
  (1, 1),
  (2, 2);
