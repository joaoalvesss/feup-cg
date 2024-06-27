import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MySphere } from '../geometrics/MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, baseTexture, cloudTexture) {
        super(scene);
        this.baseTexture = baseTexture;
        this.cloudTexture = cloudTexture;
        this.sphere = new MySphere(this.scene, true, 40, 40);
        this.initMaterials();
        this.shader = new CGFshader(this.scene.gl, "./shaders/CloudEffect.vert", "./shaders/CloudEffect.frag");
        this.time = 0;
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0, 0, 0, 0);
        this.material.setDiffuse(0, 0, 0, 0);
        this.material.setSpecular(0, 0, 0, 0);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setShininess(10);
        this.material.setTexture(this.baseTexture);
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.shader.setUniformsValues({
            timeFactor: this.time,
            uSampler: 0, // base
            uSampler2: 1  // cloud 
        });

        this.scene.pushMatrix();
        this.material.apply();
        this.baseTexture.bind(0);
        this.cloudTexture.bind(1);
        this.scene.scale(200, 200, 200);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(t) {
        this.time = t;
    }
}
