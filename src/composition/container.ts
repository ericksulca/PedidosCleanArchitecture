import { InMemoryOrderRepository } from '../infrastructure/persistence/in-memory/InMemoryOrderRepository';
import { StaticPricingService } from '../infrastructure/http/StaticPricingService';
import { NoopEventBus } from '../infrastructure/messaging/NoopEventBus';
import { CreateOrder } from '../application/use-cases/create-order';
import { AddItemToOrder } from '../application/use-cases/add-item-to-order';

export interface Dependencies {
  orderRepository: InMemoryOrderRepository;
  pricingService: StaticPricingService;
  eventBus: NoopEventBus;
  createOrder: CreateOrder;
  addItemToOrder: AddItemToOrder;
}

export function buildContainer(): Dependencies {
  const orderRepository = new InMemoryOrderRepository();
  const pricingService = new StaticPricingService();
  const eventBus = new NoopEventBus();

  const createOrder = new CreateOrder(orderRepository, eventBus);
  const addItemToOrder = new AddItemToOrder(orderRepository, pricingService, eventBus);

  return {
    orderRepository,
    pricingService,
    eventBus,
    createOrder,
    addItemToOrder,
  };
}