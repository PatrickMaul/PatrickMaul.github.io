<template>
  <v-app id="app">
    <!--  -->
  </v-app>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as earthTex from "./assets/earth.jpeg";
import * as moonTex from "./assets/moon.jpeg";
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
      camera.position.z = 50;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.enableZoom = false;

      controls.maxDistance = 100;

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
      const light = new THREE.SpotLight(0xffffff);

      light.position.set(-100, 0, 100);
      light.castShadow = true;
      scene.add(light);

      //Set up shadow properties for the light
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 300;

      light.target = targetObject;
      light.name = "sun";

      scene.add(light);

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
    const moon = scene.getObjectByName("moon");
    moon.position.x = 40;

    this.initLights(scene, earth, false);

    const sun = scene.getObjectByName("sun");

    // Pointlist for drawing orbit (only in development)
    // let points = [];
    // let self = this;

    function animate() {
      // Rotation
      earth.rotation.y = Date.now() * -0.0001;
      moon.rotation.y = Date.now() * 0.001;

      // Orbit
      moon.position.x = 100 * Math.cos(Date.now() * -0.0001) + 0;
      moon.position.z = 100 * Math.sin(Date.now() * -0.0001) + 0;
      sun.position.x = 150 * Math.cos(Date.now() * 0.0001) + 0;
      sun.position.z = 150 * Math.sin(Date.now() * 0.0001) + 0;

      // Push points for drawing orbit (only in development)
      // points.push(
      //   new THREE.Vector3(moon.position.x, moon.position.y, moon.position.z)
      // );
      // scene.add(self.drawPlanetLine(points, 0xff0000));

      controls.update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  },
};
</script>
