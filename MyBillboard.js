/**
 * Billboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.shader=new CGFshader(this.scene.gl, "shaders/progress.vert", "shaders/progress.frag");
        this.shader.setUniformsValues({nSupplies: 0});

        this.board = new CGFappearance(this.scene);
        this.board.setAmbient(0.7,0.7,0.7,1);
        this.board.setDiffuse(0.9,0.9,0.9,1);
        this.board.setDiffuse(0.2,0.2,0.2,1);
        this.board.setShininess(10);
        this.board.loadTexture('images/billboard.png');
        this.board.setTextureWrap('REPEAT','REPEAT');

        this.bar = new CGFappearance(this.scene);
        this.bar.setAmbient(0.7,0.7,0.7,1);
        this.bar.setDiffuse(0.9,0.9,0.9,1);
        this.bar.setDiffuse(0.2,0.2,0.2,1);
        this.bar.setShininess(10);
        this.bar.loadTexture('images/flagString.jpg');
        this.bar.setTextureWrap('REPEAT','REPEAT');
	}
	
	
        
    reset(){
        this.shader.setUniformsValues({nSupplies : 0});
                
    }

    update(currentSupply){
        this.shader.setUniformsValues({nSupplies: currentSupply});
    }
    
    
    display(){
        

        this.scene.pushMatrix();
        this.bar.apply();
        this.scene.translate(-0.95,0,0);

        this.scene.pushMatrix();
        //this.board.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.95,1,0);
        this.scene.scale(2,1,1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        //this.bar.apply();
        
        this.scene.pushMatrix();
        this.scene.scale(0.1,1,1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.9,0,0);
        this.scene.scale(0.1,1,1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0.95,1,0);
        this.scene.scale(1.5,0.2,1);
        this.quad.display();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        this.scene.popMatrix();



    }

    
}


