-- Solicitação 1: Completa (ABERTA -> ORÇADA -> APROVADA -> ARRUMADA -> PAGA -> ENTREGADA -> FINALIZADA)
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-01-10 09:15:22',
    'Notebook Dell Inspiron',
    '8',
    'Notebook',
    'Tela não liga',
    350.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h1-1', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Solicitação criada', NULL, '1', '2025-01-10 09:15:22'),
('h1-2', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Orçamento de R$ 350.00 registrado', '1', '2', '2025-01-10 11:30:45'),
('h1-3', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Orçamento aprovado pelo cliente', '2', '3', '2025-01-11 14:20:10'),
('h1-4', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Solicitação capturada pelo funcionário', '3', '3', '2025-01-12 10:05:33'),
('h1-5', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Equipamento reparado', '3', '6', '2025-01-15 16:45:12'),
('h1-6', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Pagamento confirmado', '6', '7', '2025-01-16 09:30:00'),
('h1-7', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Equipamento entregue ao cliente', '7', '9', '2025-01-17 14:15:22'),
('h1-8', '7a1e6c8b-3f2a-4d8e-b6c5-1a3b4c5d6e7f', 'Solicitação finalizada', '9', '8', '2025-01-18 10:00:00');

-- Solicitação 2: Rejeitada (ABERTA -> ORÇADA -> REJEITADA)
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    '8b2f7d9c-4e3b-5c9f-c7d6-2b4c5d6e7f8a',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-01-12 14:30:00',
    'Impressora HP LaserJet',
    '4',
    'Impressora',
    'Não imprime',
    280.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h2-1', '8b2f7d9c-4e3b-5c9f-c7d6-2b4c5d6e7f8a', 'Solicitação criada', NULL, '1', '2025-01-12 14:30:00'),
('h2-2', '8b2f7d9c-4e3b-5c9f-c7d6-2b4c5d6e7f8a', 'Orçamento de R$ 280.00 registrado', '1', '2', '2025-01-13 10:45:00'),
('h2-3', '8b2f7d9c-4e3b-5c9f-c7d6-2b4c5d6e7f8a', 'Orçamento rejeitado. Motivo: Preço muito alto', '2', '4', '2025-01-14 16:20:00');

-- Solicitação 3: Redirecionada (ABERTA -> ORÇADA -> APROVADA -> REDIRECIONADA -> ARRUMADA -> PAGA -> FINALIZADA)
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-01-15 11:20:00',
    'Desktop Gamer',
    '8',
    'Desktop',
    'Superaquecimento',
    420.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h3-1', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Solicitação criada', NULL, '1', '2025-01-15 11:20:00'),
('h3-2', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Orçamento de R$ 420.00 registrado', '1', '2', '2025-01-16 09:30:00'),
('h3-3', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Orçamento aprovado pelo cliente', '2', '3', '2025-01-17 14:15:00'),
('h3-4', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Solicitação capturada pelo funcionário d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '3', '3', '2025-01-18 10:00:00'),
('h3-5', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Solicitação redirecionada para especialista em hardware', '3', '5', '2025-01-19 16:30:00'),
('h3-6', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Equipamento reparado', '5', '6', '2025-01-22 14:45:00'),
('h3-7', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Pagamento confirmado', '6', '7', '2025-01-23 11:20:00'),
('h3-8', '9c3e8f1a-5d4c-6b0a-d8e7-3c5d6e7f8a9b', 'Solicitação finalizada sem entrega física', '7', '8', '2025-01-25 09:15:00');

INSERT INTO RedirecionamentoFuncionario (fk_historico_alteracao, fk_funcionario_origem, fk_funcionario_destino) VALUES
('h3-5', 'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '4e928627-decb-4d0f-9a6e-c2f9763a7918');

-- Solicitação 4: Apenas aberta
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito
) VALUES (
    'ad4f0e1b-6c5d-7e2f-e9f8-4d6e7f8a9b0c',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-02-01 16:45:00',
    'Mouse sem fio',
    '1',
    'Mouse',
    'Botão esquerdo não funciona'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h4-1', 'ad4f0e1b-6c5d-7e2f-e9f8-4d6e7f8a9b0c', 'Solicitação criada', NULL, '1', '2025-02-01 16:45:00');

-- Solicitação 5: Orçada mas não respondida
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento
) VALUES (
    'be5g1f2c-7d6e-8f3a-f0g9-5e7f8a9b0c1d',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-02-05 10:10:00',
    'Teclado mecânico',
    '2',
    'Teclado',
    'Tecla espaço não funciona',
    120.00
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h5-1', 'be5g1f2c-7d6e-8f3a-f0g9-5e7f8a9b0c1d', 'Solicitação criada', NULL, '1', '2025-02-05 10:10:00'),
('h5-2', 'be5g1f2c-7d6e-8f3a-f0g9-5e7f8a9b0c1d', 'Orçamento de R$ 120.00 registrado', '1', '2', '2025-02-06 14:30:00');

-- Solicitação 6: Aprovada mas não iniciada
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento
) VALUES (
    'cf6h2g3d-8e7f-9g4b-g1h0-6f8a9b0c1d2e',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-02-10 13:25:00',
    'Notebook Lenovo',
    '3',
    'Notebook',
    'Bateria não carrega',
    180.00
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h6-1', 'cf6h2g3d-8e7f-9g4b-g1h0-6f8a9b0c1d2e', 'Solicitação criada', NULL, '1', '2025-02-10 13:25:00'),
('h6-2', 'cf6h2g3d-8e7f-9g4b-g1h0-6f8a9b0c1d2e', 'Orçamento de R$ 180.00 registrado', '1', '2', '2025-02-11 09:45:00'),
('h6-3', 'cf6h2g3d-8e7f-9g4b-g1h0-6f8a9b0c1d2e', 'Orçamento aprovado pelo cliente', '2', '3', '2025-02-12 16:20:00');

-- Solicitação 7: Em reparo
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-02-15 09:00:00',
    'Impressora Epson',
    '6',
    'Impressora',
    'Entupimento de tinta',
    90.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h7-1', 'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f', 'Solicitação criada', NULL, '1', '2025-02-15 09:00:00'),
('h7-2', 'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f', 'Orçamento de R$ 90.00 registrado', '1', '2', '2025-02-16 11:30:00'),
('h7-3', 'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f', 'Orçamento aprovado pelo cliente', '2', '3', '2025-02-17 14:45:00'),
('h7-4', 'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f', 'Solicitação capturada pelo funcionário', '3', '3', '2025-02-18 10:15:00'),
('h7-5', 'dg7i3h4e-9f8g-0h5c-h2i1-7g9b0c1d2e3f', 'Reparo em andamento', '3', '6', '2025-02-19 16:30:00');

-- Solicitação 8: Aguardando pagamento
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-02-20 14:00:00',
    'Desktop Dell',
    '6',
    'Desktop',
    'Não liga',
    250.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h8-1', 'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g', 'Solicitação criada', NULL, '1', '2025-02-20 14:00:00'),
('h8-2', 'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g', 'Orçamento de R$ 250.00 registrado', '1', '2', '2025-02-21 10:30:00'),
('h8-3', 'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g', 'Orçamento aprovado pelo cliente', '2', '3', '2025-02-22 15:45:00'),
('h8-4', 'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g', 'Solicitação capturada pelo funcionário', '3', '3', '2025-02-23 09:15:00'),
('h8-5', 'eh8j4i5f-0g9h-1i6d-i3j2-8h0c1d2e3f4g', 'Equipamento reparado', '3', '6', '2025-02-25 16:00:00');

-- Solicitação 9: Paga mas não entregue
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-03-01 11:30:00',
    'Notebook Acer',
    '7',
    'Notebook',
    'Teclado com teclas travando',
    150.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h9-1', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Solicitação criada', NULL, '1', '2025-03-01 11:30:00'),
('h9-2', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Orçamento de R$ 150.00 registrado', '1', '2', '2025-03-02 14:45:00'),
('h9-3', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Orçamento aprovado pelo cliente', '2', '3', '2025-03-03 10:15:00'),
('h9-4', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Solicitação capturada pelo funcionário', '3', '3', '2025-03-04 16:30:00'),
('h9-5', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Equipamento reparado', '3', '6', '2025-03-06 09:00:00'),
('h9-6', 'fi9k5j6g-1h0i-2j7e-j4k3-9i1d2e3f4g5h', 'Pagamento confirmado', '6', '7', '2025-03-07 11:45:00');

-- Solicitação 10: Entregue mas não finalizada
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-03-05 10:00:00',
    'Mouse Logitech',
    '9',
    'Mouse',
    'Scroll não funciona',
    60.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h10-1', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Solicitação criada', NULL, '1', '2025-03-05 10:00:00'),
('h10-2', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Orçamento de R$ 60.00 registrado', '1', '2', '2025-03-06 14:15:00'),
('h10-3', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Orçamento aprovado pelo cliente', '2', '3', '2025-03-07 11:30:00'),
('h10-4', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Solicitação capturada pelo funcionário', '3', '3', '2025-03-08 16:45:00'),
('h10-5', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Equipamento reparado', '3', '6', '2025-03-10 09:30:00'),
('h10-6', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Pagamento confirmado', '6', '7', '2025-03-11 10:15:00'),
('h10-7', 'gj0l6k7h-2i1j-3k8f-k5l4-0j2e3f4g5h6i', 'Equipamento entregue ao cliente', '7', '9', '2025-03-12 14:00:00');

-- Solicitação 11: Finalizada sem aprovação (ABERTA -> ORÇADA -> REJEITADA -> FINALIZADA)
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento
) VALUES (
    'hk1m7l8i-3j2k-4l9g-l6m5-1k3f4g5h6i7j',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-03-10 13:45:00',
    'Teclado Microsoft',
    '8',
    'Teclado',
    'Teclas grudando',
    80.00
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h11-1', 'hk1m7l8i-3j2k-4l9g-l6m5-1k3f4g5h6i7j', 'Solicitação criada', NULL, '1', '2025-03-10 13:45:00'),
('h11-2', 'hk1m7l8i-3j2k-4l9g-l6m5-1k3f4g5h6i7j', 'Orçamento de R$ 80.00 registrado', '1', '2', '2025-03-11 10:30:00'),
('h11-3', 'hk1m7l8i-3j2k-4l9g-l6m5-1k3f4g5h6i7j', 'Orçamento rejeitado. Motivo: Decidiu comprar um novo', '2', '4', '2025-03-12 16:15:00'),
('h11-4', 'hk1m7l8i-3j2k-4l9g-l6m5-1k3f4g5h6i7j', 'Solicitação finalizada', '4', '8', '2025-03-13 09:45:00');

-- Solicitação 12: Redirecionada múltiplas vezes
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-03-15 09:30:00',
    'Notebook Asus',
    '5',
    'Notebook',
    'Problema na placa de vídeo',
    500.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h12-1', 'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k', 'Solicitação criada', NULL, '1', '2025-03-15 09:30:00'),
('h12-2', 'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k', 'Orçamento de R$ 500.00 registrado', '1', '2', '2025-03-16 14:45:00'),
('h12-3', 'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k', 'Orçamento aprovado pelo cliente', '2', '3', '2025-03-17 11:00:00'),
('h12-4', 'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k', 'Solicitação capturada pelo funcionário d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '3', '3', '2025-03-18 16:30:00'),
('h12-5', 'il2n8m9j-4k3l-5m0h-m7n6-2l4g5h6i7j8k', 'Solicitação redirecionada para especialista em hardware', '3', '5', '2025-03-19 10:15:00');

INSERT INTO RedirecionamentoFuncionario (fk_historico_alteracao, fk_funcionario_origem, fk_funcionario_destino) VALUES
('h12-5', 'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '4e928627-decb-4d0f-9a6e-c2f9763a7918');

-- Solicitação 13: Com receita registrada
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-03-20 14:15:00',
    'Desktop HP',
    '7',
    'Desktop',
    'Fonte queimada',
    200.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h13-1', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Solicitação criada', NULL, '1', '2025-03-20 14:15:00'),
('h13-2', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Orçamento de R$ 200.00 registrado', '1', '2', '2025-03-21 10:30:00'),
('h13-3', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Orçamento aprovado pelo cliente', '2', '3', '2025-03-22 15:45:00'),
('h13-4', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Solicitação capturada pelo funcionário', '3', '3', '2025-03-23 09:00:00'),
('h13-5', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Equipamento reparado', '3', '6', '2025-03-25 16:15:00'),
('h13-6', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l', 'Pagamento confirmado', '6', '7', '2025-03-26 11:30:00');

INSERT INTO Receita (id, valor, data_hora, fk_solicitacao) VALUES
('rec1', 200.00, '2025-03-26 11:30:00', 'jm3o9n0k-5l4m-6n1i-n8o7-3m5h6i7j8k9l');

-- Solicitação 14: Com histórico extenso
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-04-01 10:45:00',
    'Impressora Brother',
    '8',
    'Impressora',
    'Problema de alimentação de papel',
    150.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h14-1', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Solicitação criada', NULL, '1', '2025-04-01 10:45:00'),
('h14-2', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Orçamento de R$ 180.00 registrado', '1', '2', '2025-04-02 14:00:00'),
('h14-3', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Orçamento rejeitado. Motivo: Preço alto', '2', '4', '2025-04-03 11:15:00'),
('h14-4', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Novo orçamento de R$ 150.00 registrado', '4', '2', '2025-04-04 16:30:00'),
('h14-5', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Orçamento aprovado pelo cliente', '2', '3', '2025-04-05 09:45:00'),
('h14-6', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Solicitação capturada pelo funcionário d2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '3', '3', '2025-04-06 10:00:00'),
('h14-7', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Solicitação redirecionada para especialista em impressoras', '3', '5', '2025-04-07 14:15:00'),
('h14-8', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Equipamento reparado', '5', '6', '2025-04-09 11:30:00'),
('h14-9', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Pagamento confirmado', '6', '7', '2025-04-10 16:45:00'),
('h14-10', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Equipamento entregue ao cliente', '7', '9', '2025-04-11 09:00:00'),
('h14-11', 'kn4p0o1l-6m5n-7o2j-o9p8-4n6i7j8k9l0m', 'Solicitação finalizada', '9', '8', '2025-04-12 10:15:00');

INSERT INTO RedirecionamentoFuncionario (fk_historico_alteracao, fk_funcionario_origem, fk_funcionario_destino) VALUES
('h14-7', 'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '4e928627-decb-4d0f-9a6e-c2f9763a7918');

-- Solicitação 15: Com múltiplos redirecionamentos
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-04-05 13:00:00',
    'Notebook Macbook Pro',
    '5',
    'Notebook',
    'Problema na tela Retina',
    800.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h15-1', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Solicitação criada', NULL, '1', '2025-04-05 13:00:00'),
('h15-2', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Orçamento de R$ 800.00 registrado', '1', '2', '2025-04-06 09:15:00'),
('h15-3', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Orçamento aprovado pelo cliente', '2', '3', '2025-04-07 14:30:00'),
('h15-4', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Solicitação capturada pelo funcionário 4e928627-decb-4d0f-9a6e-c2f9763a7918', '3', '3', '2025-04-08 11:45:00'),
('h15-5', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Solicitação redirecionada para especialista em Apple', '3', '5', '2025-04-09 16:00:00'),
('h15-6', 'lo5q1p2m-7n6o-8p3k-p0q9-5o7j8k9l0m1n', 'Solicitação redirecionada novamente para técnico sênior', '5', '5', '2025-04-10 10:15:00');

INSERT INTO RedirecionamentoFuncionario (fk_historico_alteracao, fk_funcionario_origem, fk_funcionario_destino) VALUES
('h15-5', '4e928627-decb-4d0f-9a6e-c2f9763a7918', 'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'),
('h15-6', 'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0', '4e928627-decb-4d0f-9a6e-c2f9763a7918');

-- Solicitação 16: Com orçamento alterado
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-04-10 15:30:00',
    'Desktop Customizado',
    '3',
    'Desktop',
    'Problema na placa-mãe',
    450.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h16-1', 'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o', 'Solicitação criada', NULL, '1', '2025-04-10 15:30:00'),
('h16-2', 'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o', 'Orçamento de R$ 550.00 registrado', '1', '2', '2025-04-11 11:45:00'),
('h16-3', 'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o', 'Orçamento rejeitado. Motivo: Preço alto', '2', '4', '2025-04-12 17:00:00'),
('h16-4', 'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o', 'Novo orçamento de R$ 450.00 registrado', '4', '2', '2025-04-13 10:15:00'),
('h16-5', 'mp6r2q3n-8o7p-9q4l-q1r0-6p8k9l0m1n2o', 'Orçamento aprovado pelo cliente', '2', '3', '2025-04-14 14:30:00');

-- Solicitação 17: Com defeito complexo
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-04-15 09:45:00',
    'Notebook Gamer',
    '6',
    'Notebook',
    'Superaquecimento e desligamento automático',
    300.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h17-1', 'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p', 'Solicitação criada', NULL, '1', '2025-04-15 09:45:00'),
('h17-2', 'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p', 'Orçamento de R$ 300.00 registrado', '1', '2', '2025-04-16 15:00:00'),
('h17-3', 'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p', 'Orçamento aprovado pelo cliente', '2', '3', '2025-04-17 11:15:00'),
('h17-4', 'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p', 'Solicitação capturada pelo funcionário', '3', '3', '2025-04-18 16:30:00'),
('h17-5', 'nq7s3r4o-9p8q-0r5m-r2s1-7q9l0m1n2o3p', 'Reparo em andamento', '3', '6', '2025-04-20 10:45:00');

-- Solicitação 18: Com entrega rápida
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-04-20 11:00:00',
    'Mouse Microsoft',
    '8',
    'Mouse',
    'Sensor não funciona',
    50.00,
    '4e928627-decb-4d0f-9a6e-c2f9763a7918'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h18-1', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Solicitação criada', NULL, '1', '2025-04-20 11:00:00'),
('h18-2', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Orçamento de R$ 50.00 registrado', '1', '2', '2025-04-20 14:15:00'),
('h18-3', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Orçamento aprovado pelo cliente', '2', '3', '2025-04-20 16:30:00'),
('h18-4', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Solicitação capturada pelo funcionário', '3', '3', '2025-04-21 09:45:00'),
('h18-5', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Equipamento reparado', '3', '6', '2025-04-21 11:00:00'),
('h18-6', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Pagamento confirmado', '6', '7', '2025-04-21 14:15:00'),
('h18-7', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Equipamento entregue ao cliente', '7', '9', '2025-04-21 16:30:00'),
('h18-8', 'or8t4s5p-0q9r-1s6n-s3t2-8r0m1n2o3p4q', 'Solicitação finalizada', '9', '8', '2025-04-22 09:00:00');

-- Solicitação 19: Com múltiplas rejeições
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento
) VALUES (
    'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r',
    '297d6c7f-de5a-487f-915a-2562790185f8',
    '2025-04-25 14:30:00',
    'Teclado Logitech',
    '4',
    'Teclado',
    'Teclas não respondem',
    120.00
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h19-1', 'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r', 'Solicitação criada', NULL, '1', '2025-04-25 14:30:00'),
('h19-2', 'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r', 'Orçamento de R$ 150.00 registrado', '1', '2', '2025-04-26 10:45:00'),
('h19-3', 'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r', 'Orçamento rejeitado. Motivo: Preço alto', '2', '4', '2025-04-27 17:00:00'),
('h19-4', 'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r', 'Novo orçamento de R$ 120.00 registrado', '4', '2', '2025-04-28 11:15:00'),
('h19-5', 'ps9u5t6q-1r0s-2t7o-t4u3-9s1n2o3p4q5r', 'Orçamento rejeitado. Motivo: Decidiu comprar novo', '2', '4', '2025-04-29 14:30:00');

-- Solicitação 20: Com problema simples
INSERT INTO SolicitacaoManutencao (
    id, fk_cliente, data_hora, descricao_equipamento,
    fk_estado, fk_categoria_equipamento, descricao_defeito,
    orcamento, fk_funcionario
) VALUES (
    'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s',
    'f5525bdf-ac24-4b95-af97-58f0b7db07b7',
    '2025-05-01 10:00:00',
    'Mouse sem fio Logitech',
    '8',
    'Mouse',
    'Problema no scroll',
    40.00,
    'd2451fda-b7e6-4a44-b5be-fe7493e9a9e0'
);

INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora) VALUES
('h20-1', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Solicitação criada', NULL, '1', '2025-05-01 10:00:00'),
('h20-2', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Orçamento de R$ 40.00 registrado', '1', '2', '2025-05-01 14:15:00'),
('h20-3', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Orçamento aprovado pelo cliente', '2', '3', '2025-05-02 09:30:00'),
('h20-4', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Solicitação capturada pelo funcionário', '3', '3', '2025-05-02 11:45:00'),
('h20-5', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Equipamento reparado', '3', '6', '2025-05-02 16:00:00'),
('h20-6', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Pagamento confirmado', '6', '7', '2025-05-03 10:15:00'),
('h20-7', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Equipamento entregue ao cliente', '7', '9', '2025-05-03 14:30:00'),
('h20-8', 'qt0v6u7r-2s1t-3u8p-u5v4-0t2o3p4q5r6s', 'Solicitação finalizada', '9', '8', '2025-05-04 09:00:00');