import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyGrassBlade extends CGFobject {
     constructor(scene, texture) {
          super(scene);
          this.texture = texture;
          this.initAppearance();
          this.initBuffers();
     }

     initAppearance() {
          this.appearance = new CGFappearance(this.scene);
          this.appearance.setAmbient(0.2, 0.2, 0.2, 0.2);
          this.appearance.setDiffuse(0.7, 0.7, 0.7, 0.7);
          this.appearance.setSpecular(0.1, 0.1, 0.1, 0.1);
          this.appearance.setEmission(0, 0, 0, 0);
          this.appearance.setShininess(0);
          this.appearance.setTexture(this.texture);
          this.appearance.setTextureWrap('REPEAT', 'REPEAT');
     }

     initBuffers() {
          this.vertices = [];
          this.indices = [];
          this.normals = [];
          this.texCoords = [];

          let numSegments = 7;
          let width = 0.4;
          let height = 5;

          let previousOffsetX = 0;

          for (let i = 0; i <= numSegments; i++) {
               let currHeight = (i / numSegments) * height;
               let currWidth = width * (1 - i / numSegments);
               let offsetX = Math.random() * 0.1 - 0.05;

               this.vertices.push(-currWidth + offsetX, currHeight, 0);
               this.vertices.push(currWidth + offsetX, currHeight, 0);
               this.normals.push(0, 1, 0, 0, 1, 0);

               this.texCoords.push(0, i / numSegments, 1, i / numSegments);

               if (i < numSegments) {
                    let baseIndex = 2 * i;

                    this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
                    this.indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
               }

               previousOffsetX = offsetX;
          }

          this.primitiveType = this.scene.gl.TRIANGLES;
          this.initGLBuffers();
     }

     display() {
          this.appearance.apply();
          super.display();
     }
}
