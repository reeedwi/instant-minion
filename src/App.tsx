import React, { useState } from 'react';
import { Minion, DiceRoll } from './types';
import { generateMinion, rollDice } from './utils/minionGenerator';
import MinionCard from './components/MinionCard';

const App: React.FC = () => {
  const [minion, setMinion] = useState<Minion | null>(null);
  const [diceRolls, setDiceRolls] = useState<{
    type: DiceRoll;
    description: DiceRoll;
    hitPoints: DiceRoll;
    ability: DiceRoll;
    modifier: DiceRoll;
    armorClass: DiceRoll;
    damageModifier: DiceRoll;
  } | null>(null);

  const handleGenerateMinion = () => {
    // Roll all the dice
    const typeRoll = rollDice('d100');
    const descriptionRoll = rollDice('d10');
    const hitPointsRoll = rollDice('d20');
    const abilityRoll = rollDice('d12');
    const modifierRoll = rollDice('d8');
    const armorClassRoll = rollDice('d6');
    const damageModifierRoll = rollDice('d4');
    
    // Store the dice rolls for display
    const displayRolls = {
      type: typeRoll,
      description: descriptionRoll,
      hitPoints: hitPointsRoll,  // Don't modify the roll, let DiceRollDisplay handle the +10
      ability: abilityRoll,
      modifier: modifierRoll,
      armorClass: armorClassRoll,  // Don't modify the roll, let DiceRollDisplay handle the +10
      damageModifier: damageModifierRoll,
    };
    
    setDiceRolls(displayRolls);
    
    // Generate the minion using the raw rolls
    const generatorRolls = {
      typeRoll,
      descriptionRoll,
      hitPointsRoll,  // Pass the raw roll, the generator will add +10
      abilityRoll,
      modifierRoll,
      armorClassRoll,  // Pass the raw roll, the generator will add +10
      damageModifierRoll,
    };
    
    const newMinion = generateMinion(generatorRolls);
    setMinion(newMinion);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800 break-words">Instant Minion Generator</h1>
            <div className="text-sm text-gray-600 italic break-words">
              Created using Caldwell Tanner's Instant Minion Rules from Not Another D&D Podcast
            </div>
          </div>
          <button
            onClick={handleGenerateMinion}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            Generate Minion
          </button>
        </div>
        
        {minion && diceRolls && (
          <MinionCard minion={minion} diceRolls={diceRolls} />
        )}
        
        {!minion && (
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <p className="text-gray-600">
              Click the button above to generate your first minion!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 