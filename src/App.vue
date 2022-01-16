<template>
  <v-app class="d-flex">
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

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.enableZoom = true;

      document.getElementById("simulation").appendChild(renderer.domElement);
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

      scene.add(mesh);
    },
    initMoon() {
      const geometry = new THREE.SphereGeometry(3, 1024, 1024);
      const material = this.loadTexture(moonTex);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.name = "moon";
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      return mesh;
    },
    initLights(scene, targetObject, getHelp) {
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
      scene.add(mesh);

      const ambiLight = new THREE.AmbientLight(0x404040, 0.2);
      scene.add(ambiLight);

      if (getHelp) {
        const helper = new THREE.CameraHelper(light.shadow.camera);
        scene.add(helper);
      }
    },
    generateBackground(scene) {
      const geometry = new THREE.SphereGeometry(500, 30, 30);

      let material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(bgTex),
        side: THREE.BackSide,
      });

      let mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    },
    // drawPlanetLine(points, colorHEX) {
    //   const material = new THREE.LineBasicMaterial({ color: colorHEX });
    //   const geometry = new THREE.BufferGeometry().setFromPoints(points);
    //   const line = new THREE.Line(geometry, material);

    //   return line;
    // },
  },
  mounted() {
    const [scene, camera, renderer, controls] = this.initThree();
    this.generateBackground(scene);
    this.initEarth(scene);
    scene.add(this.initMoon());

    const earth = scene.getObjectByName("earth");
    earth.rotation.z = 0.07;
    this.initLights(scene, earth, false);

    const moon = scene.getObjectByName("moon");
    const sun = scene.getObjectByName("sun");

    moon.position.x = 40;

    // Pointlist for drawing orbit (only in development)
    // let pointsMoon = [];
    // let pointsEarth = [];
    // let self = this;

    function animate() {
      controls.target = new THREE.Vector3(
        earth.position.x,
        earth.position.y,
        earth.position.z
      );
      camera.position.x = earth.position.x;
      // camera.position.y = earth.position.y;
      camera.position.z = earth.position.z - 50;

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

      // Push points for drawing orbit (only in development)
      // pointsMoon.push(
      //   new THREE.Vector3(moon.position.x, moon.position.y, moon.position.z)
      // );
      // scene.add(self.drawPlanetLine(pointsMoon, 0xff0000));
      // pointsEarth.push(
      //   new THREE.Vector3(earth.position.x, earth.position.y, earth.position.z)
      // );
      // scene.add(self.drawPlanetLine(pointsEarth, 0x0000ff));

      controls.update();

      renderer.render(scene, camera);
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

#curved-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-48%);
  z-index: 0;
  display: flex;
}
</style>