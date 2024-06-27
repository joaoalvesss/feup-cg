import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'MyDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'MyTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'MyParallelogram').name('Display Parallelogram');
        this.gui.add(this.scene, 'MyTriangleSmall').name('Display Triangle Small');
        this.gui.add(this.scene, 'MyTriangleBig').name('Display Triangle Big');
        
        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}