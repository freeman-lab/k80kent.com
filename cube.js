var unindex = require('unindex-mesh')
var reindex = require('mesh-reindex')
var extrude = require('extrude')

// add barycentric coordinates to each triangle
function addBarycentricCoordinates (geometry, removeEdge = false) {
  const attrib = geometry.positions
  const count = attrib.length / 3
  const barycentric = []

  // for each triangle in the geometry, add the barycentric coordinates
  for (let i = 0; i < count; i++) {
    const even = i % 2 === 0;
    const Q = removeEdge ? 1 : 0
    if (even) {
      barycentric.push([0, 0, 1])
      barycentric.push([0, 1, 0])
      barycentric.push([1, 0, Q])
    } else {
      barycentric.push([0, 0, 1])
      barycentric.push([0, 1, 0])
      barycentric.push([1, 0, Q])
    }
  }

  // add the attribute to the geometry
  return barycentric
}

// construct a cube geometry for a given size
function cube (size) {
  var points = [[-size, -size], [size, -size], [size, size], [-size, size]]
  var complex = extrude(points, {bottom: -1.333, top: 1.333})
  var flattened = unindex(complex.positions, complex.cells)
  var complex = reindex(flattened)
  complex.barycentric = addBarycentricCoordinates(complex, true)

  // hack to fix barycentric coordinates
  complex.barycentric[24] = [0, 1, 0]
  complex.barycentric[25] = [0, 0, 1]
  complex.barycentric[26] = [1, 0, 1]
  complex.barycentric[27] = [1, 0, 1]
  complex.barycentric[28] = [0, 1, 0]
  complex.barycentric[29] = [1, 0, 1]

  complex.barycentric[30] = [1, 0, 1]
  complex.barycentric[31] = [0, 1, 0]
  complex.barycentric[32] = [1, 0, 1]
  complex.barycentric[33] = [0, 1, 0]
  complex.barycentric[34] = [0, 0, 1]
  complex.barycentric[35] = [1, 0, 1]

  return complex
}

module.exports = cube