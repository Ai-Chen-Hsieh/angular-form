import { OrderService } from './../../service/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { ButtonPanelComponent } from '../../components/button-panel/button-panel.component';
import { CardComponent } from '../../components/card/card.component';
import { Info } from 'src/app/model/info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  template: `
    <app-card
      [title]="'Personal info'"
      [description]="
        'Please provide your name, email address, and phone number'
      "
    >
      <app-input
        [label]="'Name'"
        [placeholder]="'e.g. Stephen King'"
        [value]="_info.name"
        (inputEvent)="handleInfo($event, 'name')"
      ></app-input>
      <app-input
        [label]="'Email Address'"
        [placeholder]="'e.g. stephenking@lorem.com'"
        [value]="_info.email"
        (inputEvent)="handleInfo($event, 'email')"
      ></app-input>
      <app-input
        [label]="'Phone Number'"
        [placeholder]="'e.g. +1 234 567 890'"
        [value]="_info.phone"
        (inputEvent)="handleInfo($event, 'phone')"
      ></app-input>
    </app-card>
  `,
  styles: [],
  imports: [CommonModule, InputComponent, ButtonPanelComponent, CardComponent],
})
export class Step1Component implements OnInit, OnDestroy {
  _info: Info = {
    name: '',
    email: '',
    phone: '',
  };
  orderSubscription: Subscription | undefined;

  constructor(public orderService: OrderService) {}

  ngOnInit(): void {
    this.orderSubscription = this.orderService.orderSubject.subscribe(
      (order) => {
        this._info = order.info;
      },
    );
  }

  handleInfo(e: Event, infoType: string) {
    this.orderService.updateInfo(e, infoType);
  }

  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
  }
}
