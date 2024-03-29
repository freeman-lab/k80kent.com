precision highp float;
uniform mat4 proj;
uniform mat4 model;
uniform mat4 view;
attribute vec3 position;
attribute vec3 normal;
varying vec3 vnormal;
varying vec3 vposition;
void main () {
  vnormal = normal;
  vposition = position;
  gl_Position = proj * view * model * vec4(position, 1.0);
}