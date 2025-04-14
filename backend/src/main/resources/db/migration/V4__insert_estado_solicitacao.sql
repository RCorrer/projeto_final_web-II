DELETE FROM EstadoSolicitacao;

INSERT INTO EstadoSolicitacao (id, descricao) VALUES
('1', 'ABERTA'),
('2', 'ORÇADA'),
('3', 'APROVADA'),
('4', 'REJEITADA'),
('5', 'REDIRECIONADA'),
('6', 'ARRUMADA'),
('7', 'PAGA'),
('8', 'FINALIZADA'),
('9', 'ENTREGADA')
;