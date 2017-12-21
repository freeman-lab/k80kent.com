var palettes = require('nice-color-palettes')
var hexrgb = require('hex-rgb')

// hard code our favorite colors
var indices = [74, 14, 38, 69, 61, 28, 4, 63, 54, 51, 7, 6, 82, 65]

// build a list of our favorite colors
var selected = []
indices.map(function (d) {
	selected.push(palettes[d])
})

// sample one of them randomly
var selection = Math.floor(Math.random() * 14)
var palette = selected[selection]

// build an object with the colors in hex and rgb form
var colors = {
	0: {
		hex: palette[0],
		rgb: hexrgb(palette[0]).map(function (d) {return d/255})
	},
	1: {
		hex: palette[1],
		rgb: hexrgb(palette[1]).map(function (d) {return d/255})
	},
	2: {
		hex: palette[2],
		rgb: hexrgb(palette[2]).map(function (d) {return d/255})
	}
}

module.exports = colors