import { CGFobject } from '../../lib/CGF.js';

export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			-1, 0, 0, // 0
			1, 0, 0, // 1
			0, 1, 0, // 2
			-1, 0, 0, // 3
			1, 0, 0, // 4
			0, 1, 0, // 5
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 5, 4,
		];

		// Normals
		this.normals = [
			0, 0, 1, // Vertex 0 normal (assuming triangle is in the XY plane)
			0, 0, 1, // Vertex 1 normal
			0, 0, 1, // Vertex 2 normal
			0, 0, -1, // Vertex 0 normal (assuming triangle is in the XY plane)
			0, 0, -1, // Vertex 1 normal
			0, 0, -1, // Vertex 2 normal
		];
		this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1,
            0, 0,
            1, 0,
            0.5, 1,
        ];
		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
