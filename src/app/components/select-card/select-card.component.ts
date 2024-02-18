import { OrderService } from 'src/app/service/order.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { planEnumType } from 'src/app/type/planType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class=" flex h-full w-full items-center rounded-lg border-2 border-solid px-2 py-4 hover:cursor-pointer hover:border-select-card-border-active hover:bg-[#f8f9fe] md:flex-col md:items-start"
      [ngClass]="{
        'border-select-card-border-active': selectItemId == card.id,
        'bg-[#f8f9fe]': selectItemId == card.id
      }"
    >
      <img [src]="card.img" alt="icon" class=" mr-4 md:mb-auto md:mr-6" />
      <div>
        <h2 class=" text-xl font-black text-card-title-color">
          {{ card.name }}
        </h2>
        <p class=" font-black text-card-description">
          $
          {{
            plan == planEnum.MONTH
              ? card.monthPrice + ' / month'
              : card.yearPrice + ' / year'
          }}
        </p>
        <p
          class="font-bold text-card-title-color"
          [ngClass]="{ invisible: plan == planEnum.MONTH }"
        >
          2 months free
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class SelectCardComponent {
  public planEnum = planEnumType;
  @Input() card: any;
  @Input() plan: number | undefined;
  @Input() selectItemId: number = 0;

  orderSubscription: Subscription | undefined;

  constructor(private orderService: OrderService) {}
}
