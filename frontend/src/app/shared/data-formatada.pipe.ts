import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormatada'
})
export class DataFormatadaPipe implements PipeTransform {

  transform(data: string | Date | null | undefined): string {
    if (!data) return 'Data inválida';

    let dateObj: Date;

    if (data instanceof Date) {
      dateObj = data;
    } else if (typeof data === 'string') {
      // tenta criar a data direto do string
      dateObj = new Date(data);

      if (isNaN(dateObj.getTime())) {
        // Tenta separar formato ISO "yyyy-mm-dd"
        const partes = data.split('-');
        if (partes.length === 3) {
          const [ano, mes, dia] = partes;
          dateObj = new Date(+ano, +mes - 1, +dia);
        }
      }
    } else {
      return 'Data inválida';
    }

    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }

    const dia = dateObj.getDate().toString().padStart(2, '0');
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dateObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
}