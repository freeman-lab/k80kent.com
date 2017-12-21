precision highp float;

varying vec3 vPosition;

void main () {
  gl_FragColor = vec4(abs(vPosition), 1.0);
}