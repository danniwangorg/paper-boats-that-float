import * as THREE from './jsm/build/three.module.js';
import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { Water } from './jsm/objects/Water.js';
import { Sky } from './jsm/objects/Sky.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

let container, stats;
let camera, scene, raycaster, renderer;
let controls, water, sun, mesh;
// let controls, water, sun, mesh, boat;

const loader = new GLTFLoader();

//load paperboat model
class Boat {
    constructor() {
        loader.load('../assets/paperboat.glb', (glb) => {
            console.log(glb);
            scene.add(glb.scene);
            glb.scene.scale.set(200, 200, 200);
            glb.scene.position.set(0, 0, 90);
            this.boat = glb.scene;
            this.direction = 1;
            // this.date = Date;
            // this.loc = Location;
            // this.msg = Story;
            // this.num = Count;
        })
    }
    update() {
        if (this.boat) {
            this.boat.position.z -= 0.1 * this.direction;
            if (this.boat.position.z <= -300 || this.boat.position.z >= 90) {
                // this.boat.position.z = 0.1;
                this.direction = -this.direction;
            }
        }
    }
}

const boat = new Boat();

let INTERSECTED;
// let theta = 0;

const pointer = new THREE.Vector2();
// const radius = 100;

init();
animate();

function init() {
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(30, 30, 100);

    sun = new THREE.Vector3();

    // boat = new Boat();

    raycaster = new THREE.Raycaster();

    document.addEventListener('click', onPointerMove);

    // scene.add(boat);
    // console.log(scene);

    // Water

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(
        waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('../assets/waternormals.jpg', function(texture) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = -Math.PI / 2;

    scene.add(water);

    // Sky

    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const parameters = {
        elevation: 2,
        azimuth: 180
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    function updateSun() {

        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();

        scene.environment = pmremGenerator.fromScene(sky).texture;

    }

    updateSun();

    const geometry = new THREE.BoxGeometry(30, 30, 30);
    const material = new THREE.MeshStandardMaterial({ roughness: 0 });

    mesh = new THREE.Mesh(geometry, material);
    // scene.add( mesh );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    stats = new Stats();
    // container.appendChild(stats.dom);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    //console.log('animate')
    requestAnimationFrame(animate);
    render();
    stats.update();
    boat.update();
}

function render() {

    const time = performance.now() * 0.001;

    mesh.position.y = Math.sin(time) * 20 + 5;
    mesh.rotation.x = time * 0.5;
    mesh.rotation.z = time * 0.51;

    water.material.uniforms['time'].value += 1.0 / 60.0;

    // theta += 0.1;

    // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    // camera.lookAt(scene.position);

    // camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    // const intersects = raycaster.intersectObjects( scene.children, false );
    const intersects = raycaster.intersectObjects(boat, false);

    console.log(intersects);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
            console.log("no intersection");

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;
        console.log("has intersection");

    }

    renderer.render(scene, camera);
}

//open alert window

var selectedObject;

// function onclick(event) {
//     alert("onclick")
//     var mouse = new THREE.Vector2();
//     raycaster.setFromCamera(mouse, camera);
//     var intersects = raycaster.intersectObjects(planets, true); //array
//     if (intersects.length > 0) {
//         selectedObject = intersects[0];
//         alert(selectedObject);
//     }
// }

function onPointerMove(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(pointer);

}

window.addEventListener("load", () => {

    let boatButton = document.getElementById("button-two");
    boatButton.addEventListener('click', () => {

        // store the username, location, message
        let boatInput = document.getElementById("username").value;

        let boatInputObj = { "boat": bsoatInput };
        boatInputObj.loc = document.getElementById("location").value;
        boatInputObj.msg = document.getElementById("message").value;

        let boatInputJSON = JSON.stringify(boatInputObj);
        console.log(boatInputJSON);

        fetch("/boats", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: cloudInputJSON
            })
            .then(response => response.json())
            .then(data => {
                console.log("Did this work?");
                console.log(data);
            })
    });
});