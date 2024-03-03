import { Observable, Subject, interval, takeUntil } from 'rxjs';
import { ShareService } from './../../service/share.service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { OrderService } from 'src/app/service/order.service';
import { Ons, Order, Plan } from 'src/app/model/info';

@Component({
  selector: 'app-step4',
  standalone: true,
  template: `
    <app-card
      [title]="'Finishing up'"
      [description]="'Double check everything looks OK before confirming'"
    >
      <div class="flex flex-col">
        <div class="rounded-md bg-[#f8f9fe] ">
          <div class=" px-4 py-6 pb-3">
            <div
              class=" flex border-b-[1px] border-solid border-secondary pb-4"
            >
              <div class=" mr-auto font-extrabold">
                <p class=" font-extrabold text-primary">
                  {{ selectedPlan.name }}
                </p>
              </div>
              <div class=" font-extrabold text-primary">
                $ {{ selectedPlan.price }}/ {{ selectType == 0 ? 'mo' : 'yr' }}
              </div>
            </div>
            <div
              class=" flex justify-between px-2 py-3 font-extrabold"
              *ngFor="let item of ons"
            >
              <span class=" text-secondary">{{ item.name }}</span>
              <span class=" text-primary"
                >+$ {{ selectType == 0 ? item.monthPrice : item.yearPrice }} /
                {{ selectType == 0 ? 'mo' : 'yr' }}</span
              >
            </div>
          </div>
        </div>
        <div class=" mt-4 flex justify-between px-4 py-6 pb-3 font-extrabold">
          <span class="text-secondary"
            >Total (per {{ selectType == 0 ? 'month' : 'year' }})</span
          >
          <span class=" text-primary-blue"
            >$ {{ totalPrice }}/ {{ selectType == 0 ? 'mo' : 'yr' }}</span
          >
        </div>
      </div>
    </app-card>
  `,
  styles: [],
  imports: [CommonModule, CardComponent],
})
export class Step4Component implements OnInit, OnDestroy {
  constructor(
    private shareService: ShareService,
    private orderService: OrderService,
  ) {}
  ons: Ons[] = [];
  selectedPlan: Plan = {
    id: 0,
    name: '',
    price: 0,
  };
  selectType: number = 0;
  order$ = this.orderService.order$;
  totalPrice = 0;
  private destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.order$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.ons = [...res.ons];
      this.selectType = res.selectedPlan;
      this.selectedPlan = { ...res.plan };
    });
    this.totalPrice = this.calculateTotal(this.totalPrice);
  }

  calculateTotal(initialValue: number) {
    let total = initialValue;
    total += this.selectedPlan.price;
    if (this.selectType == 0) {
      this.ons.forEach((item) => {
        total += item.monthPrice;
      });
    } else {
      this.ons.forEach((item) => {
        total += item.yearPrice;
      });
    }
    return total;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
