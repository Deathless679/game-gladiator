export class LongInteger {
  private value: string;
  private isNegative: boolean;

  constructor(value: string | number) {
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (!/^-?\d+$/.test(value)) {
      throw new Error('Invalid input: value must be an integer');
    }
    this.isNegative = value[0] === '-';
    this.value = this.isNegative ? value.slice(1) : value;
    this.value = LongInteger.removeLeadingZeros(this.value)
  }

  // Метод для обновления значения

  updateValue(newV: string | number) {
    if (typeof newV === 'number') {
      newV = newV.toString();
    }
    if (!/^-?\d+$/.test(newV)) {
      throw new Error('Invalid input: value must be an integer');
    }
    this.isNegative = newV[0] === '-';
    this.value = this.isNegative ? newV.slice(1) : newV;
    this.value = LongInteger.removeLeadingZeros(this.value);
  }

  // Метод для получения значения
  toString(): string {
    return this.isNegative ? `-${this.value}` : this.value;
  }

  // Метод для удаления ведущих нулей
  private static removeLeadingZeros(value: string): string {
    return value.replace(/^0+/, '') || '0';
  }

  // Метод для сравнения двух чисел (возвращает 1, если a > b, -1, если a < b, 0, если a == b)
  private static compareAbsolute(a: string, b: string): number {
    const lenA = a.length;
    const lenB = b.length;
    if (lenA > lenB) return 1;
    if (lenA < lenB) return -1;
    for (let i = 0; i < lenA; i++) {
      if (a[i] > b[i]) return 1;
      if (a[i] < b[i]) return -1;
    }
    return 0;
  }

  // Сложение (базовый уровень)
  add(other: LongInteger): LongInteger {
    if (this.isNegative === other.isNegative) {
      const result = LongInteger.addAbsolute(this.value, other.value);
      return new LongInteger(this.isNegative ? `-${result}` : result);
    } else {
      const comparison = LongInteger.compareAbsolute(this.value, other.value);
      if (comparison === 0) {
        return new LongInteger('0'); // a + (-a) = 0
      }
      const larger = comparison > 0 ? this.value : other.value;
      const smaller = comparison > 0 ? other.value : this.value;
      const result = LongInteger.subtractAbsolute(larger, smaller);
      const isResultNegative = (comparison > 0 && this.isNegative) || (comparison < 0 && other.isNegative);
      return new LongInteger(isResultNegative ? `-${result}` : result);
    }
  }

  // Вычитание (базовый уровень)
  subtract(other: LongInteger): LongInteger {
    if (this.isNegative !== other.isNegative) {
      const result = LongInteger.addAbsolute(this.value, other.value);
      return new LongInteger(this.isNegative ? `-${result}` : result);
    } else {
      const comparison = LongInteger.compareAbsolute(this.value, other.value);
      if (comparison === 0) {
        return new LongInteger('0'); // a - a = 0
      }
      const larger = comparison > 0 ? this.value : other.value;
      const smaller = comparison > 0 ? other.value : this.value;
      const result = LongInteger.subtractAbsolute(larger, smaller);
      const isResultNegative = (comparison > 0 && this.isNegative) || (comparison < 0 && !other.isNegative);
      return new LongInteger(isResultNegative ? `-${result}` : result);
    }
  }

  // Умножение (повышенный уровень)
  multiply(other: LongInteger): LongInteger {
    const result = LongInteger.multiplyAbsolute(this.value, other.value);
    const isResultNegative = this.isNegative !== other.isNegative;
    return new LongInteger(isResultNegative ? `-${result}` : result);
  }

  // Деление (повышенный уровень)
  divide(other: LongInteger): LongInteger {
    if (other.value === '0') {
      throw new Error('Division by zero');
    }
    const result = LongInteger.divideAbsolute(this.value, other.value);
    const isResultNegative = this.isNegative !== other.isNegative;
    return new LongInteger(isResultNegative ? `-${result}` : result);
  }

  // Остаток от деления (повышенный уровень)
  mod(other: LongInteger): LongInteger {
    if (other.value === '0') {
      throw new Error('Division by zero');
    }
    const result = LongInteger.modAbsolute(this.value, other.value);
    const isResultNegative = this.isNegative;
    return new LongInteger(isResultNegative ? `-${result}` : result);
  }

  // Сравнение (базовый уровень)
  compare(other: LongInteger): number {
    if (this.isNegative && !other.isNegative) return -1;
    if (!this.isNegative && other.isNegative) return 1;
    const comparison = LongInteger.compareAbsolute(this.value, other.value);
    return this.isNegative ? -comparison : comparison;
  }

  // Вспомогательные методы для работы с абсолютными значениями

  private static addAbsolute(a: string, b: string): string {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry > 0) {
      const digitA = i >= 0 ? parseInt(a[i], 10) : 0;
      const digitB = j >= 0 ? parseInt(b[j], 10) : 0;
      const sum = digitA + digitB + carry;
      result = (sum % 10) + result;
      carry = Math.floor(sum / 10);
      i--;
      j--;
    }

    return result;
  }

  private static subtractAbsolute(a: string, b: string): string {
    let result = '';
    let borrow = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0) {
      const digitA = i >= 0 ? parseInt(a[i], 10) : 0;
      const digitB = j >= 0 ? parseInt(b[j], 10) : 0;
      let diff = digitA - digitB - borrow;
      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result = diff + result;
      i--;
      j--;
    }

    return LongInteger.removeLeadingZeros(result);
  }

  private static multiplyAbsolute(a: string, b: string): string {
    const result = Array(a.length + b.length).fill(0);

    for (let i = a.length - 1; i >= 0; i--) {
      for (let j = b.length - 1; j >= 0; j--) {
        const product = parseInt(a[i], 10) * parseInt(b[j], 10) + result[i + j + 1];
        result[i + j + 1] = product % 10;
        result[i + j] += Math.floor(product / 10);
      }
    }

    return LongInteger.removeLeadingZeros(result.join(''));
  }

  private static divideAbsolute(a: string, b: string): string {
    let result = '';
    let temp = '';
    for (let i = 0; i < a.length; i++) {
      temp += a[i];
      let count = 0;
      while (LongInteger.compareAbsolute(temp, b) >= 0) {
        temp = LongInteger.subtractAbsolute(temp, b);
        count++;
      }
      result += count;
    }

    return LongInteger.removeLeadingZeros(result);
  }

  private static modAbsolute(a: string, b: string): string {
    let temp = '';
    for (let i = 0; i < a.length; i++) {
      temp += a[i];
      while (LongInteger.compareAbsolute(temp, b) >= 0) {
        temp = LongInteger.subtractAbsolute(temp, b);
      }
    }

    return temp;
  }
}

