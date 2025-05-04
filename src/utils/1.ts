export class LongInteger1 {
  private value: number[];

  constructor(value: number | string) {
    if (typeof value === 'number') {
      this.value = this.numberToArray(value);
    } else {
      this.value = this.stringToArray(value);
    }
  }

  private numberToArray(num: number): number[] {
    const arr: number[] = [];
    while (num > 0) {
      arr.push(num % 10);
      num = Math.floor(num / 10);
    }
    return arr.reverse();
  }

  private stringToArray(str: string): number[] {
    return str.split('').reverse().map(Number);
  }

  // Сложение
  public add(other: LongInteger): LongInteger {
    const maxLength = Math.max(this.value.length, other.value.length);
    const result: number[] = new Array(maxLength + 1).fill(0);

    for (let i = 0; i < maxLength; i++) {
      const sum = (this.value[i] || 0) + (other.value[i] || 0) + result[i];
      result[i] = sum % 10;
      result[i + 1] += Math.floor(sum / 10);
    }

    // Удаление ведущих нулей
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    return new LongInteger(result.reverse().join(''));
  }

  // Вычитание
  public subtract(other: LongInteger): LongInteger {
    if (this.compareTo(other) < 0) {
      throw new Error('Вычитаемое число больше уменьшаемого');
    }

    const maxLength = Math.max(this.value.length, other.value.length);
    const result: number[] = new Array(maxLength).fill(0);

    for (let i = 0; i < maxLength; i++) {
      let diff = (this.value[i] || 0) - (other.value[i] || 0) + result[i];
      if (diff < 0) {
        diff += 10;
        result[i + 1] -= 1;
      }
      result[i] = diff % 10;
    }

    // Удаление ведущих нулей
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    return new LongInteger(result.reverse().join(''));
  }

  // Умножение
  public multiply(other: LongInteger): LongInteger {
    const result: number[] = new Array(this.value.length + other.value.length).fill(0);

    for (let i = 0; i < this.value.length; i++) {
      for (let j = 0; j < other.value.length; j++) {
        result[i + j] += this.value[i] * other.value[j];
      }
    }

    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] >= 10) {
        result[i + 1] += Math.floor(result[i] / 10);
        result[i] %= 10;
      }
    }

    // Удаление ведущих нулей
    while (result.length > 1 && result[result.length - 1] === 0) {
      result.pop();
    }

    return new LongInteger(result.reverse().join(''));
  }

  // Деление
  public divide(other: LongInteger): LongInteger {
    if (other.compareTo(new LongInteger('0')) === 0) {
      throw new Error('Деление на ноль');
    }

    let quotient = new LongInteger('0');
    let remainder = this;

    while (remainder.compareTo(other) >= 0) {
      remainder = remainder.subtract(other);
      quotient = quotient.add(new LongInteger('1'));
    }

    return quotient;
  }

  // Остаток от деления
  public mod(other: LongInteger): LongInteger {
    if (other.compareTo(new LongInteger('0')) === 0) {
      throw new Error('Деление на ноль');
    }

    let remainder = this;

    while (remainder.compareTo(other) >= 0) {
      remainder = remainder.subtract(other);
    }

    return remainder;
  }

  // Сравнение
  public compareTo(other: LongInteger): number {
    if (this.value.length > other.value.length) return 1;
    if (this.value.length < other.value.length) return -1;

    for (let i = this.value.length - 1; i >= 0; i--) {
      if (this.value[i] > other.value[i]) return 1;
      if (this.value[i] < other.value[i]) return -1;
    }

    return 0;
  }

  // Вывод
  public toString(): string {
    return this.value.reverse().join('');
  }
}
