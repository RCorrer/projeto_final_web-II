CREATE TABLE Endereco (
    id SERIAL PRIMARY KEY,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    complemento VARCHAR(255),
    unidade VARCHAR(50),
    bairro VARCHAR(100),
    localidade VARCHAR(100),
    uf CHAR(2),
    estado VARCHAR(50),
    regiao VARCHAR(50),
    numero VARCHAR(10)
);

