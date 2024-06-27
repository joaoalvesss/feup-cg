import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';

export class MyLeg extends CGFobject {
     constructor(scene) {
          super(scene);
          this.sphere1 = new MySphere(scene, false, 20, 20);
          this.sphere2 = new MySphere(scene, true, 20, 20);
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
          this.scene.rotate(35 * Math.PI / 180, 0, 0, 1);
          this.scene.scale(0.15, 0.5, 0.15);
          this.brownMaterial.apply();
          this.sphere1.display();
          this.sphere2.display();
          this.scene.popMatrix();
          
          this.scene.pushMatrix();
          this.scene.scale(0.15, 0.5, 0.15);
          this.scene.translate(2, -1.8, 0); 
          this.brownMaterial.apply();
          this.sphere1.display();
          this.sphere2.display();
          this.scene.popMatrix();  

          this.scene.pushMatrix();
          this.scene.translate(0.5, -1.5, -0.15); 
          this.scene.rotate(90 * Math.PI / 180, 0, 1, 1);
          this.scene.scale(0.08, 0.25, 0.08);
          this.brownMaterial.apply();
          this.sphere1.display();
          this.sphere2.display();
          this.scene.popMatrix();  

          this.scene.pushMatrix();
          this.scene.translate(0.5, -1.5, 0.15); 
          this.scene.rotate(-90 * Math.PI / 180, 0, 1, -1);
          this.scene.scale(0.08, 0.25, 0.08);
          this.brownMaterial.apply();
          this.sphere1.display();
          this.sphere2.display();
          this.scene.popMatrix(); 
          
     }
}