export class Quantity {
  private readonly value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new Error('Invalid Quantity: Must be greater than zero.');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}