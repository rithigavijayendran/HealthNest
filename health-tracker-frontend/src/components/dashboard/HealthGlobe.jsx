import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function Globe({ score }) {
  const meshRef = useRef();
  const ringRef = useRef();
  
  useFrame(({ clock }) => {
    meshRef.current.rotation.y += 0.002;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    ringRef.current.rotation.x = clock.getElapsedTime() * 0.1;
  });

  const { color, emissive } = useMemo(() => {
    const colors = {
      high: { color: '#4fd1c5', emissive: '#4fd1c5' },
      mediumHigh: { color: '#48bb78', emissive: '#68d391' },
      medium: { color: '#ed8936', emissive: '#f6ad55' },
      low: { color: '#e53e3e', emissive: '#fc8181' }
    };
    
    if (score >= 80) return colors.high;
    if (score >= 60) return colors.mediumHigh;
    if (score >= 40) return colors.medium;
    return colors.low;
  }, [score]);

  return (
    <>
      <Sphere ref={meshRef} args={[0.6, 64, 64]}>
        <meshStandardMaterial 
          color={color}
          emissive={emissive}
          emissiveIntensity={score / 100}
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Animated Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={emissive}
          emissive={emissive}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </>
  );
}

export default function HealthGlobe({ score }) {
  const bg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(23,25,35,0.8)');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <MotionBox
      position="relative"
      w={{ base: "full" }}
      h={{ base: "200px", md: "400px" }}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      bg={bg}
      backdropFilter="blur(10px)"
      boxShadow="xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        
        <Globe score={score} />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1.5}
          enableRotate={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <Text
        position="absolute"
        bottom={{ base: 4, md: 6 }}
        left="0"
        right="0"
        textAlign="center"
        fontWeight="bold"
        fontSize={{ base: "lg", md: "xl" }}
        color={useColorModeValue("teal.600", "teal.600")}
        textShadow="0 2px 4px rgba(0,0,0,0.1)"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Health Score: {score}
      </Text>
    </MotionBox>
  );
}