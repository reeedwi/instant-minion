import React from 'react';
import { DiceRoll } from '../types';

interface DiceRollDisplayProps {
  roll: DiceRoll;
  label: string;
  modifier?: number;
}

const DiceRollDisplay: React.FC<DiceRollDisplayProps> = ({ roll, label, modifier = 0 }) => {
  const total = roll.result + modifier;
  
  return (
    <div className="flex items-center mb-2">
      <div className="w-32 font-medium text-gray-700">{label}:</div>
      <div className="flex items-center">
        <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-lg mr-2">
          {roll.result}
        </span>
        {modifier !== 0 && (
          <>
            <span className="text-gray-500 mr-2">{modifier > 0 ? '+' : ''}{modifier}</span>
            <span className="text-gray-700 font-semibold">=</span>
            <span className="bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg ml-2">
              {total}
            </span>
          </>
        )}
        <span className="text-gray-500 ml-2">({roll.dice})</span>
      </div>
    </div>
  );
};

export default DiceRollDisplay; 