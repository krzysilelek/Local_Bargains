CREATE TABLE Users (
    id varchar NOT NULL,
    username varchar NOT NULL,
    "password" varchar NOT NULL,
    active bool NULL,
    email varchar NULL,
    authorities varchar NULL,
    accountnonexpired bool NULL,
    accountnonlocked bool NULL,
    credentialsnonexpired bool NULL,
    enabled bool NULL,
    CONSTRAINT id_pkey PRIMARY KEY (id)
);
