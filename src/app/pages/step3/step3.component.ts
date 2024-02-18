import { CheckCardComponent } from './../../components/check-card/check-card.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { planEnumType } from 'src/app/type/planType';
import { DataService } from 'src/app/service/data.service';
import { Subject, Subscription, concatMap, map, takeUntil } from 'rxjs';
import { OnsItem } from 'src/app/model/onsItem';
import { OrderService } from 'src/app/service/order.service';
import { Ons, Order } from 'src/app/model/info';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, CardComponent, CheckCardComponent],
  template: `
    <app-card
      [title]="'Pick add-ons'"
      [description]="'Add-ons help enhance your gaming experience'"
    >
      <div class="flex flex-col">
        <div
          class=" mb-4"
          *ngFor="let item of onsItems; let i = index"
          (click)="handleSelectCard(item)"
        >
          <app-check-card
            [card]="item"
            [plan]="selectedPlan"
            [orderOns]="orderOns"
          ></app-check-card>
        </div>
      </div>
    </app-card>
  `,
  styles: [],
})
export class Step3Component implements OnInit, OnDestroy {
  onsItems: OnsItem[] | undefined;
  selectedPlan: number = 0;
  orderOns: Ons[] | undefined;
  order: Order | undefined;
  onsSubscription: Subscription | undefined;
  orderSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.dataService
      .getOns()
      .pipe(
        map((res) => {
          this.onsItems = res;
        }),
        concatMap(() =>
          this.orderService.orderSubject.pipe(takeUntil(this.destroy$)),
        ),
      )
      .subscribe((order) => {
        this.selectedPlan = order.selectedPlan;
        this.orderOns = order.ons;
      });
  }

  handleSelectCard(onsItem: OnsItem) {
    const ons = {
      id: onsItem.id,
      name: onsItem.title,
      price:
        this.selectedPlan == planEnumType.MONTH
          ? onsItem.monthPrice
          : onsItem.yearPrice,
    };
    this.orderService.handleOnsSelect(ons);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
