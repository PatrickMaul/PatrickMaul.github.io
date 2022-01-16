<template>
  <v-app class="d-flex">
    <div class="ab-top mt-8">
      <h1 class="headline">The universe wasn't created in a day ...</h1>
      <h3 class="subtitle-1">... unfortunately neither does this page 😭</h3>
      <v-btn :block="onMobile" text tile @click="openGithub">
        Contact me
      </v-btn>
    </div>
    <div id="simulation" />
    <!--  -->
  </v-app>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as earthTex from "./assets/earth.jpeg";
import * as moonTex from "./assets/moon.jpeg";
import * as sunTex from "./assets/sun.jpg";
import * as bgTex from "./assets/stars_milky_way.jpg";

export default {
  name: "App",
  data: () => ({
    scene: null,
    camera: null,
    renderer: null,
  }),
  computed: {
    onMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    openGithub() {
      window.open("https://github.com/PatrickMaul", "_blank");
    },
    setScene() {
      this.scene = new THREE.Scene();
    },
    setCamera(fov, near, far) {
      this.camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        near,
        far
      );
    },
    setRenderer() {
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.renderer.setClearColor(0x000000, 0);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    },
    setControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enablePan = false;
      this.controls.enableRotate = true;
      this.controls.enableZoom = true;
    },
    initThree() {
      this.setScene();
      this.setCamera(75, 0.1, 1000);
      this.setRenderer();
      this.setControls();

      document
        .getElementById("simulation")
        .appendChild(this.renderer.domElement);
    },
    loadTexture(tex) {
      const texture = new THREE.TextureLoader().load(tex);

      // immediately use the texture for material creation
      const material = new THREE.MeshLambertMaterial({ map: texture });
      return material;
    },
    initEarth() {
      const geometry = new THREE.SphereGeometry(20, 1024, 1024);
      const material = this.loadTexture(earthTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "earth";
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.scene.add(mesh);
    },
    initMoon() {
      const geometry = new THREE.SphereGeometry(3, 1024, 1024);
      const material = this.loadTexture(moonTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "moon";
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.scene.add(mesh);
    },
    initLights(targetObject, getHelp) {
      const geometry = new THREE.SphereGeometry(60, 1024, 1024);
      const texture = new THREE.TextureLoader().load(sunTex);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "sun";

      const light = new THREE.SpotLight(0xffffff);

      light.castShadow = true;

      //Set up shadow properties for the light
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 300;

      light.target = targetObject;

      mesh.add(light);
      this.scene.add(mesh);

      const ambiLight = new THREE.AmbientLight(0x404040, 0.2);
      this.scene.add(ambiLight);

      if (getHelp) {
        const helper = new THREE.CameraHelper(light.shadow.camera);
        this.scene.add(helper);
      }
    },
    generateBackground() {
      const geometry = new THREE.SphereGeometry(500, 30, 30);

      let material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(bgTex),
        side: THREE.BackSide,
      });

      let mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    },
  },
  mounted() {
    this.initThree();
    this.generateBackground();
    this.initEarth();
    this.initMoon();

    const earth = this.scene.getObjectByName("earth");
    earth.rotation.z = 0.07;
    this.initLights(earth, false);

    const moon = this.scene.getObjectByName("moon");
    const sun = this.scene.getObjectByName("sun");

    moon.position.x = 40;

    let self = this;
    function animate() {
      self.controls.target = new THREE.Vector3(
        earth.position.x,
        earth.position.y,
        earth.position.z
      );
      self.camera.position.x = earth.position.x;
      self.camera.position.z = earth.position.z - 70;

      // Rotation
      sun.rotation.y = Date.now() * -0.00001;
      earth.rotation.y = Date.now() * 0.0001;
      moon.rotation.y = Date.now() * 0.001;

      // Orbit

      earth.position.x = 150 * Math.cos(Date.now() * 0.0001) + 0;
      earth.position.z = 150 * Math.sin(Date.now() * 0.0001) + 0;
      moon.position.x =
        earth.position.x + 30 * Math.cos(Date.now() * 0.001) + 0;
      moon.position.z =
        earth.position.z + 30 * Math.sin(Date.now() * 0.001) + 0;

      self.controls.update();

      self.renderer.render(self.scene, self.camera);
      requestAnimationFrame(animate);
    }

    animate();
  },
};
</script>

<style scoped>
#simulation {
  position: relative;
  z-index: 0;
}

.ab-top {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>