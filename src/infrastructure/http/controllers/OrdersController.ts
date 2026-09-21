import { FastifyInstance } from 'fastify';
import { CreateOrder } from '../../../application/use-cases/create-order';
import { AddItemToOrder } from '../../../application/use-cases/add-item-to-order';
import { CreateOrderDTO } from '../../../application/dto/create-order.dto';
import { AddItemToOrderDTO } from '../../../application/dto/add-item-to-order.dto';

export class OrdersController {
  constructor(
    private readonly createOrder: CreateOrder,
    private readonly addItemToOrder: AddItemToOrder
  ) {}

  registerRoutes(app: FastifyInstance): void {
    app.post('/orders', async (request, reply) => {
      const dto = request.body as CreateOrderDTO;
      const result = await this.createOrder.execute(dto);

      if (result.isFailure) {
        reply.status(400).send({ error: result.error.message });
        return;
      }

      reply.status(201).send({ message: 'Order created successfully' });
    });

    app.post('/orders/:orderId/items', async (request, reply) => {
      const { orderId } = request.params as { orderId: string };
      const dto = { ...request.body, orderId } as AddItemToOrderDTO;
      const result = await this.addItemToOrder.execute(dto);

      if (result.isFailure) {
        reply.status(400).send({ error: result.error.message });
        return;
      }

      reply.status(200).send({ message: 'Item added to order successfully' });
    });
  }
}