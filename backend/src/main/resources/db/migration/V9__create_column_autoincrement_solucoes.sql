ALTER TABLE SolicitacaoManutencao ADD COLUMN numero_os SERIAL;

CREATE SEQUENCE solicitacao_numero_os_seq OWNED BY SolicitacaoManutencao.numero_os;

UPDATE SolicitacaoManutencao SET numero_os = nextval('solicitacao_numero_os_seq');