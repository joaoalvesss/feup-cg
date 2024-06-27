import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);
        this.flowers = []
        this.rows = rows;
        this.cols = cols;
        this.positions = [];
        this.space = 10;

        for (let i = 0; i < rows*cols; i++) {
            let petal_length = Math.random() * 2 + 1.5;
            petal_length = petal_length*2.5;
            this.positions.push([(Math.random()-0.5)*300, (Math.random()-0.5)*300])
            //this.positions = [[-50, -50]]
            this.flowers.push(new MyFlower(scene, 0.5, Math.random() * 10 + 12.5, Math.floor(Math.random() * 5) + 7, petal_length, 
                                petal_length/2, 150, petal_length/4, this.positions[i][0], -90, this.positions[i][1]));
        }
    }

    get_flowers() {
        return this.flowers;
    }

    display() {
        for (let i = 0; i < this.flowers.length; i++) {
            this.scene.pushMatrix();
            //this.scene.translate(this.space * (i % this.cols) + this.positions[i][0], -90, i / this.cols * this.space + this.positions[i][1]);
            this.scene.translate(this.flowers[i].x, this.flowers[i].y, this.flowers[i].z)
            this.scene.rotate(- Math.PI / 2, 1, 0, 0);
            //this.scene.scale(2.5, 2.5, 2.5);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }
}
