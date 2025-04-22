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



INSERT INTO CategoriaEquipamento (id, descricao) VALUES
('cat1', 'Notebook'),
('cat2', 'Desktop'),
('cat3', 'Impressora'),
('cat4', 'Mouse'),
('cat5', 'Teclado');
