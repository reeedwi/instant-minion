import { DiceType, Minion, MinionType, MinionDescription, MinionAbility, DiceRoll } from '../types';

// Function to roll a dice
export const rollDice = (dice: DiceType): DiceRoll => {
  let max = 0;
  
  switch (dice) {
    case 'd4': max = 4; break;
    case 'd6': max = 6; break;
    case 'd8': max = 8; break;
    case 'd10': max = 10; break;
    case 'd12': max = 12; break;
    case 'd20': max = 20; break;
    case 'd100': max = 100; break;
  }
  
  // For d10 and d100, a roll of 0 means 10 or 100
  if (dice === 'd10' || dice === 'd100') {
    const roll = Math.floor(Math.random() * max);
    return { dice, result: roll === 0 ? max : roll };
  } else {
    return { dice, result: Math.floor(Math.random() * max) + 1 };
  }
};

// Get minion type based on D100 roll
export const getMinionType = (roll: number): MinionType => {
  // Normalize roll to the nearest 10
  const normalizedRoll = roll === 100 ? 0 : Math.floor(roll / 10) * 10;
  
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
export const generateMinion = (): Minion => {
  // Roll all the dice
  const typeRoll = rollDice('d100').result;
  const descriptionRoll = rollDice('d10').result;
  const hitPointsRoll = rollDice('d20').result + 10; // D20 + 10
  const abilityRoll = rollDice('d12').result;
  const modifierRoll = rollDice('d8').result;
  const armorClassRoll = rollDice('d6').result + 10; // D6 + 10
  const damageModifierRoll = rollDice('d4').result;
  
  // Get derived attributes
  const type = getMinionType(typeRoll);
  const description = getMinionDescription(descriptionRoll);
  const ability = getMinionAbility(abilityRoll);
  
  // Calculate hit points (add +6 if the special skill is Tough)
  const toughBonus = ability.specialSkill === 'Tough' ? 6 : 0;
  const hitPoints = hitPointsRoll + toughBonus;
  
  // Calculate armor class (add +1 if the type is Robot)
  const robotBonus = type.type === 'Robot' ? 1 : 0;
  const armorClass = armorClassRoll + robotBonus;
  
  // Get flaw ability and modifier
  const flawAbility = getRandomFlawAbility(ability.mainAbility);
  const flawModifier = -damageModifierRoll;
  
  return {
    // Dice rolls
    typeRoll,
    descriptionRoll,
    hitPointsRoll,
    abilityRoll,
    modifierRoll,
    armorClassRoll,
    damageModifierRoll,
    
    // Derived attributes
    type,
    description,
    ability,
    hitPoints,
    mainModifier: modifierRoll,
    armorClass,
    damageModifier: damageModifierRoll,
    flawAbility,
    flawModifier,
    
    // Base attributes
    speed: 30, // All minions start with a walking speed of 30 feet
  };
}; 