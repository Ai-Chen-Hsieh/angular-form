import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private http: HttpClient) {}
  currentStep = 0;
  currentStepSubject = new BehaviorSubject<number>(0);

  previousStep() {
    if (this.currentStep == 0) {
      return;
    } else {
      this.currentStep--;
      this.currentStepSubject.next(this.currentStep);
    }
  }

  nextStep() {
    if (this.currentStep == 3) {
      return;
    } else {
      this.currentStep++;
      this.currentStepSubject.next(this.currentStep);
    }
  }

  // getData(): Observable<any> {
  //   console.log('get data');
  //   return this.http.get(
  //     'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
  //   );
  // }
}
