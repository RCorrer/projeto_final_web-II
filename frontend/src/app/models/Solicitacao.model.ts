export interface Solicitacao {
    id: string;
    data: string;
    hora: string;
    equipamento: string;
    categoria: string;
    defeito: string;
    estado: string;
    cliente?: string;
    idCliente?: string;
    redirecionadoPara?: string | null;
    orcamento?: number;
    fk_funcionario?: string | null;
    data_hora?: string;    
}