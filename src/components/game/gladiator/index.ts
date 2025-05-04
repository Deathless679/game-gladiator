import type { Ref } from 'vue';

export interface GOptions {
  health: number;
  maxHealth: number;
  damage: number;
  protection: number;
  criticalChance?: number;
  criticalDamage?: number;
}

export class Gladiator {
  name: string;
  options: Ref<GOptions>;

  constructor(name: string = 'Gladiator', options: GOptions = {
    maxHealth: 10,
    health: 10,
    damage: 2,
    protection: 0
  }) {
    this.name = name;
    this.options = ref(options);
  }

  updateName(newName: string) {
    this.name = newName
  }

  updateOptions(newOptions: GOptions) {
    this.options.value = { ...this.options.value, ...newOptions }
  }

  getMaxHealth() {
    return this.options.value.maxHealth
  }

  getCurrentHealth() {
    return this.options.value.health
  }

  setCurrentDamage(newDamage: number) {
    this.options.value.damage = newDamage;
  }

  getCurrentDamage() {
    return this.options.value.damage;
  }

  dealDamage(): number {
    let damage = this.options.value?.damage;
    if (this.options.value.criticalChance && this.options.value.criticalDamage) {
      if (checkChance(this.options.value.criticalChance)) {
        damage += this.options.value.criticalDamage
      }
    }
    return damage;
  }

  takeDamage(damage: number) {
    let intermediateDamage: number = damage;
    console.log(this.options.value);
    if (this.options.value.protection) {
      intermediateDamage = intermediateDamage - intermediateDamage * (this.options.value.protection / 100);
    }
    const health: number = this.options.value.health - intermediateDamage;
    this.options.value.health = health <= 0 ? 0 : health;
  }

}

function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkChance(chance: number) {
  return chance >= getRandomNumber(0, 100)
}