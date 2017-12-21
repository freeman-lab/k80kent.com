precision highp float;

uniform mat4 proj;
uniform mat4 model;
uniform mat4 view;

attribute vec3 barycentric;
varying vec3 vBarycentric;

attribute vec3 position;
varying vec3 vPosition;

void main () {
  gl_Position = proj * view * model * vec4(position.xyz, 1.0);
  vBarycentric = barycentric;
  vPosition = position.xyz;
}