CREATE TABLE User_Roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY(user_id, role_id),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	      REFERENCES Users(user_id),
    CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	      REFERENCES Roles(role_id)
);

INSERT INTO User_Roles(user_id, role_id)
VALUES
  (1, 1),
  (2, 2);
