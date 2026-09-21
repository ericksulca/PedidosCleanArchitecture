import { OrderItem } from '../../domain/value-objects/order-item';
import { Currency } from '../../domain/value-objects/currency';

export interface CreateOrderDTO {
  id: string;
  currency: Currency;
  items: OrderItem[];
}