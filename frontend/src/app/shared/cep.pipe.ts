import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cep",
})
export class CepPipe implements PipeTransform {
  transform(value: string | number): string {
    let valorFormatado = String(value);
    valorFormatado = valorFormatado.replace(/\D/g, "");

    if (valorFormatado.length !== 8) {
      return String(value);
    }

    // 11111-111
    return valorFormatado.replace(/(\d{5})(\d{3})/, "$1-$2");
  }
}
