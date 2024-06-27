import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, texture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let theta = stack * Math.PI / this.stacks;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let slice = 0; slice <= this.slices; slice++) {
                let phi = slice * 2 * Math.PI / this.slices;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = - cosPhi * sinTheta;
                let y = cosTheta;
                let z = sinPhi * sinTheta;

                let displacement = (Math.random() - 0.5) * 0.3;
                x += x * displacement;
                y += y * displacement;
                z += z * displacement;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);

                let u = slice / this.slices;
                let v = 1 - (stack / this.stacks);
                this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);

                if (slice === this.slices - 1) {
                    this.indices.push(first + 1, second + 1, first + 1 - this.slices);
                    this.indices.push(second + 1, second + 1 - this.slices, first + 1 - this.slices);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        let material = new CGFappearance(this.scene);
        material.setTexture(this.texture);
        material.setEmission(0.5, 0.5, 0.5, 1);
        material.apply();
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }
}
