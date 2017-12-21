precision highp float;
#extension GL_OES_standard_derivatives : enable

varying vec3 vBarycentric;
varying vec3 vPosition;

uniform float thickness;
uniform float time;

uniform vec3 stroke;
uniform vec3 fill;

#pragma glslify: noise = require('glsl-noise/simplex/4d');
#pragma glslify: PI = require('glsl-pi');

// This is like
float aastep (float threshold, float dist) {
  float afwidth = fwidth(dist) * 0.5;
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

// This function returns the fragment color for our styled wireframe effect
// based on the barycentric coordinates for this fragment
vec4 getStyledWireframe (vec3 barycentric) {
  // this will be our signed distance for the wireframe edge
  float d = min(min(barycentric.x, barycentric.y), barycentric.z);

  // we can modify the distance field to create interesting effects & masking
  float noiseOff = 0.0;
  noiseOff += noise(vec4(vPosition.xyz * 120.0, time * 0.5)) * 0.12;
  d += noiseOff;

  // for dashed rendering, we can use this to get the 0 .. 1 value of the line length
  float positionAlong = max(barycentric.x, barycentric.y);
  if (barycentric.y < barycentric.x && barycentric.y < barycentric.z) {
    positionAlong = 1.0 - positionAlong;
  }

  // the thickness of the stroke
  float computedThickness = thickness;

  // compute the anti-aliased stroke edge  
  float edge = 1.0 - aastep(computedThickness, d);

  // now compute the final color of the mesh
  vec4 outColor = vec4(0.0);
  vec3 mainStroke = mix(fill, stroke, edge);
  outColor.a = 1.0;
  outColor.rgb = mainStroke;

  return outColor;
}

void main () {
  gl_FragColor = getStyledWireframe(vBarycentric);
}