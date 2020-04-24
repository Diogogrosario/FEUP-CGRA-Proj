/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        
        this.mySkybox = new CGFtexture(this, 'images/mySkybox.png');

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        this.earthTex = new CGFappearance(this);
        this.earthTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.earthTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earthTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.earthTex.setShininess(10.0);
        this.earthTex.loadTexture('images/earth.jpg');
        this.earthTex.setTextureWrap('REPEAT', 'REPEAT');

        this.cubemap = new CGFtexture(this, 'images/cubemap.png');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 100);
        this.cube = new MyUnitCube(this);
        this.vehicle = new MyVehicle(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayCube = true;
        this.displayVehicle = true;
        this.speedFactor = 0.1;
        this.vehicleScale = 1;
        this.selectedTexture = 0;  
        this.textures = [this.mySkybox,this.cubemap];
        this.textureIds = { 'Custom Skybox': 0, 'Cubemap': 1};
        this.updateAppliedTexture();
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(0.25, 0.25, 0.25, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        //To be done...
    }

    updateAppliedTexture() {
        this.earthTex.setTexture(this.textures[this.selectedTexture]);
    }

    updateTexCoords() {
        this.cube.updateTexCoords();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();


        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if (this.displaySphere) {
            this.earthTex.apply();
            this.incompleteSphere.display();
        }

        if (this.displayCylinder) {
            this.setDefaultAppearance();
            this.cylinder.display();
        }

        if (this.displayVehicle) {
            this.pushMatrix();
            this.scale(this.vehicleScale, this.vehicleScale, this.vehicleScale);
            //this.translate(0,10,0);
            this.setDefaultAppearance();
            this.vehicle.display();
            this.popMatrix();
        }

        if (this.displayCube) {
            this.pushMatrix();
            this.earthTex.apply();
            this.scale(20, 20, 20);
            this.cube.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        if (this.vehicle.autoPilot == false) {
            // Check for key codes e.g. in https://keycode.info/
            if (this.gui.isKeyPressed("KeyW")) {
                if (this.vehicle.velocity <= 0) {
                    this.vehicle.velocity = 0.05;
                }
                text += " W ";
                this.vehicle.accelerate(this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text += " S ";
                if (this.vehicle.velocity > 0)
                    this.vehicle.accelerate(-this.speedFactor);
                if (this.vehicle.velocity < 0) {
                    this.vehicle.velocity = 0;
                }
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text += " A ";
                this.vehicle.turn(Math.PI / 10);
                this.vehicle.turnHelix(1);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text += " D ";
                this.vehicle.turn(-Math.PI / 10);
                this.vehicle.turnHelix(2);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyR")) {
                text += " R ";
                this.vehicle.reset();
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyP")) {
                text += " P ";
                this.vehicle.autoPilot = true;
                keysPressed = true;
            }
            if (keysPressed) {
                console.log(text);
            }
            else {
                this.vehicle.turnHelix(0);
            }
        }
        else {
            if (this.gui.isKeyPressed("KeyP")) {
                text += " P ";
                this.vehicle.autoPilot = false;
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyR")) {
                text += " R ";
                this.vehicle.reset();
                keysPressed = true;
            }
            if (keysPressed) {
                console.log(text);
            }
            
        }
        this.vehicle.update();
    }
}