import { DomainEvent } from './domain-event';

export class OrderCreatedEvent implements DomainEvent {
  public readonly occurredOn: Date;
  public readonly orderId: string;

  constructor(orderId: string) {
    this.occurredOn = new Date();
    this.orderId = orderId;
  }
}