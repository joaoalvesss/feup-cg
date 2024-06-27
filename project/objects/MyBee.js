import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';
import { MyCone } from '../geometrics/MyCone.js';
import { MyLeg } from './MyLeg.js';
import { MyAntenna } from './MyAntenna.js';
import { MyWing } from './MyWing.js';

export class MyBee extends CGFobject {
     constructor(scene, x, y, z, orientation, velocity, flowers, hive) {
          super(scene);
          this.flowers = flowers;
          this.x = x;
          this.y = y;
          this.z = z;
          this.position = {x: x, y: y, z: z};
          this.scale = 1;
          this.velocity = velocity;
          this.velocityAux = 0;
          this.orientation = orientation;

          this.sphere = new MySphere(scene, false, 20, 20);
          this.cone = new MyCone(scene, 20, 20);
          this.leg = new MyLeg(scene);
          this.antenna = new MyAntenna(scene);
          this.wing = new MyWing(scene);
          this.initMaterials();

          this.time = 0;
          this.oscillationAmplitude = 0.4;
          this.wingOscillationSpeed = 5; 
          this.verticalOscillationSpeed = 1; 
          this.wingZRotationSpeed2 = 2.5; 
          this.wingZRotationSpeed1 = 2; 

          this.offsetY = 0;
          this.wingRotationZ1 = 0;
          this.wingRotationZ2 = 0;

          this.down = false;
          this.up = false;
          this.pollen = null;
          this.going_home = false;
          this.hive = hive;
     }

     set_flowers(flowers) {
          this.flowers = flowers;
     }

     initMaterials() {
          // Body1
          this.bodyMaterial1 = new CGFappearance(this.scene);
          this.bodyMaterial1.setAmbient(1, 1, 1, 1.0);
          this.bodyMaterial1.setDiffuse(0.95, 0.95, 0.95, 1.0);
          this.bodyMaterial1.setSpecular(0.5, 0.5, 0.5, 1.0);
          this.bodyMaterial1.setTexture(new CGFtexture(this.scene, "./images/beebody.jpg"));
          this.bodyMaterial1.setTextureWrap('REPEAT', 'REPEAT');

          // Body2
          this.bodyMaterial2 = new CGFappearance(this.scene);
          this.bodyMaterial2.setAmbient(1, 1, 1, 1.0);
          this.bodyMaterial2.setDiffuse(0.95, 0.95, 0.95, 1.0);
          this.bodyMaterial2.setSpecular(0.5, 0.5, 0.5, 1.0);
          this.bodyMaterial2.setTexture(new CGFtexture(this.scene, "./images/beebody2.jpg"));
          this.bodyMaterial2.setTextureWrap('REPEAT', 'REPEAT');

          // Eye
          this.eyeMaterial = new CGFappearance(this.scene);
          this.eyeMaterial.setAmbient(0.8, 0.8, 0.8, 1.0);
          this.eyeMaterial.setDiffuse(0.95, 0.95, 0.95, 1.0);
          this.eyeMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
          this.eyeMaterial.setTexture(new CGFtexture(this.scene, "./images/beeeye.jpg"));
          this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

          // Brown Material
          this.brownMaterial = new CGFappearance(this.scene);
          this.brownMaterial.setAmbient(0.4, 0.26, 0.13, 1.0);
          this.brownMaterial.setDiffuse(0.54, 0.27, 0.07, 1.0);
          this.brownMaterial.setSpecular(0.3, 0.3, 0.3, 1.0);
          this.brownMaterial.setShininess(10.0);
     }

     update(delta_t, scaleFactor, speedFactor) {
          this.scale = scaleFactor;
          this.time += delta_t;

          this.offsetY = Math.sin(delta_t * 2 * Math.PI * this.verticalOscillationSpeed) * this.oscillationAmplitude;
          this.wingRotationZ2 = Math.sin(delta_t * 2 * Math.PI * this.wingZRotationSpeed2) * 0.1;
          this.wingRotationZ1 = Math.sin(delta_t* 2 * Math.PI * this.wingZRotationSpeed1) * 0.2;
          
          if (this.velocity != 0 && speedFactor !== this.velocityAux) {
               this.velocity += (speedFactor - this.velocityAux) * 0.1;
               this.velocityAux = speedFactor;
          }
          
          let radians = this.orientation * Math.PI / 180;
          if (this.going_home) {
               this.velocity = 0.1;
               if (Math.sqrt(this.position.x*this.position.x + this.position.z*this.position.z) < 5) {
                    this.velocity = 0;
                    if (this.position.y > -27) {
                         this.position.y -= 1;
                    }
                    else {
                         this.going_home = false;
                         this.hive.add_pollen(this.pollen);
                         this.pollen = null;
                         this.up = true;
                    }
               }
          }

          this.position.x += this.velocity * Math.sin(radians) * delta_t;
          this.position.z += this.velocity * Math.cos(radians) * delta_t;

          if (this.position.y >= 0) this.up = false;
          if (this.position.y <= -87) this.down = false;
          for (let i = 0; i < this.flowers.length; i++) {
               if (this.flowers[i].on_flower(this.position.x, this.position.y, this.position.z)){
                    this.velocity = 0;
                    this.down = false;
                    this.offsetY = 0;
               }
          }
          if (this.up) {
               this.position.y += 2;
          }
          else if (this.down) {
               this.position.y -= 2;
          }

          
     }
      

     turn(o) {
          if (!this.going_home) this.orientation += o;
     }
  
     accelerate(a) {
          if (!this.going_home) this.velocity = Math.max(this.velocity + a, 0);
     }

     descend() {
          if (!this.going_home) {
               this.down = true;
               this.up = false;
          }
     }

     ascend() {
          if (!this.going_home) {
               this.down = false;
               this.up = true;
               for (let i = 0; i < this.flowers.length; i++) {
                    if (this.flowers[i].on_flower(this.position.x, this.position.y, this.position.z)){
                    this.pollen = this.flowers[i].take_pollen();
                    }
               }
          }
     }

     go_home(){
          if (this.pollen != null && this.position.y >= 0) {
               if (this.position.z < 0) {
                    if (this.position.x < 0) {
                         this.orientation = -Math.PI/2 - Math.atan2(-this.position.z, -this.position.x);
                    }
                    else {
                         this.orientation = Math.PI/2 + Math.atan2(-this.position.z, this.position.x);
                    }
               }
               else {
                    if (this.position.x < 0) {
                         this.orientation = -Math.atan2(-this.position.x, this.position.z);
                    }
                    else {
                         this.orientation = Math.atan2(this.position.x, this.position.z);
                    }
               }
               this.orientation = this.orientation / Math.PI * 180 + 180;
               this.going_home = true;
          }
     }

     restart() {
          this.velocity = 0;
          this.orientation = 0;
          this.position = {x: this.x, y: this.y, z: this.z};
     }

     display() {
          this.scene.pushMatrix();
          this.scene.translate(this.position.x, this.position.y + this.offsetY, this.position.z);
          this.scene.rotate(this.orientation * Math.PI / 180, 0, 1, 0);
          this.scene.scale(this.scale, this.scale, this.scale);


          if (this.pollen != null) {
               this.scene.pushMatrix();
               this.scene.translate(0, -1.5, 4);
               this.scene.rotate(Math.PI/2, 1, 0, 0);
               this.scene.scale(1/this.scale, 1/this.scale, 1/this.scale);
               this.pollen.display();
               this.scene.popMatrix();
          }

          // Body
          this.scene.pushMatrix();
          this.scene.rotate(-35 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(1.25, 1.25, 2);
          this.bodyMaterial1.apply();
          this.sphere.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(0.9, 0.9, 1.4);
          this.scene.translate(0, 1.1, 2.1);
          this.bodyMaterial2.apply();
          this.sphere.display();
          this.scene.popMatrix();

          // Head
          this.scene.pushMatrix();
          this.scene.rotate(-30 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(0.8, 1.1, 0.8);
          this.scene.translate(0, -1.3, 6.1);
          this.bodyMaterial1.apply();
          this.sphere.display();
          this.scene.popMatrix();

          // Eyes
          this.scene.pushMatrix();
          this.scene.rotate(-30 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(0.5, 0.6, 0.5);
          this.scene.translate(1.1, -2, 10);
          this.eyeMaterial.apply();
          this.sphere.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.rotate(-30 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(0.5, 0.6, 0.5);
          this.scene.translate(-1.1, -2, 10);
          this.eyeMaterial.apply();
          this.sphere.display();
          this.scene.popMatrix();

          // Stinger
          this.scene.pushMatrix();
          this.scene.rotate(-130 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(0.2, 0.4, 0.2);
          this.scene.translate(0, 4.8, 1);
          this.brownMaterial.apply();
          this.cone.display();
          this.scene.popMatrix();

          // Legs
          this.scene.pushMatrix();
          this.scene.scale(0.8, 0.8, 0.8);
          this.scene.translate(1.2, 0.5, 3.9);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(-0.8, 0.8, 0.8);
          this.scene.translate(1.2, 0.5, 3.9);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(0.65, 0.65, 0.65);
          this.scene.translate(0.9, 0.5, 6);
          this.scene.rotate(-60 * Math.PI / 180, 0, 1, 0);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(-0.65, 0.65, 0.65);
          this.scene.translate(0.9, 0.5, 6);
          this.scene.rotate(-60 * Math.PI / 180, 0, 1, 0);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(1, 1, 1);
          this.scene.translate(0.6, 0.1, 2);
          this.scene.rotate(65 * Math.PI / 180, 0, 1, 0);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(-1, 1, 1);
          this.scene.translate(0.6, 0.1, 2);
          this.scene.rotate(65 * Math.PI / 180, 0, 1, 0);
          this.brownMaterial.apply();
          this.leg.display();
          this.scene.popMatrix();

          // Antennas
          this.scene.pushMatrix();
          this.scene.scale(0.25, 0.25, 0.25);
          this.scene.translate(1, 7, 21);
          this.scene.rotate(25 * Math.PI / 180, 0, 1, 0);
          this.scene.rotate(-35 * Math.PI / 180, 1, 0, 0);
          this.scene.rotate(10 * Math.PI / 180, 0, 0, 1);
          this.brownMaterial.apply();
          this.antenna.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(-0.25, 0.25, 0.25);
          this.scene.translate(1, 7, 21);
          this.scene.rotate(25 * Math.PI / 180, 0, 1, 0);
          this.scene.rotate(-35 * Math.PI / 180, 1, 0, 0);
          this.scene.rotate(10 * Math.PI / 180, 0, 0, 1);
          this.brownMaterial.apply();
          this.antenna.display();
          this.scene.popMatrix();

          // Wings
          this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
          this.scene.gl.enable(this.scene.gl.BLEND);
          
          let wingAttachPoint1 = 2.5;
          let wingAttachPoint2 = 1.5;

          this.scene.pushMatrix();
          this.scene.translate(0, wingAttachPoint1, 0);
          this.scene.rotate(this.wingRotationZ1, 0, 0, 1);
          this.scene.translate(0, -wingAttachPoint1, 0);
          this.wing.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, wingAttachPoint1, 0);
          this.scene.rotate(-this.wingRotationZ1, 0, 0, 1);
          this.scene.translate(0, -wingAttachPoint1, 0);
          this.wing.displayLeft();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0.6, 0.1, 1);
          this.scene.scale(0.6, 0.6, 0.6);
          this.scene.translate(0, wingAttachPoint2, 0);
          this.scene.rotate(this.wingRotationZ2, 0, 0, 1);
          this.scene.translate(0, -wingAttachPoint2, 0);
          this.wing.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(-0.6, 0.1, 1);
          this.scene.scale(0.6, 0.6, 0.6);
          this.scene.translate(0, wingAttachPoint2, 0);
          this.scene.rotate(-this.wingRotationZ2, 0, 0, 1);
          this.scene.translate(0, -wingAttachPoint2, 0);
          this.wing.displayLeft();
          this.scene.popMatrix();
     }
}