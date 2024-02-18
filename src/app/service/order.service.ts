import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, Plan, Ons } from '../model/info';
import { planEnumType } from '../type/planType';

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
  constructor() {}

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

  handleSelectType() {
    this.order.selectedPlan =
      this.order.selectedPlan === planEnumType.MONTH
        ? planEnumType.YEAR
        : planEnumType.MONTH;
    this.orderSubject.next({ ...this.order });

    console.log('select type', this.order);
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
