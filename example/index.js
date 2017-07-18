const output = require('d3node-output')
const worldMap = require('../')
const fs = require('fs')
const data = fs.readFileSync('data/world-pop.tsv').toString()
const d3 = require('d3')
const populationsByCountry = d3.tsvParse(data)

// create output files
const options = {} // use defaults
output('./example/output', worldMap(populationsByCountry, options))
