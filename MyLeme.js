/**
 * Leme
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeme extends CGFobject {
	constructor(scene) {
        super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        this.quad = new MyQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
    }
    
    display(){

    

        this.scene.pushMatrix();
        this.scene.translate(-2.5,0,0);
        this.scene.scale(2,2,2);
        this.quad.display();
        this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.scale(1.5,1,1);
        this.triangle.display();
        



    }

    
}

