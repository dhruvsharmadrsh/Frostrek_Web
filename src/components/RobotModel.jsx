import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RobotModel({ isSpeaking = false, ...props }) {
  const group = useRef();
  const isVisible = useRef(true);

  const eyeParts = useRef([]);
  const mouthParts = useRef([]);
  const earParts = useRef([]);

  const blinkTimer = useRef(0);
  const blinkDuration = 0.12;
  const nextBlink = useRef(Math.random() * 3 + 3);
  const blinking = useRef(false);

  const { scene } = useGLTF("/models/genkub_greeting_robot.glb", true);

  useEffect(() => {
    // Pause animations when tab is hidden
    const handleVisibility = () => {
      isVisible.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    eyeParts.current = [];
    mouthParts.current = [];
    earParts.current = [];

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      const mat = child.material.clone();
      // Adjusted for better visibility on light backgrounds
      mat.metalness = 0.9;
      mat.roughness = 0.25;
      mat.color = new THREE.Color("#1a1a24"); // Slightly bluish dark for depth
      mat.envMapIntensity = 1.2; // Enhance environment reflections

      if (
        name.includes("arm") ||
        name.includes("body") ||
        name.includes("torso") ||
        name.includes("leg")
      ) {
        // Body parts with subtle edge highlights
        mat.metalness = 0.85;
        mat.roughness = 0.3;
        mat.color = new THREE.Color("#1e1e28");
        mat.emissive.set(0x050508); // Very subtle self-illumination for depth
        mat.emissiveIntensity = 0.15;
        mat.transparent = false;
        child.material = mat;
        return;
      }

      if (name.includes("eye")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 2.0; // Brighter glow for visibility
        mat.transparent = true;
        mat.opacity = 1;
        mat.metalness = 0;
        mat.roughness = 0.1;
        child.material = mat;
        eyeParts.current.push(child);
        return;
      }

      if (name.includes("mouth")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 1.8; // Brighter glow
        mat.transparent = true;
        mat.opacity = 1;
        mat.metalness = 0;
        mat.roughness = 0.1;
        child.material = mat;
        mouthParts.current.push(child);
        return;
      }

      if (name.includes("ear")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 1.6; // Brighter glow
        mat.transparent = false;
        mat.metalness = 0.3;
        mat.roughness = 0.2;
        child.material = mat;
        earParts.current.push(child);
        return;
      }

      // Default parts
      mat.emissive.set(0x020205);
      mat.emissiveIntensity = 0.1;
      child.material = mat;
    });

    scene.rotation.set(-0.15, -Math.PI / 4, 0.15); // Slightly better angle
    scene.updateMatrixWorld(true);
  }, [scene]);

  useFrame((state, delta) => {
    // Skip processing when tab is hidden
    if (!isVisible.current || !group.current) return;

    const t = state.clock.getElapsedTime();

    // Floating animation (always runs - cheap operation)
    group.current.position.y = Math.sin(t * 1.2) * 0.08;

    // Blink timer logic
    blinkTimer.current += delta;

    if (!blinking.current && blinkTimer.current > nextBlink.current) {
      blinking.current = true;
      blinkTimer.current = 0;
    }

    // Only update eye materials during blink animation
    if (blinking.current) {
      const half = blinkDuration / 2;
      const p = blinkTimer.current;

      let opacity = 1;
      if (p < half) {
        opacity = THREE.MathUtils.lerp(1, 0.05, p / half);
      } else if (p < blinkDuration) {
        opacity = THREE.MathUtils.lerp(0.05, 1, (p - half) / half);
      } else {
        blinking.current = false;
        blinkTimer.current = 0;
        nextBlink.current = Math.random() * 3 + 3;
      }

      // Use for loop instead of forEach for better performance
      for (let i = 0; i < eyeParts.current.length; i++) {
        eyeParts.current[i].material.opacity = opacity;
      }
    }

    // Speaking animations - only process if speaking state is relevant
    const speakPulse = isSpeaking ? (Math.sin(t * 12) + 1) / 2 : 0;

    for (let i = 0; i < mouthParts.current.length; i++) {
      const mouth = mouthParts.current[i];
      mouth.material.emissiveIntensity = THREE.MathUtils.lerp(
        mouth.material.emissiveIntensity,
        isSpeaking ? 1.4 + speakPulse * 0.8 : 1.3,
        0.2
      );
      mouth.material.opacity = THREE.MathUtils.lerp(
        mouth.material.opacity,
        isSpeaking ? 0.85 + speakPulse * 0.15 : 1,
        0.2
      );
    }

    for (let i = 0; i < earParts.current.length; i++) {
      earParts.current[i].material.emissiveIntensity = THREE.MathUtils.lerp(
        earParts.current[i].material.emissiveIntensity,
        isSpeaking ? 1.6 : 1.3,
        0.1
      );
    }
    // Removed invalidate() - frameloop="always" in HeroRobot handles this
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1.4} rotation={[0, -0.3, 0]} />
    </group>
  );
}

useGLTF.preload("/models/genkub_greeting_robot.glb");
