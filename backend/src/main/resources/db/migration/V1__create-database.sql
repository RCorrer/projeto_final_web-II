CREATE TABLE Endereco (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
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
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE Clientes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    fk_endereco TEXT REFERENCES Endereco(id),
    fk_usuario TEXT REFERENCES Usuarios(id)
);

CREATE TABLE Funcionarios (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nascimento DATE NOT NULL,
    fk_usuario TEXT REFERENCES Usuarios(id)
);

CREATE TABLE CategoriaEquipamento (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    descricao VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE EstadoSolicitacao (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    descricao VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE SolicitacaoManutencao (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    fk_cliente TEXT REFERENCES Clientes(id) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao_equipamento VARCHAR(255) NOT NULL,
    fk_estado TEXT REFERENCES EstadoSolicitacao(id) NOT NULL,
    fk_categoria_equipamento TEXT REFERENCES CategoriaEquipamento(descricao) NOT NULL,
    descricao_defeito TEXT NOT NULL,
    orcamento DECIMAL(10,2),
    fk_funcionario TEXT REFERENCES Funcionarios(id)
);

CREATE TABLE HistoricoAlteracao (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    fk_solicitacao TEXT REFERENCES SolicitacaoManutencao(id) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    estado_anterior TEXT REFERENCES EstadoSolicitacao(id),
    estado_novo TEXT REFERENCES EstadoSolicitacao(id) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RedirecionamentoFuncionario (
    fk_historico_alteracao TEXT REFERENCES HistoricoAlteracao(id) NOT NULL,
    fk_funcionario_origem TEXT REFERENCES Funcionarios(id) NOT NULL,
    fk_funcionario_destino TEXT REFERENCES Funcionarios(id) NOT NULL
);

CREATE TABLE Receita (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_solicitacao TEXT REFERENCES SolicitacaoManutencao(id) NOT NULL
);
