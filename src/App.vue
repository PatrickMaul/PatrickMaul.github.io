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
      camera.position.z = 60;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("app").appendChild(renderer.domElement);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

      const controls = new OrbitControls(camera, renderer.domElement);

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
      mesh.receiveShadow = true;

      mesh.add(this.initMoon());
      scene.add(mesh);
    },
    initMoon() {
      const geometry = new THREE.SphereGeometry(5, 1024, 1024);
      const material = this.loadTexture(moonTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "moon";
      mesh.position.x = 35;
      mesh.castShadow = true;

      return mesh;
    },
  },
  mounted() {
    const [scene, camera, renderer, controls] = this.initThree();
    this.initEarth(scene);

    const earth = scene.getObjectByName("earth");

    // white spotlight shining from the side, casting a shadow
    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, 40);
    spotLight.position.set(0, 0, 100);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    spotLight.target = earth;
    spotLight.name = "sun";

    scene.add(spotLight);

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

