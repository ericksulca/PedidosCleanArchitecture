import { Money } from '../../domain/value-objects/money';
import { SKU } from '../../domain/value-objects/sku';

export interface PricingService {
  getPrice(sku: SKU): Promise<Money>;
}