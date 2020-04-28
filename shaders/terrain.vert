attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {

	vTextureCoord = aTextureCoord;

	vec3 offSet = 8.0 * aVertexNormal * (texture2D(uSampler2, vTextureCoord).r);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offSet, 1.0);
}





