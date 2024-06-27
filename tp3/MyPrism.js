import {CGFobject} from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
     constructor(scene, slices, stacks){
          super(scene);
          this.slices = slices;
          this.stacks = stacks;
          this.initBuffers();
     }

     calculateVertexCoordinates(i, increment, j, zIncrement) {
        let x1 = Math.cos(i * increment);
        let y1 = Math.sin(i * increment);
        let x2 = Math.cos((i + 1) * increment);
        let y2 = Math.sin((i + 1) * increment);
  
        let z1 = zIncrement * j;
        let z2 = zIncrement * (j + 1);

        return [x1, y1, z1, x2, y2, z1, x1, y1, z2, x2, y2, z2];
     }

     calculateNormalCoordinates(i, increment) {
        let x = Math.cos((i + 0.5) * increment);
        let y = Math.sin((i + 0.5) * increment);
        let size = Math.sqrt(x * x + y * y);
  
        return [x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0];
     }

     initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
      
        let index = 0;
        let angleIncrement = 2 * Math.PI / this.slices;
        let zIncrement = 1 / this.stacks;

        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                this.vertices.push(...this.calculateVertexCoordinates(i, angleIncrement, j, zIncrement));
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(...this.calculateNormalCoordinates(i, angleIncrement));
                index += 4;
            }
        }    
	
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
     }
}
