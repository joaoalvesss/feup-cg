import {CGFobject} from '../lib/CGF.js';

export class MyTriangleSmall extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords) {
			this.updateTexCoords(coords);
		}
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0,	//2
			-1, 0, 0,	//4
			0, 1, 0,	//5
			1, 0, 0,	//6
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3, 4, 5,
			2, 1, 0,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
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