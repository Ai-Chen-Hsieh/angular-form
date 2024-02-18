import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { SelectCardComponent } from '../../components/select-card/select-card.component';
import { planEnumType } from 'src/app/type/planType';
import { DataService } from 'src/app/service/data.service';
import { Item } from 'src/app/model/Item';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/service/order.service';
import { Plan } from 'src/app/model/info';

@Component({
  selector: 'app-step2',
  standalone: true,
  template: `
    <app-card
      [title]="'Select your plan'"
      [description]="'You have option of monthly or yearly billing'"
    >
      <div class="md:grid md:grid-flow-col md:gap-4">
        <div
          class=" mb-4 md:min-h-[200px]"
          *ngFor="let item of planItem"
          (click)="handelSelectCard(item)"
        >
          <app-select-card
            [card]="item"
            [plan]="selectedPlan"
            [selectItemId]="selectItemId"
          ></app-select-card>
        </div>
      </div>

      <div
        class=" mt-6 flex items-center justify-center gap-6 bg-[#f8f8ff] px-4 py-2"
      >
        <p
          class="font-bold text-[#a3a3ad]"
          [ngClass]="{ 'text-primary': selectedPlan == planEnum.MONTH }"
        >
          Monthly
        </p>
        <div
          class=" mt-2 flex h-6 w-10 rounded-full bg-primary px-1 hover:cursor-pointer"
          (click)="handleSelectPlan()"
        >
          <span
            class=" my-1 inline-block h-4 w-4 rounded-full bg-white transition-all"
            [ngClass]="{
              'translate-x-full ': selectedPlan == planEnum.YEAR
            }"
          ></span>
        </div>
        <p
          class=" font-bold text-[#a3a3ad]"
          [ngClass]="{ 'text-primary': selectedPlan == planEnum.YEAR }"
        >
          Yearly
        </p>
      </div>
    </app-card>
  `,

  styles: [],
  imports: [CommonModule, CardComponent, SelectCardComponent],
})
export class Step2Component implements OnInit, OnDestroy {
  planEnum = planEnumType;
  selectedPlan: number = 0;
  selectItemId: number = 0;
  _plan: Plan = {
    id: 0,
    name: '',
    price: 0,
  };
  planItem: Item[] | undefined;
  planSubscription: Subscription | undefined;
  orderSubscription: Subscription | undefined;
  constructor(
    private data: DataService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.getPlan();
    this.getOrder();
  }

  getPlan() {
    this.planSubscription = this.data.getPlan().subscribe((res) => {
      this.planItem = res;
    });
  }

  getOrder() {
    this.orderSubscription = this.orderService.orderSubject.subscribe(
      (order) => {
        this.selectItemId = order.plan.id;
        this._plan = order.plan;
        this.selectedPlan = order.selectedPlan;
      },
    );
  }

  handleSelectPlan() {
    this.orderService.handleSelectType();
  }

  handelSelectCard(item: Item) {
    let selectedPlan: Plan = {
      id: item.id,
      name: item.name,
      price:
        this.selectedPlan == planEnumType.MONTH
          ? item.monthPrice
          : item.yearPrice,
    };
    this.orderService.handleSelectPlan(selectedPlan);
  }

  ngOnDestroy(): void {
    this.planSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }
}
