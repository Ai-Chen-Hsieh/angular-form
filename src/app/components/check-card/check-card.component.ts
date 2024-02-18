import { planEnumType } from './../../type/planType';
import { Component, DoCheck, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      class=" flex items-center rounded-lg border-2 border-solid border-select-card-border px-3 py-4 hover:cursor-pointer hover:border-select-card-border-active hover:bg-[#f8f9fe]"
    >
      <span
        [ngClass]="{
          'bg-[#f8f9fe]': !isSelected,
          'bg-blue-600': isSelected
        }"
        class=" mr-8 flex h-5 w-5 items-center justify-center rounded-md border-2 border-solid border-slate-500 p-3"
      >
        <i class="fa-solid fa-check text-white"></i>
      </span>
      <div class=" mr-auto font-semibold">
        <span class=" text-lg text-card-title-color">{{ card.title }}</span>
        <p class=" text-card-description">{{ card.description }}</p>
      </div>
      <span class="font-bold text-[#8281bd]">
        +$
        {{
          plan == planEnum.MONTH
            ? card.monthPrice + '/mo'
            : card.yearPrice + '/yr'
        }}
      </span>
    </label>
  `,
  styles: [],
})
export class CheckCardComponent implements DoCheck {
  public planEnum = planEnumType;
  @Input() card: any;
  @Input() plan: number | undefined;
  @Input() orderOns: any;

  isSelected: boolean = false;

  ngDoCheck() {
    if (this.orderOns) {
      let hadSelect = this.orderOns.filter(
        (item: any) => item.id == this.card.id,
      );
      if (hadSelect.length > 0) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    }
  }
}
