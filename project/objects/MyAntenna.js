import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyCone } from '../geometrics/MyCone.js';
import { MyCylinder } from '../geometrics/MyCylinder.js';

export class MyAntenna extends CGFobject {
     constructor(scene) {
          super(scene);
          this.cone = new MyCone(scene, 20, 20);
          this.cylinder = new MyCylinder(scene, 20, 20);
          this.initMaterials();
     }

     initMaterials() {
          // Brown Material
          this.brownMaterial = new CGFappearance(this.scene);
          this.brownMaterial.setAmbient(0.4, 0.26, 0.13, 1.0); 
          this.brownMaterial.setDiffuse(0.54, 0.27, 0.07, 1.0);
          this.brownMaterial.setSpecular(0.3, 0.3, 0.3, 1.0);   
          this.brownMaterial.setShininess(10.0);
     } 

     display() {
          this.scene.pushMatrix();
          this.scene.scale(0.25, 0.25, 2);
          this.brownMaterial.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, 0.08, 1.8);
          this.scene.rotate(140 * Math.PI / 180, 1, 0, 0);
          this.scene.scale(0.25, 3, 0.25);
          this.brownMaterial.apply();
          this.cone.display();
          this.scene.popMatrix();
     }
}