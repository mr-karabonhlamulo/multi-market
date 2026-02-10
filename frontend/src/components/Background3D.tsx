import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CurrencySymbol = ({ symbol, theme }: { symbol: string, theme: string }) => {
    const mesh = useRef<THREE.Mesh>(null!);

    // Random initial position and speed
    const position = useMemo(() => [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 10
    ], []);

    const speed = useMemo(() => 0.005 + Math.random() / 100, []);
    const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

    useFrame((state, delta) => {
        if (!mesh.current) return;
        mesh.current.rotation.y += rotationSpeed;
        mesh.current.rotation.x += rotationSpeed;
        mesh.current.position.y -= speed;

        // Reset if falls below screen
        if (mesh.current.position.y < -12) {
            mesh.current.position.y = 12;
            mesh.current.position.x = (Math.random() - 0.5) * 25;
        }
    });

    return (
        <Text
            ref={mesh}
            position={position as [number, number, number]}
            fontSize={0.8 + Math.random()}
            color={theme === 'royal' ? '#FFD700' : '#85bb65'} // Gold or Green
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.6}
            outlineWidth={0.02}
            outlineColor={theme === 'royal' ? '#332200' : '#002200'}
        >
            {symbol}
        </Text>
    );
};

const CurrencyParticles = ({ count = 50, theme }: { count?: number; theme: string }) => {
    const symbols = ['$', '€', '£', 'R', '¥', '₿'];

    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <CurrencySymbol
                    key={i}
                    symbol={symbols[Math.floor(Math.random() * symbols.length)]}
                    theme={theme}
                />
            ))}
        </>
    );
};

export default function Background3D({ theme }: { theme: 'royal' | 'nude' }) {
    return (
        <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                {/* Lighting to make the money shine */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <CurrencyParticles count={40} theme={theme} />
            </Canvas>
        </div>
    );
}
