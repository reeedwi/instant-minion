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
    
    // Store the dice rolls
    setDiceRolls({
      type: typeRoll,
      description: descriptionRoll,
      hitPoints: hitPointsRoll,
      ability: abilityRoll,
      modifier: modifierRoll,
      armorClass: armorClassRoll,
      damageModifier: damageModifierRoll,
    });
    
    // Generate the minion
    const newMinion = generateMinion();
    setMinion(newMinion);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Instant Minion Generator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate a random minion for your tabletop role-playing game with a single click.
            Roll the dice and see what you get!
          </p>
        </header>
        
        <div className="text-center mb-8">
          <button
            onClick={handleGenerateMinion}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
          >
            Generate Minion
          </button>
        </div>
        
        {minion && diceRolls && (
          <MinionCard minion={minion} diceRolls={diceRolls} />
        )}
        
        {!minion && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              Click the button above to generate your first minion!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 