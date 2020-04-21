/**
 * Helix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initBuffers();
        this.helixVelocity = 0;
	}
	
	initBuffers() {
        this.sphere = new MySphere(this.scene,16,8);
        this.cylinder = new MyCylinder(this.scene,100,1);
        this.quad = new MyQuad(this.scene);
    }
    
    display(){

    

         //Main body Hélice
         this.scene.pushMatrix();
         this.scene.scale(0.1,0.1,0.7);
         this.cylinder = new MyCylinder(this.scene,100,1);
         this.scene.rotate(Math.PI/2,1,0,0);
         this.cylinder.display(); 
         this.scene.popMatrix();
 
         //Topo main body
         this.scene.pushMatrix(); 
         this.scene.scale(0.1,0.1,0.1);
         this.sphere.display();
         this.scene.popMatrix();
 
         //Fundo main body
         this.scene.pushMatrix();
         this.scene.translate(0,0,0.7);
         this.scene.scale(0.1,0.1,0.1);
         this.sphere.display();
         this.scene.popMatrix();
 
         //Motor Esquerda
         this.scene.pushMatrix();
         this.scene.translate(0.1,0,0);
         this.scene.scale(0.05,0.05,0.12);
         this.sphere.display();
         this.scene.popMatrix();
 
         //Motor direita
         this.scene.pushMatrix();
         this.scene.translate(-0.12,0,0);
         this.scene.scale(0.05,0.05,0.12);
         this.sphere.display();
         this.scene.popMatrix();
 
         //Rotação do motor esquerda
         this.scene.pushMatrix();
         this.scene.translate(0.1,0,-0.12);
         this.scene.rotate(this.helixVelocity*10,0,0,1); //Rotaçao proporcional a velocidade
         this.scene.scale(0.03,0.14,0.03);
         this.quad.display();
         this.scene.rotate(Math.PI,0,1,0);
         this.quad.display();
         this.scene.popMatrix();
 
         //Rotaçao do motor direita
         this.scene.pushMatrix();
         this.scene.translate(-0.12,0,-0.12);
         this.scene.rotate(this.helixVelocity*10,0,0,1); //Rotaçao proporcional a velocidade
         this.scene.scale(0.03,0.14,0.03);
         this.quad.display();
         this.scene.rotate(Math.PI,0,1,0);
         this.quad.display();
         this.scene.popMatrix();


    }

    update(velocity,accelerate){
        if(accelerate)
            this.helixVelocity = velocity;
        else if(velocity >0)
            this.helixVelocity += 0.05;
    }
    
}

