import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function SignalCluster({ panelMouseRef }) {
  const group = useRef(null);
  const core = useRef(null);
  const ring = useRef(null);
  const { mouse } = useGlobalMouse();
  const reducedMotion = useReducedMotion();

  const nodes = useMemo(
    () =>
      new Array(7).fill(null).map(
        (_, index) =>
          new THREE.Vector3(
            Math.cos((index / 7) * Math.PI * 2) * THREE.MathUtils.randFloat(1.1, 1.8),
            Math.sin((index / 7) * Math.PI * 2) * THREE.MathUtils.randFloat(0.8, 1.4),
            THREE.MathUtils.randFloat(-0.4, 0.4),
          ),
      ),
    [],
  );

  useFrame((state, delta) => {
    const panelMouse = panelMouseRef?.current;
    const source = panelMouse?.active ? panelMouse : mouse.current;
    const { normalizedX, normalizedY, velocity } = source;

    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.12 + normalizedY * 0.2;
      if (!reducedMotion) {
        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, normalizedX * 0.75, 0.08);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, normalizedY * -0.55, 0.08);
      }
    }

    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.08 + velocity * 0.05;
      core.current.scale.setScalar(pulse);
    }

    if (ring.current) {
      ring.current.rotation.z += delta * 0.36;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.35 + normalizedX * 0.18;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#11151d"
          emissive="#ff7a18"
          emissiveIntensity={1}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.1, 0.02, 14, 80]} />
        <meshBasicMaterial color="#ffb37b" transparent opacity={0.55} />
      </mesh>

      {nodes.map((node, index) => (
        <Float key={`contact-node-${index}`} speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={node}>
            <icosahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#ff9f5a" : "#7dd3fc"}
              emissive={index % 2 === 0 ? "#ff7a18" : "#7dd3fc"}
              emissiveIntensity={0.45}
              roughness={0.25}
            />
          </mesh>
        </Float>
      ))}

      {nodes.map((node, index) => (
        <Line
          key={`contact-line-${index}`}
          points={[new THREE.Vector3(0, 0, 0), node]}
          color={index % 2 === 0 ? "#ff7a18" : "#7dd3fc"}
          transparent
          opacity={0.26}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

export function ContactSignalScene({ panelMouseRef }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 4, 8]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[2, 2, 2]} intensity={16} color="#ff7a18" />
        <pointLight position={[-2, -1.5, 2]} intensity={8} color="#7dd3fc" />
        <SignalCluster panelMouseRef={panelMouseRef} />
      </Canvas>
    </div>
  );
}
