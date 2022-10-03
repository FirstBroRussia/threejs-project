import * as THREE from '../three.module.js';

export default class {
    renderer = null;
    camera = null;
    scene = null;

    object = null;

    light1 = null;

    updatePool = {};
    resizePool = {};

    init(data) {
        const {renderer} = data;

        this.createResize();

        this.createRenderer(renderer);
        this.createCamera();
        this.createScene();
        this.createLight();

        this.update();
    }

    createRenderer(settings) {
        if (this.renderer) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);

            this.renderer.dispose();
        }

        this.renderer = new THREE.WebGLRenderer(settings);
        
        settings.parentDOMElement.appendChild(this.renderer.domElement);

        this.renderer.setSize(
            settings.parentDOMElement.offsetWidth,
            settings.parentDOMElement.offsetHeight
        );

        this.renderer.setClearColor(settings.clearColor || 'black');
        this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio);

        const that = this;

        this.addResize('resize_render', () => {
            that.renderer.setSize(
                that.renderer.domElement.parentNode.offsetWidth,
                that.renderer.domElement.parentNode.offsetHeight
            );
        });
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.renderer.domElement.width/this.renderer.domElement.height,
            1,
            100
        );

        const that = this;

        this.addResize('resize_camera', () => {
            that.camera.aspect = this.renderer.domElement.width/this.renderer.domElement.height;

            that.camera.updateProjectionMatrix();
        });
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createLight() {
        this.light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(this.light1);
        this.light1.position.set(5, 5, 5);
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        
        let that = this;

        requestAnimationFrame(() => {
            that.update();
        });

        for (const key in this.updatePool) this.updatePool[key]();
    }

    addUpdate(name, callback) {
        this.updatePool[name] = callback;
    }

    removeUpdate(name) {
        delete this.updatePool[name];
    }

    createResize() {
        let that = this;

        window.addEventListener('resize', () => {
            that.resize();
        });
    }

    resize() {
        for (const key in this.resizePool) this.resizePool[key]();
    }

    addResize(name, callback) {
        this.resizePool[name] = callback;
    }

    removeResize(name) {
        delete this.resizePool[name];
    }
}
