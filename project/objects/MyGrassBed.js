import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MyGrassBlade } from './MyGrassBlade.js';
import { MyGarden } from './MyGarden.js';

export class MyGrassBed extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.blades = [];
        this.texture = texture;
        this.initGrassBed();
        this.shader = new CGFshader(this.scene.gl, "./shaders/GrassWindEffect.vert", "./shaders/GrassWindEffect.frag");
        this.time = 0;
    }

    initGrassBed() {
        let bedSize = 175;
        let numBlades = 1200;

        for (let i = 0; i < numBlades; i++) {
            let x = Math.random() * bedSize - bedSize / 2;
            let z = Math.random() * bedSize - bedSize / 2;
            let rotation = Math.random() * 360;

            let blade = new MyGrassBlade(this.scene, this.texture);
            this.blades.push({ x: x, z: z, rotation: rotation, blade: blade });
        }
    }

    display() {
        this.scene.setActiveShader(this.shader);
        let timeFactor = Math.cos(2 * this.time);
        this.shader.setUniformsValues({ timeFactor: timeFactor })

        for (let grass of this.blades) {
            this.scene.pushMatrix();
            this.scene.translate(grass.x, -45, grass.z);
            this.scene.rotate(grass.rotation * Math.PI / 180, 0, 1, 0);
            grass.blade.display();
            this.scene.popMatrix();
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(t) {
        this.time = t;
    }
}

