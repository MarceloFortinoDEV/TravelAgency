CREATE TABLE users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role     VARCHAR(100) NOT NULL
)

CREATE TABLE agency (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    socialName      VARCHAR(100) NOT NULL UNIQUE,
    cnpj            INT NOT NULL UNIQUE,
    stateRegister   VARCHAR(100) NOT NULL UNIQUE,
    cnpjStatus      VARCHAR(100) NOT NULL,
    foundationDate  DATETIME NOT NULL
)