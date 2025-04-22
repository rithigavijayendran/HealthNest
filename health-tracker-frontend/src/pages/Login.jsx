import { motion } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';

const MotionBox = motion(Box);

export default function Login() {
  return (
    <Flex
      minH="100vh"
      w="100vw"
      overflowX="hidden"
      align="center"
      justify="center"
      backgroundImage="url('https://slidechef.net/wp-content/uploads/2022/10/Hospital-Background-1024x576.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0,
      }}
    >
      <MotionBox 
        w="full"
        maxW="container.sm"
        px={[2, 4]}
        zIndex="1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        mb={[0, 12]}
      >
        <LoginForm />
      </MotionBox>
    </Flex>
  );
}