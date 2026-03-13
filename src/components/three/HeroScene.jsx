import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function ParticleField() {
  const ref = useRef();
  const { mouse } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const points = useMemo(() => {
    const arr = new Float32Array(900);
    for (let i = 0; i < arr.length; i += 1) {
      arr[i] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      const { normalizedX, normalizedY } = mouse.current;
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
      if (!reducedMotion) {
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, normalizedX * 0.35, 0.04);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, normalizedY * -0.35, 0.04);
      }
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ff9f5a"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function NeuralMesh() {
  const group = useRef();
  const cursorNode = useRef();
  const { mouse } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const nodes = useMemo(
    () =>
      new Array(8).fill(null).map(
        () =>
          new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(4),
            THREE.MathUtils.randFloatSpread(3),
            THREE.MathUtils.randFloatSpread(3),
          ),
      ),
    [],
  );

  useFrame((state) => {
    const { normalizedX, normalizedY } = mouse.current;

    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      if (!reducedMotion) {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, normalizedX * 0.5, 0.04);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, normalizedY * -0.4, 0.04);
      }
    }

    if (cursorNode.current && !reducedMotion) {
      cursorNode.current.position.x = THREE.MathUtils.lerp(cursorNode.current.position.x, normalizedX * 2.6, 0.08);
      cursorNode.current.position.y = THREE.MathUtils.lerp(cursorNode.current.position.y, normalizedY * -1.8, 0.08);
    }
  });

  return (
    <group ref={group}>
      {nodes.map((node, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
          <mesh position={node}>
            <icosahedronGeometry args={[0.06, 0]} />
            <meshBasicMaterial color="#ffd7b5" />
          </mesh>
        </Float>
      ))}
      {nodes.slice(0, -1).map((node, index) => (
        <Line
          key={`line-${index}`}
          points={[node, nodes[(index + 2) % nodes.length]]}
          color="#ff7a18"
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}
      <mesh ref={cursorNode} position={[0, 0, -0.4]}>
        <sphereGeometry args={[0.15, 18, 18]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function TechOrb() {
  const ref = useRef();
  const ringRef = useRef();
  const { mouse } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const basePosition = useMemo(() => new THREE.Vector3(1.2, 0.25, 0), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { normalizedX, normalizedY, velocity } = mouse.current;
    ref.current.rotation.y += delta * 0.2;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.12;
    if (!reducedMotion) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, normalizedY * 0.8, 0.05);
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        basePosition.x + normalizedX * 0.28,
        0.04,
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        basePosition.y + normalizedY * -0.22,
        0.04,
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.y -= delta * (0.12 + velocity * 0.1);
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      if (!reducedMotion) {
        ringRef.current.position.x = THREE.MathUtils.lerp(
          ringRef.current.position.x,
          basePosition.x + normalizedX * 0.28,
          0.04,
        );
        ringRef.current.position.y = THREE.MathUtils.lerp(
          ringRef.current.position.y,
          basePosition.y + normalizedY * -0.22,
          0.04,
        );
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.1}>
      <group>
        <mesh ref={ref} position={[1.2, 0.25, 0]}>
          <icosahedronGeometry args={[1.02, 1]} />
          <meshStandardMaterial
            color="#11151d"
            emissive="#ff7a18"
            emissiveIntensity={0.45}
            metalness={0.8}
            roughness={0.12}
            wireframe
          />
        </mesh>
        <mesh ref={ringRef} position={[1.2, 0.25, 0]}>
          <torusGeometry args={[1.48, 0.03, 12, 60]} />
          <meshBasicMaterial color="#ffd3af" transparent opacity={0.42} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 1.5]}>
        {/* Lightweight 3D stack for premium depth without excessive scene complexity. */}
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#05060a", 4, 11]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 2]} intensity={18} color="#ff7a18" />
        <pointLight position={[-2, -1, 2]} intensity={10} color="#7dd3fc" />
        <ParticleField />
        <NeuralMesh />
        <TechOrb />
      </Canvas>
    </div>
  );
}
