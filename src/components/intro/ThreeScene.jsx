import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function IntroNetwork({ phase }) {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const baseNodes = useMemo(
    () =>
      new Array(18).fill(null).map(
        () =>
          new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(4.2),
            THREE.MathUtils.randFloatSpread(2.6),
            THREE.MathUtils.randFloatSpread(1.8),
          ),
      ),
    [],
  );
  const scatterTargets = useMemo(
    () =>
      baseNodes.map(
        (node) =>
          new THREE.Vector3(
            node.x * THREE.MathUtils.randFloat(1.6, 2.2),
            node.y * THREE.MathUtils.randFloat(1.6, 2.5),
            node.z + THREE.MathUtils.randFloat(-1, 1),
          ),
      ),
    [baseNodes],
  );
  const pointPositions = useMemo(() => {
    const arr = new Float32Array(baseNodes.length * 3);
    baseNodes.forEach((node, index) => {
      arr[index * 3] = node.x;
      arr[index * 3 + 1] = node.y;
      arr[index * 3 + 2] = node.z;
    });
    return arr;
  }, [baseNodes]);

  useEffect(() => {
    const handleMove = (event) => {
      setMouse({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.45, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * -0.3, 0.03);
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(
        THREE.MathUtils.lerp(coreRef.current.scale.x, phase === "scatter" ? 0.72 : phase === "connect" ? 1.08 : 0.88, 0.06),
      );
      coreRef.current.material.opacity = THREE.MathUtils.lerp(
        coreRef.current.material.opacity,
        phase === "dark" ? 0.2 : phase === "connect" ? 0.9 : 0.45,
        0.08,
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.28;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      ringRef.current.scale.setScalar(
        THREE.MathUtils.lerp(ringRef.current.scale.x, phase === "scatter" ? 1.5 : 1, 0.05),
      );
    }

    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const scatterStrength = phase === "scatter" ? 1 : phase === "connect" ? 0.2 : 0;
      baseNodes.forEach((node, index) => {
        const target = scatterTargets[index];
        const next = node.clone().lerp(target, scatterStrength);
        positions[index * 3] = THREE.MathUtils.lerp(positions[index * 3], next.x + mouse.x * 0.18, 0.06);
        positions[index * 3 + 1] = THREE.MathUtils.lerp(positions[index * 3 + 1], next.y + mouse.y * -0.14, 0.06);
        positions[index * 3 + 2] = THREE.MathUtils.lerp(positions[index * 3 + 2], next.z, 0.06);
      });
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef} position={[0, 0, -0.15]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color="#ffb37b" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, -0.2]}>
        <torusGeometry args={[0.92, 0.02, 16, 80]} />
        <meshBasicMaterial color="#ff7a18" transparent opacity={0.48} />
      </mesh>
      <Points ref={pointsRef} positions={pointPositions} stride={3}>
        <PointMaterial
          color="#ff9f5a"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </Points>
      {baseNodes.slice(0, -1).map((node, index) => {
        const nextNode = baseNodes[(index + 3) % baseNodes.length];
        return (
          <Line
            key={`intro-line-${index}`}
            points={[node, nextNode]}
            color="#ff7a18"
            transparent
            opacity={phase === "connect" || phase === "scatter" ? 0.34 : 0}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
}

export function ThreeScene({ phase }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 52 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#030407"]} />
        <fog attach="fog" args={["#030407", 4, 10]} />
        <ambientLight intensity={0.38} />
        <pointLight position={[2.4, 2.8, 2]} intensity={22} color="#ff7a18" />
        <pointLight position={[-2, -1.5, 2]} intensity={9} color="#f8fafc" />
        <IntroNetwork phase={phase} />
      </Canvas>
    </div>
  );
}
