import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.rocks = [];
        this.createRocks();
    }

    createRocks() {
        const baseSize = 4;
        const heightIncrement = 1;
        let currentY = 0;
        let currentLayer = baseSize;

        while (currentLayer > 0) {
            for (let i = 0; i < currentLayer; i++) {
                let x = (i - (currentLayer - 1) / 2) * 1.2;
                for (let j = 0; j < currentLayer; j++) {
                    let z = (j - (currentLayer - 1) / 2) * 1.2;
                    const slices = 15;
                    const stacks = 15;
                    let rock = new MyRock(this.scene, slices, stacks, this.texture);
                    rock.position = { x: x, y: currentY, z: z };
                    rock.scale = {
                        x: 0.5 + Math.random() * 0.5,
                        y: 0.5 + Math.random() * 0.5,
                        z: 0.5 + Math.random() * 0.5,
                    };
                    rock.rotation = {
                        x: Math.random() * 360,
                        y: Math.random() * 360,
                        z: Math.random() * 360,
                    };
                    this.rocks.push(rock);
                }
            }
            currentY += heightIncrement;
            currentLayer--;
        }
    }

    display() {
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setEmission(0.5, 0.5, 0.5, 1);

        for (let rock of this.rocks) {
            this.scene.pushMatrix();
            this.material.apply();
            this.scene.translate(rock.position.x, rock.position.y, rock.position.z);
            this.scene.scale(rock.scale.x, rock.scale.y, rock.scale.z);
            this.scene.rotate(rock.rotation.x * Math.PI / 180, 1, 0, 0);
            this.scene.rotate(rock.rotation.y * Math.PI / 180, 0, 1, 0);
            this.scene.rotate(rock.rotation.z * Math.PI / 180, 0, 0, 1);
            rock.display();
            this.scene.popMatrix();
        }
    }
}
