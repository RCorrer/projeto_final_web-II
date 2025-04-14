import { Directive, EventEmitter, Input, Output } from "@angular/core";

/* indica que esta classe é uma diretiva base, ou seja, não pode
ser utilizada diretamente como componente HTML, mas pode ser extendida
por outros componentes.
Não possui estrutura, template, estilos. */
@Directive()
export abstract class CardBaseComponent<T> {
  // @Input() data!: Funcionario | Equipamento | Solicitacao;
  @Input() data!: T;

  // Eventos para serem emitidos quando o usuário clicar nos botões
  @Output() editar = new EventEmitter<T>();
  @Output() excluir = new EventEmitter<T>();

  // será implementado nas classes filhas
  abstract getMenuItems(): MenuItem[];
}

export interface MenuItem {
  label: string; // Texto a ser exibido no item do menu
  icon: string; // Nome do ícone a ser exibido (usando Material Icons)
  action: () => void; // Função a ser chamada quando o item for clicado
  color?: string; // Cor do ícone (opcional)
}
