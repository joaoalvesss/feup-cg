import { CGFappearance, CGFobject } from '../lib/CGF.js'; 
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
        this.triangleOrange = new MyTriangleBig(this.scene, [1, 1, 0.5, 0.5, 1, 0, 1, 1, 0.5, 0.5, 1, 0]);
        this.triangleBlue = new MyTriangleBig(this.scene, [1, 0, 0.5, 0.5, 0, 0, 1, 0, 0.5, 0.5, 0, 0]);
        this.trianglePink = new MyTriangleBig(this.scene, [0.5, 1, 0, 1, 0, 0.5,0.5, 1, 0, 1, 0, 0.5]);
        this.triangleRed = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.5, 0.5, 0.75, 0.75, 0.25, 0.75, 0.5, 0.5, 0.75, 0.75]);
        this.trianglePurple = new MyTriangleSmall(this.scene, [0, 0.5, 0.25, 0.25, 0, 0, 0, 0.5, 0.25, 0.25, 0, 0]);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
    }

    initMaterials() {

        // Diamond
        this.diamondMat = new CGFappearance(this.scene)
        this.diamondMat.setAmbient(1, 0, 0, 1.0);
        this.diamondMat.setDiffuse(0, 1, 0, 0);
        this.diamondMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondMat.setShininess(10.0);

        // Purple triangle
        this.trianglePurpleMat = new CGFappearance(this.scene);
        this.trianglePurpleMat.setAmbient(1, 0, 0, 1.0);
        this.trianglePurpleMat.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0);
        this.trianglePurpleMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePurpleMat.setShininess(10.0);

        // Red Triangle
        this.triangleRedMat = new CGFappearance(this.scene);
        this.triangleRedMat.setAmbient(1, 0, 0, 1.0);
        this.triangleRedMat.setDiffuse(1, 0, 0, 0);
        this.triangleRedMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleRedMat.setShininess(10.0);

        // Orange Triangle
        this.triangleOrangeMat = new CGFappearance(this.scene);
        this.triangleOrangeMat.setAmbient(1, 0, 0, 1.0);
        this.triangleOrangeMat.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0);
        this.triangleOrangeMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleOrangeMat.setShininess(10.0);

        // Blue Triangle
        this.triangleBlueMat = new CGFappearance(this.scene);
        this.triangleBlueMat.setAmbient(1, 0, 0, 1.0);
        this.triangleBlueMat.setDiffuse(0, 0, 1, 0);
        this.triangleBlueMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBlueMat.setShininess(10.0);

        // Parallelogram
        this.parallelogramMat = new CGFappearance(this.scene);
        this.parallelogramMat.setAmbient(1, 0, 0, 1.0);
        this.parallelogramMat.setDiffuse(1, 1, 0, 0);
        this.parallelogramMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.parallelogramMat.setShininess(10.0);

        // Pink Triangle
        this.trianglePinkMat = new CGFappearance(this.scene);
        this.trianglePinkMat.setAmbient(1, 0, 0, 1.0);
        this.trianglePinkMat.setDiffuse(1, 155 / 255, 207 / 255, 0);
        this.trianglePinkMat.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePinkMat.setShininess(10.0);

        // Tangram texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(1, 1, 1, 1);
        this.texture.setDiffuse(0.8, 0.8, 0.8, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
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

          //Diamond
          this.scene.multMatrix(translationMatrix);
          this.scene.multMatrix(rotationMatrix);
          this.diamondMat.apply();
          this.texture.apply();
          this.diamond.display();
          this.scene.popMatrix();

          //Purple triangle
          this.scene.pushMatrix();
          this.scene.translate(0, -1, 0);
          this.scene.rotate(90 * Math.PI / 180, 0, 0, 1);
          this.trianglePurpleMat.apply();
          this.texture.apply();
          this.trianglePurple.display();
          this.scene.popMatrix();

          //Red Triangle
          this.scene.pushMatrix();
          this.scene.translate(-1, -2, 0);
          this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1);     
          this.triangleRedMat.apply();
          this.texture.apply();
          this.triangleRed.display();
          this.scene.popMatrix();

          //Orange Triangle
          this.scene.pushMatrix();
          this.scene.translate(0, -2, 0);
          this.scene.rotate(-90 * Math.PI / 180, 0, 0, 1);
          this.triangleOrangeMat.apply();
          this.texture.apply();
          this.triangleOrange.display();
          this.scene.popMatrix();
          
          //Blue Triangle
          this.scene.pushMatrix();
          this.scene.translate(2 - Math.sqrt(2), -2 - Math.sqrt(2), 0);
          this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);
          this.triangleBlueMat.apply();
          this.texture.apply();
          this.triangleBlue.display();
          this.scene.popMatrix();

          //Parallelogram
          this.scene.pushMatrix();
          this.scene.translate(0, Math.sqrt(2), 0);
          this.scene.scale(-1, 1, 1);
          this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
          this.parallelogramMat.apply();
          this.texture.apply();
          this.parallelogram.display();
          this.scene.popMatrix();

          //Pink Triangle
          this.scene.pushMatrix();
          this.scene.translate(1, 1 + Math.sqrt(2), 0);
          this.scene.rotate(225 * Math.PI / 180, 0, 0, 1);
          this.scene.scale(1 / Math.sqrt(2), 1 / Math.sqrt(2), 1);
          this.trianglePinkMat.apply();
          this.texture.apply();
          this.trianglePink.display();
          this.scene.popMatrix();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.parallelogram.disableNormalViz();
    };
    
    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.parallelogram.enableNormalViz();
    };


}