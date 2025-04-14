package com.example.web_II.domain.solicitacoes;


 /* Solicitação deve conter:
    Cliente (Vai vir automatico)
    Descrição do equipamento (Cliente coloca)
    Categoria do equipamento (CLiente coloca)
    Descrição do defeito (Cliente coloca)
    Data Hora (DB coloca sozinho)
    Estado ABERTA (inicial)
     */

public record AbrirSolicitacaoDTO(String idCliente, String descEquip, String categoria, String descDefeito){
}
