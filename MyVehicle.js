/**
 * Vehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        this.pyramid = new MyPyramid(this.scene,4,1);
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

}

