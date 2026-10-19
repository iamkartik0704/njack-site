'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ChoreographyTarget {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  scale: number;
}

function CenterpieceGeometry({ scrollProgress }: { scrollProgress: number }) {
  const outerKnotRef = useRef<THREE.Mesh>(null!);
  const innerIcosaRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Smooth lerped scroll and pointer tracking
  const targetTransform = useMemo<ChoreographyTarget>(() => {
    // Stage choreography based on scroll progress (0.0 to 1.0)
    if (scrollProgress < 0.22) {
      // Hero stage: Prominent centerpiece, tilted slightly right
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1.35,
        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.3 : 0,
        z: 0.2,
        rotX: 0.2,
        rotY: 0.4,
        scale: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.85 : 1.1,
      };
    } else if (scrollProgress < 0.45) {
      // Divisions bento stage: Shifts left to anchor text & interactive widgets
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : -1.8,
        y: 0.1,
        z: -0.4,
        rotX: 0.6,
        rotY: 1.8,
        scale: 0.95,
      };
    } else if (scrollProgress < 0.7) {
      // Projects stage: Shifts right to complement project cards
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1.7,
        y: -0.2,
        z: -0.2,
        rotX: 1.1,
        rotY: 2.9,
        scale: 1.0,
      };
    } else if (scrollProgress < 0.88) {
      // Timeline stage: Elevated center-right
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 0.8,
        y: 0.4,
        z: -0.6,
        rotX: 1.6,
        rotY: 3.8,
        scale: 0.85,
      };
    } else {
      // Footer / Terminal finale: Centered overhead monolith
      return {
        x: 0,
        y: 0.2,
        z: 0.4,
        rotX: 2.4,
        rotY: 5.1,
        scale: 1.15,
      };
    }
  }, [scrollProgress]);

  useFrame((state, delta) => {
    const pointer = state.pointer;

    // Autonomous slow rotation + pointer reaction
    if (outerKnotRef.current) {
      outerKnotRef.current.rotation.x += delta * 0.25;
      outerKnotRef.current.rotation.y += delta * 0.35;
    }

    if (innerIcosaRef.current) {
      innerIcosaRef.current.rotation.x -= delta * 0.4;
      innerIcosaRef.current.rotation.z += delta * 0.3;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.15;
      ring1Ref.current.rotation.x += delta * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.2;
      ring2Ref.current.rotation.y += delta * 0.12;
    }

    // Smooth lerp of entire group to choreographed target + subtle mouse parallax
    if (groupRef.current) {
      const lerpSpeed = THREE.MathUtils.clamp(delta * 2.8, 0.01, 0.15);
      const mouseParallaxX = pointer.x * 0.45;
      const mouseParallaxY = pointer.y * 0.35;

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetTransform.x + mouseParallaxX,
        lerpSpeed
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetTransform.y + mouseParallaxY,
        lerpSpeed
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetTransform.z,
        lerpSpeed
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTransform.rotX + pointer.y * 0.2,
        lerpSpeed
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetTransform.rotY + pointer.x * 0.3,
        lerpSpeed
      );

      const currentScale = groupRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currentScale, targetTransform.scale, lerpSpeed);
      groupRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Layer 1: Inner Wireframe Icosahedron Core */}
        <mesh ref={innerIcosaRef}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial
            wireframe
            color="#CCFF00"
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Layer 2: Centerpiece Refractive Glass Torus Knot */}
        <mesh ref={outerKnotRef}>
          <torusKnotGeometry args={[1.35, 0.36, 128, 32, 2, 3]} />
          <MeshTransmissionMaterial
            backside={true}
            samples={4}
            thickness={1.5}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.2}
            roughness={0.12}
            color="#ffffff"
            transmission={0.96}
            ior={1.35}
          />
        </mesh>

        {/* Layer 3: Gyroscopic Cybernetic Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial
            color="#F3F4F6"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <ringGeometry args={[2.25, 2.27, 64]} />
          <meshBasicMaterial
            color="#CCFF00"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

function AtmosphericParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 400;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        state.pointer.y * 0.12,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#E2E8F0"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none bg-[#07080A]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Ambient & Directional Rim Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.85} color="#CCFF00" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#8A8F98" />

        {/* Centerpiece 3D Glass & Wireframe Apparatus */}
        <CenterpieceGeometry scrollProgress={scrollProgress} />

        {/* Spatial Particles & Sparkles */}
        <AtmosphericParticles />
        <Sparkles
          count={80}
          scale={10}
          size={1.4}
          speed={0.4}
          opacity={0.25}
          color="#CCFF00"
        />

        {/* Spatial HDR Environment Preset */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
