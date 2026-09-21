import { AddItemToOrderDTO } from '../dto/add-item-to-order.dto';
import { OrderRepository } from '../ports/order-repository';
import { PricingService } from '../ports/pricing-service';
import { EventBus } from '../ports/event-bus';
import { Result } from '../../shared/result';
import { NotFoundError, ValidationError } from '../errors';
import { OrderItem } from '../../domain/value-objects/order-item';

export class AddItemToOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly pricingService: PricingService,
    private readonly eventBus: EventBus
  ) {}

  async execute(dto: AddItemToOrderDTO): Promise<Result<void, NotFoundError | ValidationError>> {
    if (!dto.orderId || !dto.sku || !dto.quantity) {
      return Result.fail(new ValidationError('Invalid item data.'));
    }

    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      return Result.fail(new NotFoundError('Order not found.'));
    }

    const price = await this.pricingService.getPrice(dto.sku);
    const item = new OrderItem(dto.sku, dto.quantity, price);

    order.addItem(item);
    await this.orderRepository.save(order);
    await this.eventBus.publish({ occurredOn: new Date(), orderId: dto.orderId, sku: dto.sku.getValue(), quantity: dto.quantity.getValue() });

    return Result.ok();
  }
}