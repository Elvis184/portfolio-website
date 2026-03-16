import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";

const SCENE_TUNING = {
  cameraFov: 48,
  cameraStartZ: 7.2,
  baseOrbitSpin: 0.0034,
  torusSpin: 0.0022,
  trailSpin: 0.22,
  pointerInfluenceX: 0.45,
  pointerInfluenceY: 0.3,
  scrollDepthShift: 0.45,
};

const BLOOM_TUNING = {
  strength: 0.72,
  radius: 0.6,
  threshold: 0.9,
};

const DOF_TUNING = {
  focus: 6.7,
  aperture: 0.00006,
  maxblur: 0.0045,
};

function neonMaterial(color, emissive, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.85,
    roughness: 0.28,
    metalness: 0.7,
    transparent: opacity < 1,
    opacity,
  });
}

function createRocketIcon() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.14, 0.52, 6, 12),
    neonMaterial(0xdbeafe, 0x60a5fa)
  );
  body.rotation.z = Math.PI / 2;
  group.add(body);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.24, 14), neonMaterial(0xe0e7ff, 0xa78bfa));
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 0.42;
  group.add(nose);

  const wingTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.04), neonMaterial(0x60a5fa, 0x22d3ee));
  wingTop.position.set(-0.18, 0.2, 0);
  wingTop.rotation.z = 0.6;
  group.add(wingTop);

  const wingBottom = wingTop.clone();
  wingBottom.position.y = -0.2;
  wingBottom.rotation.z = -0.6;
  group.add(wingBottom);

  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.24, 10), neonMaterial(0xf59e0b, 0xf97316, 0.9));
  flame.rotation.z = Math.PI / 2;
  flame.position.x = -0.5;
  group.add(flame);

  group.scale.setScalar(0.78);
  return group;
}

function createCloudIcon() {
  const group = new THREE.Group();
  const cloudMat = neonMaterial(0xcffafe, 0x38bdf8, 0.92);
  const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 20), cloudMat);
  const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 20), cloudMat);
  const p3 = new THREE.Mesh(new THREE.SphereGeometry(0.19, 20, 20), cloudMat);
  p1.position.set(-0.24, 0.02, 0);
  p2.position.set(0.05, 0.08, 0);
  p3.position.set(0.32, 0.02, 0);
  group.add(p1, p2, p3);
  group.scale.setScalar(0.9);
  return group;
}

function createGearIcon() {
  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.07, 14, 16),
    neonMaterial(0xa5b4fc, 0x8b5cf6)
  );
  group.add(core);

  for (let i = 0; i < 8; i += 1) {
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.08), neonMaterial(0xc4b5fd, 0x8b5cf6));
    const angle = (i / 8) * Math.PI * 2;
    tooth.position.set(Math.cos(angle) * 0.32, Math.sin(angle) * 0.32, 0);
    tooth.rotation.z = angle;
    group.add(tooth);
  }

  group.scale.setScalar(0.82);
  return group;
}

function createCodeIcon() {
  const group = new THREE.Group();
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.44, 0.09),
    neonMaterial(0x111827, 0x1d4ed8, 0.92)
  );
  group.add(panel);

  const bracketMat = neonMaterial(0x22d3ee, 0x22d3ee);
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.23, 0.03), bracketMat);
  left.position.set(-0.16, 0, 0.06);
  left.rotation.z = 0.5;
  group.add(left);

  const right = left.clone();
  right.position.x = 0.16;
  right.rotation.z = -0.5;
  group.add(right);

  const slash = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.27, 0.03), neonMaterial(0xa78bfa, 0x8b5cf6));
  slash.rotation.z = 0.26;
  slash.position.z = 0.06;
  group.add(slash);

  group.scale.setScalar(0.74);
  return group;
}

function createMailIcon() {
  const group = new THREE.Group();
  const envelope = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.42, 0.08),
    neonMaterial(0xeff6ff, 0x60a5fa, 0.95)
  );
  group.add(envelope);

  const flap = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.18, 3), neonMaterial(0xbfdbfe, 0x38bdf8));
  flap.rotation.x = Math.PI;
  flap.rotation.z = Math.PI;
  flap.position.set(0, 0.03, 0.06);
  group.add(flap);

  group.scale.setScalar(0.72);
  return group;
}

function createIconSet() {
  return [
    createRocketIcon(),
    createCloudIcon(),
    createGearIcon(),
    createCodeIcon(),
    createMailIcon(),
    createGearIcon(),
  ];
}

export default function HeroTechScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      SCENE_TUNING.cameraFov,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, SCENE_TUNING.cameraStartZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    composer.setSize(mount.clientWidth, mount.clientHeight);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      BLOOM_TUNING.strength,
      BLOOM_TUNING.radius,
      BLOOM_TUNING.threshold
    );
    composer.addPass(bloomPass);

    const bokehPass = new BokehPass(scene, camera, {
      focus: DOF_TUNING.focus,
      aperture: DOF_TUNING.aperture,
      maxblur: DOF_TUNING.maxblur,
      width: mount.clientWidth,
      height: mount.clientHeight,
    });
    composer.addPass(bokehPass);

    const ambient = new THREE.AmbientLight(0x9ec5ff, 0.9);
    scene.add(ambient);

    const key = new THREE.PointLight(0xa78bfa, 2.2, 26);
    key.position.set(5.5, 4, 6);
    scene.add(key);

    const fill = new THREE.PointLight(0x22d3ee, 1.8, 24);
    fill.position.set(-5, -2.2, 6);
    scene.add(fill);

    const orbitCore = new THREE.Group();
    scene.add(orbitCore);

    const iconAnchors = [];
    const icons = createIconSet();
    icons.forEach((icon, index) => {
      const anchor = new THREE.Group();
      const angle = (index / icons.length) * Math.PI * 2;
      const radius = 3 + (index % 2) * 0.7;
      anchor.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.9) * 1.2, Math.sin(angle) * radius * 0.6);
      icon.rotation.y = angle + Math.PI * 0.5;
      anchor.add(icon);
      orbitCore.add(anchor);
      iconAnchors.push({ anchor, mesh: icon, baseAngle: angle, radius, speed: 0.14 + index * 0.025 });
    });

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.05, 18, 140),
      new THREE.MeshStandardMaterial({
        color: 0x34e7ff,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.45,
        roughness: 0.28,
        metalness: 0.72,
        transparent: true,
        opacity: 0.68,
      })
    );
    torus.rotation.x = 1.35;
    orbitCore.add(torus);

    const trailGroup = new THREE.Group();
    scene.add(trailGroup);
    for (let i = 0; i < 24; i += 1) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.034 + i * 0.001, 10, 10),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? 0x22d3ee : 0xe879f9,
          transparent: true,
          opacity: 0.54 - i * 0.013,
        })
      );
      node.position.set(Math.cos(i * 0.42) * 2.9, Math.sin(i * 0.37) * 1.65, -0.7 - i * 0.085);
      trailGroup.add(node);
    }

    const pointer = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let scrollNorm = 0;
    const handleScroll = () => {
      const max = Math.max(window.innerHeight, 1);
      scrollNorm = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const t = clock.getElapsedTime();

      orbitCore.rotation.y += SCENE_TUNING.baseOrbitSpin;
      orbitCore.rotation.x = Math.sin(t * 0.22) * 0.11 + pointer.y * 0.18;
      orbitCore.rotation.z = Math.cos(t * 0.16) * 0.08 + pointer.x * 0.14;

      iconAnchors.forEach(({ anchor, mesh, baseAngle, radius, speed }, index) => {
        const a = baseAngle + t * speed;
        anchor.position.x = Math.cos(a) * radius;
        anchor.position.y = Math.sin(a * 1.7) * (1.1 + (index % 2) * 0.16);
        anchor.position.z = Math.sin(a) * radius * 0.58;
        mesh.rotation.x += 0.01 + index * 0.0008;
        mesh.rotation.y += 0.008 + index * 0.0007;
      });

      torus.rotation.z += SCENE_TUNING.torusSpin;
      trailGroup.rotation.z = -t * SCENE_TUNING.trailSpin;
      trailGroup.position.y = Math.sin(t * 0.8) * 0.22 - scrollNorm * 0.35;

      camera.position.x += (pointer.x * SCENE_TUNING.pointerInfluenceX - camera.position.x) * 0.05;
      camera.position.y += ((0.18 - pointer.y * SCENE_TUNING.pointerInfluenceY) - camera.position.y) * 0.05;
      camera.position.z = SCENE_TUNING.cameraStartZ + scrollNorm * SCENE_TUNING.scrollDepthShift;
      camera.lookAt(0, 0, 0);

      composer.render();
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloomPass.setSize(w, h);
      if (bokehPass.uniforms.aspect) {
        bokehPass.uniforms.aspect.value = w / h;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      composer.passes.length = 0;
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-tech-canvas" aria-hidden="true" />;
}
