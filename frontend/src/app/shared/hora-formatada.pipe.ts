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