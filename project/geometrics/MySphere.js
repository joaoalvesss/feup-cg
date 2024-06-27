import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
	constructor(scene, inside, slices, stacks, fullSphere = true) {
		super(scene);
		this.inside = inside;
		this.slices = slices;
		this.stacks = stacks;
		this.fullSphere = fullSphere;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		const stackLimit = this.fullSphere ? this.stacks : Math.ceil(this.stacks / 2);

		for (let stack = 0; stack <= stackLimit; stack++) {
			let theta = stack * Math.PI / this.stacks;
			let sinTheta = Math.sin(theta);
			let cosTheta = Math.cos(theta);

			for (let slice = 0; slice <= this.slices; slice++) {
				let phi = slice * 2 * Math.PI / this.slices;
				let sinPhi = Math.sin(phi);
				let cosPhi = Math.cos(phi);

				let x = cosPhi * sinTheta;
				let y = cosTheta;
				let z = sinPhi * sinTheta;
				let u = 1 - (slice / this.slices);
				let v = (stack / this.stacks);

				if (this.inside) {
					u = (slice / this.slices);
					v = (stack / this.stacks);
				}

				if (this.inside) {
					this.normals.push(-x, -y, -z);
				}
				else {
					this.normals.push(x, y, z);
				}
				this.texCoords.push(u, v);
				this.vertices.push(x, y, z);
			}
		}

		for (let stack = 0; stack < stackLimit; stack++) {
			for (let slice = 0; slice < this.slices; slice++) {
				let first = (stack * (this.slices + 1)) + slice;
				let second = first + this.slices + 1;

				if (stack !== 0 || this.fullSphere) {
					if (this.inside) {
						this.indices.push(first, second, first + 1);
					}
					else {
						this.indices.push(second, first, first + 1);
					}
				}

				if (stack !== (stackLimit - 1) || this.fullSphere) {
					if (this.inside) {
						this.indices.push(second, second + 1, first + 1);
					}
					else {
						this.indices.push(second + 1, second, first + 1);
					}
				}
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}
