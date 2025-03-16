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
    <div className="flex items-center mb-1 text-sm">
      <div className="w-20 font-medium text-gray-700">{label}:</div>
      <div className="flex items-center">
        <span className="text-gray-500 text-xs mr-1">({roll.dice})</span>
        <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded">
          {roll.result}
        </span>
        {modifier !== 0 && (
          <>
            <span className="text-gray-500 mx-1">+{modifier}</span>
            <span className="text-gray-700">=</span>
            <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded ml-1">
              {total}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default DiceRollDisplay; 