import {CGFobject} from '../lib/CGF.js';

export class MyTriangleBig extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords) {
			this.updateTexCoords(coords);
		}
	}
	
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	//0
			0, 2, 0,	//1
			2, 0, 0,	//2
			-2, 0, 0,	//3
			0, 2, 0,	//4
			2, 0, 0,	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,
			4, 3, 5
		];

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

		this.texCoords = [
			0, 0,
			0.5, 0.5,
			1, 0,
			0, 0,
			0.5, 0.5,
			1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = coords;
		this.updateTexCoordsGLBuffers();
	}
}