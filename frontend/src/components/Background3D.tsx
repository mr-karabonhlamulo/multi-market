import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'three/examples/jsm/utils/BufferGeometryUtils';
// Note: simplified particle system without heavy utils
import * as THREE from 'three';

const MoneyParticles = ({ count = 300, theme }: { count?: number; theme: string }) => {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Random colors depending on theme
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 20; // Spread x
            const y = (Math.random() - 0.5) * 20; // Spread y
            const z = (Math.random() - 0.5) * 10; // Spread z
            const mx = 0;
            const my = 0;
            temp.push({ t, factor, speed, x, y, z, mx, my });
        }
        return temp;
    }, [count]);

    // Use a PlaneGeometry for a "bill" look
    const moneyGeometry = useMemo(() => new THREE.PlaneGeometry(0.6, 0.3), []);

    // Gold or Green material
    const moneyMaterial = useMemo(() => new THREE.MeshPhongMaterial({
        color: theme === 'royal' ? '#FFD700' : '#85bb65', // Gold for Royal, Dollar Green for Nude
        side: THREE.DoubleSide,
        shininess: 100,
        emissive: theme === 'royal' ? '#332200' : '#002200',
        emissiveIntensity: 0.2
    }), [theme]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;

            // Falling motion
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update particle position (falling down)
            particle.y -= speed * 5;

            // Reset if too low
            if (particle.y < -10) {
                particle.y = 10;
                particle.x = (Math.random() - 0.5) * 20;
            }

            // Swaying motion
            dummy.position.set(particle.x + Math.sin(t) * 2, particle.y, z);
            dummy.scale.set(1, 1, 1);
            dummy.rotation.set(s * 5, s * 5, s * 5); // Spin
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[moneyGeometry, moneyMaterial, count]} />
    );
};

export default function Background3D({ theme }: { theme: 'royal' | 'nude' }) {
    return (
        <div className="fixed inset-0 -z-50 opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                {/* Lighting to make the money shine */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <MoneyParticles theme={theme} />
            </Canvas>
        </div>
    );
}
