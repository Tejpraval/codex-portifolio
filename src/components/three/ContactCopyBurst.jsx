import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function BurstCore({ trigger }) {
  const group = useRef(null);
  const ring = useRef(null);
  const flash = useRef(null);
  const progress = useRef(0);
  const active = useRef(false);

  const particles = useMemo(
    () =>
      new Array(12).fill(null).map((_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        return {
          direction: new THREE.Vector3(Math.cos(angle), Math.sin(angle), (index % 3 - 1) * 0.18),
          color: index % 3 === 0 ? "#7dd3fc" : "#ff9f5a",
        };
      }),
    [],
  );

  useEffect(() => {
    if (trigger === 0) return;
    active.current = true;
    progress.current = 0;
    if (group.current) {
      group.current.scale.setScalar(0.2);
      group.current.visible = true;
    }
  }, [trigger]);

  useFrame((_, delta) => {
    if (!active.current) return;
    progress.current = Math.min(progress.current + delta * 1.9, 1);
    const eased = 1 - (1 - progress.current) ** 3;

    if (group.current) {
      const scale = 0.2 + eased * 1.05;
      group.current.scale.setScalar(scale);
      group.current.rotation.z += delta * 1.6;
    }

    if (ring.current) {
      ring.current.scale.setScalar(0.7 + eased * 0.95);
      ring.current.material.opacity = Math.max(0, 0.55 - eased * 0.45);
    }

    if (flash.current) {
      flash.current.material.opacity = Math.max(0, 0.34 - eased * 0.3);
      flash.current.scale.setScalar(0.45 + eased * 1.4);
    }

    if (progress.current >= 1 && group.current) {
      active.current = false;
      group.current.visible = false;
    }
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={flash}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshBasicMaterial color="#ffd4b5" transparent opacity={0.24} />
      </mesh>

      <mesh ref={ring}>
        <torusGeometry args={[0.58, 0.022, 12, 80]} />
        <meshBasicMaterial color="#ffb173" transparent opacity={0.52} />
      </mesh>

      {particles.map((particle, index) => (
        <group
          key={`copy-particle-${index}`}
          position={particle.direction.clone().multiplyScalar(0.8)}
        >
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.25}>
            <mesh>
              <icosahedronGeometry args={[0.06, 0]} />
              <meshStandardMaterial
                color={particle.color}
                emissive={particle.color}
                emissiveIntensity={0.45}
                roughness={0.25}
              />
            </mesh>
          </Float>
          <Line
            points={[new THREE.Vector3(0, 0, 0), particle.direction.clone().multiplyScalar(0.75)]}
            color={particle.color}
            transparent
            opacity={0.28}
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
}

export function ContactCopyBurst({ trigger }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
      <Canvas camera={{ position: [0, 0, 3.1], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.45} />
        <pointLight position={[1.5, 1.5, 2]} intensity={9} color="#ff7a18" />
        <pointLight position={[-1.5, -1.25, 2]} intensity={7} color="#7dd3fc" />
        <BurstCore trigger={trigger} />
      </Canvas>
    </div>
  );
}
