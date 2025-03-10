import React from 'react';
import { Minion, DiceRoll } from '../types';
import DiceRollDisplay from './DiceRollDisplay';

interface MinionCardProps {
  minion: Minion;
  diceRolls: {
    type: DiceRoll;
    description: DiceRoll;
    hitPoints: DiceRoll;
    ability: DiceRoll;
    modifier: DiceRoll;
    armorClass: DiceRoll;
    damageModifier: DiceRoll;
  };
}

const MinionCard: React.FC<MinionCardProps> = ({ minion, diceRolls }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {minion.type.type} - {minion.description.description}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dice Rolls Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Dice Rolls</h3>
          
          <DiceRollDisplay roll={diceRolls.type} label="Type" />
          <DiceRollDisplay roll={diceRolls.description} label="Description" />
          <DiceRollDisplay roll={diceRolls.hitPoints} label="Hit Points" modifier={10} />
          <DiceRollDisplay roll={diceRolls.ability} label="Ability" />
          <DiceRollDisplay roll={diceRolls.modifier} label="Modifier" />
          <DiceRollDisplay roll={diceRolls.armorClass} label="Armor Class" modifier={10} />
          <DiceRollDisplay roll={diceRolls.damageModifier} label="Damage Mod" />
        </div>
        
        {/* Stats Section */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Hit Points</div>
                <div className="text-xl font-bold text-indigo-700">{minion.hitPoints}</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Armor Class</div>
                <div className="text-xl font-bold text-indigo-700">{minion.armorClass}</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Speed</div>
                <div className="text-xl font-bold text-indigo-700">{minion.speed} ft</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Base Damage</div>
                <div className="text-xl font-bold text-indigo-700">1d6+{minion.damageModifier}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Abilities</h3>
            <div className="grid grid-cols-3 gap-2">
              {['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map(ability => {
                let modifier = 0;
                if (ability === minion.ability.mainAbility) {
                  modifier = minion.mainModifier;
                } else if (ability === minion.flawAbility) {
                  modifier = minion.flawModifier;
                }
                
                return (
                  <div 
                    key={ability}
                    className={`p-3 rounded-lg ${
                      ability === minion.ability.mainAbility 
                        ? 'bg-green-100 border border-green-300' 
                        : ability === minion.flawAbility 
                          ? 'bg-red-100 border border-red-300'
                          : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-sm font-medium">{ability}</div>
                    <div className="text-lg font-bold">
                      {modifier >= 0 ? '+' : ''}{modifier}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Special Traits</h3>
            <div className="bg-yellow-50 p-3 rounded-lg mb-2">
              <div className="font-medium text-yellow-800">Type: {minion.type.type}</div>
              <div className="text-yellow-700">{minion.type.specialTrait}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="font-medium text-purple-800">Skill: {minion.ability.specialSkill}</div>
              <div className="text-purple-700">{minion.ability.specialSkillDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinionCard; 