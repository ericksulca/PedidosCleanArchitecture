import { OrderItem } from '../value-objects/order-item';
import { Money } from '../value-objects/money';
import { Currency } from '../value-objects/currency';
import { DomainEvent } from '../events/domain-event';

export class Order {
  private readonly id: string;
  private readonly items: OrderItem[] = [];
  private readonly currency: Currency;

  constructor(id: string, currency: Currency) {
    if (!id) {
      throw new Error('Order must have a valid ID.');
    }
    this.id = id;
    this.currency = currency;
  }

  addItem(item: OrderItem): void {
    if (!item.price.getCurrency().equals(this.currency)) {
      throw new Error('Item currency must match order currency.');
    }
    this.items.push(item);
  }

  getTotal(): Money {
    const totalAmount = this.items.reduce((sum, item) => sum + item.getTotal().getAmount(), 0);
    return new Money(totalAmount, this.currency);
  }

  getId(): string {
    return this.id;
  }

  getItems(): OrderItem[] {
    return this.items;
  }
}