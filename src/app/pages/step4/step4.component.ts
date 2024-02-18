import { ShareService } from './../../service/share.service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { OrderService } from 'src/app/service/order.service';

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
                <p class=" font-extrabold text-primary">Arcade(Yearly)</p>
                <p class=" text-secondary underline hover:cursor-pointer">
                  Change
                </p>
              </div>
              <div class=" font-extrabold text-primary">$90/yr</div>
            </div>
            <div class=" flex justify-between px-2 py-3 font-extrabold">
              <span class=" text-secondary">online service</span>
              <span class=" text-primary">+$10/yr</span>
            </div>
            <div class=" flex justify-between px-2 py-3 font-extrabold">
              <span class="text-secondary">online service</span>
              <span class=" text-primary">+$10/yr</span>
            </div>
          </div>
        </div>
        <div class=" mt-4 flex justify-between px-4 py-6 pb-3 font-extrabold">
          <span class="text-secondary">Total (per month)</span>
          <span class=" text-primary-blue">$120/yr</span>
        </div>
      </div>
    </app-card>
  `,
  styles: [],
  imports: [CommonModule, CardComponent],
})
export class Step4Component implements OnInit {
  constructor(
    private shareService: ShareService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    console.log('order:', this.orderService.order);
    // console.log(this.shareService.)
  }
}
