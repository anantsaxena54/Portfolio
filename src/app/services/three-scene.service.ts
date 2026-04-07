import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class ThreeSceneService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private floatingObjects: any[] = [];
  private particles: any[] = [];
  private orbitPaths: any[] = [];
  private animFrameId: number = 0;
  mouseX = 0;
  mouseY = 0;
  scrollProgress = 0;

  init(canvas: HTMLCanvasElement): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x04050f, 0.018);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 40);

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.addLights();
    this.createCentralCore();
    this.createOrbitingShapes();
    this.createParticleField();
    this.createOrbitRings();
    this.createDataStreams();
    this.createHolographicGrid();

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));

    this.animate();
  }

  private addLights(): void {
    const ambient = new THREE.AmbientLight(0x111122, 0.5);
    this.scene.add(ambient);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 80);
    purpleLight.position.set(-20, 20, 10);
    this.scene.add(purpleLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 3, 80);
    tealLight.position.set(20, -20, 10);
    this.scene.add(tealLight);

    const pinkLight = new THREE.PointLight(0xec4899, 1.5, 60);
    pinkLight.position.set(0, 0, -20);
    this.scene.add(pinkLight);
  }

  private createCentralCore(): void {
    // Wireframe icosahedron core
    const icosaGeo = new THREE.IcosahedronGeometry(4, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.15
    });
    const icosa = new THREE.Mesh(icosaGeo, icosaMat);
    icosa.position.set(18, 0, -5);
    this.scene.add(icosa);
    this.floatingObjects.push({ mesh: icosa, type: 'pulse', speed: 0.004, baseScale: 1, pulseAmount: 0.08 });

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa, transparent: true, opacity: 0.05, wireframe: false
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(18, 0, -5);
    this.scene.add(sphere);
    this.floatingObjects.push({ mesh: sphere, type: 'rotate', rotationAxis: 'y', rotationSpeed: 0.006 });

    // Outer ring
    const torusGeo = new THREE.TorusGeometry(6, 0.08, 8, 80);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(18, 0, -5);
    torus.rotation.x = Math.PI / 4;
    this.scene.add(torus);
    this.floatingObjects.push({ mesh: torus, type: 'rotate', rotationAxis: 'y', rotationSpeed: 0.003 });
  }

  private createOrbitingShapes(): void {
    const configs = [
      { geo: new THREE.OctahedronGeometry(0.7), color: 0xa78bfa, orbitR: 10, orbitSpeed: 0.008, angle: 0 },
      { geo: new THREE.TetrahedronGeometry(0.6), color: 0x14b8a6, orbitR: 14, orbitSpeed: 0.005, angle: 1.2 },
      { geo: new THREE.BoxGeometry(0.7, 0.7, 0.7), color: 0xec4899, orbitR: 8, orbitSpeed: 0.012, angle: 2.4 },
      { geo: new THREE.IcosahedronGeometry(0.5), color: 0x2dd4bf, orbitR: 16, orbitSpeed: 0.004, angle: 3.6 },
      { geo: new THREE.OctahedronGeometry(0.4), color: 0x8b5cf6, orbitR: 12, orbitSpeed: 0.009, angle: 0.6 },
    ];

    configs.forEach(cfg => {
      const mat = new THREE.MeshBasicMaterial({ color: cfg.color, wireframe: true, transparent: true, opacity: 0.6 });
      const mesh = new THREE.Mesh(cfg.geo, mat);
      mesh.position.set(18, 0, -5);
      this.scene.add(mesh);
      this.floatingObjects.push({
        mesh, type: 'orbit',
        orbitRadius: cfg.orbitR, orbitSpeed: cfg.orbitSpeed,
        angle: cfg.angle, rotationSpeed: 0.012,
        originX: 18, originY: 0
      });
    });
  }

  private createParticleField(): void {
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      [0.545, 0.361, 0.965], // purple
      [0.082, 0.722, 0.651], // teal
      [0.925, 0.286, 0.600], // pink
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.45, sizeAttenuation: true });
    const pts = new THREE.Points(geo, mat);
    this.scene.add(pts);

    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) velocities[i] = (Math.random() - 0.5) * 0.018;
    this.particles.push({ mesh: pts, velocities });
  }

  private createOrbitRings(): void {
    [12, 18, 24].forEach((r, i) => {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 128; j++) {
        const a = (j / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: i === 1 ? 0x14b8a6 : 0x8b5cf6, transparent: true, opacity: 0.12 });
      const ring = new THREE.Line(geo, mat);
      ring.position.set(18, 0, -5);
      ring.rotation.x = Math.PI / 3 + i * 0.3;
      this.scene.add(ring);
      this.orbitPaths.push({ mesh: ring, rotationSpeed: 0.0003 + i * 0.0002 });
    });
  }

  private createDataStreams(): void {
    for (let s = 0; s < 8; s++) {
      const pts: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 60;
      const startY = 30;
      for (let p = 0; p < 20; p++) {
        pts.push(new THREE.Vector3(startX + (Math.random() - 0.5) * 4, startY - p * 3, (Math.random() - 0.5) * 10));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.08 });
      const line = new THREE.Line(geo, mat);
      this.scene.add(line);
      this.floatingObjects.push({ mesh: line, type: 'stream', speed: 0.02 + Math.random() * 0.03, startY });
    }
  }

  private createHolographicGrid(): void {
    const size = 60, div = 20;
    const geo = new THREE.GridHelper(size, div, 0x8b5cf6, 0x8b5cf6);
    const mat = geo.material as THREE.Material;
    (mat as any).transparent = true;
    (mat as any).opacity = 0.04;
    geo.rotation.x = Math.PI / 2;
    geo.position.set(0, -25, -10);
    this.scene.add(geo);
    this.floatingObjects.push({ mesh: geo, type: 'rotate', rotationAxis: 'none', rotationSpeed: 0 });
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  private onScroll(): void {
    this.scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  }

  private onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    this.animFrameId = requestAnimationFrame(this.animate.bind(this));
    const time = Date.now() * 0.0003;

    this.camera.position.x += (this.mouseX * 6 - this.camera.position.x) * 0.04;
    this.camera.position.y += (this.mouseY * 4 - this.camera.position.y) * 0.04;
    this.camera.lookAt(this.scene.position);

    this.floatingObjects.forEach(obj => {
      if (obj.type === 'pulse') {
        const s = obj.baseScale + Math.sin(time * 2) * obj.pulseAmount;
        obj.mesh.scale.set(s, s, s);
        obj.mesh.rotation.x += obj.speed;
        obj.mesh.rotation.y += obj.speed * 1.5;
      } else if (obj.type === 'orbit') {
        obj.angle += obj.orbitSpeed;
        obj.mesh.position.x = obj.originX + Math.cos(obj.angle) * obj.orbitRadius;
        obj.mesh.position.y = obj.originY + Math.sin(obj.angle) * obj.orbitRadius * 0.6;
        obj.mesh.rotation.x += obj.rotationSpeed;
        obj.mesh.rotation.y += obj.rotationSpeed * 1.2;
      } else if (obj.type === 'rotate') {
        if (obj.rotationAxis === 'x') obj.mesh.rotation.x += obj.rotationSpeed;
        else if (obj.rotationAxis === 'y') obj.mesh.rotation.y += obj.rotationSpeed;
        else if (obj.rotationAxis === 'z') obj.mesh.rotation.z += obj.rotationSpeed;
      } else if (obj.type === 'stream') {
        obj.mesh.position.y -= obj.speed;
        if (obj.mesh.position.y < -60) obj.mesh.position.y = obj.startY;
        (obj.mesh.material as any).opacity = 0.04 + Math.sin(time * 3) * 0.03;
      }
    });

    this.particles.forEach(p => {
      const pos = p.mesh.geometry.attributes['position'].array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i]     += p.velocities[i];
        pos[i + 1] += p.velocities[i + 1];
        pos[i + 2] += p.velocities[i + 2];
        if (pos[i] > 60)     pos[i] = -60;
        if (pos[i] < -60)    pos[i] = 60;
        if (pos[i+1] > 60)   pos[i+1] = -60;
        if (pos[i+1] < -60)  pos[i+1] = 60;
        if (pos[i+2] > 40)   pos[i+2] = -40;
        if (pos[i+2] < -40)  pos[i+2] = 40;
      }
      p.mesh.geometry.attributes['position'].needsUpdate = true;
      p.mesh.rotation.x += 0.00003;
      p.mesh.rotation.y += 0.00005;
    });

    this.orbitPaths.forEach(o => { o.mesh.rotation.z += o.rotationSpeed; });
    this.renderer.render(this.scene, this.camera);
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('scroll', this.onScroll.bind(this));
    window.removeEventListener('resize', this.onResize.bind(this));
    this.renderer.dispose();
  }
}
