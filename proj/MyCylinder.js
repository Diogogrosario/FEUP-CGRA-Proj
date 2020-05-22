class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the cylinder buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var ang = 2 * Math.PI / this.slices; //raio = 1

    for (var i = 0; i <= 1; i++) {
      for (var slice = 0; slice < this.slices; slice++) {
        this.vertices.push(Math.cos(ang * slice), i, Math.sin(ang * slice));
        this.normals.push(Math.cos(ang * slice), 0, Math.sin(ang * slice));
        this.texCoords.push(slice / this.slices, i);
      }
    }

    for (var slice = 0; slice < this.slices; slice++) {
      if (slice == this.slices - 1) { //last slice is different
        this.indices.push(slice, slice + 1 - this.slices, slice + 1);
        this.indices.push(slice, slice + 1, slice + this.slices);
      }
      else {
        this.indices.push(slice, slice + 1, slice + 1 + this.slices);
        this.indices.push(slice, slice + 1 + this.slices, slice + this.slices);
      }
    }

    for (var slice = 0; slice < this.slices; slice++) { //Reverse side so switching indices[2] with indices[1] so its counter clock-wise
      if (slice == this.slices - 1) {
        this.indices.push(slice, slice + 1, slice + 1 - this.slices);
        this.indices.push(slice, slice + this.slices, slice + 1);
      }
      else {
        this.indices.push(slice, slice + 1 + this.slices, slice + 1);
        this.indices.push(slice, slice + this.slices, slice + 1 + this.slices);
      }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
