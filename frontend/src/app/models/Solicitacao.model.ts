export interface Solicitacao {
    id: string;
    data: string;
    hora: string;
    equipamento: string;
    categoria: string;
    defeito: string;
    estado: string;
    cliente?: string;
    redirecionadoPara?: string | null;
    fk_funcionario?: string | null;
    data_hora?: string;
}