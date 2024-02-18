import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPlan(): Observable<any> {
    return this.http.get('assets/data/plan.json');
  }

  getOns(): Observable<any> {
    return this.http.get('assets/data/ons.json');
  }
}
