# Instant Minion Generator

A clean, simple web application for generating random minions for tabletop role-playing games (TTRPGs).

## Features

- **One-Click Generation**: Generate a complete minion with a single button click
- **Dice Roll Visualization**: See the actual dice rolls that determine your minion's attributes
- **Clean UI**: Easy-to-read display of all minion stats and abilities
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

The generator follows the rules specified in the Instant Minion Requirements document:

1. Rolls a series of dice to determine various attributes:
   - **D100**: Determines the minion's type
   - **D10**: Determines a unique descriptive trait
   - **D20 (+10)**: Determines Hit Points
   - **D12**: Determines the main ability and special skill
   - **D8**: Determines the main modifier (used for attacks, spells, and abilities)
   - **D6 (+10)**: Determines Armor Class
   - **D4**: Determines the damage modifier

2. Applies special rules based on minion type and abilities

3. Displays the complete minion with all stats and traits

## Technologies Used

- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Click the "Generate Minion" button
2. View the dice rolls and resulting minion stats
3. Use the generated minion in your TTRPG campaign

## License

MIT 