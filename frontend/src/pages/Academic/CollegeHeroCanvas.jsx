import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ==========================================
// 1. LOW-POLY CAMPUS LANDSCAPE & ARCHITECTURE
// ==========================================
function LowPolyCampus() {
  return (
    <group position={[0, -0.9, -0.5]}>
      {/* Ground Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#0b1329" roughness={0.95} />
      </mesh>

      {/* Campus Pathways */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0.5]}>
        <planeGeometry args={[1.6, 6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Central Academic Clock Tower / Library */}
      <group position={[0, 0, -1.2]}>
        {/* Main Base */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[1.8, 1.6, 1.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>

        {/* Central Spire / Clock Tower */}
        <mesh position={[0, 2.1, 0]}>
          <boxGeometry args={[0.7, 1.2, 0.7]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 2.9, 0]}>
          <coneGeometry args={[0.45, 0.8, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} />
        </mesh>

        {/* Glowing Emissive Windows */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.8, 0.61]}>
            <boxGeometry args={[0.25, 0.8, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Side Campus Buildings */}
      <group position={[-2.4, 0.5, -0.6]}>
        <mesh>
          <boxGeometry args={[1.4, 1.0, 1.0]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.4, 0.51]}>
          <boxGeometry args={[0.9, 0.18, 0.02]} />
          <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={0.6} />
        </mesh>
      </group>

      <group position={[2.4, 0.5, -0.6]}>
        <mesh>
          <boxGeometry args={[1.4, 1.0, 1.0]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.4, 0.51]}>
          <boxGeometry args={[0.9, 0.18, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Low-Poly Trees */}
      {[-1.5, 1.5, -3.2, 3.2].map((x, idx) => (
        <group key={idx} position={[x, 0, (idx % 2 === 0 ? 0.8 : -0.2)]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.4, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <dodecahedronGeometry args={[0.28, 1]} />
            <meshStandardMaterial color={idx % 2 === 0 ? "#065f46" : "#047857"} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ==========================================
// 2. AMBIENT FLOATING ACADEMIC DUST MOTES
// ==========================================
function FloatingDust({ count = 30 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 3.5 - 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = posAttr.array[i * 3 + 1] + 0.0015;
      if (y > 3) y = -0.5;
      posAttr.array[i * 3 + 1] = y;
      posAttr.array[i * 3] += Math.sin(time + i) * 0.0008;
    }
    posAttr.needsUpdate = true;
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
        size={0.06}
        color="#38bdf8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ==========================================
// 3. CURSOR-INTERACTIVE CAMERA RIG
// ==========================================
function InteractiveCamera({ mousePosRef }) {
  useFrame((state) => {
    if (!mousePosRef.current) return;

    // Smoothly rotate and tilt camera based on cursor position
    const targetX = (mousePosRef.current.x - 0.5) * 0.8;
    const targetY = (mousePosRef.current.y - 0.5) * -0.4 + 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY + 0.4,
      0.04
    );
    state.camera.lookAt(0, 0.2, 0);
  });

  return null;
}

// ==========================================
// MAIN HERO CANVAS EXPORT
// ==========================================
export default function CollegeHeroCanvas({ mousePosRef }) {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0.4, 3.5], fov: 50 }}
      dpr={[1, 1.25]}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.55} color="#94a3b8" />
      <directionalLight position={[4, 5, 3]} intensity={0.9} color="#f8fafc" />
      <pointLight position={[0, 2, 1]} intensity={1.2} color="#38bdf8" distance={6} />

      <InteractiveCamera mousePosRef={mousePosRef} />
      <LowPolyCampus />
      <FloatingDust count={35} />
    </Canvas>
  );
}