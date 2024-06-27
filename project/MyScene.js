import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyRock } from "./objects/MyRock.js";
import { MyBee } from "./objects/MyBee.js";
import { MyHive } from "./objects/MyHive.js";
import { MyGrassBed } from "./objects/MyGrassBed.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayGround = true;
    this.displaySphere = true;
    this.displayHive = true;
    this.displayNormals = false;
    this.scaleFactor = 1;
    this.displayPanorama = true;
    this.displayRocks = true;
    this.displayBee = true;
    this.displayLeg = false;
    this.displayAntenna = false;
    this.displayWing = false;
    this.displayGarden = true;
    this.displayGrass = true;
    this.gardenRows = 8;
    this.gardenCols = 8;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.focusBee = false;
    this.focusSky = false;

    this.gardenColsOld = this.gardenCols;
    this.gardenRowsOld = this.gardenRows;

    this.setUpdatePeriod(20);
    this.startime = Date.now();

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(0.3, 0.3, 0.3, 0.3);
    this.appearance.setDiffuse(0.6, 0.6, 0.6, 0.6);
    this.appearance.setSpecular(0.1, 0.1, 0.1, 0.1);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthTexture = new CGFtexture(this, "images/background3.jpg");
    this.appearanceEarth = new CGFappearance(this);
    this.appearanceEarth.setTexture(this.earthTexture);
    this.appearanceEarth.setTextureWrap('REPEAT', 'REPEAT');

    this.cloudTexture = new CGFtexture(this, "images/cloud2.jpg");
    this.appearanceCloud = new CGFappearance(this);
    this.appearanceCloud.setTexture(this.cloudTexture);
    this.appearanceCloud.setTextureWrap('REPEAT', 'REPEAT');

    this.rockTexture = new CGFtexture(this, "images/rock2.jpg");
    this.grassTexture = new CGFtexture(this, "images/stem-texture.jpg");

    this.panorama = new MyPanorama(this, this.earthTexture, this.cloudTexture);    
    this.rock = new MyRock(this, 15, 15, this.rockTexture);
    this.rockSet = new MyRockSet(this, this.rockTexture);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
    this.hive = new MyHive(this);
    this.bee = new MyBee(this, 0, 3, 0, 0, 0, this.garden.get_flowers(), this.hive);
    this.grassBed = new MyGrassBed(this, this.grassTexture);

  }

  initLights() {
    this.lights[0].setPosition(100, 30, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.2,
      1.0,
      1000,
      vec3.fromValues(120, 20, 120),
      vec3.fromValues(10, -70, 10)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys(value) {
    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.bee.accelerate(value);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
      this.bee.accelerate(-value);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      keysPressed=true;
      this.bee.turn(value*200);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      keysPressed=true;
      this.bee.turn(-value*200);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text+=" R ";
      keysPressed=true;
      this.bee.restart();
    }

    if (this.gui.isKeyPressed("KeyF")) {
      text+=" F ";
      keysPressed=true;
      this.bee.descend();
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text+=" P ";
      keysPressed=true;
      this.bee.ascend();
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text+=" O ";
      keysPressed=true;
      this.bee.go_home();
    }
    
    if (keysPressed){
      console.log(text);
      keysPressed=false;
    }
  }

  update(t) {
    let time = (t - this.startime) / 1000.0;
    this.bee.update(time, this.scaleFactor, this.speedFactor);
    this.grassBed.update(time);
    this.checkKeys(this.speedFactor / 200);
    this.panorama.update(time);

    if (this.focusBee)
      this.camera.setTarget(vec3.fromValues(this.bee.position.x, this.bee.position.y, this.bee.position.z))
    else 
      this.camera.setTarget(vec3.fromValues(10, -90, 10));

    if (this.focusSky){
      this.camera.setTarget(vec3.fromValues(20, 150, 20));
    }
    else {
      vec3.fromValues(10, -70, 10);
    }  
  }

  display() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.applyViewMatrix();

    if (this.gardenCols !== this.gardenColsOld || this.gardenRows !== this.gardenRowsOld){
      this.gardenColsOld = this.gardenCols;
      this.gardenRowsOld = this.gardenRows;
      this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
      this.bee.set_flowers(this.garden.get_flowers());
    }

    if (this.displayAxis) this.axis.display();
    if (this.displayPanorama) this.panorama.display();
    if (this.displayRocks) {
      this.pushMatrix();
      this.translate(0, -90, 0);
      this.scale(8,8,8);
      this.rockSet.display();
      this.popMatrix();
    }
    if (this.displayGarden){
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    } 
    if (this.displayGrass){
      this.pushMatrix();
      this.scale(2,2,2);
      this.grassBed.display();
      this.popMatrix();
    } 
    if (this.displayBee) {
      this.pushMatrix();
      this.bee.display();
      this.popMatrix();
    } 
    if (this.displayHive) {
      this.pushMatrix();
      this.translate(0, -65, 0);
      this.scale(6, 6, 6);
      this.rotate(-Math.PI/2, 1, 0, 0);
      this.hive.display();
      this.popMatrix();
    }
    // ---- BEGIN Primitive drawing section

    if(this.displayGround){
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0, -90, 0);
      this.scale(400, 400, 400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }


  }
}
