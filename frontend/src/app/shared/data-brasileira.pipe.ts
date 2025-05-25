import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBrasileira'
})

export class DataBrasileiraPipe implements PipeTransform {
  transform(dataISO: string): string {
      if (!dataISO) return '';

      const [ano, mes, dia] = dataISO.split('-');
      return `${dia}/${mes}/${ano}`;
  }
}