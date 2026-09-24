import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader for the cursor-following radial light beam
const CampusGlowShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Distance from mouse position
      float dist = distance(uv, vec2(uMouse.x, 1.0 - uMouse.y));
      
      // Smooth radial light spot
      float radialLight = 0.06 / (dist + 0.22) * uHover;
      
      // Ambient undulating wave
      float wave = sin(uv.x * 2.5 + uTime * 0.4) * 0.08 + 0.04;
      
      // Deep academic indigo to cyan tint
      vec3 colorBase = vec3(0.22, 0.35, 0.95); // Royal indigo
      vec3 colorGlow = vec3(0.2, 0.75, 0.95);  // Electric cyan
      
      vec3 finalColor = mix(colorBase, colorGlow, uv.y + sin(uTime * 0.3) * 0.15);
      float alpha = (radialLight * 0.5 + wave * 0.12) * uHover;
      
      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 0.4));
    }
  `,
};

// Digital Campus Network Nodes & Connecting Lines
const CampusNodes = ({ mousePosRef, isHovered }) => {
  const count = 14; // Ultra-lightweight particle count for multi-card performance
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize node positions
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3.4;
      const y = (Math.random() - 0.5) * 2.2;
      const z = (Math.random() - 0.5) * 0.4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
    }
    return [pos, initPos];
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const targetX = (mousePosRef.current.x - 0.5) * 2.2;
    const targetY = -(mousePosRef.current.y - 0.5) * 1.6;

    let lineIndex = 0;
    const linePosAttr = linesRef.current ? linesRef.current.geometry.attributes.position : null;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating sine motion
      positionsAttr.array[i3] = initialPositions[i3] + Math.sin(time * 0.7 + i) * 0.06;
      positionsAttr.array[i3 + 1] = initialPositions[i3 + 1] + Math.cos(time * 0.5 + i) * 0.06;

      // Subtle attraction towards cursor on hover
      if (isHovered) {
        positionsAttr.array[i3] += (targetX - positionsAttr.array[i3]) * 0.015;
        positionsAttr.array[i3 + 1] += (targetY - positionsAttr.array[i3 + 1]) * 0.015;
      }

      // Calculate connections between nearby nodes
      if (linePosAttr && isHovered) {
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const dx = positionsAttr.array[i3] - positionsAttr.array[j3];
          const dy = positionsAttr.array[i3 + 1] - positionsAttr.array[j3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if nodes are close
          if (dist < 0.75) {
            linePositions[lineIndex++] = positionsAttr.array[i3];
            linePositions[lineIndex++] = positionsAttr.array[i3 + 1];
            linePositions[lineIndex++] = positionsAttr.array[i3 + 2];

            linePositions[lineIndex++] = positionsAttr.array[j3];
            linePositions[lineIndex++] = positionsAttr.array[j3 + 1];
            linePositions[lineIndex++] = positionsAttr.array[j3 + 2];
          }
        }
      }
    }

    positionsAttr.needsUpdate = true;

    if (linePosAttr) {
      linePosAttr.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    }
  });

  return (
    <group>
      {/* Floating Campus Nodes */}
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
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={isHovered ? 0.8 : 0.25}
          sizeAttenuation
        />
      </points>

      {/* Network Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#818cf8"
          transparent
          opacity={isHovered ? 0.2 : 0.0}
        />
      </lineSegments>
    </group>
  );
};

// Scene Wrapper handling uniforms
const CampusScene = ({ mousePosRef, isHovered }) => {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth lerp for hover activation
    const targetHover = isHovered ? 1.0 : 0.0;
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, delta * 4);

    // Smooth lerp for mouse coordinates
    uniforms.uMouse.value.x = THREE.MathUtils.lerp(
      uniforms.uMouse.value.x,
      mousePosRef.current.x,
      delta * 6
    );
    uniforms.uMouse.value.y = THREE.MathUtils.lerp(
      uniforms.uMouse.value.y,
      mousePosRef.current.y,
      delta * 6
    );

    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 3]} />
        <shaderMaterial
          args={[CampusGlowShader]}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <CampusNodes mousePosRef={mousePosRef} isHovered={isHovered} />
    </>
  );
};

export default function CollegeWebGL({ mousePosRef, isHovered }) {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 2], fov: 50 }}
      dpr={[1, 1.25]} // Conservative DPR for high grid performance
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <CampusScene mousePosRef={mousePosRef} isHovered={isHovered} />
    </Canvas>
  );
}