import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cpf",
})
export class CpfPipe implements PipeTransform {
  transform(value: string | number): string {
    let valorFormatado = String(value);
    valorFormatado = valorFormatado.replace(/\D/g, "");

    if (valorFormatado.length !== 11) {
      return String(value);
    }

    // 111.111.111-11)
    return valorFormatado.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  }
}
