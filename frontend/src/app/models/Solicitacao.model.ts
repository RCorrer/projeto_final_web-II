export interface Solicitacao {
    id: number;
    data: string;
    hora: string;
    equipamento: string;
    categoria: string;
    defeito: string;
    estado: string;
    cliente?: string;
    redirecionadoPara?: string | null;
}