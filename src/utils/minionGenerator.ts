import { DiceType, Minion, MinionType, MinionDescription, MinionAbility, DiceRoll } from '../types';

// Function to roll a dice
export const rollDice = (dice: DiceType): DiceRoll => {
  switch (dice) {
    case 'd4':
      return { dice, result: Math.floor(Math.random() * 4) + 1 };
    case 'd6':
      return { dice, result: Math.floor(Math.random() * 6) + 1 };
    case 'd8':
      return { dice, result: Math.floor(Math.random() * 8) + 1 };
    case 'd10':
      return { dice, result: Math.floor(Math.random() * 10) + 1 };
    case 'd12':
      return { dice, result: Math.floor(Math.random() * 12) + 1 };
    case 'd20':
      return { dice, result: Math.floor(Math.random() * 20) + 1 };
    case 'd100':
      return { dice, result: (Math.floor(Math.random() * 10) + 1) * 10 };
    default:
      throw new Error(`Invalid dice type: ${dice}`);
  }
};

// Get minion type based on D100 roll
export const getMinionType = (roll: number): MinionType => {
  // Normalize roll to the nearest 10
  const normalizedRoll = roll === 100 ? 0 : Math.floor(roll / 10) * 10;
  
  console.log('Original roll:', roll); // Debug log
  console.log('Normalized roll:', normalizedRoll); // Debug log
  
  switch (normalizedRoll) {
    case 10:
      return { type: 'Human', specialTrait: '+2 to Ability Modifier of Choice' };
    case 20:
      return { type: 'Bullywug', specialTrait: 'Leap 10ft, Jump 20ft' };
    case 30:
      return { type: 'Imp', specialTrait: 'Invisibility, 1/Day' };
    case 40:
      return { type: 'Goblin', specialTrait: 'Nimble Escape (Bonus Action to Disengage or Hide)' };
    case 50:
      return { type: 'Skeleton', specialTrait: 'Reform (At 0 HP, roll a d20; on a 4 or lower, reassemble with that much HP)' };
    case 60:
      return { type: 'Aarakocra', specialTrait: 'Fly Speed 15ft' };
    case 70:
      return { type: 'Robot', specialTrait: 'AC +1' };
    case 80:
      return { type: 'Talking Ape', specialTrait: 'Weapon Upgrade (1d8 Bludgeoning Damage)' };
    case 90:
      return { type: 'Awakened Mushroom', specialTrait: '1d4 Poison Spore Damage on hit' };
    case 0:
      return { type: 'Living Puppet', specialTrait: 'Curse (On a hit, inflicts Bane until end of next turn)' };
    default:
      // Fallback to Human if something goes wrong
      console.log('Falling back to Human type'); // Debug log
      return { type: 'Human', specialTrait: '+2 to Ability Modifier of Choice' };
  }
};

// Get minion description based on D10 roll
export const getMinionDescription = (roll: number): MinionDescription => {
  // For d10, a roll of 0 means 10
  const normalizedRoll = roll === 10 ? 0 : roll;
  
  switch (normalizedRoll) {
    case 1:
      return { description: 'Oddly slimy' };
    case 2:
      return { description: 'Flamboyantly dressed' };
    case 3:
      return { description: 'Pathetically horny' };
    case 4:
      return { description: 'Slightly glowing' };
    case 5:
      return { description: 'Covered in strange tattoos' };
    case 6:
      return { description: 'Wearing cute little glasses' };
    case 7:
      return { description: 'Uncomfortably muscular' };
    case 8:
      return { description: 'Dressed in dark leathers and chains' };
    case 9:
      return { description: 'Blessed with perfect teeth' };
    case 0:
      return { description: 'Clearly on the brink of financial ruin' };
    default:
      // Fallback
      return { description: 'Oddly slimy' };
  }
};

// Get main ability and special skill based on D12 roll
export const getMinionAbility = (roll: number): MinionAbility => {
  switch (roll) {
    case 1:
      return { 
        mainAbility: 'DEX', 
        specialSkill: 'Parry',
        specialSkillDescription: 'Subtract 1d4 from attacks'
      };
    case 2:
      return { 
        mainAbility: 'DEX', 
        specialSkill: 'Evasion',
        specialSkillDescription: 'Take 0 damage on successful DEX saves'
      };
    case 3:
      return { 
        mainAbility: 'STR', 
        specialSkill: 'Extra Attack',
        specialSkillDescription: 'Can make an additional attack'
      };
    case 4:
      return { 
        mainAbility: 'STR', 
        specialSkill: 'Improved Critical',
        specialSkillDescription: 'Critical hit on 19 & 20'
      };
    case 5:
      return { 
        mainAbility: 'CON', 
        specialSkill: 'Reckless Attack',
        specialSkillDescription: 'Advantage on attacks, but attacks on the minion also have Advantage'
      };
    case 6:
      return { 
        mainAbility: 'CON', 
        specialSkill: 'Tough',
        specialSkillDescription: '+6 HP'
      };
    case 7:
      return { 
        mainAbility: 'WIS', 
        specialSkill: 'Thorn Whip Cantrip',
        specialSkillDescription: 'Can cast Thorn Whip'
      };
    case 8:
      return { 
        mainAbility: 'WIS', 
        specialSkill: 'Thunderclap Cantrip',
        specialSkillDescription: 'Can cast Thunderclap'
      };
    case 9:
      return { 
        mainAbility: 'INT', 
        specialSkill: 'Minor Illusion Cantrip',
        specialSkillDescription: 'Can cast Minor Illusion'
      };
    case 10:
      return { 
        mainAbility: 'INT', 
        specialSkill: 'Firebolt Cantrip',
        specialSkillDescription: 'Can cast Firebolt'
      };
    case 11:
      return { 
        mainAbility: 'CHA', 
        specialSkill: 'Vicious Mockery Cantrip',
        specialSkillDescription: 'Can cast Vicious Mockery'
      };
    case 12:
      return { 
        mainAbility: 'CHA', 
        specialSkill: 'Smite',
        specialSkillDescription: '1d6 Smite Damage (Recharge on roll of 5 or 6)'
      };
    default:
      // Fallback
      return { 
        mainAbility: 'STR', 
        specialSkill: 'Extra Attack',
        specialSkillDescription: 'Can make an additional attack'
      };
  }
};

// Get a random ability that is not the main ability
export const getRandomFlawAbility = (mainAbility: string): string => {
  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  const filteredAbilities = abilities.filter(ability => ability !== mainAbility);
  const randomIndex = Math.floor(Math.random() * filteredAbilities.length);
  return filteredAbilities[randomIndex];
};

// Generate a complete minion
export const generateMinion = (rolls?: {
  typeRoll: DiceRoll;
  descriptionRoll: DiceRoll;
  hitPointsRoll: DiceRoll;
  abilityRoll: DiceRoll;
  modifierRoll: DiceRoll;
  armorClassRoll: DiceRoll;
  damageModifierRoll: DiceRoll;
}): Minion => {
  // Roll all the dice if not provided
  const typeRoll = rolls?.typeRoll ?? rollDice('d100');
  const descriptionRoll = rolls?.descriptionRoll ?? rollDice('d10');
  const hitPointsRoll = rolls?.hitPointsRoll ?? rollDice('d20');
  const abilityRoll = rolls?.abilityRoll ?? rollDice('d12');
  const modifierRoll = rolls?.modifierRoll ?? rollDice('d8');
  const armorClassRoll = rolls?.armorClassRoll ?? rollDice('d6');
  const damageModifierRoll = rolls?.damageModifierRoll ?? rollDice('d4');
  
  console.log('Debug - Dice Rolls:', {
    type: typeRoll.result,
    description: descriptionRoll.result,
    hitPoints: hitPointsRoll.result,
    ability: abilityRoll.result,
    modifier: modifierRoll.result,
    armorClass: armorClassRoll.result,
    damageMod: damageModifierRoll.result
  });
  
  // Get derived attributes
  const type = getMinionType(typeRoll.result);
  const description = getMinionDescription(descriptionRoll.result);
  const ability = getMinionAbility(abilityRoll.result);
  
  // Calculate hit points (add +10 base and +6 if the special skill is Tough)
  const baseHP = hitPointsRoll.result + 10;  // Base HP is d20 roll + 10
  const toughBonus = ability.specialSkill === 'Tough' ? 6 : 0;
  const hitPoints = baseHP + toughBonus;  // Add tough bonus if applicable
  
  console.log('HP Calculation:', {
    d20Roll: hitPointsRoll.result,
    baseWithMod: baseHP,
    hasTough: ability.specialSkill === 'Tough',
    toughBonus,
    finalHP: hitPoints
  });
  
  // Calculate armor class (add +1 if the type is Robot)
  const robotBonus = type.type === 'Robot' ? 1 : 0;
  const armorClass = armorClassRoll.result + 10 + robotBonus;
  
  // Get flaw ability and modifier
  const flawAbility = getRandomFlawAbility(ability.mainAbility);
  const flawModifier = -damageModifierRoll.result;
  
  // Set base damage dice based on type (Talking Ape gets 1d8)
  const baseDamageDice: 'd6' | 'd8' = type.type === 'Talking Ape' ? 'd8' : 'd6';
  
  return {
    // Dice rolls
    typeRoll: typeRoll.result,
    descriptionRoll: descriptionRoll.result,
    hitPointsRoll: hitPointsRoll.result,
    abilityRoll: abilityRoll.result,
    modifierRoll: modifierRoll.result,
    armorClassRoll: armorClassRoll.result,
    damageModifierRoll: damageModifierRoll.result,
    
    // Derived attributes
    type,
    description,
    ability,
    hitPoints,
    baseHP,
    mainModifier: modifierRoll.result,
    armorClass,
    damageModifier: damageModifierRoll.result,
    baseDamageDice,
    flawAbility,
    flawModifier,
    
    // Base attributes
    speed: 30, // All minions start with a walking speed of 30 feet
  };
}; 