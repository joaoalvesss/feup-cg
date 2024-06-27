import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5, //0
			 0.5, -0.5, 0.5, //1
			-0.5,  0.5, 0.5, //2
			 0.5,  0.5, 0.5, //3
			-0.5, -0.5, -0.5, //4
			 0.5, -0.5, -0.5, //5
			-0.5,  0.5, -0.5, //6
			 0.5,  0.5, -0.5, //7
			-0.5,  0.5,  0.5, //8
			 0.5,  0.5,  0.5, //9
			-0.5,  0.5, -0.5, //10
			 0.5,  0.5, -0.5, //11
			-0.5, -0.5,  0.5, //12
			 0.5, -0.5,  0.5, //13
			-0.5, -0.5, -0.5, //14
			 0.5, -0.5, -0.5, //15
			 0.5, -0.5,  0.5, //16
			 0.5,  0.5,  0.5, //17
			 0.5, -0.5, -0.5, //18
			 0.5,  0.5, -0.5, //19
			-0.5, -0.5,  0.5, //20
			-0.5,  0.5,  0.5, //21
			-0.5, -0.5, -0.5, //22
			-0.5,  0.5, -0.5, //23
		];

		this.indices = [
			0, 1, 2,  
			1, 3, 2,
			4, 6, 5,  
			5, 6, 7,
			8, 9, 10, 
			9, 11, 10,
			12, 14, 13,
			13, 14, 15,
			16, 18, 17,
			18, 19, 17,
			20, 21, 22,
			21, 23, 22,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
		];
		 
		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
