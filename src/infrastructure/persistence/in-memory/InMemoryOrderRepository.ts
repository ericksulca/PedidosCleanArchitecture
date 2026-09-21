import { OrderRepository } from '../../../application/ports/order-repository';
import { Order } from '../../../domain/entities/order';

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    this.orders.set(order.getId(), order);
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.orders.get(orderId) || null;
  }
}