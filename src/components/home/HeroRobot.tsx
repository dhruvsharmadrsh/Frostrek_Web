import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { AdaptiveDpr, Preload, Environment, OrbitControls } from '@react-three/drei';
import RobotModel from '../RobotModel';

const HeroRobot = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Visibility detection for pausing render when off-screen
    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        
        return () => observer.disconnect();
    }, []);

    // Initialize audio on first interaction
    const startAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/Frosty3.mp3');
            audioRef.current.loop = false; // Play once
            audioRef.current.volume = 0.7;

            // Turn off speaking animation when audio ends
            audioRef.current.onended = () => {
                setIsSpeaking(false);
            };
        }

        // Restart audio if already playing, or start if new
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => {
            setIsSpeaking(true);
        }).catch((err) => {
            console.log('Audio play failed:', err);
        });
    }, []);

    // Removed stopAudio as we want it to play fully

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <Canvas
            camera={{ position: [0, 0.5, 3.5], fov: 45 }}
            dpr={[1, 1.5]}
            frameloop={isVisible ? "always" : "never"}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'default',
                toneMapping: 1,
                toneMappingExposure: 1.2,
            }}
            performance={{ min: 0.5 }}
            style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                cursor: isSpeaking ? 'grabbing' : 'grab',
            }}
            onPointerDown={startAudio}
        >
            {/* 360° Rotation Controls - drag to rotate */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.8}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
            />

            {/* Performance optimization */}
            <AdaptiveDpr pixelated />

            {/* Environment for realistic reflections on metallic robot */}
            <Environment preset="city" />

            {/* Main Key Light - warm bronze tone to match theme */}
            <directionalLight
                position={[5, 8, 5]}
                intensity={2}
                color="#fff5e6"
                castShadow={false}
            />

            {/* Fill Light - softer from opposite side */}
            <directionalLight
                position={[-5, 4, 3]}
                intensity={1.2}
                color="#e6f0ff"
            />

            {/* Rim/Back Light - for depth separation */}
            <pointLight
                position={[0, 3, -4]}
                intensity={1.5}
                color="#ffffff"
                distance={12}
                decay={2}
            />

            {/* Accent lights to highlight the robot's form */}
            <pointLight
                position={[3, 0, 2]}
                intensity={0.8}
                color="#B07552"
                distance={8}
                decay={2}
            />
            <pointLight
                position={[-3, 1, 2]}
                intensity={0.6}
                color="#E6D0C6"
                distance={8}
                decay={2}
            />

            {/* Top light for head/eye glow enhancement */}
            <spotLight
                position={[0, 5, 2]}
                angle={0.5}
                penumbra={0.8}
                intensity={1.5}
                color="#ffffff"
                castShadow={false}
            />

            {/* Hemisphere light for ambient fill */}
            <hemisphereLight
                color="#fff5e6"
                groundColor="#1a1a2e"
                intensity={0.5}
            />

            {/* Contact shadow for grounding */}
            {/* Contact shadow for grounding */}
            {/* <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.55}
                scale={35}
                blur={2.5}
                far={10}
                resolution={512}
                color="#3d2914"
            /> */}

            {/* Robot Model - moved higher */}
            <Suspense fallback={null}>
                <RobotModel
                    position={[0, 0.8, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                    scale={1.1}
                    isSpeaking={isSpeaking}
                />
            </Suspense>

            {/* Preload assets */}
            <Preload all />
        </Canvas>
        </div>
    );
};

export default HeroRobot;

