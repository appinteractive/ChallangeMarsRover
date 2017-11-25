
const helpers = require('./helpers')
const Rover = require('./rover')

// const path = require('path');
const fs = require('fs');

/**
 * RoverCommand Class
 * @type {RoverCommand}
 */
const roverCommand = class RoverCommand {

  /**
   * Parses configurations (deploy positon and move instructions) from file, text and arrays (see tests)
   * @param data
   */
  constructor (data) {
    if (typeof data !== 'string' && !data.length) {
      throw new TypeError(`Expected x & y to be numbers, got x: ${typeof x} & y: ${typeof y}`);
    }

    this.instructions = []
    this.rovers = {}

    if (typeof data === 'string' && data.indexOf('/') >= 0) {
      // parse instructions from file
      this._parse(fs.readFileSync(data).toString().split("\n"))
    } else if (typeof data === 'string') {
      // parse instructions from string
      this._parse(data.split("\n"))
    } else {
      // parse instructions from array
      this._parse(data)
    }
  }

  /**
   * Deploy Rovers to the configures positions
   * @returns {Promise}
   */
  deploy () {
    return helpers.eachSeries(this.instructions, (instruction) => {
      this.rovers[instruction.name] = new Rover(instruction.deployZone[0], instruction.deployZone[1], instruction.deployZone[2])
    })
  }

  /**
   * Get Rovers and Move them one after another
   * @returns {Promise}
   */
  move () {
    return helpers.eachSeries(this.instructions, instruction => {
      const rover = this.rovers[instruction.name]
      return rover.command(instruction.commands)
    })
  }

  /**
   * Return the directions as "x y direction"
   * @returns {string}
   */
  getRovers () {
    return this.rovers
  }

  /**
   * Perse the instructions
   * @param instructions
   * @private
   */
  _parse (instructions) {
    instructions.forEach((commands) => {
      if (commands.indexOf(';') >= 0) {
        commands = commands.split(';')
      }
      const deployZone = commands[1].split(' ')
      this.instructions.push({
        name:       commands[0],
        deployZone: [parseInt(deployZone[0]), parseInt(deployZone[1]), deployZone[2]],
        commands:   commands[2]
      })
    })
  }
}
module.exports = roverCommand
