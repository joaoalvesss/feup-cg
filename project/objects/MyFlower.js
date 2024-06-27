import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyPollen } from './MyPollen.js';

export class MyFlower extends CGFobject {
    constructor(scene, stemRadius, stemLength, petalCount, petalLength, petalWidth, petalAngle, receptacleRadius, x, y, z) {
        super(scene);
        this.stemLength1 = stemLength*(Math.random()/2 + 0.25);
        this.stemLength2 = stemLength - this.stemLength1;

        this.stem = new MyStem(scene, stemRadius, this.stemLength1);
        this.stem2 = new MyStem(scene, stemRadius, this.stemLength2);
        this.petalCount = petalCount;
        this.color = Math.floor(Math.random() * 4);
        this.petal = new MyPetal(scene, petalAngle, petalLength, petalWidth, this.color);
        this.receptacle = new MyReceptacle(scene, receptacleRadius);
        this.receptacle_radius = receptacleRadius;
        this.petal_length = petalLength;
        this.petal_angle = petalAngle;
        this.angles = [];
        for (let i = 0; i < this.petalCount; i++) {
            this.angles.push(this.petal_angle + Math.random()*20 - 10);
        }
        this.stemAngle = Math.random() * 45;
        this.flowerRotation = Math.random() * 360;
        this.leaves = Math.floor(Math.random() * 3);
        this.leave = new MyPetal(scene, 210, petalLength, petalWidth, 4);
        this.secondLeaveAngle = Math.random() * 90 + 45;
        this.leave1 = Math.random() * 60 - 30;
        this.leave2 = Math.random() * 60 - 30;
        this.pollen = new MyPollen(this.scene);
        this.pollenRotation = [Math.random()*2*Math.PI, Math.random()*2*Math.PI, Math.random()*2*Math.PI];
        this.x = x;
        this.y = y;
        this.z = z;

    }

    take_pollen() {
        let pol = this.pollen;
        this.pollen = null;
        return pol;
    }

    on_flower(x, y, z) {
        let receptacle_centre = []
        receptacle_centre.push(this.x + Math.cos(this.flowerRotation / 180 * Math.PI)*this.stemLength2*Math.cos(this.stemAngle / 180 * Math.PI));
        receptacle_centre.push(this.y + this.stemLength1 + this.stemLength2*Math.sin(this.stemAngle / 180 * Math.PI));
        receptacle_centre.push(this.z - Math.sin(this.flowerRotation / 180 * Math.PI)*this.stemLength2*Math.cos(this.stemAngle / 180 * Math.PI));

        

        let distance = Math.sqrt(Math.pow(x - receptacle_centre[0], 2) + Math.pow(y - receptacle_centre[1], 2) + Math.pow(z - receptacle_centre[2], 2));
        //console.log([this.x, this.y, this.z])
        if (distance < (this.receptacle_radius + this.petal_length/2)*(this.receptacle_radius + this.petal_length/2) && (y - receptacle_centre[1] < 6)) {
            return true;
        } 


        return false; // Position is not on the flower
    }

    display() {
        // Display stem
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.stemLength1);
        this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(this.stemAngle * Math.PI / 180, 0, 1, 0);
        this.stem2.display();
        this.scene.popMatrix();


        // Display receptacle
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.stem.length);
        this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
        this.scene.rotate(this.stemAngle * Math.PI / 180, 0, 1, 0);
        this.scene.translate(0, 0, this.stem2.length + 0.01);
        this.receptacle.display();
        this.scene.popMatrix();

        if (this.pollen != null) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.stem.length);
            this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
            this.scene.rotate(this.stemAngle * Math.PI / 180, 0, 1, 0);
            this.scene.translate(0, 0, this.stem2.length + 0.01 + 0.5);
            this.scene.scale(1, 1, 1);
            this.scene.rotate(this.pollenRotation[0], 0, 0, 1);
            this.scene.rotate(this.pollenRotation[1], 0, 1, 0);
            this.scene.rotate(this.pollenRotation[2], 1, 0, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Display petals around the receptacle
        for (let i = 0; i < this.petalCount; i++) {
            this.petal.change_angle(this.angles[i]);
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.stem.length);
            this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
            this.scene.rotate(this.stemAngle * Math.PI / 180, 0, 1, 0);
            this.scene.translate(0, 0, this.stem2.length + 0.01);
            this.scene.rotate((i * 360 / this.petalCount) * Math.PI / 180, 0, 0, 1);
            this.scene.translate(0, -this.receptacle_radius - this.petal_length, 0); 
            this.petal.display();
            this.scene.popMatrix();
        }

        if (this.leaves === 1) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.stem.length);
            this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
            this.scene.translate(0, -this.petal_length, 0); 
            this.leave.display();
            this.scene.popMatrix();
        }
        
        else if (this.leaves === 2) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.stem.length);
            this.scene.rotate(this.flowerRotation * Math.PI / 180, 0, 0, 1);
            this.scene.rotate(this.leave1 * Math.PI / 180, 0, 0, 1);
            this.scene.translate(0, -this.petal_length, 0);
            this.leave.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(0, 0, this.stem.length);
            this.scene.rotate((this.flowerRotation + this.secondLeaveAngle) * Math.PI / 180, 0, 0, 1);
            this.scene.rotate(this.leave2 * Math.PI / 180, 1, 0, 0);
            this.scene.translate(0, -this.petal_length, 0);
            this.leave.display();
            this.scene.popMatrix();
        }
    }
}
