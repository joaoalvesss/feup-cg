#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec2 vTextureCoord;

uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;
    
    float swayFrequency = 0.8; 
    float swayAmplitude = 0.8;  
    float swayOffset = swayAmplitude * sin(swayFrequency * timeFactor);
    float curveFactor = pow(aVertexPosition.y / 2.0, 2.0); 
    float offsetX = swayOffset * curveFactor;

    vec3 offset = vec3(offsetX, 0.0, 0.0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
