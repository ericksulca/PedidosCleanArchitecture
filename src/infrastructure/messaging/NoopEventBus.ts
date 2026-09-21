import { EventBus } from '../../application/ports/event-bus';
import { DomainEvent } from '../../domain/events/domain-event';

export class NoopEventBus implements EventBus {
  async publish(event: DomainEvent): Promise<void> {
    // No operation performed
    console.log('Event published:', event);
  }
}