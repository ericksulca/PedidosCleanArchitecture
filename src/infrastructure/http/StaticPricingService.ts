import { PricingService } from '../../application/ports/pricing-service';
import { Money } from '../../domain/value-objects/money';
import { SKU } from '../../domain/value-objects/sku';

export class StaticPricingService implements PricingService {
  private readonly prices: Map<string, Money> = new Map([
    ['ITEM001', new Money(100, { getCode: () => 'USD' })],
    ['ITEM002', new Money(200, { getCode: () => 'USD' })],
    ['ITEM003', new Money(300, { getCode: () => 'USD' })],
  ]);

  async getPrice(sku: SKU): Promise<Money> {
    const price = this.prices.get(sku.getValue());
    if (!price) {
      throw new Error(`Price not found for SKU: ${sku.getValue()}`);
    }
    return price;
  }
}