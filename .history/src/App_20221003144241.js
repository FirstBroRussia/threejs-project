import * as THREE from './threejs-module/three.module.js';

export default class App {
    constructor() {
        this.createRenderer();
        this.createCamera();
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);

        document.body.appendChild(this.renderer.domElement);
    }
}
