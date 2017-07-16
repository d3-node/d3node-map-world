const D3Node = require('d3-node')
const topojson = require('topojson')
const topoData = require('./data/world.json')
const d3Geo = require('d3-geo-projection')

const defColors = ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)', 'rgb(3,19,43)']
const defRanges = [10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000]

function world (population, { width = 960, height = 500, colors = defColors, colorRanges = defRanges, styles = '' }) {
  const d3n = new D3Node({
    styles
  })

  const d3 = d3n.d3

  const color = d3.scaleThreshold()
    .domain(colorRanges)
    .range(colors)

  const projection = d3Geo.geoNaturalEarth()
    .scale(148)
    .rotate([352, 0, 0])
    .translate([ width / 2, height / 2 ])

  const path = d3.geoPath().projection(projection)

  const svg = d3n.createSVG(width, height)

  const populationHash = {}

  population.forEach((d) => { populationHash[d.id] = +d.population })
  topoData.features.forEach((d) => { d.population = populationHash[d.id] })

  svg.append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(topoData.features)
    .enter().append('path')
    .attr('d', path)
    .attr('data-country', (d) => {
      return `${d.properties.name},${populationHash[d.id]}`
    })
    .style('fill', function (d) { return color(populationHash[d.id]) })
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style('opacity', 0.8)

  svg.append('path')
    .datum(topojson.mesh(topoData.features, (a, b) => { return a.id !== b.id }))
    .attr('class', 'names')
    .attr('d', path)

  return d3n
}

module.exports = world
