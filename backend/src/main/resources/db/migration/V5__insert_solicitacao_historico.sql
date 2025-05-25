INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    '774ebeb5-ac30-43a0-9763-dc3ee58f1484',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-04-23 11:40:35.969097',
    'string',
    '5',
    'Desktop',
    'string',
    10,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (
    id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora
) VALUES
('75f766f8-4be0-4fd2-b1cb-a425851ccaa3', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Orçamento de R$ 10.0 registrado', '5', '2', '2025-04-23 16:12:29.37475'),
('f5816819-3fa9-40f0-b06b-36a347ed5cb9', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Orçamento rejeitado. Motivo: achei muito caro', '2', '4', '2025-04-23 16:13:06.995018'),
('bbe58283-f29d-4f4a-9360-218d4aa1f82b', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Orçamento aprovado', '4', '3', '2025-04-23 16:13:19.633513'),
('418c6ee9-9a48-49b0-9aee-0e39308497d2', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação capturada pelo funcionário d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '3', '3', '2025-04-23 16:13:51.145367'),
('ad8295af-bfc3-4ea9-8070-8a69bc7a3a87', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação redirecionada de d2451fda-b7e6-4a44-b5be-fe7493e9a9e0 para 4e928627-decb-4d0f-9a6e-c2f9763a7918', '3', '5', '2025-04-23 16:14:40.937099'),
('a39d588f-856c-479b-8822-f4d5d5dc15d7', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação atualizada para ARRUMADA', '5', '6', '2025-04-23 16:15:08.546384'),
('1dfe7659-e8cf-4e1c-b7c3-71a0ac775dd6', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação atualizada para PAGA', '6', '7', '2025-04-23 16:15:17.912303'),
('c04fc04e-6ff9-4293-ab96-b513fe75d0d6', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação atualizada para ENTREGADA', '7', '9', '2025-04-23 16:15:30.259854'),
('50454d0e-f77b-4d80-be6e-5282af44c12d', '774ebeb5-ac30-43a0-9763-dc3ee58f1484', 'Solicitação atualizada para FINALIZADA', '9', '8', '2025-04-23 16:15:41.502159');