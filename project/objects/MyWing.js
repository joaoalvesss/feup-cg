import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyCircle } from '../geometrics/MyCircle.js';

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);

        this.circle = new MyCircle(scene);

        this.initMaterials();
    }

    initMaterials() {
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.2, 0.2, 0.2, 0.2);
        this.wingMaterial.setDiffuse(0.6, 0.6, 0.6, 0.6);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setEmission(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setShininess(10.0);
        this.wingMaterial.setTexture(new CGFtexture(this.scene, "./images/beewing.jpg"));
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
          this.scene.pushMatrix();
          this.scene.translate(1.6, 2, 1.6)
          this.scene.rotate(90 * Math.PI /180, 1, 0, 0);
          this.scene.rotate(20 * Math.PI /180, 0, 0, 1);
          this.scene.rotate(20 * Math.PI /180, 1, 1, 1);
          this.scene.scale(0.6, 2.5, 0.6);
          this.wingMaterial.apply();
          this.circle.display();
          this.scene.popMatrix();
    }

    displayLeft() {
          this.scene.pushMatrix()
          this.scene.scale(-1, 1, 1)
          this.display();
          this.scene.popMatrix();
    }
}
