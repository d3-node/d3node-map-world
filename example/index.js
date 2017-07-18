const output = require('d3node-output')
const worldMap = require('../')
const fs = require('fs')
const csvString = fs.readFileSync('data/world-pop.tsv').toString()
const d3 = require('d3')
const populationsByCountry = d3.tsvParse(csvString)

// create output files
const optionsList = [
  { projectionKey: 'Albers' },
  { projectionKey: 'Boggs' },
  { projectionKey: 'Collignon' },
  { projectionKey: 'CylindricalEqualArea' },
  { projectionKey: 'Eckert4' },
  { projectionKey: 'Hammer' },
  { projectionKey: 'Hill' },
  { projectionKey: 'Hammer' },
  { projectionKey: 'Homolosine' },
  { projectionKey: 'Kavrayskiy7' },
  { projectionKey: 'Lagrange' },
  { projectionKey: 'Mollweide' },
  { projectionKey: 'Mercator' },
  { projectionKey: 'Miller' },
  { projectionKey: 'NaturalEarth' }
]

// use defaults
optionsList.forEach((options) => {
  output(`./example/output-${options.projectionKey}`, worldMap(populationsByCountry, options))
})
