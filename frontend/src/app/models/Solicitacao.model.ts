export interface Solicitacao {
    id: number;
    data: string;
    hora: string;
    equipamento: string;
    estado: string;
    cliente?: string;
    redirecionadoPara?: string | null;
}