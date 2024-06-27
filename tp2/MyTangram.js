import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }


    display() {
          this.scene.pushMatrix();
          let translationMatrix = [1, 0, 0, 0,
               0, 1, 0, 0,
               0, 0, 1, 0,
               -1/Math.sqrt(2), 1/Math.sqrt(2), 0, 1
          ]
        
          let rotationMatrix = [Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
               -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
               0, 0, 1, 0,
               0, 0, 0, 1
          ]

          this.scene.multMatrix(translationMatrix)
          this.scene.multMatrix(rotationMatrix)
          this.scene.setDiffuse(0 / 255, 255 / 255, 0 / 255, 0)
          this.diamond.display()
          this.scene.popMatrix()

          //Purple triangle
          this.scene.pushMatrix()
          this.scene.translate(0, -1, 0)
          this.scene.rotate(90 * Math.PI / 180, 0, 0, 1)
          this.scene.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
          this.triangleSmall.display()
          this.scene.popMatrix()

          //Red Triangle
          this.scene.pushMatrix()
          this.scene.translate(-1, -2, 0)
          this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1)
          this.scene.setDiffuse(1, 0, 0, 0)
          this.triangleSmall.display()
          this.scene.popMatrix()

          //Orange Triangle
          this.scene.pushMatrix()
          this.scene.translate(0, -2, 0)
          this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1)
          this.scene.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
          this.triangleBig.display()
          this.scene.popMatrix()
          
          //Blue Triangle
          this.scene.pushMatrix()
          this.scene.translate(2 - Math.sqrt(2), -2 - Math.sqrt(2), 0)
          this.scene.rotate(225 * Math.PI / 180, 0, 0, 1)
          this.scene.setDiffuse(0, 0, 1, 0)
          this.triangleBig.display()
          this.scene.popMatrix()

          //Parallelogram
          this.scene.pushMatrix()
          this.scene.translate(0, Math.sqrt(2), 0)
          this.scene.scale(-1, 1, 1)
          this.scene.rotate(45 * Math.PI / 180, 0, 0, 1)
          this.scene.setDiffuse(1, 1, 0, 0)
          this.parallelogram.display()
          this.scene.popMatrix()

          //Pink Triangle
          this.scene.pushMatrix()
          this.scene.translate(1, 1 + Math.sqrt(2), 0)
          this.scene.rotate(225 * Math.PI / 180, 0, 0, 1)
          this.scene.scale(1/Math.sqrt(2),1/Math.sqrt(2),1)
          this.scene.setDiffuse(1, 155/255, 207/255, 0)
          this.triangleBig.display()
          this.scene.popMatrix()
    }


}