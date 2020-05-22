/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.normals = [];
		this.vertices = [
			-1,  1, 0,	//0
			-1, -1, 0,	//1
			 1, -1, 0,	//2
			-1,  1, 0,	//0
			-1, -1, 0,	//1
			 1, -1, 0,	//2
		
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3,5,4
		];

		for(var i=0;i<3;i++) // n vertices
        {
            this.normals.push(0,0,1);
		}
		for(var i=0;i<3;i++) // n vertices
        {
            this.normals.push(0,0,-1);
		}
		
		this.texCoords = [0,0,
						0,1,
						1,1,
						0,0,
						0,1,
						1,1]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

