import { useEffect, useRef } from "react";

const BASE = {
  cameraFov: 48,
  cameraStartZ: 7.2,
  orbitSpin: 0.0032,
  torusSpin: 0.0021,
  trailSpin: 0.2,
  scrollDepthShift: 0.42,
};

const QUALITY = {
  high: {
    pixelRatio: 1.8,
    iconCount: 6,
    bloom: { strength: 0.72, radius: 0.58, threshold: 0.9 },
    dof: { focus: 6.7, aperture: 0.00006, maxblur: 0.0043 },
  },
  low: {
    pixelRatio: 1.2,
    iconCount: 4,
    bloom: { strength: 0.4, radius: 0.32, threshold: 0.95 },
    dof: null,
  },
};

function neonMaterial(THREE, color, emissive, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.8,
    roughness: 0.32,
    metalness: 0.65,
    transparent: opacity < 1,
    opacity,
  });
}

function createRocketIcon(THREE) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.14, 0.52, 6, 12),
    neonMaterial(THREE, 0xdbeafe, 0x60a5fa)
  );
  body.rotation.z = Math.PI / 2;
  group.add(body);

  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.16, 0.24, 14),
    neonMaterial(THREE, 0xe0e7ff, 0xa78bfa)
  );
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 0.42;
  group.add(nose);

  const wing = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.22, 0.04),
    neonMaterial(THREE, 0x60a5fa, 0x22d3ee)
  );
  wing.position.set(-0.18, 0.2, 0);
  wing.rotation.z = 0.6;
  group.add(wing);

  const wing2 = wing.clone();
  wing2.position.y = -0.2;
  wing2.rotation.z = -0.6;
  group.add(wing2);

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.24, 10),
    neonMaterial(THREE, 0xf59e0b, 0xf97316, 0.9)
  );
  flame.rotation.z = Math.PI / 2;
  flame.position.x = -0.5;
  group.add(flame);
  group.scale.setScalar(0.78);
  return group;
}

function createCloudIcon(THREE) {
  const group = new THREE.Group();
  const mat = neonMaterial(THREE, 0xcffafe, 0x38bdf8, 0.92);
  const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 18), mat);
  const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 18), mat);
  const p3 = new THREE.Mesh(new THREE.SphereGeometry(0.19, 18, 18), mat);
  p1.position.set(-0.24, 0.02, 0);
  p2.position.set(0.05, 0.08, 0);
  p3.position.set(0.32, 0.02, 0);
  group.add(p1, p2, p3);
  group.scale.setScalar(0.9);
  return group;
}

function createGearIcon(THREE) {
  const group = new THREE.Group();
  group.add(
    new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.07, 12, 16),
      neonMaterial(THREE, 0xa5b4fc, 0x8b5cf6)
    )
  );
  for (let i = 0; i < 8; i += 1) {
    const tooth = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.18, 0.08),
      neonMaterial(THREE, 0xc4b5fd, 0x8b5cf6)
    );
    const a = (i / 8) * Math.PI * 2;
    tooth.position.set(Math.cos(a) * 0.32, Math.sin(a) * 0.32, 0);
    tooth.rotation.z = a;
    group.add(tooth);
  }
  group.scale.setScalar(0.82);
  return group;
}

function createCodeIcon(THREE) {
  const group = new THREE.Group();
  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.44, 0.09),
      neonMaterial(THREE, 0x111827, 0x1d4ed8, 0.92)
    )
  );
  const left = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.23, 0.03),
    neonMaterial(THREE, 0x22d3ee, 0x22d3ee)
  );
  left.position.set(-0.16, 0, 0.06);
  left.rotation.z = 0.5;
  group.add(left);
  const right = left.clone();
  right.position.x = 0.16;
  right.rotation.z = -0.5;
  group.add(right);
  const slash = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.27, 0.03),
    neonMaterial(THREE, 0xa78bfa, 0x8b5cf6)
  );
  slash.rotation.z = 0.26;
  slash.position.z = 0.06;
  group.add(slash);
  group.scale.setScalar(0.74);
  return group;
}

function createMailIcon(THREE) {
  const group = new THREE.Group();
  group.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.42, 0.08),
      neonMaterial(THREE, 0xeff6ff, 0x60a5fa, 0.95)
    )
  );
  const flap = new THREE.Mesh(
    new THREE.ConeGeometry(0.34, 0.18, 3),
    neonMaterial(THREE, 0xbfdbfe, 0x38bdf8)
  );
  flap.rotation.x = Math.PI;
  flap.rotation.z = Math.PI;
  flap.position.set(0, 0.03, 0.06);
  group.add(flap);
  group.scale.setScalar(0.72);
  return group;
}

function buildIcons(THREE, count) {
  const all = [
    createRocketIcon(THREE),
    createCloudIcon(THREE),
    createGearIcon(THREE),
    createCodeIcon(THREE),
    createMailIcon(THREE),
    createGearIcon(THREE),
  ];
  return all.slice(0, count);
}

export default function HeroTechScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let cleanup = () => {};
    let cancelled = false;

    const init = async () => {
      const THREE = await import(
        /* @vite-ignore */ "https://unpkg.com/three@0.179.1/build/three.module.js"
      );
      const { EffectComposer } = await import(
        /* @vite-ignore */ "https://unpkg.com/three@0.179.1/examples/jsm/postprocessing/EffectComposer.js"
      );
      const { RenderPass } = await import(
        /* @vite-ignore */ "https://unpkg.com/three@0.179.1/examples/jsm/postprocessing/RenderPass.js"
      );
      const { UnrealBloomPass } = await import(
        /* @vite-ignore */ "https://unpkg.com/three@0.179.1/examples/jsm/postprocessing/UnrealBloomPass.js"
      );
      const { BokehPass } = await import(
        /* @vite-ignore */ "https://unpkg.com/three@0.179.1/examples/jsm/postprocessing/BokehPass.js"
      );

      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lowSpec = window.innerWidth < 1200 || (navigator.deviceMemory && navigator.deviceMemory <= 4) || reduceMotion;
      const quality = lowSpec ? QUALITY.low : QUALITY.high;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(BASE.cameraFov, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 0.2, BASE.cameraStartZ);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.pixelRatio));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearAlpha(0);
      mount.appendChild(renderer.domElement);

      const composer = new EffectComposer(renderer);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, quality.pixelRatio));
      composer.setSize(mount.clientWidth, mount.clientHeight);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        quality.bloom.strength,
        quality.bloom.radius,
        quality.bloom.threshold
      );
      composer.addPass(bloomPass);

      let bokehPass = null;
      if (quality.dof) {
        bokehPass = new BokehPass(scene, camera, {
          focus: quality.dof.focus,
          aperture: quality.dof.aperture,
          maxblur: quality.dof.maxblur,
          width: mount.clientWidth,
          height: mount.clientHeight,
        });
        composer.addPass(bokehPass);
      }

      scene.add(new THREE.AmbientLight(0x9ec5ff, lowSpec ? 0.78 : 0.9));
      const key = new THREE.PointLight(0xa78bfa, lowSpec ? 1.8 : 2.2, 26);
      key.position.set(5.5, 4, 6);
      scene.add(key);
      const fill = new THREE.PointLight(0x22d3ee, lowSpec ? 1.4 : 1.8, 24);
      fill.position.set(-5, -2.2, 6);
      scene.add(fill);

      const orbitCore = new THREE.Group();
      scene.add(orbitCore);

      const iconAnchors = [];
      const icons = buildIcons(THREE, quality.iconCount);
      icons.forEach((icon, index) => {
        const anchor = new THREE.Group();
        const angle = (index / icons.length) * Math.PI * 2;
        const radius = 3 + (index % 2) * 0.65;
        anchor.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.8) * 1.1, Math.sin(angle) * radius * 0.58);
        icon.rotation.y = angle + Math.PI * 0.5;
        anchor.add(icon);
        orbitCore.add(anchor);
        iconAnchors.push({ anchor, mesh: icon, baseAngle: angle, radius, speed: 0.13 + index * 0.02 });
      });

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.05, 14, 120),
        new THREE.MeshStandardMaterial({
          color: 0x34e7ff,
          emissive: 0x1d4ed8,
          emissiveIntensity: 0.45,
          roughness: 0.3,
          metalness: 0.7,
          transparent: true,
          opacity: 0.65,
        })
      );
      torus.rotation.x = 1.35;
      orbitCore.add(torus);

      const trailGroup = new THREE.Group();
      scene.add(trailGroup);
      const trailNodes = lowSpec ? 12 : 22;
      for (let i = 0; i < trailNodes; i += 1) {
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.033 + i * 0.001, 8, 8),
          new THREE.MeshBasicMaterial({
            color: i % 2 ? 0x22d3ee : 0xe879f9,
            transparent: true,
            opacity: 0.52 - i * 0.016,
          })
        );
        node.position.set(Math.cos(i * 0.42) * 2.9, Math.sin(i * 0.37) * 1.6, -0.7 - i * 0.08);
        trailGroup.add(node);
      }

      const pointerTarget = { x: 0, y: 0 };
      const pointer = { x: 0, y: 0 };
      const handleMouseMove = (event) => {
        const rect = mount.getBoundingClientRect();
        pointerTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointerTarget.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      let scrollTarget = 0;
      let scrollNorm = 0;
      const handleScroll = () => {
        const max = Math.max(window.innerHeight, 1);
        scrollTarget = Math.min(window.scrollY / max, 1);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      let isVisible = true;
      const visibilityHandler = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener("visibilitychange", visibilityHandler);

      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.01 }
      );
      observer.observe(mount);

      const clock = new THREE.Clock();
      let frameId = 0;
      const animate = () => {
        frameId = window.requestAnimationFrame(animate);
        if (!isVisible) return;

        const t = clock.getElapsedTime();
        pointer.x += (pointerTarget.x - pointer.x) * 0.08;
        pointer.y += (pointerTarget.y - pointer.y) * 0.08;
        scrollNorm += (scrollTarget - scrollNorm) * 0.08;

        orbitCore.rotation.y += BASE.orbitSpin;
        orbitCore.rotation.x = Math.sin(t * 0.22) * 0.1 + pointer.y * 0.16;
        orbitCore.rotation.z = Math.cos(t * 0.16) * 0.07 + pointer.x * 0.12;

        iconAnchors.forEach(({ anchor, mesh, baseAngle, radius, speed }, index) => {
          const a = baseAngle + t * speed;
          anchor.position.x = Math.cos(a) * radius;
          anchor.position.y = Math.sin(a * 1.7) * (1.05 + (index % 2) * 0.14);
          anchor.position.z = Math.sin(a) * radius * 0.56;
          mesh.rotation.x += 0.008 + index * 0.0006;
          mesh.rotation.y += 0.006 + index * 0.0006;
        });

        torus.rotation.z += BASE.torusSpin;
        trailGroup.rotation.z = -t * BASE.trailSpin;
        trailGroup.position.y = Math.sin(t * 0.75) * 0.2 - scrollNorm * 0.32;

        camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.05;
        camera.position.y += ((0.18 - pointer.y * 0.28) - camera.position.y) * 0.05;
        camera.position.z = BASE.cameraStartZ + scrollNorm * BASE.scrollDepthShift;
        camera.lookAt(0, 0, 0);

        composer.render();
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
        if (bokehPass?.uniforms?.aspect) {
          bokehPass.uniforms.aspect.value = w / h;
        }
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("visibilitychange", visibilityHandler);
        observer.disconnect();

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
    };

    init().catch((error) => {
      console.error("HeroTechScene failed to initialize:", error);
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="hero-tech-canvas" aria-hidden="true" />;
}
