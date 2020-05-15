/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene,20);
        this.shader=new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.terrainTex=new CGFtexture(this.scene,'images/terrain.jpg');
        this.heightTex=new CGFtexture(this.scene,'images/heightmap2.png');
        this.shader.setUniformsValues({ uSampler1: 1 });
        this.shader.setUniformsValues({ uSampler2: 2 });
    
    }
    
    display(){

        this.scene.setActiveShader(this.shader);
        this.terrainTex.bind(1);
        this.heightTex.bind(2);
        
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,1);
        this.plane.display();

        this.scene.popMatrix();
        // restore default shader (will be needed for drawing the axis in next frame)
		this.scene.setActiveShader(this.scene.defaultShader);
    }

}