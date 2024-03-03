import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}
  private currentStepSubject$ = new BehaviorSubject<number>(0);
  public currentStep$ = this.currentStepSubject$.asObservable();
  get currentStep(): number {
    return this.currentStepSubject$.value;
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStepSubject$.next(this.currentStep - 1);
    }
  }

  nextStep() {
    this.currentStepSubject$.next(this.currentStep + 1);
  }
}
