import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCylinder } from '../geometrics/MyCylinder.js';
import { MyCircle } from '../geometrics/MyCircle.js';
import { MyPollen } from './MyPollen.js';

export class MyHive extends CGFobject {
     constructor(scene) {
          super(scene);
          this.length = 5;
          this.radius = 2;
          this.cylinder = new MyCylinder(scene, 15, 15);
          this.circle = new MyCircle(this.scene, this.radius, 25);
          this.heights = [];
          this.positions_x = [];
          this.positions_y = [];
          for (let i = 0; i < 6; i++){
               this.heights.push(Math.random()-0.5);
               this.positions_x.push(Math.random()-0.5);
               this.positions_y.push(Math.random()-0.5);
          }
          this.initMaterials();
          this.pollen = [];
          this.pollen_pos = [];
          this.pollen_angles = [];
     }

     initMaterials() {
          // Yellow Material
          this.yellowMaterial = new CGFappearance(this.scene);
          this.yellowMaterial.setAmbient(0.5, 0.5, 0.0, 1.0);
          this.yellowMaterial.setDiffuse(0.8, 0.8, 0.0, 1.0); 
          this.yellowMaterial.setSpecular(0.3, 0.3, 0.3, 1.0);
          this.yellowMaterial.setShininess(10.0);

          this.bodyMaterial = new CGFappearance(this.scene);
		this.bodyMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.bodyMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.bodyMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.bodyMaterial.setTexture(new CGFtexture(this.scene, "./images/hive_body.jpg"));
		this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

          this.bitsMaterial = new CGFappearance(this.scene);
		this.bitsMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.bitsMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.bitsMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.bitsMaterial.setTexture(new CGFtexture(this.scene, "./images/hive_bits.jpg"));
		this.bitsMaterial.setTextureWrap('REPEAT', 'REPEAT');

          this.topMaterial = new CGFappearance(this.scene);
		this.topMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.topMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.topMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.topMaterial.setTexture(new CGFtexture(this.scene, "./images/hive_top.jpg"));
		this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
     } 

     add_pollen(pollen) {
          this.pollen.push(pollen);
          this.pollen_pos.push([Math.random(), Math.random()]);
          this.pollen_angles.push(Math.random() * 2 * Math.PI);
          //console.log(this.pollen);
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
          this.scene.scale(1.25, 1.25, 1);
          this.bitsMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, 0, 0); 
          this.scene.translate(0, 0, this.length + this.length/10); 
          this.scene.scale(1.25, 1.25, 1);
          this.topMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, 0, this.length); 
          this.scene.scale(1.25*this.radius, 1.25*this.radius, this.length/10);
          this.bitsMaterial.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.scale(this.radius, this.radius, this.length);
          this.bodyMaterial.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          for (let i = 0; i < 6; i++) {
               let angle = Math.PI / 3 * i;
               let x = Math.cos(angle) * this.radius * 0.8 + this.radius * this.positions_x[i]/10;
               let y = Math.sin(angle) * this.radius * 0.8 + this.radius * this.positions_y[i]/10;

               this.scene.pushMatrix();
               this.scene.translate(x, y, this.length + this.length/10); 
               this.scene.scale(this.radius/20, this.radius/20, this.length/10 + this.heights[i]*this.length/20);
               this.bitsMaterial.apply();
               this.cylinder.display();
               this.scene.popMatrix();
               
               this.scene.pushMatrix();
               this.scene.translate(x, y, this.length + this.length/5 + this.heights[i]*this.length/20); 
               this.scene.scale(0.05, 0.05, 1);
               this.bitsMaterial.apply();
               this.circle.display();
               this.scene.popMatrix();  

          }     

          for (let i = 0; i < this.pollen.length; i++) {
               if (this.pollen[i] != null){
                    this.scene.pushMatrix();
                    this.scene.translate((this.pollen_pos[i][0] * this.radius/3), (this.pollen_pos[i][1] * this.radius/3), (this.length + this.length/10 + 0.15)); 
                    this.scene.scale(1/6, 1/6, 1/6); 
                    this.scene.rotate(this.pollen_angles[i], 0, 0, 1);
                    this.pollen[i].display();
                    this.scene.popMatrix();
               }
          }
     }
}