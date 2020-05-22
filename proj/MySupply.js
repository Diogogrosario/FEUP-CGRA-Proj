const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    constructor(scene, ) {
        super(scene);

        this.initBuffers();
        this.x = 0;
        this.z = 0;
        this.y = 8.6;
        this.crate = new CGFappearance(this.scene);
        this.crate.setAmbient(0.7,0.7,0.7,1);
        this.crate.setDiffuse(0.9,0.9,0.9,1);
        this.crate.setDiffuse(0.2,0.2,0.2,1);
        this.crate.setShininess(10);
        this.crate.loadTexture('images/crate.png');
        this.crate.setTextureWrap('REPEAT','REPEAT');

        this.state = SupplyStates.INACTIVE;

    }

    initBuffers() {

        this.quad = new MyQuad(this.scene);

    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();

    }

    update(t){
        if(this.time == 0){
            this.time = t/1000%1000;
        }

        this.timePassed = (t/1000%1000) - this.time;
        this.time = t/1000%1000;

        
        if(this.state == SupplyStates.FALLING){
            this.y -= 8.1/3.0 * this.timePassed;
        }
        if(this.y <= 0.5){
            this.land();
        }
    }

    drop(x,z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;
    }

    land(){
        this.state = SupplyStates.LANDED;
    }

    display(){
        this.scene.pushMatrix();
        this.crate.apply();
        this.scene.translate(this.x,this.y,this.z);
        if(this.state == SupplyStates.FALLING){
         //LATERAIS
         this.quad.display();
 
         this.scene.pushMatrix();
         this.scene.translate(0.5,0,-0.5);
         this.scene.rotate(Math.PI/2,0,1,0);
         this.quad.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix();
         this.scene.translate(-0.5,0,-0.5);
         this.scene.rotate(3*Math.PI/2,0,1,0);
         this.quad.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix();
         this.scene.translate(0,0,-1);
         this.scene.rotate(-Math.PI,0,1,0);
         this.quad.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix(); //BAIXO
         this.scene.translate(0,-0.5,-0.5);
         this.scene.rotate(Math.PI/2,1,0,0);
         this.quad.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix(); //CIMA
         this.scene.translate(0,0.5,-0.5);
         this.scene.rotate(-Math.PI/2,1,0,0);
         this.quad.display();
         this.scene.popMatrix();

        
        }
        else if(this.state == SupplyStates.LANDED){
            this.scene.pushMatrix();
            this.scene.translate(0,-this.y,-0.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); 
            this.scene.translate(0,-this.y,0.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); 
            this.scene.translate(0,-this.y,1.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); 
            this.scene.translate(0,-this.y,2.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); 
            this.scene.translate(1,-this.y,0.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix(); 
            this.scene.translate(-1,-this.y,0.5);
            this.scene.rotate(3*Math.PI/2,1,0,0);
            this.quad.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
 
     }

    


    updateBuffers(complexity) {
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}