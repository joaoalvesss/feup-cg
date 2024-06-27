import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';

export class MyPollen extends CGFobject {
     constructor(scene) {
          super(scene);
          this.sphere = new MySphere(this.scene, false, 10, 50);
          this.half_sphere = new MySphere(this.scene, false, 10, 50, false);
          this.factor = Math.random() + 1.5;
          this.initMaterials();
     }
     initMaterials() {
          // Yellow Material
          this.yellowMaterial = new CGFappearance(this.scene);
          this.yellowMaterial.setAmbient(0.5, 0.5, 0.0, 1.0);
          this.yellowMaterial.setDiffuse(0.8, 0.8, 0.0, 1.0); 
          this.yellowMaterial.setSpecular(0.3, 0.3, 0.3, 1.0);
          this.yellowMaterial.setShininess(10.0);

     } 
     display() {
          this.scene.pushMatrix();
          this.yellowMaterial.apply();
          this.sphere.display();
          this.scene.popMatrix();
               
          this.scene.pushMatrix();
          this.scene.scale(1, this.factor, 1);
          this.yellowMaterial.apply();
          this.half_sphere.display();
          this.scene.popMatrix();
     }
}