#ifdef GL_ES
precision highp float;
#endif


varying vec4 coords;

uniform float nSupplies;


void main() {
    
    if((coords.x+0.5) < nSupplies*0.2)
        gl_FragColor.rgba = vec4(1.0-(coords.x+0.5),(coords.x+0.5),0,1);
    else
        gl_FragColor.rgba = vec4(0.5,0.5,0.5,1);
}