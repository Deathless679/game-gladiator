export type WType = 'knife' | 'sword' | 'mace' | 'fist'

interface WOptions {
  damage: number;
  criticalChance?: number;
  criticalDamage?: number;
}

export class Weapon {
  type: WType;
  options: WOptions;

  constructor(type: WType, options: WOptions) {
    this.type = type;
    this.options = options;
  }
}

export const weaponConfig = [
  {
    type: 'knife',
    damage: 3,
    criticalChance: 40,
    criticalDamage: 2,
  },
  {
    type: 'sword',
    damage: 5,
    criticalChance: 25,
    criticalDamage: 2,
  },
  {
    type: 'mace',
    damage: 6,
    criticalChance: 5,
    criticalDamage: 5,
  },
  {
    type: 'fist',
    damage: 2,
    criticalChance: 70,
    criticalDamage: 6,
  },
];

export function getConfigWByType(type: WType) {
  return weaponConfig.find(v => v.type === type);
}