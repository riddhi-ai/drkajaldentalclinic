import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeTooth() {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL not supported, falling back to 2.5D visual:', e);
      setHasWebGL(false);
      return;
    }

    // Tooth Group
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Realistic pearlescent tooth material
    const toothMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x0d9488,
      emissiveIntensity: 0.04,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Root material (slightly warmer ivory gradient)
    const rootMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbfbf6,
      roughness: 0.35,
      metalness: 0.02,
    });

    // 1. Crown Geometry (Molar with natural rounded cusps)
    const crownGroup = new THREE.Group();

    // Base of the crown
    const crownBaseGeo = new THREE.CylinderGeometry(1.1, 0.9, 1.2, 32);
    const crownBase = new THREE.Mesh(crownBaseGeo, toothMaterial);
    crownBase.position.y = 0.3;
    crownGroup.add(crownBase);

    // Top enamel cap with 4 rounded cusps
    const cuspGeo = new THREE.SphereGeometry(0.55, 24, 24);
    
    // Mesiobuccal cusp
    const cusp1 = new THREE.Mesh(cuspGeo, toothMaterial);
    cusp1.position.set(-0.52, 0.82, -0.42);
    cusp1.scale.set(1, 0.9, 1);
    crownGroup.add(cusp1);

    // Distobuccal cusp
    const cusp2 = new THREE.Mesh(cuspGeo, toothMaterial);
    cusp2.position.set(0.52, 0.82, -0.42);
    cusp2.scale.set(1, 0.9, 1);
    crownGroup.add(cusp2);

    // Mesiolingual cusp
    const cusp3 = new THREE.Mesh(cuspGeo, toothMaterial);
    cusp3.position.set(-0.48, 0.85, 0.42);
    cusp3.scale.set(1.05, 0.95, 1.05);
    crownGroup.add(cusp3);

    // Distolingual cusp
    const cusp4 = new THREE.Mesh(cuspGeo, toothMaterial);
    cusp4.position.set(0.48, 0.8, 0.42);
    cusp4.scale.set(0.95, 0.88, 0.95);
    crownGroup.add(cusp4);

    // Center occlusal fill
    const centerCapGeo = new THREE.CylinderGeometry(0.65, 0.8, 0.3, 24);
    const centerCap = new THREE.Mesh(centerCapGeo, toothMaterial);
    centerCap.position.y = 0.82;
    crownGroup.add(centerCap);

    toothGroup.add(crownGroup);

    // 2. Anatomical Roots (Dual tapered roots)
    // Left Root
    const rootGeo1 = new THREE.ConeGeometry(0.38, 1.8, 24);
    const root1 = new THREE.Mesh(rootGeo1, rootMaterial);
    root1.position.set(-0.45, -1.0, 0);
    root1.rotation.z = -0.15;
    root1.rotation.x = 0.05;
    root1.scale.y = -1; // point downwards
    toothGroup.add(root1);

    // Right Root
    const rootGeo2 = new THREE.ConeGeometry(0.36, 1.7, 24);
    const root2 = new THREE.Mesh(rootGeo2, rootMaterial);
    root2.position.set(0.45, -0.95, 0);
    root2.rotation.z = 0.16;
    root2.rotation.x = -0.04;
    root2.scale.y = -1;
    toothGroup.add(root2);

    // Root tips (soft rounded apices)
    const apexGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const apex1 = new THREE.Mesh(apexGeo, rootMaterial);
    apex1.position.set(-0.6, -1.9, 0.02);
    toothGroup.add(apex1);

    const apex2 = new THREE.Mesh(apexGeo, rootMaterial);
    apex2.position.set(0.6, -1.8, -0.02);
    toothGroup.add(apex2);

    // 3. Sparkle Particle Field (Dental hygienic sparkle aura)
    const particleCount = 28;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      particleScales[i] = Math.random() * 0.12 + 0.05;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    // Sparkle texture
    const sparkleCanvas = document.createElement('canvas');
    sparkleCanvas.width = 64;
    sparkleCanvas.height = 64;
    const ctx = sparkleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(45, 212, 191, 0.8)');
    grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(sparkleCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key Light (Clean Dental Operatory White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill Light (Calming Teal Fill)
    const fillLight = new THREE.DirectionalLight(0x2dd4bf, 0.8);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    // Rim/Back Light (Sky Blue Highlights)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(0, -3, -4);
    scene.add(rimLight);

    // Interactive mouse tracking
    let targetRotationX = 0.2;
    let targetRotationY = 0.3;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 320;
      height = container.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating hover
      toothGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.15;
      
      // Smooth continuous slow rotation + cursor tilt
      targetRotationY = 0.35 + mouseX + Math.sin(elapsedTime * 0.7) * 0.2;
      targetRotationX = 0.15 - mouseY * 0.5;

      toothGroup.rotation.y += (targetRotationY - toothGroup.rotation.y) * 0.05;
      toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.05;

      // Particle gentle orbiting
      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="relative flex items-center justify-center w-full h-[320px] sm:h-[380px] md:h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-tr from-teal-300/30 to-sky-300/30 rounded-full blur-3xl" />
      </div>

      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <div ref={mountRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Accessible Fallback Visual */
        <div className="relative z-10 flex flex-col items-center justify-center animate-float-slow">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center shadow-glow text-7xl">
            🦷
          </div>
          <span className="mt-3 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Interactive Dental Care
          </span>
        </div>
      )}

      {/* Floating Interactive Badge */}
      <div className="absolute -bottom-2 right-4 sm:right-12 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-soft border border-teal-100 flex items-center gap-2 text-xs font-medium text-slate-700 pointer-events-none">
        <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-ping" />
        <span>3D Dental Smile View</span>
      </div>
    </div>
  );
}
