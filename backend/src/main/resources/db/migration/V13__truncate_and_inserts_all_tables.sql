BEGIN;

TRUNCATE TABLE Receita CASCADE;
TRUNCATE TABLE HistoricoAlteracao CASCADE;
TRUNCATE TABLE SolicitacaoManutencao CASCADE;
TRUNCATE TABLE Funcionarios CASCADE;
TRUNCATE TABLE Clientes CASCADE;
TRUNCATE TABLE Usuarios CASCADE;
TRUNCATE TABLE Endereco CASCADE;
TRUNCATE TABLE CategoriaEquipamento CASCADE;
TRUNCATE TABLE EstadoSolicitacao CASCADE;

INSERT INTO EstadoSolicitacao (id, descricao) VALUES
('1', 'ABERTA'),
('2', 'ORÇADO'),
('3', 'APROVADA'),
('4', 'REJEITADA'),
('5', 'REDIRECIONADA'),
('6', 'ARRUMADA'),
('7', 'PAGA'),
('8', 'FINALIZADA'),
('9', 'ENTREGADA');

INSERT INTO CategoriaEquipamento (id, descricao, ativa) VALUES
('1', 'Notebook', true),
('2', 'Desktop', true),
('3', 'Impressora', true),
('4', 'Mouse', true),
('5', 'Teclado', true);

INSERT INTO Endereco (id, cep, logradouro, complemento, bairro, localidade, uf, numero) VALUES
('1', '01001000', 'Praça da Sé', 'lado ímpar', 'Sé', 'São Paulo', 'SP', '100'),
('2', '20040002', 'Rua Primeiro de Março', 'Edifício A', 'Centro', 'Rio de Janeiro', 'RJ', '45'),
('3', '30120010', 'Avenida Afonso Pena', 'Sala 302', 'Centro', 'Belo Horizonte', 'MG', '1500'),
('4', '40010020', 'Rua Chile', 'Loja 5', 'Comércio', 'Salvador', 'BA', '23'),
('5', '50010020', 'Rua do Bom Jesus', 'Casa', 'Recife Antigo', 'Recife', 'PE', '123');

INSERT INTO Usuarios (id, nome, email, senha, role) VALUES
('f1', 'Maria', 'funcionario1@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'FUNCIONARIO'),
('f2', 'Mario', 'funcionario2@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'FUNCIONARIO'),
('f3', 'Mauro', 'funcionario3@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'FUNCIONARIO'),
('f4', 'Marcia', 'funcionario4@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'FUNCIONARIO');

INSERT INTO Funcionarios (id, nascimento, fk_usuario) VALUES
('func1', '1985-05-15', 'f1'),
('func2', '1990-08-22', 'f2'),
('func3', '1992-03-10', 'f3'),
('func4', '1988-11-30', 'f4');

INSERT INTO Usuarios (id, nome, email, senha, role) VALUES
('c1', 'João', 'cliente1@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'CLIENTE'),
('c2', 'José', 'cliente2@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'CLIENTE'),
('c3', 'Joana', 'cliente3@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'CLIENTE'),
('c4', 'Joaquina', 'cliente4@email.com', '$2a$12$yLbB1z601xIsbkJWQr8Q..A8R4Kl4dQp7LjWaARDha1Mu1RDt.fsm', 'CLIENTE');

INSERT INTO Clientes (id, cpf, telefone, fk_endereco, fk_usuario) VALUES
('cli1', '11122233344', '(11) 9999-8888', '1', 'c1'),
('cli2', '22233344455', '(21) 8888-7777', '2', 'c2'),
('cli3', '33344455566', '(31) 7777-6666', '3', 'c3'),
('cli4', '44455566677', '(71) 6666-5555', '4', 'c4');

-- Função auxiliar para gerar datas aleatórias nos últimos 3 meses
CREATE OR REPLACE FUNCTION random_date() RETURNS TIMESTAMP AS $$
BEGIN
    RETURN NOW() - (random() * INTERVAL '90 days');
END;
$$ LANGUAGE plpgsql;

-- Função auxiliar para gerar descrições de defeito
CREATE OR REPLACE FUNCTION random_defeito() RETURNS TEXT AS $$
DECLARE
    defeitos TEXT[] := ARRAY[
        'Não liga',
        'Tela azul',
        'Superaquecimento',
        'Barulho estranho',
        'Não reconhece periféricos',
        'Teclas não funcionam',
        'Tela quebrada',
        'Bateria não carrega',
        'Lentidão excessiva',
        'Wi-Fi não conecta',
        'Impressão falhada',
        'Cartucho vazando',
        'Mouse com cursor travando',
        'Teclado com teclas grudadas',
        'Não imprime'
    ];
BEGIN
    RETURN defeitos[1 + floor(random() * array_length(defeitos, 1))];
END;
$$ LANGUAGE plpgsql;

INSERT INTO SolicitacaoManutencao (id, fk_cliente, data_hora, descricao_equipamento, fk_categoria_equipamento, descricao_defeito, fk_estado, fk_funcionario, orcamento)
VALUES
-- Solicitações ABERTAS (5)
('sol1', 'cli1', random_date(), 'Notebook Dell Inspiron', '1', random_defeito(), '1', NULL, NULL),
('sol2', 'cli2', random_date(), 'Desktop HP', '2', random_defeito(), '1', NULL, NULL),
('sol3', 'cli3', random_date(), 'Impressora Epson', '3', random_defeito(), '1', NULL, NULL),
('sol4', 'cli4', random_date(), 'Mouse Logitech', '4', random_defeito(), '1', NULL, NULL),
('sol5', 'cli1', random_date(), 'Teclado Microsoft', '5', random_defeito(), '1', NULL, NULL),

-- Solicitações ORÇADAS (5)
('sol6', 'cli2', random_date(), 'Notebook Lenovo', '1', random_defeito(), '2', 'func1', 250.00),
('sol7', 'cli3', random_date(), 'Desktop Dell', '2', random_defeito(), '2', 'func2', 350.00),
('sol8', 'cli4', random_date(), 'Impressora HP', '3', random_defeito(), '2', 'func3', 180.00),
('sol9', 'cli1', random_date(), 'Mouse Razer', '4', random_defeito(), '2', 'func4', 50.00),
('sol10', 'cli2', random_date(), 'Teclado Logitech', '5', random_defeito(), '2', 'func1', 120.00),

-- Solicitações APROVADAS (5)
('sol11', 'cli3', random_date(), 'Notebook Acer', '1', random_defeito(), '3', 'func2', 300.00),
('sol12', 'cli4', random_date(), 'Desktop Positivo', '2', random_defeito(), '3', 'func3', 400.00),
('sol13', 'cli1', random_date(), 'Impressora Brother', '3', random_defeito(), '3', 'func4', 220.00),
('sol14', 'cli2', random_date(), 'Mouse Microsoft', '4', random_defeito(), '3', 'func1', 60.00),
('sol15', 'cli3', random_date(), 'Teclado Dell', '5', random_defeito(), '3', 'func2', 90.00),

-- Solicitações REJEITADAS (3)
('sol16', 'cli4', random_date(), 'Notebook Samsung', '1', random_defeito(), '4', 'func3', 280.00),
('sol17', 'cli1', random_date(), 'Desktop Lenovo', '2', random_defeito(), '4', 'func4', 320.00),
('sol18', 'cli2', random_date(), 'Impressora Canon', '3', random_defeito(), '4', 'func1', 190.00),

-- Solicitações REDIRECIONADAS (2)
('sol19', 'cli3', random_date(), 'Mouse HyperX', '4', random_defeito(), '5', 'func2', 70.00),
('sol20', 'cli4', random_date(), 'Teclado Razer', '5', random_defeito(), '5', 'func3', 150.00),

-- Solicitações ARRUMADAS (3)
('sol21', 'cli1', random_date(), 'Notebook Asus', '1', random_defeito(), '6', 'func4', 270.00),
('sol22', 'cli2', random_date(), 'Desktop Asus', '2', random_defeito(), '6', 'func1', 380.00),
('sol23', 'cli3', random_date(), 'Impressora Samsung', '3', random_defeito(), '6', 'func2', 210.00),

-- Solicitações PAGAS (2)
('sol24', 'cli4', random_date(), 'Mouse Dell', '4', random_defeito(), '7', 'func3', 55.00),
('sol25', 'cli1', random_date(), 'Teclado HP', '5', random_defeito(), '7', 'func4', 85.00),

-- Solicitações FINALIZADAS (3)
('sol26', 'cli2', random_date(), 'Notebook Positivo', '1', random_defeito(), '8', 'func1', 230.00),
('sol27', 'cli3', random_date(), 'Desktop Positivo', '2', random_defeito(), '8', 'func2', 340.00),
('sol28', 'cli4', random_date(), 'Impressora Lexmark', '3', random_defeito(), '8', 'func3', 170.00),

-- Solicitações ENTREGADAS (2)
('sol29', 'cli1', random_date(), 'Mouse Positivo', '4', random_defeito(), '9', 'func4', 45.00),
('sol30', 'cli2', random_date(), 'Teclado Positivo', '5', random_defeito(), '9', 'func1', 75.00);

-- Função auxiliar para inserir históricos
CREATE OR REPLACE FUNCTION inserir_historicos() RETURNS void AS $$
DECLARE
    sol RECORD;
    hist RECORD;
    estados TEXT[] := ARRAY['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    desc_estados TEXT[] := ARRAY['ABERTA', 'ORÇADO', 'APROVADA', 'REJEITADA', 'REDIRECIONADA', 'ARRUMADA', 'PAGA', 'FINALIZADA', 'ENTREGADA'];
    estado_atual TEXT;
    i INTEGER;
    descricao TEXT;
    funcionario_nome TEXT;
BEGIN
    FOR sol IN SELECT * FROM SolicitacaoManutencao ORDER BY data_hora LOOP
        INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
        VALUES (
            gen_random_uuid()::TEXT,
            sol.id,
            'Solicitação criada',
            NULL,
            '1',
            sol.data_hora
        );

        estado_atual := '1';

        IF sol.fk_estado > '1' THEN
            -- Obter nome do funcionário se existir
            IF sol.fk_funcionario IS NOT NULL THEN
                SELECT u.nome INTO funcionario_nome
                FROM Funcionarios f
                JOIN Usuarios u ON f.fk_usuario = u.id
                WHERE f.id = sol.fk_funcionario;
            ELSE
                funcionario_nome := 'Sistema';
            END IF;

            INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
            VALUES (
                gen_random_uuid()::TEXT,
                sol.id,
                'Orçamento de R$ ' || sol.orcamento || ' registrado por ' || funcionario_nome,
                '1',
                '2',
                sol.data_hora + INTERVAL '1 hour'
            );
            estado_atual := '2';
        END IF;

        IF sol.fk_estado > '2' THEN
            IF sol.fk_estado = '3' THEN -- APROVADA
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Orçamento aprovado pelo cliente',
                    '2',
                    '3',
                    sol.data_hora + INTERVAL '2 hours'
                );
                estado_atual := '3';
            ELSIF sol.fk_estado = '4' THEN -- REJEITADA
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Orçamento rejeitado pelo cliente. Motivo: Valor alto',
                    '2',
                    '4',
                    sol.data_hora + INTERVAL '2 hours'
                );
                estado_atual := '4';
            END IF;
        END IF;

        IF sol.fk_estado > '4' THEN
            IF sol.fk_funcionario IS NOT NULL THEN
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Solicitação capturada pelo funcionário ' || funcionario_nome,
                    estado_atual,
                    estado_atual, -- Mantém o mesmo estado, apenas registra a captura
                    sol.data_hora + INTERVAL '3 hours'
                );
            END IF;

            IF sol.fk_estado = '5' THEN
                -- Supondo que foi redirecionado do func1 para func2
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Solicitação redirecionada de Maria para Mario',
                    '3',
                    '5',
                    sol.data_hora + INTERVAL '4 hours'
                );
                estado_atual := '5';
            END IF;

            IF sol.fk_estado >= '6' THEN
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Equipamento reparado',
                    estado_atual,
                    '6',
                    sol.data_hora + INTERVAL '1 day'
                );
                estado_atual := '6';
            END IF;

            IF sol.fk_estado >= '7' THEN
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Pagamento confirmado',
                    '6',
                    '7',
                    sol.data_hora + INTERVAL '2 days'
                );
                estado_atual := '7';

                INSERT INTO Receita (id, valor, data_hora, fk_solicitacao)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.orcamento,
                    sol.data_hora + INTERVAL '2 days',
                    sol.id
                );
            END IF;

            IF sol.fk_estado >= '8' THEN
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Solicitação finalizada',
                    '7',
                    '8',
                    sol.data_hora + INTERVAL '3 days'
                );
                estado_atual := '8';
            END IF;

            IF sol.fk_estado = '9' THEN
                INSERT INTO HistoricoAlteracao (id, fk_solicitacao, descricao, estado_anterior, estado_novo, data_hora)
                VALUES (
                    gen_random_uuid()::TEXT,
                    sol.id,
                    'Equipamento entregue ao cliente',
                    '8',
                    '9',
                    sol.data_hora + INTERVAL '4 days'
                );
                estado_atual := '9';
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT inserir_historicos();

DROP FUNCTION IF EXISTS random_date();
DROP FUNCTION IF EXISTS random_defeito();
DROP FUNCTION IF EXISTS inserir_historicos();

COMMIT;