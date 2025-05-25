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
('19a2f583-f820-4cf9-9c6f-285d03d4a594', 'Cliente Um', 'cliente1@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 1),  -- senha123
('1b03ce83-0eee-46c7-939e-454b5caef24c', 'Cliente Dois', 'cliente2@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 1),  -- senha123
('63191186-2ec8-4ecc-912b-04f77b0d3671', 'Funcionário Um', 'funcionario1@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 0),  -- senha123
('b415ddc7-d157-40e8-a2bb-336d65e1ac19', 'Funcionário Dois', 'funcionario2@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 0);  -- senha123

INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '1990-01-15', '63191186-2ec8-4ecc-912b-04f77b0d3671'),
('4e928627-decb-4d0f-9a6e-c2f9763a7918', '1992-05-20', 'b415ddc7-d157-40e8-a2bb-336d65e1ac19');

INSERT INTO Endereco (id, cep, logradouro, complemento, unidade, bairro, localidade, uf, estado, regiao, numero) VALUES
('0e2ea295-e68c-4ba1-b48a-fc2420c30529', '01001000', 'Rua do Cliente Um', 'Apto 101', 'Bloco A', 'Centro', 'São Paulo', 'SP', 'São Paulo', 'Sudeste', '123'),
('284539e3-cbad-40cf-8163-10ee0adce56a', '20010000', 'Rua do Cliente Dois', 'Sala 201', 'Edifício B', 'Centro', 'Rio de Janeiro', 'RJ', 'Rio de Janeiro', 'Sudeste', '456');

INSERT INTO Clientes (id, cpf, telefone, fk_endereco, fk_usuario) VALUES
('297d6c7f-de5a-487f-915a-2562790185f8', '12345678901', '11987654321', '0e2ea295-e68c-4ba1-b48a-fc2420c30529', '19a2f583-f820-4cf9-9c6f-285d03d4a594'),
('f5525bdf-ac24-4b95-af97-58f0b7db07b7', '98765432109', '21912345678', '284539e3-cbad-40cf-8163-10ee0adce56a', '1b03ce83-0eee-46c7-939e-454b5caef24c');

INSERT INTO CategoriaEquipamento (id, descricao) VALUES
('cat1', 'Notebook'),
('cat2', 'Desktop'),
('cat3', 'Impressora'),
('cat4', 'Mouse'),
('cat5', 'Teclado');