/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene,) {
		super(scene);
		
		this.initBuffers();
	}

	initBuffers() {

		this.quad = new MyQuad(this.scene);
		
		this.backFace = new CGFappearance(this.scene);
        this.backFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.backFace.setShininess(10.0);
		this.backFace.loadTexture('images/split_cubemap/back.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");

		
		this.frontFace = new CGFappearance(this.scene);
        this.frontFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontFace.setShininess(10.0);
		this.frontFace.loadTexture('images/split_cubemap/front.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");
		
		this.leftFace = new CGFappearance(this.scene);
        this.leftFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftFace.setShininess(10.0);
		this.leftFace.loadTexture('images/split_cubemap/left.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");
		
		this.rightFace = new CGFappearance(this.scene);
        this.rightFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightFace.setShininess(10.0);
		this.rightFace.loadTexture('images/split_cubemap/right.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");

        this.bottomFace = new CGFappearance(this.scene);
        this.bottomFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomFace.setShininess(10.0);
		this.bottomFace.loadTexture('images/split_cubemap/bottom.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");

        this.topFace = new CGFappearance(this.scene);
        this.topFace.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topFace.setSpecular(0.1, 0.1, 0.1, 1);
        this.topFace.setShininess(10.0);
		this.topFace.loadTexture('images/split_cubemap/top.png');
		this.backFace.setTextureWrap("REPEAT", "REPEAT");
		

	}

	enableNormalViz(){
		this.quad.enableNormalViz();
	}

	disableNormalViz(){
		this.quad.disableNormalViz();

	}

	display(){
       
       
       
		//BACK
		this.backFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//RIGHT
		this.rightFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(3*Math.PI/2,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//LEFT
		this.leftFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

		//FRONT
		this.frontFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.quad.display();
		this.scene.popMatrix();


		this.bottomFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix(); //BOTTOM
        this.scene.translate(0,-0.5,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.topFace.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

		this.scene.pushMatrix(); //TOP
		this.scene.translate(0,0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

	}


	 updateBuffers(complexity){
		this.initBuffers();
        this.initNormalVizBuffers();
    }
}

