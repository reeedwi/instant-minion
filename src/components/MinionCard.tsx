import React, { useState } from 'react';
import { Minion, DiceRoll } from '../types';
import DiceRollDisplay from './DiceRollDisplay';
import { rollDice } from '../utils/minionGenerator';

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

// D6 Dice SVG icon component
const D6Icon: React.FC = () => (
  <svg 
    className="w-4 h-4 text-indigo-600 opacity-60" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <circle cx="15.5" cy="8.5" r="1.5"/>
    <circle cx="15.5" cy="15.5" r="1.5"/>
    <circle cx="8.5" cy="15.5" r="1.5"/>
    <circle cx="12" cy="12" r="1.5"/>
  </svg>
);

// D8 Dice SVG icon component
const D8Icon: React.FC = () => (
  <svg 
    className="w-4 h-4 text-indigo-600 opacity-60" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 2L3 9l9 13 9-13L12 2zm0 3.84L17.76 12 12 20.2 6.24 12 12 5.84z"/>
  </svg>
);

// Add D20 icon component
const D20Icon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    className={`w-3 h-3 text-current opacity-60 ${className}`}
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12 2L2 8.5l3.5 11h11l3.5-11L12 2zm0 2.7l7.5 4.9-2.5 7.9h-10l-2.5-7.9L12 4.7zm0 1.6L6.5 9.7 8.2 15h7.6l1.7-5.3L12 6.3zm0 1.7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
  </svg>
);

// Add interface for ability rolls
interface Roll {
  type: 'ability' | 'damage';
  roll: number;
  total: number;
  timestamp: number;
  ability?: string;
  modifier: number;
}

const MinionCard: React.FC<MinionCardProps> = ({ minion, diceRolls }) => {
  const [rollHistory, setRollHistory] = useState<Roll[]>([]);
  const historyEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [rollHistory]);

  // Clear roll history when minion changes
  React.useEffect(() => {
    setRollHistory([]);
  }, [minion]);

  const handleDamageRoll = () => {
    const roll = rollDice(minion.baseDamageDice);
    const total = roll.result + minion.damageModifier;
    setRollHistory(prev => [...prev.slice(-9), { 
      type: 'damage',
      roll: roll.result,
      modifier: minion.damageModifier,
      total,
      timestamp: Date.now()
    }]);
  };

  const handleAbilityRoll = (ability: string, modifier: number) => {
    const roll = rollDice('d20');
    const total = roll.result + modifier;
    setRollHistory(prev => [...prev.slice(-9), { 
      type: 'ability',
      ability,
      roll: roll.result,
      modifier,
      total,
      timestamp: Date.now()
    }]);
  };

  // Choose the appropriate dice icon based on base damage dice
  const DiceIcon = minion.baseDamageDice === 'd8' ? D8Icon : D6Icon;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-2 mb-3">
        <h2 className="text-xl font-bold text-gray-800 break-words">
          {minion.type.type} - {minion.description.description}
        </h2>
      </div>
      
      {/* Main Content - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Dice Rolls */}
        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Dice Rolls</h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            <DiceRollDisplay roll={diceRolls.type} label="Type" />
            <DiceRollDisplay roll={diceRolls.description} label="Description" />
            <DiceRollDisplay roll={diceRolls.hitPoints} label="Hit Points" modifier={10} />
            <DiceRollDisplay roll={diceRolls.ability} label="Ability" />
            <DiceRollDisplay roll={diceRolls.modifier} label="Modifier" />
            <DiceRollDisplay roll={diceRolls.armorClass} label="Armor Class" modifier={10} />
            <DiceRollDisplay roll={diceRolls.damageModifier} label="Damage Mod" />
          </div>
        </div>
        
        {/* Middle Column - Stats and Abilities */}
        <div className="space-y-3">
          {/* Basic Stats Grid */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Basic Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <div className="text-xs text-gray-600">Hit Points</div>
                <div className="text-lg font-bold text-indigo-700">
                  {minion.hitPoints}
                </div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <div className="text-xs text-gray-600">Armor Class</div>
                <div className="text-lg font-bold text-indigo-700">{minion.armorClass}</div>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg">
                <div className="text-xs text-gray-600">Speed</div>
                <div className="text-lg font-bold text-indigo-700">{minion.speed} ft</div>
              </div>
              <div 
                className="bg-indigo-50 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors relative group"
                onClick={handleDamageRoll}
              >
                <div className="absolute top-1 right-1">
                  <DiceIcon />
                </div>
                <div className="text-xs text-gray-600">Base Damage</div>
                <div className="text-lg font-bold text-indigo-700">
                  1{minion.baseDamageDice}+{minion.damageModifier}
                </div>
              </div>
            </div>
          </div>
          
          {/* Abilities Grid */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Abilities</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-1">
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
                    className={`p-2 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity relative ${
                      ability === minion.ability.mainAbility 
                        ? 'bg-green-100 border border-green-300' 
                        : ability === minion.flawAbility 
                          ? 'bg-red-100 border border-red-300'
                          : 'bg-gray-100'
                    }`}
                    onClick={() => handleAbilityRoll(ability, modifier)}
                  >
                    <div className="absolute top-1 right-1">
                      <D20Icon className={
                        ability === minion.ability.mainAbility 
                          ? 'text-green-700'
                          : ability === minion.flawAbility
                            ? 'text-red-700'
                            : 'text-gray-500'
                      } />
                    </div>
                    <div className="text-xs font-medium">{ability}</div>
                    <div className="text-sm font-bold">
                      {modifier >= 0 ? '+' : ''}{modifier}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Right Column - Special Traits and Roll History */}
        <div className="flex flex-col h-full">
          <div className="flex-none">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Special Traits</h3>
            <div className="bg-yellow-50 p-2 rounded-lg mb-2 text-sm">
              <div className="font-medium text-yellow-800">Type: {minion.type.type}</div>
              <div className="text-yellow-700 break-words">{minion.type.specialTrait}</div>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg text-sm mb-2">
              <div className="font-medium text-purple-800">Skill: {minion.ability.specialSkill}</div>
              <div className="text-purple-700 break-words">{minion.ability.specialSkillDescription}</div>
            </div>
          </div>

          {/* Roll History */}
          {rollHistory.length > 0 && (
            <div className="flex-1 mt-2">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Roll History</h3>
              <div className="flex flex-col-reverse gap-1 h-[200px] md:h-[150px] overflow-y-auto pr-1">
                {rollHistory.map((roll, index) => {
                  const isAbility = roll.type === 'ability';
                  // Calculate color index based on position from end
                  // index 0 is oldest (in the array), so we want that to be darkest
                  const reversedIndex = rollHistory.length - 1 - index;
                  const colorIndex = Math.min(4, reversedIndex); // 0-4, where 0 is lightest
                  
                  const bgColorClass = [
                    isAbility ? 'bg-blue-300' : 'bg-purple-300', // Lightest (newest)
                    isAbility ? 'bg-blue-400' : 'bg-purple-400',
                    isAbility ? 'bg-blue-500' : 'bg-purple-500',
                    isAbility ? 'bg-blue-600' : 'bg-purple-600',
                    isAbility ? 'bg-blue-700' : 'bg-purple-700'  // Darkest (oldest)
                  ][4 - colorIndex]; // Reverse the color selection
                  
                  return (
                    <div 
                      key={roll.timestamp}
                      className={`${bgColorClass} text-white py-1 px-2 rounded text-sm animate-fadeIn shadow-sm flex-shrink-0`}
                    >
                      {roll.type === 'ability' ? (
                        <>{roll.ability}: {roll.roll} {roll.modifier >= 0 ? '+' : ''}{roll.modifier} = {roll.total}</>
                      ) : (
                        <>Damage: {roll.roll} + {roll.modifier} = {roll.total}</>
                      )}
                    </div>
                  );
                })}
                <div ref={historyEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinionCard; 