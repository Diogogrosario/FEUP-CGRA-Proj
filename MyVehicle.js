/**
 * Vehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene) {
        super(scene);
        this.angle = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
		this.initBuffers();
	}
	
	initBuffers() {
        this.pyramid = new MyPyramid(this.scene,4,1);
    }
    
    display(){

        this.scene.pushMatrix()
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(this.angle,0,1,0);

        // Original pos
        this.scene.translate(0,0,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

    reset(){
        this.angle = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0; 
    }

    turn(value){
        this.angle += value;
    }

    accelerate(value){
        this.velocity += value;
    }

    update(){
        this.x += this.velocity * Math.sin(this.angle);
        this.z += this.velocity * Math.cos(this.angle);
    }
}

