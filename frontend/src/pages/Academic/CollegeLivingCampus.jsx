import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ==========================================
// 1. STYLIZED LOW-POLY STUDENT CHARACTER
// ==========================================
function StudentCharacter({
  position,
  rotationY = 0,
  shirtColor = "#38bdf8",
  pantsColor = "#1e293b",
  skinColor = "#f87171",
  activity = "standing", // 'standing' | 'walking' | 'sitting'
  reactSensitivity = 1.0,
  mousePosRef,
  isHovered,
}) {
  const groupRef = useRef();
  const headGroupRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  // Random micro-offsets so students don't look synchronized
  const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const randomDelay = useMemo(() => 0.04 + Math.random() * 0.05, []);

  useFrame((state) => {
    if (!groupRef.current || !headGroupRef.current) return;
    const time = state.clock.getElapsedTime() + phaseOffset;

    // A. Idle Animations (Breathing & Walking)
    if (activity === "walking") {
      groupRef.current.position.x = position[0] + Math.sin(time * 0.8) * 0.12;
      groupRef.current.position.z = position[2] + Math.cos(time * 0.8) * 0.06;

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(time * 3.5) * 0.4;
        rightLegRef.current.rotation.x = -Math.sin(time * 3.5) * 0.4;
      }
    } else if (activity === "sitting") {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.005;
    } else {
      // Standing idle breathing
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.008;
    }

    // B. Interactive Head & Upper Body Cursor Awareness
    if (isHovered && mousePosRef.current) {
      // Map normalized cursor (0..1) to 3D scene target coordinates
      const targetX = (mousePosRef.current.x - 0.5) * 3.5;
      const targetY = -(mousePosRef.current.y - 0.5) * 2.2 + 0.2;

      const studentWorldX = groupRef.current.position.x;
      const studentWorldY = groupRef.current.position.y;

      const dx = targetX - studentWorldX;
      const dy = targetY - studentWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Distant students react subtly; nearby students notice first
      const distanceFactor = Math.max(0, 1.0 - dist / 2.8) * reactSensitivity;
      const targetAngleY = Math.atan2(dx, 1.2) * distanceFactor;
      const targetAngleX = -dy * 0.25 * distanceFactor;

      // Smooth interpolation (lerp)
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetAngleY,
        randomDelay
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetAngleX,
        randomDelay
      );
    } else {
      // Return naturally to default pose
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        0,
        0.05
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        0,
        0.05
      );
    }
  });

  const isSitting = activity === "sitting";

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[0.85, 0.85, 0.85]}
    >
      {/* Head & Hair Group */}
      <group ref={headGroupRef} position={[0, isSitting ? 0.28 : 0.44, 0]}>
        {/* Head */}
        <mesh position={[0, 0, 0]}>
          <dodecahedronGeometry args={[0.065, 1]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        {/* Hair / Cap */}
        <mesh position={[0, 0.035, -0.01]}>
          <boxGeometry args={[0.09, 0.04, 0.09]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
      </group>

      {/* Torso / Shirt */}
      <mesh position={[0, isSitting ? 0.14 : 0.24, 0]}>
        <boxGeometry args={[0.13, 0.2, 0.08]} />
        <meshStandardMaterial color={shirtColor} roughness={0.5} />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, isSitting ? 0.16 : 0.25, -0.06]}>
        <boxGeometry args={[0.1, 0.13, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>

      {/* Legs / Pants */}
      {isSitting ? (
        /* Seated Leg Pose */
        <mesh position={[0, 0.04, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.12, 0.14, 0.06]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
      ) : (
        /* Standing / Walking Legs */
        <group position={[0, 0.07, 0]}>
          <mesh ref={leftLegRef} position={[-0.035, 0, 0]}>
            <boxGeometry args={[0.05, 0.15, 0.06]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
          <mesh ref={rightLegRef} position={[0.035, 0, 0]}>
            <boxGeometry args={[0.05, 0.15, 0.06]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ==========================================
// 2. MINIATURE CAMPUS ENVIRONMENT
// ==========================================
function CampusEnvironment() {
  return (
    <group position={[0, -0.65, -0.2]}>
      {/* Ground Lawn & Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#0b1329" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0.2]}>
        <planeGeometry args={[1.2, 2.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Main Low-Poly Academic Building */}
      <group position={[0, 0.5, -0.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.1, 0.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Entrance Columns */}
        <mesh position={[-0.4, -0.1, 0.28]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.4, -0.1, 0.28]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Soft Emissive Classroom Windows */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.22, 0.26]}>
            <boxGeometry args={[0.18, 0.25, 0.02]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Low-Poly Trees */}
      <group position={[-1.3, 0, -0.2]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.3, 6]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <dodecahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial color="#065f46" roughness={0.7} />
        </mesh>
      </group>
      <group position={[1.25, 0, 0.1]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.24, 6]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <dodecahedronGeometry args={[0.18, 1]} />
          <meshStandardMaterial color="#047857" roughness={0.7} />
        </mesh>
      </group>

      {/* Campus Bench */}
      <group position={[-0.7, 0.05, 0.3]} rotation={[0, 0.2, 0]}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.32, 0.02, 0.1]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Tiny Glowing Academic Notice Board */}
      <mesh position={[0.75, 0.2, 0.2]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.14, 0.02]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// 3. FLOATING ACADEMIC DUST MOTES
// ==========================================
function FloatingParticles({ count = 16 }) {
  const meshRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.2;
      pos[i * 3 + 1] = Math.random() * 1.5 - 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = posAttr.array[i * 3 + 1] + 0.0012;
      if (y > 1.2) y = -0.5;
      posAttr.array[i * 3 + 1] = y;
      posAttr.array[i * 3] += Math.sin(time + i) * 0.0006;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
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
        color="#38bdf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ==========================================
// 4. CURSOR-FOLLOWING ATMOSPHERIC LIGHTING
// ==========================================
function CursorLight({ mousePosRef, isHovered }) {
  const lightRef = useRef();

  useFrame(() => {
    if (!lightRef.current || !mousePosRef.current) return;
    const targetX = (mousePosRef.current.x - 0.5) * 3.2;
    const targetY = -(mousePosRef.current.y - 0.5) * 2.0;

    lightRef.current.position.x = THREE.MathUtils.lerp(
      lightRef.current.position.x,
      targetX,
      0.08
    );
    lightRef.current.position.y = THREE.MathUtils.lerp(
      lightRef.current.position.y,
      targetY,
      0.08
    );
    lightRef.current.intensity = THREE.MathUtils.lerp(
      lightRef.current.intensity,
      isHovered ? 1.4 : 0.4,
      0.05
    );
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 1.2]}
      color="#38bdf8"
      distance={3.5}
      decay={2}
    />
  );
}

// ==========================================
// MAIN WEBGL CANVAS CONTAINER
// ==========================================
export default function CollegeLivingCampus({ mousePosRef, isHovered }) {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 2.2], fov: 48 }}
      dpr={[1, 1.25]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <ambientLight intensity={0.6} color="#94a3b8" />
      <directionalLight position={[2, 3, 2]} intensity={0.8} color="#f8fafc" />

      <CursorLight mousePosRef={mousePosRef} isHovered={isHovered} />
      <CampusEnvironment />

      {/* Living Students with Distinct Activities & Poses */}
      <StudentCharacter
        position={[-0.7, -0.58, 0.28]}
        rotationY={0.3}
        activity="sitting"
        shirtColor="#38bdf8"
        skinColor="#fca5a5"
        reactSensitivity={1.2}
        mousePosRef={mousePosRef}
        isHovered={isHovered}
      />
      <StudentCharacter
        position={[-0.15, -0.65, 0.2]}
        rotationY={-0.2}
        activity="standing"
        shirtColor="#818cf8"
        skinColor="#fdba74"
        reactSensitivity={1.0}
        mousePosRef={mousePosRef}
        isHovered={isHovered}
      />
      <StudentCharacter
        position={[0.5, -0.65, 0.1]}
        rotationY={0.8}
        activity="walking"
        shirtColor="#34d399"
        skinColor="#fef08a"
        reactSensitivity={0.8}
        mousePosRef={mousePosRef}
        isHovered={isHovered}
      />

      <FloatingParticles count={14} />
    </Canvas>
  );
}