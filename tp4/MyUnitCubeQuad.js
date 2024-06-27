import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textureTop, textureBottom, textureFront, textureBack, textureRight, textureLeft) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.textureRight = textureRight;
        this.textureLeft = textureLeft;
        this.textureBack = textureBack;
        this.textureFront = textureFront;
        this.textureTop = textureTop;
        this.textureBottom = textureBottom;
    }


    display() {
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.textureFront.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0,0.5,0)
        this.scene.rotate(315 * Math.PI/2 ,1, 0, 0)   
        this.textureTop.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI,1, 0, 0)
        this.textureRight.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0,0,0.5)
        this.textureBack.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0,-0.5,0)
        this.scene.rotate(Math.PI/2 ,1, 0, 0)
        this.textureBottom.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(315 * Math.PI / 2, 0, 1, 0)
        this.textureLeft.bind()
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST)
        this.quad.display()
        this.scene.popMatrix()
    }

}