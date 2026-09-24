import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Theme configuration matching resource types
const RESOURCE_THEMES = {
  question_paper: {
    primary: new THREE.Color("#38bdf8"),   // Cyan
    secondary: new THREE.Color("#818cf8"), // Indigo
    glowIntensity: 0.8,
  },
  notes: {
    primary: new THREE.Color("#34d399"),   // Emerald / Knowledge Node
    secondary: new THREE.Color("#059669"), // Teal
    glowIntensity: 0.95,
  },
  assignment: {
    primary: new THREE.Color("#fbbf24"),   // Amber
    secondary: new THREE.Color("#f59e0b"), // Orange
    glowIntensity: 0.75,
  },
  video: {
    primary: new THREE.Color("#f43f5e"),   // Rose wave
    secondary: new THREE.Color("#a855f7"), // Purple
    glowIntensity: 0.85,
  },
  book: {
    primary: new THREE.Color("#818cf8"),   // Soft Blue/Violet
    secondary: new THREE.Color("#c084fc"), // Light Purple
    glowIntensity: 0.8,
  },
  default: {
    primary: new THREE.Color("#6366f1"),   // Slate Indigo
    secondary: new THREE.Color("#a855f7"), // Violet
    glowIntensity: 0.8,
  },
};

// Shader for the responsive light beam and cursor glow
const LightBeamShader = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uPrimaryColor: { value: new THREE.Color("#6366f1") },
    uSecondaryColor: { value: new THREE.Color("#a855f7") },
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
    uniform vec3 uPrimaryColor;
    uniform vec3 uSecondaryColor;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Cursor distance
      float dist = distance(uv, vec2(uMouse.x, 1.0 - uMouse.y));
      
      // Smooth radial cursor glow
      float cursorGlow = 0.08 / (dist + 0.18) * uHover;
      
      // Subtle ambient light beam
      float beam = sin(uv.x * 3.1415 + uTime * 0.5) * 0.1 + 0.05;
      
      // Gradient mix
      vec3 color = mix(uPrimaryColor, uSecondaryColor, uv.x + sin(uTime * 0.2) * 0.2);
      
      float finalAlpha = (cursorGlow * 0.4 + beam * 0.15) * uHover;
      
      gl_FragColor = vec4(color, clamp(finalAlpha, 0.0, 0.45));
    }
  `,
};

// Subtle Knowledge Node Particles + Lines
const KnowledgeNodes = ({ theme, mousePosRef, isHovered }) => {
  const count = 18; // Low particle count for extreme performance
  const pointsRef = useRef();
  const linesRef = useRef();

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3.2;
      const y = (Math.random() - 0.5) * 2.2;
      const z = (Math.random() - 0.5) * 0.5;

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

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const targetMouseX = (mousePosRef.current.x - 0.5) * 2.5;
    const targetMouseY = -(mousePosRef.current.y - 0.5) * 1.8;

    let lineIndex = 0;
    const linePosAttr = linesRef.current ? linesRef.current.geometry.attributes.position : null;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Floating sine drift
      positionsAttr.array[i3] = initialPositions[i3] + Math.sin(time * 0.8 + i) * 0.08;
      positionsAttr.array[i3 + 1] = initialPositions[i3 + 1] + Math.cos(time * 0.6 + i) * 0.08;

      // Slight pull toward cursor when hovered
      if (isHovered) {
        positionsAttr.array[i3] += (targetMouseX - positionsAttr.array[i3]) * 0.02;
        positionsAttr.array[i3 + 1] += (targetMouseY - positionsAttr.array[i3 + 1]) * 0.02;
      }

      // Connecting lines between nearby nodes
      if (linePosAttr && isHovered) {
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const dx = positionsAttr.array[i3] - positionsAttr.array[j3];
          const dy = positionsAttr.array[i3 + 1] - positionsAttr.array[j3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.7) {
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
      {/* Node Dots */}
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
          size={0.045}
          color={theme.primary}
          transparent
          opacity={isHovered ? 0.75 : 0.25}
          sizeAttenuation
        />
      </points>

      {/* Subtle connecting lines */}
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
          color={theme.secondary}
          transparent
          opacity={isHovered ? 0.18 : 0.0}
        />
      </lineSegments>
    </group>
  );
};

// Background Shader Plane
const SceneContent = ({ resourceType, mousePosRef, isHovered }) => {
  const meshRef = useRef();
  const theme = RESOURCE_THEMES[resourceType] || RESOURCE_THEMES.default;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uPrimaryColor: { value: theme.primary },
      uSecondaryColor: { value: theme.secondary },
    }),
    [theme]
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Lerp hover transition
    const targetHover = isHovered ? 1.0 : 0.0;
    uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, delta * 4);

    // Lerp mouse position
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
          args={[LightBeamShader]}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <KnowledgeNodes theme={theme} mousePosRef={mousePosRef} isHovered={isHovered} />
    </>
  );
};

export default function ResourceCardCanvas({ resourceType, mousePosRef, isHovered }) {
  return (
    <Canvas
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 2], fov: 50 }}
      dpr={[1, 1.5]} // Capped pixel ratio for performance
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <SceneContent
        resourceType={resourceType}
        mousePosRef={mousePosRef}
        isHovered={isHovered}
      />
    </Canvas>
  );
}