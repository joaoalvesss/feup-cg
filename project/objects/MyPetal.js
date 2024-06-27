import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyTriangle } from '../geometrics/MyTriangle.js';


export class MyPetal extends CGFobject {
	constructor(scene, angle, length, width, color) {
		super(scene);
		this.angle = angle;
		this.length = length;
		this.width = width;
		this.triangle = new MyTriangle(this.scene);
		this.initMaterials();
		this.color = color;
	}

	change_angle(angle) {
		this.angle = angle;
	}

	initMaterials() {
		/*// White Material
		this.whiteMaterial = new CGFappearance(this.scene);
		this.whiteMaterial.setAmbient(0.2, 0.2, 0.2, 1.0); // Adjust RGB values for white
		this.whiteMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0); // Adjust RGB values for white
		this.whiteMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
		this.whiteMaterial.setShininess(10.0);*/


		this.yellowMaterial = new CGFappearance(this.scene);
		this.yellowMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.yellowMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.yellowMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.yellowMaterial.setTexture(new CGFtexture(this.scene, "./images/yellow-petal.jpg"));
		this.yellowMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.blueMaterial = new CGFappearance(this.scene);
		this.blueMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.blueMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.blueMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.blueMaterial.setTexture(new CGFtexture(this.scene, "./images/blue-petal.jpg"));
		this.blueMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.purpleMaterial = new CGFappearance(this.scene);
		this.purpleMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.purpleMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.purpleMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.purpleMaterial.setTexture(new CGFtexture(this.scene, "./images/purple-petal.jpg"));
		this.purpleMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.redMaterial = new CGFappearance(this.scene);
		this.redMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.redMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.redMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.redMaterial.setTexture(new CGFtexture(this.scene, "./images/red-petal.jpg"));
		this.redMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.leaveMaterial = new CGFappearance(this.scene);
		this.leaveMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
		this.leaveMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
		this.leaveMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
		this.leaveMaterial.setTexture(new CGFtexture(this.scene, "./images/leaves.jpg"));
		this.leaveMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.materials = [this.redMaterial, this.blueMaterial, this.purpleMaterial, this.yellowMaterial, this.leaveMaterial];

   } 

	display() {
		// Scale and display the first triangle
		this.scene.pushMatrix(); // Save the current transformation state
		this.scene.scale(this.width, this.length, 1);
		this.materials[this.color].apply();
		this.triangle.display();
		this.scene.popMatrix(); // Restore the previous transformation state
	
		// Apply scaling and display the second triangle
		this.scene.pushMatrix(); // Save the current transformation state
		this.scene.rotate(this.angle * Math.PI / 180, 1, 0, 0);
		this.scene.scale(this.width, this.length, 1);
		this.materials[this.color].apply();
		this.triangle.display();
		this.scene.popMatrix(); // Restore the previous transformation state
	}
	
}
