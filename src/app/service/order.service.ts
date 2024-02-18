import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, lastValueFrom } from 'rxjs';
import { Order, Plan, Ons } from '../model/info';
import { planEnumType } from '../type/planType';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order = {
    info: {
      name: '',
      email: '',
      phone: '',
    },
    plan: {
      id: 0,
      name: 'Arcade',
      price: 9,
    },
    ons: [],
    selectedPlan: planEnumType.MONTH,
    totalPrice: 0,
  };

  public orderSubject = new BehaviorSubject(this.order);
  constructor(private dataService: DataService) {}

  updateInfo(info: any, infoType: string) {
    let value = info.target.value;
    this.order.info = { ...this.order.info, [infoType]: value };
    this.orderSubject.next(this.order);
  }

  handleSelectPlan(plan: Plan) {
    this.order.plan = { ...plan };
    this.orderSubject.next({ ...this.order });
    console.log('plan', plan);
  }

  async handleSelectType() {
    try {
      this.order.selectedPlan =
        this.order.selectedPlan === planEnumType.MONTH
          ? planEnumType.YEAR
          : planEnumType.MONTH;

      // 找到對應的價格
      const getAllPlan = await lastValueFrom(this.dataService.getPlan());
      const findPlan = getAllPlan.find(
        (item: Plan) => item.id === this.order.plan.id,
      );

      this.order.plan = {
        ...this.order.plan,
        price:
          this.order.selectedPlan === planEnumType.MONTH
            ? findPlan?.monthPrice
            : findPlan?.yearPrice,
      };
      this.orderSubject.next({ ...this.order });
    } catch (error) {
      console.log('error', error);
    }
  }

  handleOnsSelect(ons: Ons) {
    const hadSelectIndex = this.order.ons.findIndex(
      (item) => item.id === ons.id,
    );
    if (hadSelectIndex >= 0) {
      this.order.ons.splice(hadSelectIndex, 1);
    } else {
      this.order.ons.push(ons);
    }
    this.orderSubject.next({ ...this.order });
  }

  handleFinalOrder() {}
}
