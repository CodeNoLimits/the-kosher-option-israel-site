import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// A packaging study, not a replica of Sorotzkin's product or certification.
const mat = {
  walnut: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.84 }),
  tray: new THREE.MeshStandardMaterial({ color: 0x292d2a, roughness: 0.58, metalness: 0.04 }),
  recess: new THREE.MeshStandardMaterial({ color: 0x0b0e0d, roughness: 0.82 }),
  paper: new THREE.MeshStandardMaterial({ color: 0xe7dcc5, roughness: 0.82, side: THREE.DoubleSide }),
  film: new THREE.MeshPhysicalMaterial({ color: 0xdce6dd, roughness: 0.12, transparent: true, opacity: 0.17, depthWrite: false, side: THREE.DoubleSide, clearcoat: 0.75 }),
  salmon: new THREE.MeshStandardMaterial({ color: 0xa55731, roughness: 0.68 }),
  char: new THREE.MeshStandardMaterial({ color: 0x3d271b, roughness: 0.9 }),
  green: new THREE.MeshStandardMaterial({ color: 0x42603a, roughness: 0.72 }),
  rice: new THREE.MeshStandardMaterial({ color: 0xcab98b, roughness: 0.85 }),
  vegetable: new THREE.MeshStandardMaterial({ color: 0x7a3e29, roughness: 0.82 }),
  ceramic: new THREE.MeshPhysicalMaterial({ color: 0xd6c5a7, roughness: 0.37, clearcoat: 0.18 }),
  linen: new THREE.MeshStandardMaterial({ color: 0x8d7863, roughness: 1 })
};

function rounded(w, h, d, radius, material, position, parent) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, radius), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function randomGenerator() {
  let seed = 1729;
  return () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
}

function woodMap() {
  const surface = document.createElement("canvas");
  surface.width = surface.height = 256;
  const ctx = surface.getContext("2d");
  ctx.fillStyle = "#2b2019";
  ctx.fillRect(0, 0, 256, 256);
  const random = randomGenerator();
  for (let i = 0; i < 115; i++) {
    const y = random() * 256;
    ctx.strokeStyle = i % 3 === 0 ? "rgba(174,125,78,.085)" : "rgba(3,2,1,.12)";
    ctx.lineWidth = 0.5 + random() * 1.8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(70, y + random() * 3, 150, y - random() * 3, 256, y);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(surface);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeMeal() {
  const group = new THREE.Group();
  const lid = new THREE.Group();
  group.add(lid);
  rounded(2.56, 0.17, 1.82, 0.12, mat.tray, [0, 0.13, 0], group);
  rounded(2.37, 0.018, 1.63, 0.08, mat.recess, [0, 0.224, 0], group);
  rounded(1.21, 0.018, 1.46, 0.07, mat.tray, [-0.52, 0.239, 0], group);
  rounded(0.92, 0.018, 0.67, 0.055, mat.tray, [0.66, 0.239, -0.39], group);
  rounded(0.92, 0.018, 0.67, 0.055, mat.tray, [0.66, 0.239, 0.39], group);

  const fish = rounded(0.83, 0.105, 0.43, 0.055, mat.salmon, [-0.59, 0.306, -0.06], group);
  fish.rotation.y = -0.11;
  const random = randomGenerator();
  for (let i = 0; i < 21; i++) {
    const fleck = new THREE.Mesh(new THREE.SphereGeometry(0.009 + random() * 0.009, 5, 4), mat.char);
    fleck.position.set(-0.96 + random() * 0.7, 0.369, -0.25 + random() * 0.36);
    group.add(fleck);
  }
  for (let i = 0; i < 7; i++) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.69, 8), mat.green);
    stem.rotation.z = Math.PI / 2;
    stem.rotation.y = -0.1;
    stem.position.set(-0.55, 0.284, 0.31 + i * 0.045);
    group.add(stem);
  }
  for (let i = 0; i < 90; i++) {
    const grain = new THREE.Mesh(new THREE.SphereGeometry(0.014, 5, 4), mat.rice);
    grain.scale.set(1.5, 0.72, 0.66);
    grain.rotation.y = random() * Math.PI;
    grain.position.set(0.28 + random() * 0.72, 0.268 + random() * 0.035, -0.65 + random() * 0.53);
    group.add(grain);
  }
  for (let i = 0; i < 15; i++) {
    const cube = rounded(0.052 + random() * 0.06, 0.025, 0.05 + random() * 0.07, 0.012,
      i % 3 === 0 ? mat.vegetable : mat.green,
      [0.3 + random() * 0.7, 0.27, 0.11 + random() * 0.49], group);
    cube.rotation.y = random() * Math.PI;
  }

  rounded(2.53, 0.018, 1.79, 0.1, mat.film, [0, 0.39, 0], lid);
  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(new RoundedBoxGeometry(2.53, 0.018, 1.79, 5, 0.1)),
    new THREE.LineBasicMaterial({ color: 0xabb4a5, transparent: true, opacity: 0.42 })
  );
  edge.position.y = 0.39;
  lid.add(edge);
  // Deliberately blank band: no fictional hechsher, logo, or supplier label.
  rounded(0.27, 0.009, 1.88, 0.005, mat.paper, [0.12, 0.411, 0], lid);
  rounded(0.27, 0.115, 0.008, 0.004, mat.paper, [0.12, 0.34, 0.947], lid);
  rounded(0.27, 0.115, 0.008, 0.004, mat.paper, [0.12, 0.34, -0.947], lid);
  group.rotation.y = -0.28;
  return { group, lid };
}

export function mountTable(canvas) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  mat.walnut.map = woodMap();
  mat.walnut.needsUpdate = true;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.37;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x18110d);
  scene.fog = new THREE.FogExp2(0x18110d, 0.13);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
  const target = new THREE.Vector3(0, 0.15, 0);
  const views = {
    table: new THREE.Vector3(3.85, 2.6, 4.45),
    bowl: new THREE.Vector3(2.55, 1.92, 3.05),
    layers: new THREE.Vector3(3.1, 2.55, 3.45)
  };
  camera.position.copy(views.table);

  const tabletop = rounded(12, 0.28, 9, 0.08, mat.walnut, [0, -0.18, 0], scene);
  tabletop.castShadow = false;
  const cloth = rounded(1.48, 0.009, 2.2, 0.01, mat.linen, [-2.08, 0.007, -0.5], scene);
  cloth.rotation.y = 0.08;
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.6, 0.045, 64), mat.ceramic);
  plate.position.set(-2.04, 0.075, -0.42);
  plate.receiveShadow = true;
  scene.add(plate);
  const meal = makeMeal();
  scene.add(meal.group);

  scene.add(new THREE.HemisphereLight(0xc5a882, 0x24160f, 2.15));
  const key = new THREE.SpotLight(0xffd5a0, 105, 14, 0.65, 0.75, 1);
  key.position.set(-2.0, 5.2, 1.5);
  key.target.position.set(0, 0, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0002;
  scene.add(key, key.target);
  const rim = new THREE.DirectionalLight(0xb6c2c0, 2.4);
  rim.position.set(1.8, 2.4, -3);
  scene.add(rim);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = !reduced;
  controls.enablePan = false;
  controls.target.copy(target);
  controls.minDistance = 3.2;
  controls.maxDistance = 7.2;
  controls.minPolarAngle = 0.38;
  controls.maxPolarAngle = 1.32;
  controls.update();

  function render() { renderer.render(scene, camera); }
  let lidAnimation = 0;
  function moveLid(targetHeight) {
    cancelAnimationFrame(lidAnimation);
    if (reduced) { meal.lid.position.y = targetHeight; render(); return; }
    const initial = meal.lid.position.y;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      meal.lid.position.y = initial + (targetHeight - initial) * eased;
      render();
      if (progress < 1) lidAnimation = requestAnimationFrame(tick);
    }
    lidAnimation = requestAnimationFrame(tick);
  }
  function frame(name) {
    camera.position.copy(views[name] || views.table);
    controls.target.copy(target);
    controls.update();
    moveLid(name === "layers" ? 0.84 : 0);
    render();
  }
  const palettes = {
    night: { background: 0x18110d, wood: 0xffffff, linen: 0x8d7863 },
    clay: { background: 0x443026, wood: 0xffd8ad, linen: 0xb39478 },
    sage: { background: 0x202923, wood: 0xc2d0b7, linen: 0x8f9f86 }
  };
  function setTheme(name) {
    const palette = palettes[name] || palettes.night;
    scene.background.setHex(palette.background);
    scene.fog.color.setHex(palette.background);
    mat.walnut.color.setHex(palette.wood);
    mat.linen.color.setHex(palette.linen);
    render();
  }
  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    render();
  }
  function loop() {
    controls.update();
    render();
    requestAnimationFrame(loop);
  }
  resize();
  if (reduced) controls.addEventListener("change", render);
  else loop();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  canvas.addEventListener("keydown", event => {
    const step = 0.12;
    if (event.key === "ArrowLeft") camera.position.x -= step;
    else if (event.key === "ArrowRight") camera.position.x += step;
    else if (event.key === "ArrowUp") camera.position.z -= step;
    else if (event.key === "ArrowDown") camera.position.z += step;
    else if (event.key === "+" || event.key === "=") camera.position.lerp(target, 0.08);
    else if (event.key === "-" || event.key === "_") camera.position.addScaledVector(camera.position.clone().sub(target).normalize(), 0.16);
    else return;
    event.preventDefault();
    controls.update();
    render();
  });
  return { frame, setTheme };
}
