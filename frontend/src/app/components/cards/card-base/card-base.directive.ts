import { Directive, EventEmitter, Input, Output } from "@angular/core";

@Directive()
export abstract class CardBaseComponent<T> {
  @Input() data!: T;

  @Output() editar = new EventEmitter<T>();
  @Output() excluir = new EventEmitter<T>();

  abstract getMenuItems(): MenuItem[];
}

export interface MenuItem {
  label: string;
  icon: string;
  action: () => void;
  color?: string;
}
