## Map of World 

Choropleth of countries by populations

## Install
```bash
$ npm install d3node-map-world
```

## Usage

```js
const d3nMap = require('d3node-map-world');
const map = d3nMap(data, { projectionKey: 'Mercator' })
```

Check out the [example](./example) for usage.

##### Output the example map to an image
```
npm start
```

#### Output (Natural Earth projection):
![map](./example/output-NaturalEarth.png)

## API

### d3nMap(data, options)

##### data

- Type: `Array`

Delimited data file parsed by d3

#### Options `<Object>`

- projectionKey (default: NaturalEarth)
- width (default: 960)
- height (default: 500)
- colors `Hex, RGB color code`
- colorRanges
- styles


## Other Projections
#### Albers
![map](./example/output-Albers.png)
#### Boggs
![map](./example/output-Boggs.png)
#### Collignon
![map](./example/output-Collignon.png)
#### CylindricalEqualArea
![map](./example/output-CylindricalEqualArea.png)
#### Eckert4
![map](./example/output-Eckert4.png)
#### Hammer
![map](./example/output-Hammer.png)
#### Hill
![map](./example/output-Hill.png)
#### Homolosine
![map](./example/output-Homolosine.png)
#### Kavrayskiy7
![map](./example/output-Kavrayskiy7.png)
#### Lagrange
![map](./example/output-Lagrange.png)
#### Mercator
![map](./example/output-Mercator.png)
#### Miller
![map](./example/output-Miller.png)
#### Mollweide
![map](./example/output-Mollweide.png)


### LICENSE

[MIT](LICENSE) &copy; [d3-node](https://github.com/d3-node)
