attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying float vYPosition;

void main() {
	vTextureCoord = aTextureCoord;
	vYPosition = aVertexPosition.y;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}