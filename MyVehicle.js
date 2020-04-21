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
        this.helix = new MyHelix(this.scene)
        this.sphere = new MySphere(this.scene,16,8);
        this.leme = new MyLeme(this.scene);
    }
    
    display(){

        this.scene.pushMatrix()
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(this.angle,0,1,0);

        //Corpo do dirigível
        
        this.scene.pushMatrix();
        this.scene.scale(1,1,2);
        this.sphere.display();
        this.scene.popMatrix();

        
        //Hélice
        this.scene.pushMatrix(); /// START HELICE TRANSFORM
        this.scene.translate(0,-1.08,-0.35);

        this.helix.display();

        this.scene.popMatrix(); ///// FINISH HELICE TRANSFORM

        //LEMES
        //this.leme.display()
        



        this.scene.popMatrix();
    }

    reset(){
        this.angle = 0;
        this.velocity = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0; 
        this.helix.update(0);
    }

    turn(value){
        this.angle += value;
    }

    accelerate(value){
        this.velocity += value;
        this.helix.update(this.velocity,1);
    }

    update(){
        this.x += this.velocity * Math.sin(this.angle);
        this.z += this.velocity * Math.cos(this.angle);
        this.helix.update(this.velocity,0); 
    }
}

