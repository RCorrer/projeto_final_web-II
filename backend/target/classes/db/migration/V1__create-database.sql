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

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    fk_endereco INT REFERENCES Endereco(id),
    fk_usuario INT REFERENCES Usuarios(id)
);

CREATE TABLE Funcionarios (
    id SERIAL PRIMARY KEY,
    nascimento DATE NOT NULL,
    fk_usuario INT REFERENCES Usuarios(id)
);

CREATE TABLE CategoriaEquipamento (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE EstadoSolicitacao (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE SolicitacaoManutencao (
    id SERIAL PRIMARY KEY,
    fk_cliente INT REFERENCES Clientes(id) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao_equipamento VARCHAR(255) NOT NULL,
    fk_estado INT REFERENCES EstadoSolicitacao(id) NOT NULL,
    fk_categoria_equipamento INT REFERENCES CategoriaEquipamento(id) NOT NULL,
    descricao_defeito TEXT NOT NULL,
    orcamento DECIMAL(10,2),
    fk_funcionario INT REFERENCES Funcionarios(id)
);

CREATE TABLE HistoricoAlteracao (
    id SERIAL PRIMARY KEY,
    fk_solicitacao INT REFERENCES SolicitacaoManutencao(id) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    estado_anterior INT REFERENCES EstadoSolicitacao(id),
    estado_novo INT REFERENCES EstadoSolicitacao(id) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RedirecionamentoFuncionario (
    fk_historico_alteracao INT REFERENCES HistoricoAlteracao(id) NOT NULL,
    fk_funcionario_origem INT REFERENCES Funcionarios(id) NOT NULL,
    fk_funcionario_destino INT REFERENCES Funcionarios(id) NOT NULL
);

CREATE TABLE Receita (
    id SERIAL PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_solicitacao INT REFERENCES SolicitacaoManutencao(id) NOT NULL
);
