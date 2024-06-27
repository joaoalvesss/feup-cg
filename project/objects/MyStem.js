import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCircle } from '../geometrics/MyCircle.js';
import { MyCylinder } from '../geometrics/MyCylinder.js';

export class MyStem extends CGFobject {
     constructor(scene, radius, length) {
          super(scene);
          this.length = length;
          this.radius = radius;
          this.circle = new MyCircle(this.scene, radius, 20);
          this.cylinder = new MyCylinder(this.scene, 20, 20);
          this.initMaterials();
     }

     set_length(length) {
          this.length = length;
     }

     initMaterials() {
          // Green Material
          this.greenMaterial = new CGFappearance(this.scene);
          this.greenMaterial.setAmbient(0.2, 0.6, 0.2, 1.0);
          this.greenMaterial.setDiffuse(0.5, 0.8, 0.5, 1.0);
          this.greenMaterial.setSpecular(0.1, 0.1, 0.1, 1.0); 
          this.greenMaterial.setShininess(5.0); 

		this.bodyMaterial = new CGFappearance(this.scene);
		this.bodyMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.bodyMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.bodyMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.bodyMaterial.setTexture(new CGFtexture(this.scene, "./images/stem-texture.jpg"));
		this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

     } 

     display() {
          this.scene.pushMatrix();
          this.scene.translate(0, 0, 0); 
          this.scene.rotate(Math.PI, 0, 1, 0);
          this.bodyMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();
          this.scene.pushMatrix();
          this.scene.translate(0, 0, 0); 
          this.scene.translate(0, 0, this.length);
          this.bodyMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();
          this.scene.pushMatrix();
          this.scene.scale(this.radius, this.radius, this.length);
          this.bodyMaterial.apply();
          this.cylinder.display();
          this.scene.popMatrix();         
     }
      
}