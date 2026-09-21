import { SKU } from './sku';
import { Quantity } from './quantity';
import { Money } from './money';

export class OrderItem {
  constructor(
    public readonly sku: SKU,
    public readonly quantity: Quantity,
    public readonly price: Money
  ) {}

  getTotal(): Money {
    return this.price.multiply(this.quantity.getValue());
  }
}