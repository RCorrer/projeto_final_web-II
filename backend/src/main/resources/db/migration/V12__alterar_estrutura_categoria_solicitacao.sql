ALTER TABLE CategoriaEquipamento ADD COLUMN ativa BOOLEAN DEFAULT TRUE NOT NULL;

CREATE TEMPORARY TABLE temp_solicitacoes AS
SELECT id, fk_cliente, data_hora, descricao_equipamento,
       fk_estado, fk_categoria_equipamento, descricao_defeito,
       orcamento, fk_funcionario
FROM SolicitacaoManutencao;

CREATE TEMPORARY TABLE temp_categoria_map AS
SELECT descricao, id FROM CategoriaEquipamento;

ALTER TABLE HistoricoAlteracao DROP CONSTRAINT IF EXISTS historicoalteracao_fk_solicitacao_fkey;
ALTER TABLE Receita DROP CONSTRAINT IF EXISTS receita_fk_solicitacao_fkey;

ALTER TABLE SolicitacaoManutencao DROP COLUMN fk_categoria_equipamento;
ALTER TABLE SolicitacaoManutencao ADD COLUMN fk_categoria_equipamento TEXT;

UPDATE SolicitacaoManutencao s
SET fk_categoria_equipamento = m.id
FROM temp_categoria_map m
WHERE s.fk_categoria_equipamento = m.descricao;

ALTER TABLE SolicitacaoManutencao
ADD CONSTRAINT fk_categoria_equipamento
FOREIGN KEY (fk_categoria_equipamento) REFERENCES CategoriaEquipamento(id);

ALTER TABLE HistoricoAlteracao
ADD CONSTRAINT historicoalteracao_fk_solicitacao_fkey
FOREIGN KEY (fk_solicitacao) REFERENCES SolicitacaoManutencao(id);

ALTER TABLE Receita
ADD CONSTRAINT receita_fk_solicitacao_fkey
FOREIGN KEY (fk_solicitacao) REFERENCES SolicitacaoManutencao(id);

DROP TABLE temp_solicitacoes;
DROP TABLE temp_categoria_map;