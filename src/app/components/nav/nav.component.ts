import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, StepperComponent],
  template: `
    <nav class="nav">
      <ng-content></ng-content>
    </nav>
  `,
})
export class NavComponent {}
