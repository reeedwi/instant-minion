// Dice types
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

// Minion type from D100 roll
export interface MinionType {
  type: string;
  specialTrait: string;
}

// Minion description from D10 roll
export interface MinionDescription {
  description: string;
}

// Main ability and special skill from D12 roll
export interface MinionAbility {
  mainAbility: string;
  specialSkill: string;
  specialSkillDescription: string;
}

// Complete minion data
export interface Minion {
  // Dice rolls
  typeRoll: number;
  descriptionRoll: number;
  hitPointsRoll: number;
  abilityRoll: number;
  modifierRoll: number;
  armorClassRoll: number;
  damageModifierRoll: number;
  
  // Derived attributes
  type: MinionType;
  description: MinionDescription;
  ability: MinionAbility;
  hitPoints: number;
  mainModifier: number;
  armorClass: number;
  damageModifier: number;
  flawAbility: string;
  flawModifier: number;
  
  // Base attributes
  speed: number;
}

// Dice roll result
export interface DiceRoll {
  dice: DiceType;
  result: number;
} 