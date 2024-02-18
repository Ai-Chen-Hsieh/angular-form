import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from 'src/app/service/share.service.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class=" stepper m-auto flex max-w-[300px] justify-center lg:flex-col">
      <li
        class="step-container flex items-center"
        *ngFor="let item of stepTitle; let i = index"
      >
        <div
          class="step lg:mr-4"
          [ngClass]="{ 'step-active': i == currentStep }"
        >
          {{ i + 1 }}
        </div>
        <div>
          <div class=" hidden font-bold text-slate-400 lg:block">
            STEP {{ i + 1 }}
          </div>
          <div class="hidden font-bold text-slate-200 lg:block">{{ item }}</div>
        </div>
      </li>
    </ul>
  `,

  styles: [
    `
      .step-container:not(:last-child) {
        margin-right: clamp(25px, 3vw, 30px);
        @media (min-width: 1024px) {
          margin-right: initial;
        }
      }
    `,
  ],
})
export class StepperComponent implements OnInit {
  constructor(private shareService: ShareService) {}
  stepTitle = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];
  currentStep: number | undefined;

  ngOnInit(): void {
    this.shareService.currentStepSubject.subscribe((step) => {
      this.currentStep = step;
    });
  }
}
