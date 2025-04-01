TRUNCATE TABLE RedirecionamentoFuncionario CASCADE;
TRUNCATE TABLE HistoricoAlteracao CASCADE;
TRUNCATE TABLE Receita CASCADE;
TRUNCATE TABLE SolicitacaoManutencao CASCADE;
TRUNCATE TABLE Funcionarios CASCADE;
TRUNCATE TABLE Clientes CASCADE;
TRUNCATE TABLE Usuarios CASCADE;
TRUNCATE TABLE Endereco CASCADE;
TRUNCATE TABLE CategoriaEquipamento CASCADE;
TRUNCATE TABLE EstadoSolicitacao CASCADE;

INSERT INTO CategoriaEquipamento (id, descricao) VALUES
('1', 'Notebook'),
('2', 'Desktop'),
('3', 'Impressora'),
('4', 'Mouse'),
('5', 'Teclado');

INSERT INTO EstadoSolicitacao (id, descricao) VALUES
('1', 'ABERTA'),
('2', 'ORÇADA'),
('3', 'REJEITADA'),
('4', 'APROVADA'),
('5', 'REDIRECIONADA'),
('6', 'ARRUMADA'),
('7', 'PAGA'),
('8', 'FINALIZADA');

INSERT INTO Endereco (id, cep, logradouro, bairro, localidade, uf, estado, regiao, numero) VALUES
('1', '01001000', 'Praça da Sé', 'Sé', 'São Paulo', 'SP', 'São Paulo', 'Sudeste', '1'),
('2', '20040002', 'Av. Rio Branco', 'Centro', 'Rio de Janeiro', 'RJ', 'Rio de Janeiro', 'Sudeste', '45'),
('3', '30140010', 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'Minas Gerais', 'Sudeste', '1001'),
('4', '40010000', 'Rua Chile', 'Comércio', 'Salvador', 'BA', 'Bahia', 'Nordeste', '23'),
('5', '50010000', 'Rua do Bom Jesus', 'Recife Antigo', 'Recife', 'PE', 'Pernambuco', 'Nordeste', '50');

INSERT INTO Usuarios (id, nome, email, senha, role) VALUES
-- Funcionários
('1', 'Maria Silva', 'maria@empresa.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'FUNCIONARIO'),
('2', 'Mário Souza', 'mario@empresa.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'FUNCIONARIO'),
-- Clientes
('3', 'João Oliveira', 'joao@cliente.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'CLIENTE'),
('4', 'José Santos', 'jose@cliente.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'CLIENTE'),
('5', 'Joana Pereira', 'joana@cliente.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'CLIENTE'),
('6', 'Joaquina Costa', 'joaquina@cliente.com', '$2a$12$XE9AK3EHsFtdabxgjribGuUM3X43YQ1fjAqJj6/oGGvMZrUdfNP7i', 'CLIENTE');
-- Senha para todos os Users pre setados é senha123

INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('1', '1990-05-15', '1'),  -- Maria
('2', '1985-08-22', '2');  -- Mário

INSERT INTO Clientes (id, cpf, telefone, fk_endereco, fk_usuario) VALUES
('1', '12345678901', '(11) 9999-8888', '1', '3'),  -- João
('2', '23456789012', '(21) 9888-7777', '2', '4'),  -- José
('3', '34567890123', '(31) 9777-6666', '3', '5'),  -- Joana
('4', '45678901234', '(71) 9666-5555', '4', '6');  -- Joaquina
