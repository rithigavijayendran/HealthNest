import { useState } from 'react';
import { 
  Box, Button, FormControl, FormLabel, Input, 
  NumberInput, NumberInputField, NumberInputStepper, 
  NumberIncrementStepper, NumberDecrementStepper, 
  Stack, useToast, Flex, Link, Heading, Text,
  Image, useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { registerUser } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import logo from "../../assets/logo.png";

const MotionBox = motion(Box);

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    goals: {
      sleep: 8,
      water: 3,
      exercise: 30,
      meals: 3
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      goals: { ...prev.goals, [name]: parseFloat(value) }
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill out all required fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Registration failed',
        description: err.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.92)', 'rgba(26, 32, 44, 0.92)');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      boxShadow="2xl"
      bg={cardBg}
      backdropFilter="blur(8px)"
      w="full"
      maxW="2xl"
    >
      <Flex direction="column" align="center" mb={8}>
        <Image 
          src={logo}
          alt="HealthTrack"
          w={{ base: '100px', md: '120px' }}
          mb={6}
        />
        <Heading 
          mb={2}
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
        >
          Create Account
        </Heading>
        <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }}>
          Start your wellness journey
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          {/* Personal Information Section */}
          <Box>
            <Heading size="md" color="teal.500" mb={4}>Personal Information</Heading>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Full Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  size="lg"
                  borderRadius="lg"
                  focusBorderColor="teal.800"
                  borderColor="teal.600"
                />
              </FormControl>

              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <FormControl isRequired flex={1}>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="teal.800"
                  borderColor="teal.600"
                  />
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    minLength={6}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="teal.800"
                  borderColor="teal.600"
                  />
                </FormControl>
              </Flex>
            </Stack>
          </Box>

          {/* Health Metrics Section */}
          <Box>
            <Heading size="md" color="teal.500" mb={4}>Health Metrics</Heading>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Age</FormLabel>
                <NumberInput
                  name="age"
                  value={formData.age}
                  min={13}
                  max={120}
                  size="lg"
                  onChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Weight (kg)</FormLabel>
                <NumberInput
                  name="weight"
                  value={formData.weight}
                  min={30}
                  max={300}
                  step={0.5}
                  size="lg"
                  onChange={(value) => setFormData(prev => ({ ...prev, weight: value }))}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Height (cm)</FormLabel>
                <NumberInput
                  name="height"
                  value={formData.height}
                  min={100}
                  max={250}
                  size="lg"
                  onChange={(value) => setFormData(prev => ({ ...prev, height: value }))}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
          </Box>

          {/* Daily Goals Section */}
          <Box>
            <Heading size="md" color="teal.500" mb={4}>Daily Goals</Heading>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={4} flexWrap="wrap">
              <FormControl minW="200px">
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Sleep (hours)</FormLabel>
                <NumberInput
                  name="sleep"
                  value={formData.goals.sleep}
                  min={4}
                  max={12}
                  step={0.5}
                  size="lg"
                  onChange={(value) => handleGoalChange({ target: { name: 'sleep', value } })}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl minW="200px">
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Water (L)</FormLabel>
                <NumberInput
                  name="water"
                  value={formData.goals.water}
                  min={1}
                  max={10}
                  step={0.25}
                  size="lg"
                  onChange={(value) => handleGoalChange({ target: { name: 'water', value } })}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl minW="200px">
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Exercise (min)</FormLabel>
                <NumberInput
                  name="exercise"
                  value={formData.goals.exercise}
                  min={10}
                  max={180}
                  step={5}
                  size="lg"
                  onChange={(value) => handleGoalChange({ target: { name: 'exercise', value } })}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl minW="200px">
                <FormLabel fontSize="sm" fontWeight="600" color={textColor}>Meals</FormLabel>
                <NumberInput
                  name="meals"
                  value={formData.goals.meals}
                  min={1}
                  max={6}
                  size="lg"
                  onChange={(value) => handleGoalChange({ target: { name: 'meals', value } })}
                >
                  <NumberInputField borderRadius="lg" focusBorderColor="teal.800"
                  borderColor="teal.600" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
          </Box>

          <Button
            type="submit"
            size="lg"
            fontSize="md"
            fontWeight="600"
            borderRadius="lg"
            colorScheme="teal"
            _hover={{ 
              transform: 'translateY(-2px)', 
              boxShadow: 'lg' 
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
            width="full"
            isLoading={isLoading}
            loadingText="Registering..."
            mt={4}
          >
            Create Account
          </Button>
          
          <Flex justify="center" fontSize="sm" mt={4}>
            <Text color="gray.500">Already have an account?{' '}</Text>
            <Link 
              as={RouterLink} 
              to="/login"
              color="teal.500"
              fontWeight="600"
              _hover={{ textDecoration: 'underline' }}
              ml={1}
            >
              Sign In
            </Link>
          </Flex>
        </Stack>
      </form>
    </MotionBox>
  );
}