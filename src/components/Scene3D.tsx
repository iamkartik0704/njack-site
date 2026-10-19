'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox, Edges, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ChoreographyTarget {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  scale: number;
}

// Pristine 3D Hexagonal Cyber Emblem with Official NJACK Logo Mark
function NjackHexMonolith() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.12;
    }
  });

  const logoTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/njack-logo-mark.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Sleek Anodized Obsidian Hexagonal Monolith Core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.42, 1.42, 0.10, 6]} />
        <meshStandardMaterial
          color="#0C0E14"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.2}
        />
        <Edges scale={1.002} threshold={15} color="#FF5722" />
      </mesh>

      {/* Outer Hexagonal Glowing Edge Halo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.52, 1.52, 0.02, 6]} />
        <meshBasicMaterial color="#FF8A00" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Front Face: Pristine Official NJACK Logo Mark */}
      {logoTexture && (
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[2.24, 2.24]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent={true}
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>
      )}

      {/* Back Face: Pristine Official NJACK Logo Mark */}
      {logoTexture && (
        <mesh position={[0, 0, -0.055]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.24, 2.24]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent={true}
            toneMapped={false}
            side={THREE.FrontSide}
          />
        </mesh>
      )}
    </group>
  );
}

// 3D Floating Mechanical Keycap with glowing code symbol
function MechanicalKeycap({
  position,
  rotation = [0, 0, 0],
  text,
  textColor = '#FF5722',
  floatSpeed = 2,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  textColor?: string;
  floatSpeed?: number;
}) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[0.62, 0.62, 0.38]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#111319" metalness={0.7} roughness={0.25} />
          <Edges scale={1.002} threshold={20} color={textColor} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.2}
          color={textColor}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

// Algorithmic Concentric Hexagonal Syntax Rings
function HexagonalSyntaxRings() {
  const ring1 = useRef<THREE.LineSegments>(null!);
  const ring2 = useRef<THREE.LineSegments>(null!);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.2;
      ring1.current.rotation.x += delta * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.25;
      ring2.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Inner Orange Hexagon Ring */}
      <lineSegments ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <edgesGeometry args={[new THREE.CircleGeometry(2.35, 6)]} />
        <lineBasicMaterial color="#FF5722" transparent opacity={0.4} />
      </lineSegments>

      {/* Outer Amber Hexagon Ring */}
      <lineSegments ref={ring2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <edgesGeometry args={[new THREE.CircleGeometry(2.75, 6)]} />
        <lineBasicMaterial color="#FF8A00" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

// 3D Voxel Commit / Binary Matrix
function VoxelCommitMatrix() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const size = 7;
  const count = size * size;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 1.5;

    let idx = 0;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const posX = (x - size / 2) * 0.42;
        const posY = (y - size / 2) * 0.42;

        const distToMouse = Math.sqrt(
          Math.pow(pointer.x * 3 - posX, 2) + Math.pow(pointer.y * 3 - posY, 2)
        );
        const mouseEffect = Math.max(0, 1 - distToMouse / 2) * 0.4;
        const wave = Math.sin(t + posX * 2 + posY * 2) * 0.18 + mouseEffect;

        dummy.position.set(posX, posY, -1.4 + wave);
        dummy.scale.set(1, 1, 1 + wave * 2);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="#FF5722" metalness={0.8} roughness={0.2} emissive="#D9381E" emissiveIntensity={0.3} />
    </instancedMesh>
  );
}

function CenterpieceScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const targetTransform = useMemo<ChoreographyTarget>(() => {
    if (scrollProgress < 0.22) {
      // Hero stage: Prominent centerpiece, tilted slightly right
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1.35,
        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.2 : 0,
        z: 0.3,
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
    if (!groupRef.current) return;
    const pointer = state.pointer;
    const lerpSpeed = THREE.MathUtils.clamp(delta * 2.8, 0.01, 0.15);

    const mouseParallaxX = pointer.x * 0.4;
    const mouseParallaxY = pointer.y * 0.3;

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
      targetTransform.rotY + pointer.x * 0.25,
      lerpSpeed
    );

    const nextScale = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetTransform.scale,
      lerpSpeed
    );
    groupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      {/* Central 3D Hexagonal Isometric NJACK Monolith */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <NjackHexMonolith />
      </Float>

      {/* Orbiting Mechanical Keycaps with code symbols */}
      <MechanicalKeycap
        position={[-1.9, 1.2, 0.6]}
        rotation={[0.2, 0.3, -0.1]}
        text="</>"
        textColor="#FF8A00"
        floatSpeed={2.2}
      />
      <MechanicalKeycap
        position={[2.1, -1.1, 0.7]}
        rotation={[-0.2, -0.4, 0.15]}
        text="{ }"
        textColor="#FF5722"
        floatSpeed={1.8}
      />
      <MechanicalKeycap
        position={[1.8, 1.4, -0.5]}
        rotation={[0.3, -0.2, 0.2]}
        text="0x1"
        textColor="#D9381E"
        floatSpeed={2.5}
      />

      {/* Hexagonal Algorithmic Syntax Rings */}
      <HexagonalSyntaxRings />

      {/* 3D Voxel Commit / Binary Matrix */}
      <VoxelCommitMatrix />
    </group>
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
        {/* Crisp Physical Lighting for NJACK Brand */}
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={40} color="#FF5722" />
        <pointLight position={[-4, -3, 2]} intensity={25} color="#FF8A00" />
        <directionalLight position={[0, 10, 0]} intensity={1.0} color="#ffffff" />

        {/* Centerpiece 3D NJACK Coding Core */}
        <CenterpieceScene scrollProgress={scrollProgress} />

        {/* Floating Sparks / Particles */}
        <Sparkles
          count={70}
          scale={10}
          size={1.6}
          speed={0.4}
          opacity={0.3}
          color="#FF5722"
        />

        {/* Spatial HDR Environment Preset */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
