const D3Node = require('d3-node')
const topojson = require('topojson')
const topoData = require('./data/world.json')
const d3Geo = require('d3-geo-projection')

const defColors = ['rgb(247,251,255)', 'rgb(222,235,247)', 'rgb(198,219,239)', 'rgb(158,202,225)', 'rgb(107,174,214)', 'rgb(66,146,198)', 'rgb(33,113,181)', 'rgb(8,81,156)', 'rgb(8,48,107)', 'rgb(3,19,43)']
const defRanges = [10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000]

function getProjection (key, d3, _d3) {
  const lowerKey = key.toLowerCase()

  var projections = [
    {key: 'albers', name: 'Albers', projection: _d3.geoAlbers().scale(145).parallels([20, 50])},
    {key: 'equirectangular', name: 'Equirectangular', projection: _d3.geoEquirectangular()},
    {key: 'aitoff', name: 'Aitoff', projection: d3.geoAitoff()},
    {key: 'august', name: 'August', projection: d3.geoAugust().scale(60)},
    {key: 'baker', name: 'Baker', projection: d3.geoBaker().scale(100)},
    {key: 'boggs', name: 'Boggs', projection: d3.geoBoggs()},
    {key: 'bonne', name: 'Bonne', projection: d3.geoBonne().scale(120)},
    {key: 'bromley', name: 'Bromley', projection: d3.geoBromley()},
    {key: 'collignon', name: 'Collignon', projection: d3.geoCollignon().scale(93)},
    {key: 'Craster', name: 'Craster', projection: d3.geoCraster()},
    {key: 'eckert1', name: 'Eckert I', projection: d3.geoEckert1().scale(165)},
    {key: 'eckert2', name: 'Eckert II', projection: d3.geoEckert2().scale(165)},
    {key: 'eckert3', name: 'Eckert III', projection: d3.geoEckert3().scale(180)},
    {key: 'eckert4', name: 'Eckert IV', projection: d3.geoEckert4().scale(180)},
    {key: 'eckert5', name: 'Eckert V', projection: d3.geoEckert5().scale(170)},
    {key: 'eckert6', name: 'Eckert VI', projection: d3.geoEckert6().scale(170)},
    {key: 'eisenlohr', name: 'Eisenlohr', projection: d3.geoEisenlohr().scale(60)},
    {key: 'hammer', name: 'Hammer', projection: d3.geoHammer().scale(165)},
    {key: 'hill', name: 'Hill', projection: d3.geoHill()},
    {key: 'homolosine', name: 'Goode Homolosine', projection: d3.geoHomolosine()},
    {key: 'kavrayskiy7', name: 'Kavrayskiy VII', projection: d3.geoKavrayskiy7()},
    {key: 'cylindricalequalarea', name: 'Lambert cylindrical equal-area', projection: d3.geoCylindricalEqualArea()},
    {key: 'lagrange', name: 'Lagrange', projection: d3.geoLagrange().scale(120)},
    {key: 'larrivee', name: 'Larrivée', projection: d3.geoLarrivee().scale(95)},
    {key: 'laskowski', name: 'Laskowski', projection: d3.geoLaskowski().scale(120)},
    {key: 'loximuthal', name: 'Loximuthal', projection: d3.geoLoximuthal()},
    {key: 'mercator', name: 'Mercator', projection: _d3.geoMercator().scale(490 / 2 / Math.PI)},
    {key: 'miller', name: 'Miller', projection: d3.geoMiller().scale(100)},
    {key: 'mtflatpolarparabolic', name: 'McBryde–Thomas Flat-Polar Parabolic', projection: d3.geoMtFlatPolarParabolic()},
    {key: 'mtflatpolarquartic', name: 'McBryde–Thomas Flat-Polar Quartic', projection: d3.geoMtFlatPolarQuartic()},
    {key: 'mtflatpolarsinusoidal', name: 'McBryde–Thomas Flat-Polar Sinusoidal', projection: d3.geoMtFlatPolarSinusoidal()},
    {key: 'mollweide', name: 'Mollweide', projection: d3.geoMollweide().scale(165)},
    {key: 'naturalearth', name: 'Natural Earth', projection: d3.geoNaturalEarth()},
    {key: 'nellhammer', name: 'Nell–Hammer', projection: d3.geoNellHammer()},
    {key: 'polyconic', name: 'Polyconic', projection: d3.geoPolyconic().scale(100)},
    {key: 'robinson', name: 'Robinson', projection: d3.geoRobinson()},
    {key: 'sinusoidal', name: 'Sinusoidal', projection: d3.geoSinusoidal()},
    {key: 'sinumollweide', name: 'Sinu-Mollweide', projection: d3.geoSinuMollweide()},
    {key: 'vandergrinten', name: 'van der Grinten', projection: d3.geoVanDerGrinten().scale(75)},
    {key: 'vandergrinten4', name: 'van der Grinten IV', projection: d3.geoVanDerGrinten4().scale(120)},
    {key: 'wagner4', name: 'Wagner IV', projection: d3.geoWagner4()},
    {key: 'wagner6', name: 'Wagner VI', projection: d3.geoWagner6()},
    {key: 'wagner7', name: 'Wagner VII', projection: d3.geoWagner7()},
    {key: 'winkel3', name: 'Winkel Tripel', projection: d3.geoWinkel3()}
  ]

  projections.forEach(function (p) {
    p.projection.rotate([0, 0]).center([0, 0])
  })

  const projectionInfo = projections.find(projection => projection.key === lowerKey) || { projection: d3.geoNaturalEarth() }
  return projectionInfo.projection
}

function world (population, { width = 960, height = 500, colors = defColors, colorRanges = defRanges, projectionKey = 'Mercator', styles = '' }) {
  const d3n = new D3Node({
    styles
  })

  const d3 = d3n.d3

  const color = d3.scaleThreshold()
    .domain(colorRanges)
    .range(colors)

  const projection = getProjection(projectionKey, d3Geo, d3)

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
