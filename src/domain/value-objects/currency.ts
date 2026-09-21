export class Currency {
  private readonly code: string;

  constructor(code: string) {
    if (!code || code.length !== 3 || !/^[A-Z]{3}$/.test(code)) {
      throw new Error('Invalid Currency: Must be a 3-letter uppercase code.');
    }
    this.code = code;
  }

  getCode(): string {
    return this.code;
  }

  equals(other: Currency): boolean {
    return this.code === other.getCode();
  }
}