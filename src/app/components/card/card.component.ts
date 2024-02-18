import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="h-full w-full rounded-lg bg-white px-4 py-6 md:flex md:flex-col md:px-12 md:py-10"
    >
      <h1 class=" text-2xl font-black text-card-title-color ">
        {{ title }}
      </h1>
      <p class=" py-4 font-bold text-card-description">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class CardComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
}
