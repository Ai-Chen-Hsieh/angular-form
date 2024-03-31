import { ShareService } from 'src/app/service/share.service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-final',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div class="flex flex-col items-center justify-center">
        <div class=" mb-4 w-12">
          <img
            src="../../../assets/icons/icon-thank-you.svg"
            class="icon"
            alt=""
          />
        </div>
        <h1 class=" text-2xl font-black text-card-title-color ">Thank you!</h1>
        <p class=" py-4 font-bold text-card-description">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at service@service.com
        </p>
      </div>
    </app-card>
  `,
  styles: [],
})
export class FinalComponent implements OnInit {
  constructor(private shareService: ShareService) {}

  ngOnInit(): void {}
}
