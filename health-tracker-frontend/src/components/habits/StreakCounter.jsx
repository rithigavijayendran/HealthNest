import { Box, Text, Flex, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { GiOrbital, GiSpinningBlades } from 'react-icons/gi';

const MotionBox = motion(Box);
const Particle = motion(Box);

export default function StreakCounter({ streak }) {
  const controls = useAnimation();
  const particleCount = Math.min(20, Math.floor(streak / 3));
  const size = streak > 30 ? 120 : streak > 14 ? 100 : 80;
  
  const theme = {
    energy: streak > 21 ? '#FF00FF' : streak > 14 ? '#00FFFF' : '#00FF00',
    core: useColorModeValue('whiteAlpha.900', 'blackAlpha.900'),
    textGlow: streak > 21 ? '0 0 15px #FF00FF' : 
             streak > 14 ? '0 0 12px #00FFFF' : 
             '0 0 8px #00FF00'
  };

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  return (
    <Tooltip 
      label={`Quantum Streak: ${streak} days!`}
      hasArrow
      placement="bottom"
      bg="blackAlpha.800"
      color="white"
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        w={`${size}px`}
        h={`${size}px`}
        _hover={{ transform: 'scale(1.1)' }}
        transition="transform 0.3s"
      >
        {/* Particle Field */}
        {[...Array(particleCount)].map((_, i) => (
          <Particle
            key={i}
            position="absolute"
            w="2px"
            h="2px"
            bg={theme.energy}
            animate={{
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, Math.random() * 80 - 40, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Outer Orbital Ring */}
        <MotionBox
          position="absolute"
          w="100%"
          h="100%"
          borderRadius="full"
          border={`2px solid ${theme.energy}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />

        {/* Spinning Core */}
        <MotionBox
          animate={controls}
          position="relative"
          w="100%"
          h="100%"
        >
          <GiSpinningBlades 
            size="100%"
            color={theme.energy}
            style={{
              filter: `drop-shadow(${theme.textGlow})`,
              position: 'absolute',
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Enhanced Number Display */}
          <Flex
            position="absolute"
            w="100%"
            h="100%"
            align="center"
            justify="center"
            borderRadius="full"
            bg={theme.core}
            boxShadow={`inset 0 0 20px ${theme.energy}`}
          >
            <Text
              fontSize="3xl"
              fontWeight="black"
              color={theme.energy}
              textShadow={theme.textGlow}
              sx={{
                WebkitTextStroke: '1px white',
                paintOrder: 'stroke fill'
              }}
            >
             
              <Text 
                as="span" 
                fontSize="md" 
                display="block" 
                textAlign="center"
                mt={10}
              >
                DAYS
              </Text>
            </Text>
          </Flex>

          {/* Energy Pulse */}
          <MotionBox
            position="absolute"
            w="100%"
            h="100%"
            borderRadius="full"
            border={`2px solid ${theme.energy}`}
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </MotionBox>

        {/* Floating Icon */}
        <MotionBox
          position="absolute"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity
          }}
        >
          <GiOrbital 
            size="30%"
            color={theme.energy}
            style={{ filter: `drop-shadow(${theme.textGlow})` }}
          />
        </MotionBox>

        {/* Additional Number Glow */}
        <MotionBox
          position="absolute"
          w="100%"
          h="100%"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <Text
            fontSize="3xl"
            fontWeight="black"
            color={theme.energy}
            opacity="0.3"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            {streak}
          </Text>
        </MotionBox>
      </Flex>
    </Tooltip>
  );
}