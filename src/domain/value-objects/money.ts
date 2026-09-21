import { Currency } from './currency';

export class Money {
  private readonly amount: number;
  private readonly currency: Currency;

  constructor(amount: number, currency: Currency) {
    if (amount < 0) {
      throw new Error('Invalid Money: Amount cannot be negative.');
    }
    this.amount = amount;
    this.currency = currency;
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): Currency {
    return this.currency;
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }
}