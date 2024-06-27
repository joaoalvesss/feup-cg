import { CGFobject } from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    calculateVertexAndNormalCoordinates(i, increment, j, zIncrement) {
        let x = Math.cos(i * increment);
        let y = Math.sin(i * increment);
        let z = zIncrement * j;

        let vector_size = Math.sqrt(x * x + y * y);

        return {
            vertex: [x, y, z],
            normal: [x / vector_size, y / vector_size, 0]
        };
    }

    calculateIndices(i, j, points) {
        let indexC = points - 2;
        let indexD = points - 1;
        let indexB = indexD - (this.stacks + 1);
        let indexA = indexB - 1;
        return [indexA, indexC, indexD, indexA, indexD, indexB];
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angleIncrement = 2 * Math.PI / this.slices;
        let zIncrement = 1 / this.stacks;

        for (let i = 0; i <= this.slices; i++) {
            for (let j = 0; j <= this.stacks; j++) {
                let { vertex, normal } = this.calculateVertexAndNormalCoordinates(i, angleIncrement, j, zIncrement);
                this.vertices.push(...vertex);
                this.normals.push(...normal);
                
                // Calculate texture coordinates based on cylindrical mapping
                let s = i / this.slices;
                let t = j / this.stacks;
                this.texCoords.push(s, t);

                if (j > 0 && i > 0) {
                    this.indices.push(...this.calculateIndices(i, j, this.vertices.length / 3));
                }
            }
        }

        // Connect the last slice with the first one
        for (let j = 1; j <= this.stacks; j++) {
            let indexA = j - 1;
            let indexB = j;
            let indexC = this.vertices.length / 3 - this.stacks + j - 2;
            let indexD = indexC + 1;
            this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
