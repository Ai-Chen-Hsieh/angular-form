import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../components/nav/nav.component';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonPanelComponent } from '../../components/button-panel/button-panel.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { ShareService } from 'src/app/service/share.service.service';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { Step3Component } from '../step3/step3.component';
import { Step4Component } from '../step4/step4.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="relative flex h-full items-center">
      <div
        class=" m-auto flex h-[90%] w-4/5 max-w-[1000px] flex-col bg-[#ebf2fc] lg:h-[80%] lg:flex-row lg:justify-normal lg:bg-white"
      >
        <app-nav
          class="h-[200px] w-full lg:my-auto lg:ml-6 lg:h-[95%] lg:max-w-[300px]"
        >
          <app-stepper></app-stepper>
        </app-nav>
        <div
          class=" flex h-full w-full -translate-y-8 flex-col lg:static lg:translate-y-0"
        >
          <!-- step card -->
          <div class=" px-6" [ngSwitch]="currentStep">
            <app-step1 *ngSwitchCase="0"></app-step1>
            <app-step2 *ngSwitchCase="1"></app-step2>
            <app-step3 *ngSwitchCase="2"></app-step3>
            <app-step4 *ngSwitchCase="3"></app-step4>
          </div>
          <div class=" mx-4 mt-auto hidden h-20 bg-white lg:block">
            <app-button-panel
              (prevStep)="previousStep()"
              (nextStep)="nextStep()"
            ></app-button-panel>
          </div>
        </div>
        <div class=" h-20 bg-white py-4 lg:hidden">
          <app-button-panel
            (prevStep)="previousStep()"
            (nextStep)="nextStep()"
          ></app-button-panel>
        </div>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    CommonModule,
    FormsModule,
    NavComponent,
    CardComponent,
    InputComponent,
    ButtonPanelComponent,
    StepperComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(public shareService: ShareService) {}
  currentStep = 0;
  stepSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.shareService.currentStep$.subscribe((step) => {
      this.currentStep = step;
    });
  }

  previousStep() {
    this.shareService.previousStep();
  }
  nextStep() {
    this.shareService.nextStep();
  }

  ngOnDestroy(): void {
    this.stepSubscription?.unsubscribe();
  }
}
