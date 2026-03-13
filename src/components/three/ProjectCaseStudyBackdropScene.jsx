import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function BackdropParticles({ pointerRef }) {
  const pointsRef = useRef(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(1200);

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = THREE.MathUtils.randFloatSpread(14);
      positions[index + 1] = THREE.MathUtils.randFloatSpread(8);
      positions[index + 2] = THREE.MathUtils.randFloatSpread(6);
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const { normalizedX, normalizedY, velocity } = pointerRef.current;

    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, normalizedX * 0.8, 0.035);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, normalizedY * -0.45, 0.035);
    pointsRef.current.material.size = 0.03 + velocity * 0.012;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffb173"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function NeuralBloom({ pointerRef, accent }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);

  const nodes = useMemo(
    () =>
      new Array(9).fill(null).map(
        (_, index) =>
          new THREE.Vector3(
            Math.cos((index / 9) * Math.PI * 2) * THREE.MathUtils.randFloat(1.4, 2.7),
            Math.sin((index / 9) * Math.PI * 2) * THREE.MathUtils.randFloat(0.8, 1.8),
            THREE.MathUtils.randFloat(-1, 1),
          ),
      ),
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { normalizedX, normalizedY, velocity } = pointerRef.current;

    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.16 + normalizedY * 0.22;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, normalizedX * 1.15, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, normalizedY * -0.8, 0.05);

    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08 + velocity * 0.06;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.58, 1]} />
          <meshStandardMaterial
            color="#10141c"
            emissive={accent}
            emissiveIntensity={0.55}
            metalness={0.45}
            roughness={0.16}
            wireframe
          />
        </mesh>
      </Float>

      {nodes.map((node, index) => (
        <Float key={`modal-node-${index}`} speed={1.9} rotationIntensity={0.45} floatIntensity={0.75}>
          <mesh position={node}>
            <icosahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#7dd3fc" : accent}
              emissive={index % 3 === 0 ? "#7dd3fc" : accent}
              emissiveIntensity={0.42}
              roughness={0.22}
            />
          </mesh>
        </Float>
      ))}

      {nodes.map((node, index) => (
        <Line
          key={`modal-line-${index}`}
          points={[new THREE.Vector3(0, 0, 0), node]}
          color={index % 3 === 0 ? "#7dd3fc" : accent}
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

export function ProjectCaseStudyBackdropScene({ pointerRef, accent = "#ff7a18" }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 52 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.45} />
        <pointLight position={[2.5, 2.5, 2]} intensity={14} color={accent} />
        <pointLight position={[-2.5, -2, 2]} intensity={8} color="#7dd3fc" />
        <BackdropParticles pointerRef={pointerRef} />
        <NeuralBloom pointerRef={pointerRef} accent={accent} />
      </Canvas>
    </div>
  );
}
