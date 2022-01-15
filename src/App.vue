<template>
  <v-app id="app" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as earthTex from "./assets/earth.jpeg";
import * as moonTex from "./assets/moon.jpeg";

export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    initThree() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 100;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

      const controls = new OrbitControls(camera, renderer.domElement);

      document.getElementById("app").appendChild(renderer.domElement);
      return [scene, camera, renderer, controls];
    },
    loadTexture(tex) {
      const texture = new THREE.TextureLoader().load(tex);

      // immediately use the texture for material creation
      const material = new THREE.MeshLambertMaterial({ map: texture });
      return material;
    },
    initEarth(scene) {
      const geometry = new THREE.SphereGeometry(20, 1024, 1024);
      const material = this.loadTexture(earthTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "earth";
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.add(this.initMoon());

      scene.add(mesh);
    },
    initMoon() {
      const geometry = new THREE.SphereGeometry(5, 1024, 1024);
      const material = this.loadTexture(moonTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "moon";
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      return mesh;
    },
  },
  mounted() {
    const [scene, camera, renderer, controls] = this.initThree();
    this.initEarth(scene);
    // scene.add(this.initMoon());

    const earth = scene.getObjectByName("earth");
    const moon = scene.getObjectByName("moon");
    moon.position.z = 50;

    //Create a DirectionalLight and turn on shadows for the light
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(0, 0, 100); //default; light shining from top
    light.castShadow = true; // default false
    scene.add(light);

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1024; // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 200; // default

    light.target = earth;
    light.name = "sun";

    scene.add(light);
    // const helper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(helper);

    // const sun = scene.getObjectByName("sun");

    function animate() {
      //Earth rotation and orbit
      earth.rotation.y = Date.now() * -0.001;

      // sun.position.x = Math.sin(Date.now() * 0.001) * 219.15;
      // sun.position.z = Math.cos(Date.now() * 0.001) * 219.15;

      controls.update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  },
};
</script>

