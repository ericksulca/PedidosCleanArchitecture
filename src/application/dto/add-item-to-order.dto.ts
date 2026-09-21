import { SKU } from '../../domain/value-objects/sku';
import { Quantity } from '../../domain/value-objects/quantity';

export interface AddItemToOrderDTO {
  orderId: string;
  sku: SKU;
  quantity: Quantity;
}