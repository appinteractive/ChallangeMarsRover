# Challange - Mars Rovers 

[![NPM](https://img.shields.io/npm/v/challange-mars-rovers.svg)](https://www.npmjs.com/package/challange-mars-rovers)
[![Maintainability](https://api.codeclimate.com/v1/badges/91172699e1d92f1b719d/maintainability)](https://codeclimate.com/github/appinteractive/ChallangeMarsRover/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/91172699e1d92f1b719d/test_coverage)](https://codeclimate.com/github/appinteractive/ChallangeMarsRover/test_coverage)
[![CircleCI](https://circleci.com/gh/appinteractive/ChallangeMarsRover.svg?style=svg)](https://circleci.com/gh/appinteractive/ChallangeMarsRover)

## Description
A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y coordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

#### Input 
The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

The rest of the input is information pertaining to the rovers that have been deployed. Each rover has two lines of input. The first line gives the rover’s position, and the second line is a series of instructions telling the rover how to explore the plateau.

The position is made up of two integers and a letter separated by spaces, corresponding to the x and y coordinates and the rover’s orientation.

Each rover will be finished sequentially, which means that the second rover won’t start to move until the first one has finished moving.

#### Output 
The output for each rover should be its final coordinates and heading. Input and 

#### Test Input:
- Plateau size: 5x5
- Rover 1 deploy zone: 1 2 N 
- Rover 1 movement: LMLMLMLMM 
- Rover 2 deploy zone: 3 3 E 
- Rover 2 movement: MMRMMRMRRM

#### Expected Output:
- Rover 1 position: 1 3 N
- Rover 2 position: 5 1 E

## Install

```
$ npm install challange-mars-rovers
```

## Usage

```js
const Rover = require('challange-mars-rovers')
 
// deploy rovers to given start zone
const Rover1 = new Rover(1, 2, 'N')
const Rover2 = new Rover(3, 3, 'E')
 
// you have two options
/**************************************
 * 1. using async functions
 **************************************/
 
async function doIt () {
  // move the rovers (inside an async method)
  await Rover1.command('LMLMLMLMM')
  await Rover2.command('MMRMMRMRRM')
 
  console.log('Rover1 x:', Rover1.getX()) // 1
  console.log('Rover1 y:', Rover1.getY()) // 3
  console.log('Rover1 direction:', Rover1.getDirection()) // N
  console.log('Rover1 coordinates:', Rover1.getCoordinates()) // 1 3 N
 
  console.log('Rover2 coordinates:', Rover2.getCoordinates()) // 5 1 E
}
doIt()
 
 
/**************************************
 * 2. use the promise notation
 **************************************/
 
// deploy rovers to given start zone
const Rover3 = new Rover(3, 3, 'E')
Rover3.command('MMRMMRMRRM').then(() => {
  console.log('Rover3 coordinates:', Rover3.getCoordinates()) // 5 1 E
})
```

## Test

```
// inside the repository
$ npm install 
$ npm run test
```

## License

MIT © Grzegorz Leoniec <greg@app-interactive.de>
