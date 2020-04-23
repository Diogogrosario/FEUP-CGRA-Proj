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
        this.lemeRotate = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.autoPilot = false;
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

        this.scene.pushMatrix();
        
        this.scene.rotate(this.lemeRotate,0,1,0);

        //LEME CIMA
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(0,1.5,-2.5);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.leme.display()
        this.scene.popMatrix();

        //LEME BAIXO
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(0,-1.6,-2.5);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.leme.display()
        this.scene.popMatrix();

        this.scene.popMatrix();

        //LEME LADO DIREITO
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(-2,0,-2);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.leme.display()
        this.scene.popMatrix();

        //LEME LADO ESQUERDO
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(2,0,-2);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.leme.display()
        this.scene.popMatrix();
        



        this.scene.popMatrix();
    }

    reset(){
        this.angle = 0;
        this.velocity = 0;
        this.lemeRotate = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0; 
        this.autoPilot = false;
        this.helix.update(0);
    }

    turn(value){
        this.angle += value;
    }

    accelerate(value){
        this.velocity += value;
        this.helix.update(this.velocity,1);
    }

    turnHelix(direction){
        if(direction == 1){
            this.lemeRotate = -Math.PI/10;
        }
        else if(direction == 2)
            this.lemeRotate = Math.PI/10;
        else
            this.lemeRotate = 0;
    }

    update(){
        if(this.autoPilot == false){
            this.x += this.velocity * Math.sin(this.angle);
            this.z += this.velocity * Math.cos(this.angle);
        }
        else{
            this.turn(Math.PI/50);
            this.x +=  Math.PI/10 * Math.sin(this.angle);
            this.z +=  Math.PI/10 * Math.cos(this.angle);

        }
        this.helix.update(this.velocity,0); 
    }

    
}

