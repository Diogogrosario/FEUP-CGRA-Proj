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
        this.flag  = new MyPlane(this.scene,20);

        this.mainBodyTexture = new CGFappearance(this.scene);
        this.mainBodyTexture.setAmbient(0.7,0.7,0.7,1);
        this.mainBodyTexture.setDiffuse(0.9,0.9,0.9,1);
        this.mainBodyTexture.setDiffuse(0.2,0.2,0.2,1);
        this.mainBodyTexture.setShininess(10);
        this.mainBodyTexture.loadTexture('images/burger-king.png');
        this.mainBodyTexture.setTextureWrap('REPEAT','REPEAT');

        this.lemeTex = new CGFappearance(this.scene);
        this.lemeTex.setAmbient(0.7,0.7,0.7,1);
        this.lemeTex.setDiffuse(0.9,0.9,0.9,1);
        this.lemeTex.setDiffuse(0.2,0.2,0.2,1);
        this.lemeTex.setShininess(10);
        this.lemeTex.loadTexture('images/leme.png');
        this.lemeTex.setTextureWrap('REPEAT','REPEAT');


        this.string = new CGFappearance(this.scene);
        this.string.setAmbient(0.7,0.7,0.7,1);
        this.string.setDiffuse(0.9,0.9,0.9,1);
        this.string.setDiffuse(0.2,0.2,0.2,1);
        this.string.setShininess(10);
        this.string.loadTexture('images/flagString.jpg');
        this.string.setTextureWrap('REPEAT','REPEAT');
        


        this.texture=new CGFtexture(this.scene,'images/flag.jpg');

        this.shader=new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shader.setUniformsValues({ uSampler1: 1 });
        this.shader.setUniformsValues({ vehicleSpeed: 0.05 });
        this.shader.setUniformsValues({time: 0});
        this.reverseShader=new CGFshader(this.scene.gl, "shaders/reverseFlag.vert", "shaders/flag.frag");
        this.reverseShader.setUniformsValues({ uSampler1: 1 });
        this.reverseShader.setUniformsValues({time: 0});
        this.reverseShader.setUniformsValues({ vehicleSpeed: 0.05 });
    }
    
    display(){

        this.scene.pushMatrix();
        this.scene.rotate(this.angle,0,1,0);

        //Corpo do dirigível
        
        this.scene.pushMatrix();
        this.mainBodyTexture.apply();
        this.scene.scale(1,1,2);
        this.sphere.display();
        this.scene.popMatrix();

        this.lemeTex.apply();
        
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
        
        
        
        //FLAG
        this.scene.setActiveShader(this.shader);
        this.texture.bind(1);

        this.scene.pushMatrix();
        this.scene.translate(0.3,0,-4);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(1.7,0.9,1);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.reverseShader);

        this.scene.pushMatrix();
        this.scene.translate(0.3,0,-4);
        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.scale(1.7,0.9,1);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.string.apply();

        //FIO CIMA
        this.scene.pushMatrix();
        this.scene.translate(0.3,0.43,-2.15);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(2,0.05,1);
        this.flag.display();
        this.scene.rotate(Math.PI,1,0,0);
        this.flag.display();
        this.scene.popMatrix();

        //FIO BAIXO
        this.scene.pushMatrix();
        this.scene.translate(0.3,-0.43,-2.15);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(2,0.05,1);
        this.flag.display();
        this.scene.rotate(Math.PI,1,0,0);
        this.flag.display();
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
        this.flagUpdate(0);
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

    update(t){
        if(this.time == 0){
            this.time = t/1000%1000;
        }

        this.timePassed = (t/1000%1000) - this.time;
        this.time = t/1000%1000;

        
        
        if(this.autoPilot == false){
            this.x += this.velocity * Math.sin(this.angle);
            this.z += this.velocity * Math.cos(this.angle);
        }
        else{
            this.turn(2.0*Math.PI/5.0 * this.timePassed);
            this.x +=  10*Math.PI/5.0 * this.timePassed * Math.sin(this.angle);
            this.z +=  10*Math.PI/5.0 * this.timePassed * Math.cos(this.angle);
            this.lemeRotate = -Math.PI/10;

        }
        this.helix.update(this.velocity,0); 
        this.flagUpdate(t/1000%1000);
    }

    flagUpdate(t){
        this.shader.setUniformsValues({ vehicleSpeed: this.velocity+0.05 });
        this.shader.setUniformsValues({time: t});

        this.reverseShader.setUniformsValues({ vehicleSpeed: this.velocity+0.05 });
        this.reverseShader.setUniformsValues({time: t});

    }

    
}

