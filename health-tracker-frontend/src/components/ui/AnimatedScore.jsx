import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function AnimatedScore({ score }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
  }, [score, controls]);

  return (
    <motion.div animate={controls}>
      <Box
        p={4}
        borderRadius="full"
        bgGradient="linear(to-br, teal.300, blue.500)"
        boxShadow="lg"
        w="120px"
        h="120px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="3xl" fontWeight="bold" color="white">
          {score}
        </Text>
      </Box>
    </motion.div>
  );
}