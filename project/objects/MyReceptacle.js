import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCircle } from '../geometrics/MyCircle.js';

export class MyReceptacle extends CGFobject {
     constructor(scene, radius) {
          super(scene);
          this.circle = new MyCircle(this.scene, radius, 20);
          this.initMaterials();
     }
     initMaterials() {
          // Yellow Material
          this.yellowMaterial = new CGFappearance(this.scene);
          this.yellowMaterial.setAmbient(0.5, 0.5, 0.0, 1.0); // Adjust RGB values for yellow
          this.yellowMaterial.setDiffuse(0.8, 0.8, 0.0, 1.0); // Adjust RGB values for yellow
          this.yellowMaterial.setSpecular(0.3, 0.3, 0.3, 1.0);
          this.yellowMaterial.setShininess(10.0);


          // Green Material
          this.greenMaterial = new CGFappearance(this.scene);
          this.greenMaterial.setAmbient(0.2, 0.6, 0.2, 1.0); // Adjusted for a more plant-like appearance
          this.greenMaterial.setDiffuse(0.5, 0.8, 0.5, 1.0); // Adjusted for less saturation and more plant-like appearance
          this.greenMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); // Reduced specular for a less shiny appearance
          this.greenMaterial.setShininess(5.0); // Reduced shininess for a less shiny appearance

          this.bodyMaterial = new CGFappearance(this.scene);
		this.bodyMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.bodyMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.bodyMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.bodyMaterial.setTexture(new CGFtexture(this.scene, "./images/receptacle.jpg"));
		this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
     } 
     display() {
          this.scene.pushMatrix();
          this.bodyMaterial.apply();
          this.circle.display();
          this.scene.rotate(Math.PI, 0, 1, 0);
          this.bodyMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();
               
     }
}