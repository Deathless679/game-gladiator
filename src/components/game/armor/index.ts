
export type AType = 'shield' | 'armor'

interface AOptions {
  protection: number;
}

export class Armor {
  type: AType;
  options: AOptions;

  constructor(type: AType, options: AOptions) {
    this.type = type
    this.options = options
  }
}

export const armorConfig = [
  {
    type: 'shield',
    protection: 45
  },
  {
    type: 'armor',
    protection: 25
  },
];

export function getConfigAByType(type: AType) {
  return armorConfig.find(v => v.type === type);
}