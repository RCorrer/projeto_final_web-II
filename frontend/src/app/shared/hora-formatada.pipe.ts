import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaFormatada'
})
export class HoraFormatadaPipe implements PipeTransform {
  transform(hora: string): string {
    if (!hora) return 'Hora inválida';

    // Expressão regular para encontrar padrão HH:mm ou HH:mm:ss
    const match = hora.match(/(\d{2}):(\d{2})/);

    if (match) {
      return `${match[1]}:${match[2]}`; // HH:mm
    }

    return 'Hora inválida';
  }
}
  
/* formatação de hora antiga, do "card-solicitacao"

    formatarHora(data: string): string {
    if (!data) return 'Hora inválida';
    
    try {
      const dateObj = new Date(data);
      
      if (isNaN(dateObj.getTime())) {
        return 'Hora inválida';
      }
      
      const horas = dateObj.getHours().toString().padStart(2, '0');
      const minutos = dateObj.getMinutes().toString().padStart(2, '0');
      
      return `${horas}:${minutos}`;
    } catch (error) {
      console.error('Erro ao formatar hora:', error);
      return 'Hora inválida';
    }
  }
*/