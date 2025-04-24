DELETE FROM Receita;
DELETE FROM RedirecionamentoFuncionario;
DELETE FROM HistoricoAlteracao;
DELETE FROM SolicitacaoManutencao;
DELETE FROM EstadoSolicitacao;
DELETE FROM CategoriaEquipamento;
DELETE FROM Funcionarios;
DELETE FROM Clientes;
DELETE FROM Usuarios;
DELETE FROM Endereco;


INSERT INTO Usuarios (id, nome, email, senha) VALUES
('f1', 'Maria Silva', 'maria@empresa.com', 'senha123'),
('f2', 'Mário Souza', 'mario@empresa.com', 'senha123');


INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('func1', '1985-05-15', 'f1'),
('func2', '1990-08-22', 'f2');

INSERT INTO Usuarios (id, nome, email, senha) VALUES
('c1', 'João Pereira', 'joao@email.com', 'senha123'),
('c2', 'José Santos', 'jose@email.com', 'senha123'),
('c3', 'Joana Oliveira', 'joana@email.com', 'senha123'),
('c4', 'Joaquina Costa', 'joaquina@email.com', 'senha123');

-- Inserir um endereço simples para todos
INSERT INTO Endereco (id, cep, logradouro) VALUES
('e1', '00000-000', 'Rua Genérica');


INSERT INTO Clientes (id, cpf, fk_endereco, fk_usuario) VALUES
('cli1', '12345678901', 'e1', 'c1'),
('cli2', '23456789012', 'e1', 'c2'),
('cli3', '34567890123', 'e1', 'c3'),
('cli4', '45678901234', 'e1', 'c4');

INSERT INTO CategoriaEquipamento (id, descricao) VALUES
('cat1', 'Notebook'),
('cat2', 'Desktop'),
('cat3', 'Impressora'),
('cat4', 'Mouse'),
('cat5', 'Teclado');
