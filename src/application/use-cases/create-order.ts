import { CreateOrderDTO } from '../dto/create-order.dto';
import { Order } from '../../domain/entities/order';
import { OrderRepository } from '../ports/order-repository';
import { EventBus } from '../ports/event-bus';
import { Result } from '../../shared/result';
import { ValidationError, ConflictError } from '../errors';

export class CreateOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(dto: CreateOrderDTO): Promise<Result<void, ValidationError | ConflictError>> {
    if (!dto.id || !dto.currency || !dto.items) {
      return Result.fail(new ValidationError('Invalid order data.'));
    }

    const existingOrder = await this.orderRepository.findById(dto.id);
    if (existingOrder) {
      return Result.fail(new ConflictError('Order already exists.'));
    }

    const order = new Order(dto.id, dto.currency);
    dto.items.forEach(item => order.addItem(item));

    await this.orderRepository.save(order);
    await this.eventBus.publish({ occurredOn: new Date(), orderId: dto.id });

    return Result.ok();
  }
}