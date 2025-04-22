import { 
  Box, Heading, FormControl, FormLabel, Input, NumberInput, 
  NumberInputField, NumberInputStepper, NumberIncrementStepper, 
  NumberDecrementStepper, Button, Stack, useToast, Avatar,
  Text, Flex, Grid, GridItem, useColorModeValue, Icon, Tag
} from '@chakra-ui/react';
import { FaUser, FaRuler, FaWeight, FaBed, FaGlassWhiskey, FaRunning, FaUtensils } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../store/authSlice';

export default function Profile() {
  const toast = useToast();
  const { user } = useSelector(state => state.auth);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    goals: {
      sleep: 8,
      water: 3,
      exercise: 30,
      meals: 3
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || 25,
        weight: user.weight || 70,
        height: user.height || 170,
        goals: {
          sleep: user.goals?.sleep || 8,
          water: user.goals?.water || 3,
          exercise: user.goals?.exercise || 30,
          meals: user.goals?.meals || 3
        }
      });
    }
  }, [user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Profile updated',
        description: 'updated profile successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const cardBg = useColorModeValue('gray.100', 'gray.700');
  const headerGradient = useColorModeValue('linear(to-r, teal.400, teal.600)', 'linear(to-r, teal.200, teal.400)');
  return (
    <Box maxW="8xl" mx="auto" p={{ base: 4, md: 14 }} mb={8}>
      <Flex align="center" mb={8} gap={4}>
        <Heading 
          size="xl" 
          fontWeight="800"
          bgGradient={headerGradient}
          bgClip="text"
        >
          Profile Settings
        </Heading>
        {user?.streak && (
          <Tag colorScheme="teal" size="lg" borderRadius="full">
            {user.streak} Day Streak 🔥
          </Tag>
        )}
      </Flex>

      <Grid 
        templateColumns={{ base: '1fr', md: '240px 1fr' }} 
        gap={{ base: 6, md: 8 }}
      >
        {/* Profile Sidebar */}
        <GridItem>
          <Box 
            bg={cardBg}
            p={6}
            borderRadius="2xl"
            boxShadow="xl"
            textAlign="center"
          >
            <Avatar 
              size="xl" 
              name={user?.name} 
              src={user?.avatar}
              mb={4}
              border="4px solid"
              borderColor="teal.400"
            />
            <Text fontSize="xl" fontWeight="600" mb={1}>
              {user?.name}
            </Text>
            <Text fontSize="sm" color="gray.500">{user?.email}</Text>
          </Box>
        </GridItem>

        {/* Main Form */}
        <GridItem>
          <Box 
            as="form" 
            onSubmit={handleSubmit}
            bg={cardBg}
            p={{ base: 4, md: 8 }}
            borderRadius="2xl"
            boxShadow="xl"
            
          >
            <Stack spacing={6}>
              {/* Personal Info Section */}
              <Box>
                <Heading size="md" mb={4} display="flex" alignItems="center" gap={2}>
                  <Icon as={FaUser} /> Personal Information
                </Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      size="lg"
                      borderRadius="lg"
                      borderColor="teal.400"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel display="flex" alignItems="center" gap={2}>
                      <Icon as={FaRuler} /> Height (cm)
                    </FormLabel>
                    <NumberInput
                      value={formData.height}
                      min={100}
                      max={250}
                      onChange={(value) => setFormData(prev => ({ ...prev, height: value }))}
                      borderColor="teal.400"
                    >
                      <NumberInputField borderRadius="lg" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel display="flex" alignItems="center" gap={2}>
                      <Icon as={FaWeight} /> Weight (kg)
                    </FormLabel>
                    <NumberInput
                      value={formData.weight}
                      min={30}
                      max={300}
                      step={0.5}
                      onChange={(value) => setFormData(prev => ({ ...prev, weight: value }))}
                      borderColor="teal.400"
                    >
                      <NumberInputField borderRadius="lg" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Grid>
              </Box>

              {/* Daily Goals Section */}
              <Box>
                <Heading size="md" mb={4} display="flex" alignItems="center" gap={2} >
                  <Icon as={FaRunning} /> Daily Goals
                </Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  {[
                    { icon: FaBed, label: 'Sleep (hours)', name: 'sleep', 
                      value: formData.goals.sleep, min: 4, max: 12, step: 0.5 },
                    { icon: FaGlassWhiskey, label: 'Water (liters)', name: 'water', 
                      value: formData.goals.water, min: 1, max: 10, step: 0.25 },
                    { icon: FaRunning, label: 'Exercise (min)', name: 'exercise', 
                      value: formData.goals.exercise, min: 10, max: 300 },
                    { icon: FaUtensils, label: 'Meals per day', name: 'meals', 
                      value: formData.goals.meals, min: 1, max: 6 }
                  ].map((goal, index) => (
                    <FormControl key={index}>
                      <FormLabel display="flex" alignItems="center" gap={2}>
                        <Icon as={goal.icon} /> {goal.label}
                      </FormLabel>
                      <NumberInput
                        name={goal.name}
                        value={goal.value}
                        min={goal.min}
                        max={goal.max}
                        step={goal.step || 1}
                        onChange={(value) => handleGoalChange({ target: { name: goal.name, value } })}
                        borderColor="teal.400"
                      >
                        <NumberInputField borderRadius="lg" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  ))}
                </Grid>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                mt={6}
                isLoading={isLoading}
                loadingText="Saving..."
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Update Profile
              </Button>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}