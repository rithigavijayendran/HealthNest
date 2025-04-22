import { Flex, Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';

const MotionBox = motion(Box);

export default function Register() {
  return (
    <Flex
      minH="100vh"
      w="100vw"
      align="flex-start"
      justify="center"
      backgroundImage="url('https://slidechef.net/wp-content/uploads/2022/10/Hospital-Background-1024x576.jpg')"
      backgroundSize="cover"
      backgroundPosition="center" 
      backgroundRepeat="no-repeat"
      position="relative"
      pt={2} 
      mb="50px"
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
        maxW={{ base: '95%', md: 'container.md' }}
        px={{ base: 2, md: 4 }}
        zIndex="1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        mt={8} // Add small margin from top
        mb={8} // Add bottom margin for mobile
      >
        <RegisterForm />
      </MotionBox>
    </Flex>
  );
}