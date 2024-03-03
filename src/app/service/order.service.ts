import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Order, Plan, Ons } from '../model/info';
import { planEnumType } from '../type/planType';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  initialOrder: Order = {
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

  private orderSubject$ = new BehaviorSubject(this.initialOrder);
  public order$: Observable<Order> = this.orderSubject$.asObservable();
  constructor(private dataService: DataService) {}

  updateInfo(info: any, infoType: string) {
    let value = info.target.value;
    this.orderSubject$.next({
      ...this.orderSubject$.value,
      info: { ...this.orderSubject$.value.info, [infoType]: value },
    });
  }

  handleSelectPlan(plan: Plan) {
    this.orderSubject$.next({
      ...this.orderSubject$.value,
      plan: plan,
    });
  }

  async handleSelectType() {
    try {
      const currentOrder = this.orderSubject$.value;
      this.orderSubject$.next({
        ...currentOrder,
        selectedPlan:
          currentOrder.selectedPlan === planEnumType.MONTH
            ? planEnumType.YEAR
            : planEnumType.MONTH,
      });
      // 找到對應的價格
      const getAllPlan = await lastValueFrom(this.dataService.getPlan());
      const findPlan = getAllPlan.find(
        (item: Plan) => item.id === currentOrder.plan.id,
      );

      this.orderSubject$.next({
        ...this.orderSubject$.value,
        plan: {
          ...this.orderSubject$.value.plan,
          price:
            this.orderSubject$.value.selectedPlan === planEnumType.MONTH
              ? findPlan.monthPrice
              : findPlan.yearPrice,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  handleOnsSelect(ons: Ons) {
    const currentOrder = this.orderSubject$.getValue();
    const hadSelectIndex = currentOrder.ons.findIndex(
      (item) => item.id === ons.id,
    );

    const updatedOns =
      hadSelectIndex >= 0
        ? [
            ...currentOrder.ons.slice(0, hadSelectIndex),
            ...currentOrder.ons.slice(hadSelectIndex + 1),
          ]
        : [...currentOrder.ons, ons];

    const updatedOrder = {
      ...currentOrder,
      ons: updatedOns,
    };

    this.orderSubject$.next(updatedOrder);
  }
}
