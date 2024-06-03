import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-row text-center animated fadeIn m-5">
    <div class="text-sky-400/100">
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
  </div>`,
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent { }
