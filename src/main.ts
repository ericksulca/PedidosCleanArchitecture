import fastify from 'fastify';
import { buildContainer } from './composition/container';
import { OrdersController } from './infrastructure/http/controllers/OrdersController';

const startServer = async () => {
  const app = fastify();
  const container = buildContainer();

  // Instantiate the OrdersController with dependencies
  const ordersController = new OrdersController(container.createOrder, container.addItemToOrder);

  // Register routes
  ordersController.registerRoutes(app);

  const PORT = 3000;

  try {
    await app.listen({ port: PORT });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();