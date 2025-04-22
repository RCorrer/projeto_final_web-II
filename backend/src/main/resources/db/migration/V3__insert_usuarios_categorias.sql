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

INSERT INTO Usuarios (id, nome, email, senha, role) VALUES
('19a2f583-f820-4cf9-9c6f-285d03d4a594', 'cli1', 'cli1', '$2a$10$2h5taD/eDIKUlrTziZFHHeTZ5iOC816si.xQT0XI9wiXfabDxCsKu', 1),
('1b03ce83-0eee-46c7-939e-454b5caef24c', 'cli2', 'cli2', '$2a$10$WOftmceVg1Q2jiKpUs2NU.KwIcyATODIIxSOfkff0UC8dYoedQQZ6', 1),
('63191186-2ec8-4ecc-912b-04f77b0d3671', 'fun1', 'fun1', '$2a$10$ATwc7.h2pc5HBOUTbPmjs.tHu4aGhD0TbN5Zdqy0khbwt8nylsLCW', 0),
('b415ddc7-d157-40e8-a2bb-336d65e1ac19', 'fun2', 'fun2', '$2a$10$noZm1ba0lYhC91wS0V2rJuc4H7KFyZnlI/3BHGjD8/fBLI1kf/i/m', 0);

INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('func1', '1985-05-15', 'f1'),
('func2', '1990-08-22', 'f2');

INSERT INTO Clientes (id, cpf, telefone, fk_endereco, fk_usuario) VALUES
('297d6c7f-de5a-487f-915a-2562790185f8', 'cli1', 'cli1', '0e2ea295-e68c-4ba1-b48a-fc2420c30529', '19a2f583-f820-4cf9-9c6f-285d03d4a594'),
('f5525bdf-ac24-4b95-af97-58f0b7db07b7', 'cli2', 'cli2', '284539e3-cbad-40cf-8163-10ee0adce56a', '1b03ce83-0eee-46c7-939e-454b5caef24c');

INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '2025-04-22', '63191186-2ec8-4ecc-912b-04f77b0d3671'),
('4e928627-decb-4d0f-9a6e-c2f9763a7918', '2025-04-22', 'b415ddc7-d157-40e8-a2bb-336d65e1ac19');

INSERT INTO Endereco (id, cep, logradouro, complemento, unidade, bairro, localidade, uf, estado, regiao, numero) VALUES
('0e2ea295-e68c-4ba1-b48a-fc2420c30529', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1', 'cli1'),
('284539e3-cbad-40cf-8163-10ee0adce56a', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2', 'cli2');

INSERT INTO CategoriaEquipamento (id, descricao) VALUES
('cat1', 'Notebook'),
('cat2', 'Desktop'),
('cat3', 'Impressora'),
('cat4', 'Mouse'),
('cat5', 'Teclado');
