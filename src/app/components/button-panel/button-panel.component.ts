import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from 'src/app/service/share.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class=" flex h-full items-center justify-between px-4">
      <button
        [ngClass]="{ invisible: currentStep == 0 }"
        class=" rounded-md px-5 py-3 font-bold text-btn-secondary hover:bg-slate-400/50 hover:text-slate-900"
        (click)="handlePrevStep()"
      >
        Go Back
      </button>
      <button
        class="rounded-md bg-btn-primary px-5 py-3 font-extrabold text-white hover:bg-slate-400/50 hover:text-btn-primary"
        (click)="handleNextStep()"
      >
        {{ currentStep == 3 ? 'Confirm' : 'Next Step' }}
      </button>
    </div>
  `,
  styles: [],
})
export class ButtonPanelComponent implements OnInit, OnDestroy {
  constructor(private shareService: ShareService) {}

  currentStep: any;
  stepSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.stepSubscription = this.shareService.currentStep$.subscribe((step) => {
      this.currentStep = step;
    });
  }

  handlePrevStep() {
    this.shareService.previousStep();
  }

  handleNextStep() {
    this.shareService.nextStep();
  }

  ngOnDestroy(): void {
    this.stepSubscription?.unsubscribe();
  }
}
