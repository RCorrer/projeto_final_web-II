DELETE FROM HistoricoAlteracao WHERE fk_solicitacao = 'sol29';
DELETE FROM HistoricoAlteracao WHERE fk_solicitacao = 'sol30';

DELETE FROM Receita WHERE fk_solicitacao = 'sol29';
DELETE FROM Receita WHERE fk_solicitacao = 'sol30';

DELETE FROM SolicitacaoManutencao WHERE id = 'sol29';
DELETE FROM SolicitacaoManutencao WHERE id = 'sol30';