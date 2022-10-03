import * as THREE from './threejs/three.module.js';
import ViewerParent from './threejs/components/viewer.js';

const Viewer = new ViewerParent();

export default class App {
    object = null;

    constructor() {
        Viewer.init({
            renderer: {
                parentDOMElement: document.body,
                antialias: true,
                alpha: true,
                // clearColor: 'gray',
                pixelRatio: 1,
            },
        });
        this.createObject();
    }

    createObject() {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({color: 'gray'})
        );

        Viewer.scene.add(this.object);

        this.object.position.z = -5;

        let that = this;

        Viewer.addUpdate(
            'rotate_object',
            () => {
                that.object.rotation.y += 0.01;
            }
        );
    }

}
