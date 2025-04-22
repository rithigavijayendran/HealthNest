import { useState } from 'react';
import { 
  Box, Button, Input, FormControl, FormLabel, 
  Heading, useToast, Flex, Link, Text, Image 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { loginUser } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.png";


const MotionBox = motion(Box);

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter both email and password',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        title: 'Login failed',
        description: err?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={[4, 8]}
      borderRadius={["lg", "2xl"]}
      boxShadow={["md", "2xl"]}
      bg="rgba(255, 255, 255, 0.92)"
      backdropFilter="blur(8px)"
      w="full"
      maxW={["100%", "md"]}
      mx="auto"
      mb={[0, 8]}
      mt={[4,6]}
    >
      <Flex direction="column" align="center" mb={8}>
        <Image 
          src={logo}
          alt="HealthTrack"
          w={["100px", "120px"]}
          mb={[4, 6]}
        />
        <Heading 
          mb={2}
          fontSize={["2xl", "3xl"]}
          fontWeight="700"
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Welcome Back
        </Heading>
        <Text color="gray.600" fontSize={["sm", "md"]} textAlign="center">
          Track your wellness journey
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <FormControl mb={[4, 5]}>
          <FormLabel fontSize={["xs", "sm"]} fontWeight="600" color="gray.700">Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size={["md", "lg"]}
            borderRadius="lg"
            focusBorderColor="teal.600"
            borderColor="teal.600"
            _focus={{ boxShadow: '0 0 0 2px var(--chakra-colors-teal-400)' }}
          />
        </FormControl>

        <FormControl mb={[6,8]}>
          <FormLabel fontSize={["xs", "sm"]} fontWeight="600" color="gray.700">Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size={["md", "lg"]}
            borderRadius="lg"
            focusBorderColor="teal.400"
            borderColor="teal.600"
            _focus={{ boxShadow: '0 0 0 2px var(--chakra-colors-teal-400)' }}
          />
        </FormControl>

        <Button
          type="submit"
          size={["md", "lg"]}
          fontSize="md"
          fontWeight="600"
          borderRadius="lg"
          colorScheme="teal"
          _hover={{ 
            transform: 'translateY(-1px)', 
            boxShadow: 'lg',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
          width="full"
          isLoading={isLoading}
          loadingText="Signing In..."
          mb={6}
        >
          Sign In
        </Button>

        <Flex justify="center" fontSize={["xs", "sm"]} mb={[4, 6]}>
          <Text color="gray.600">New here? </Text>
          <Link 
            as={RouterLink} 
            to="/register"
            ml={2}
            color="teal.500"
            fontWeight="600"
            _hover={{ textDecoration: 'underline' }}
          >
            Create Account
          </Link>
        </Flex>
      </form>
    </MotionBox>
  );
}