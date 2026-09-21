import fastify from 'fastify';
import { OrdersController } from './controllers/OrdersController';
import { InMemoryOrderRepository } from '../persistence/in-memory/InMemoryOrderRepository';
import { StaticPricingService } from './StaticPricingService';
import { NoopEventBus } from '../messaging/NoopEventBus';
import { CreateOrder } from '../../application/use-cases/create-order';
import { AddItemToOrder } from '../../application/use-cases/add-item-to-order';

const app = fastify();

// Instantiate dependencies
const orderRepository = new InMemoryOrderRepository();
const pricingService = new StaticPricingService();
const eventBus = new NoopEventBus();

const createOrderUseCase = new CreateOrder(orderRepository, eventBus);
const addItemToOrderUseCase = new AddItemToOrder(orderRepository, pricingService, eventBus);

const ordersController = new OrdersController(createOrderUseCase, addItemToOrderUseCase);

// Register routes
ordersController.registerRoutes(app);

// Start the server
const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();