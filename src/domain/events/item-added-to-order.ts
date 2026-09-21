import { DomainEvent } from './domain-event';

export class ItemAddedToOrderEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly orderId: string;
  public readonly sku: string;
  public readonly quantity: number;

  constructor(orderId: string, sku: string, quantity: number) {
    this.occurredOn = new Date();
    this.orderId = orderId;
    this.sku = sku;
    this.quantity = quantity;
  }
}