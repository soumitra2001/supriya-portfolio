"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

interface SystemNode {
  id: string;
  name: string;
  role: string;
  category: "core" | "storage" | "network" | "infra";
  position: [number, number, number];
  color: string;
}

const NODES: SystemNode[] = [
  {
    id: "core",
    name: "Go Engine",
    role: "Core microservices, Goroutines & channels",
    category: "core",
    position: [0, 0, 0],
    color: "#10b981", // Emerald
  },
  {
    id: "api",
    name: "gRPC & REST",
    role: "High-throughput API Gateway & Rate Limiters",
    category: "network",
    position: [-2.2, 1.3, 0.4],
    color: "#06b6d4", // Cyan
  },
  {
    id: "mqtt",
    name: "MQTT / Kafka",
    role: "Real-time streaming broker (Hermes GPS)",
    category: "network",
    position: [-2.4, -1.2, -0.3],
    color: "#38bdf8", // Sky
  },
  {
    id: "redis",
    name: "Redis Geo",
    role: "Geospatial indexing & distributed pub/sub",
    category: "storage",
    position: [2.3, 1.2, -0.2],
    color: "#f43f5e", // Rose/Red
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    role: "ACID transactions & relational schema",
    category: "storage",
    position: [2.4, -1.3, 0.3],
    color: "#818cf8", // Indigo
  },
  {
    id: "infra",
    name: "K8s & Cloud",
    role: "Container orchestration & CI/CD",
    category: "infra",
    position: [0, 2.3, -0.4],
    color: "#a855f7", // Purple
  },
  {
    id: "workers",
    name: "Worker Pools",
    role: "Async event batching & telemetry ingestion",
    category: "core",
    position: [0, -2.2, 0.2],
    color: "#34d399", // Mint
  },
];

const CONNECTIONS: [string, string][] = [
  ["core", "api"],
  ["core", "mqtt"],
  ["core", "redis"],
  ["core", "postgres"],
  ["core", "infra"],
  ["core", "workers"],
  ["mqtt", "workers"],
  ["workers", "redis"],
  ["workers", "postgres"],
  ["api", "redis"],
];

function NodeMesh({
  node,
  isHovered,
  onHover,
  onUnhover,
}: {
  node: SystemNode;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = isHovered ? 1.3 : node.category === "core" ? 1.15 : 1;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        Math.min(delta * 10, 1)
      );
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover();
        }}
        onPointerOut={() => onUnhover()}
      >
        <sphereGeometry args={[node.category === "core" ? 0.35 : 0.24, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 0.9 : 0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit Ring for core */}
      {node.category === "core" && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[0.5, 0.54, 32]} />
          <meshBasicMaterial
            color="#34d399"
            opacity={0.3}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, -0.42, 0]}
          fontSize={0.16}
          color={isHovered ? "#ffffff" : "#94a3b8"}
          anchorX="center"
          anchorY="middle"
        >
          {node.name}
        </Text>
      </Billboard>
    </group>
  );
}

function ConnectionLines({
  activeNodeId,
}: {
  activeNodeId: string | null;
}) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, [number, number, number]>();
    NODES.forEach((n) => map.set(n.id, n.position));
    return map;
  }, []);

  const lines = useMemo(() => {
    return CONNECTIONS.map(([sourceId, targetId]) => {
      const p1 = nodeMap.get(sourceId);
      const p2 = nodeMap.get(targetId);
      if (!p1 || !p2) return null;

      const points = [new THREE.Vector3(...p1), new THREE.Vector3(...p2)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const isConnected =
        activeNodeId === sourceId || activeNodeId === targetId || activeNodeId === null;

      return {
        id: `${sourceId}-${targetId}`,
        geometry,
        isConnected,
        isDirect: activeNodeId === sourceId || activeNodeId === targetId,
      };
    }).filter(Boolean);
  }, [nodeMap, activeNodeId]);

  return (
    <group>
      {lines.map((line) => {
        if (!line) return null;
        return (
          <primitive key={line.id} object={new THREE.Line(
            line.geometry,
            new THREE.LineBasicMaterial({
              color: line.isDirect ? "#34d399" : "#334155",
              transparent: true,
              opacity: line.isDirect ? 0.9 : activeNodeId ? 0.15 : 0.4,
              linewidth: line.isDirect ? 2 : 1,
            })
          )} />
        );
      })}
    </group>
  );
}

function RotatingSystem({
  activeNodeId,
  setActiveNodeId,
}: {
  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      // Gentle cursor-driven tilt
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.25,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <ConnectionLines activeNodeId={activeNodeId} />

        {NODES.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            isHovered={activeNodeId === node.id}
            onHover={() => setActiveNodeId(node.id)}
            onUnhover={() => setActiveNodeId(null)}
          />
        ))}
      </Float>
    </group>
  );
}

export function TechNetwork() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const activeNode = useMemo(() => {
    return NODES.find((n) => n.id === activeNodeId);
  }, [activeNodeId]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <RotatingSystem
          activeNodeId={activeNodeId}
          setActiveNodeId={setActiveNodeId}
        />
      </Canvas>

      {/* Floating System HUD Tooltip */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-6 md:w-80 pointer-events-none transition-all duration-300">
        <div className="glass-panel p-3.5 rounded-xl border border-slate-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Architecture Topology
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Interactive WebGL
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-200">
            {activeNode ? activeNode.name : "Hover nodes to inspect topology"}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            {activeNode
              ? activeNode.role
              : "Distributed microservices, low-latency caches, and real-time streaming pipelines engineered in Go."}
          </p>
        </div>
      </div>
    </div>
  );
}
