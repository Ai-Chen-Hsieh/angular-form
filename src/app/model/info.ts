import { Item } from './Item';
export interface Info {
  name: string;
  email: string;
  phone: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
}

export interface Ons {
  id: number;
  name: string;
  monthPrice: number;
  yearPrice: number;
}

export interface Order {
  info: Info;
  plan: Plan;
  selectedPlan: number;
  ons: Ons[];
  totalPrice: number;
}
