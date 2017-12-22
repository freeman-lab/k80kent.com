var path = require('path')
var css = require('dom-css')
var mat4 = require('gl-mat4')
var fit = require('canvas-fit')
var glslify = require('glslify')
var ismobile = require('is-mobile')()

// import our custom functions
var colors = require('./colors.js')
var makecube = require('./cube.js')

// create our cubes
var cube1 = makecube(4)
var cube2 = makecube(3.8)
var cube3 = makecube(4.2)

// setup the canvas and regl context
var canvas = document.body.appendChild(document.createElement('canvas'))
var regl = require('regl')({canvas: canvas, extensions: ['OES_standard_derivatives']})
window.addEventListener('resize', fit(canvas), false)

// setup the camera
var camera = require('canvas-orbit-camera')(canvas, {scale: false, pan: false})

// pick the initial position of the camera
camera.lookAt([20, 14.4, -28.8], [0, 0, 0], [1, 0, 0])

// define a function to draw a cube
var drawCube = regl({
  frag: glslify(path.resolve(__dirname, 'shader/wire.frag')),
  vert: glslify(path.resolve(__dirname, 'shader/wire.vert')),
  attributes: {
    position: regl.prop('position'),
    barycentric: regl.prop('barycentric')
  },
  uniforms: {
    proj: regl.prop('proj'),
    model: regl.prop('model'),
    view: regl.prop('view'),
    thickness: 0.03,
    stroke: colors[0].rgb,
    fill: colors[1].rgb,
    time: regl.prop('time')
  },
  count: 36
})

// create some empty variables
var t0, t1, view, proj, rot1, rot2, rot3

// store the current time
t0 = Date.now()

// main drawing loop
regl.frame(({viewportWidth, viewportHeight}) => {
  
  // clear the background color
  regl.clear({
    color: [colors[2].rgb[0], colors[2].rgb[1], colors[2].rgb[2], 1]
  })

  // get the current time
  t1 = (Date.now() - t0)/600

  // rotate the camera
  camera.rotate([0, 0, 0], [0.001, -0.001, 0])

  // get projection and view matrices
  proj = mat4.perspective([], Math.PI/7, viewportWidth/viewportHeight, 0.001, 1000)
  view = camera.view()

  // create transformation matrices including rotation and random scaling
  rot1 = mat4.rotateX(mat4.identity([]), mat4.identity([]), Math.PI/2)
  rot2 = mat4.rotateY(mat4.identity([]), mat4.identity([]), Math.PI/2)
  rot3 = mat4.rotateZ(mat4.identity([]), mat4.identity([]), Math.PI/2)
  mat4.scale(rot1, rot1, [1, 1, Math.sin(t1 * 0.5) * 0.5 + 0.6])
  mat4.scale(rot2, rot2, [1, 1, Math.sin(t1 * 0.5 + 0.5) * 0.5 + 0.6])
  mat4.scale(rot3, rot3, [1, 1, Math.sin(t1 * 0.5 + 1) * 0.5 + 0.6])

  // tick the camera
  camera.tick()

  // draw all three rectangles
  drawCube({
    time: t1,
    model: rot1,
    proj: proj,
    view: view,
    position: cube1.positions,
    normal: cube1.normals,
    barycentric: cube1.barycentric
  })
  drawCube({
    time: t1,
    model: rot2,
    proj: proj,
    view: view,
    position: cube2.positions,
    normal: cube2.normals,
    barycentric: cube2.barycentric
  })
  drawCube({
    time: t1,
    model: rot3,
    proj: proj,
    view: view,
    position: cube3.positions,
    normal: cube3.normals,
    barycentric: cube3.barycentric
  })
})

var name = document.body.appendChild(document.createElement('div'))
css(name, {
  position: 'absolute', left: ismobile ? '10%' : '5%', top: '5%',
  fontSize: ismobile ? '68pt' : '68pt', color: colors[0].hex,
  fontFamily: 'Crimson Text', borderBottom: colors[0].hex + ' dotted 2px'
})
name.innerHTML = "Katie Kent"

if (!ismobile) {
  var description = document.body.appendChild(document.createElement('div'))
  css(description, {
    position: 'absolute', left: '75%', bottom: '12%', width: '20%',
    fontSize: '22pt', color: colors[0].hex,
    fontFamily: 'Crimson Text', lineHeight: '26pt'
  })
  description.innerHTML = "Hi! I'm Katie. I like to solve tricky human problems with data & software. Currently, I'm a Product Manager at Flexport, where my team builds the 'Uber Pool' of ocean container shipping. In my free time, I like adventuring, outdoors, yoga, and red pandas."
}

var linkedin = document.body.appendChild(document.createElement('a'))
css(linkedin, {
  position: 'absolute', left: ismobile ? '10%' : '5%', bottom: '12%',
  bottom: ismobile ? '7%' : '12%',
  fontSize: ismobile ? '42pt' : '22pt', color: colors[0].hex,
  fontFamily: 'Crimson Text', borderBottom: colors[0].hex + ' dotted 2px',
  textDecoration: 'none'
})
linkedin.innerHTML = 'linkedin'
linkedin.href = 'https://www.linkedin.com/in/katiekent/'

var twitter = document.body.appendChild(document.createElement('a'))
css(twitter, {
  position: 'absolute', left: ismobile ? '50%' : '15%', 
  bottom: ismobile ? '7%' : '12%',
  fontSize: ismobile ? '42pt' : '22pt', color: colors[0].hex,
  fontFamily: 'Crimson Text', borderBottom: colors[0].hex + ' dotted 2px',
  textDecoration: 'none'
})
twitter.innerHTML = '@k80kent'
twitter.href = 'https://twitter.com/k80kent'

var profile = document.body.appendChild(document.createElement('img'))
css(profile, {
  position: 'absolute', left: '75%', top: '20%', width: '100px'
})
profile.src = './katie.jpg'

var overlay = document.body.appendChild(document.createElement('div'))
css(profile, {
  position: 'absolute', left: '75%', top: '20%', width: '100px',
  border: colors[0].hex + ' dotted 2px'
})
