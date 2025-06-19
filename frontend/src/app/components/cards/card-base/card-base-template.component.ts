import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../../material-imports';
import { MenuItem } from './card-base.directive';

@Component({
  standalone: true,
  selector: 'app-card-base-template',
  imports: [CommonModule, ...materialImports],

  template: `
    <div class="card-base">
      <ng-content></ng-content>

      <button mat-icon-button [matMenuTriggerFor]="menu" class="card-menu-button">
        <mat-icon>more_vert</mat-icon>
      </button>
    </div>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let item of menuItems"
        (click)="item.action()"
      >
        <mat-icon [style.color]="item.color">{{ item.icon }}</mat-icon>
        <span>{{ item.label }}</span>
      </button>
    </mat-menu>
  `,
  
  styles: [`
    .card-base {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .card-menu-button {
      flex-shrink: 0;
    }
  `]
})
export class CardBaseTemplateComponent {
  @Input() menuItems: MenuItem[] = [];
}