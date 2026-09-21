export class SKU {
  private readonly value: string;

  constructor(value: string) {
    if (!value || !/^[A-Z0-9]{3}$/.test(value)) {
      throw new Error('Invalid SKU: Must be 3 alphanumeric uppercase characters.');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}