import {
  Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Select, Stack, useToast, Flex, IconButton, Text, Tag, TagLabel, TagCloseButton,
  Grid, GridItem, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, Alert, AlertIcon
} from '@chakra-ui/react';
import { FaPlus, FaMicrophone, FaUtensils, FaAppleAlt, FaRegClock, FaHeartbeat, FaTrash } from 'react-icons/fa';
import { addHabit } from '../../store/habitsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
export default function HabitInput() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sleep, setSleep] = useState('');
  const [water, setWater] = useState('');
  const [exercise, setExercise] = useState({ type: 'cardio', duration: '', intensity: 5 });
  const [meals, setMeals] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [mealTime, setMealTime] = useState('');
  const [isHealthy, setIsHealthy] = useState(true);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!sleep && !water && meals.length === 0 && !exercise.duration) {
      toast({
        title: 'No data to save',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    const habitData = {
      date: new Date(date),
      sleep: sleep ? parseInt(sleep) : undefined,
      water: water ? parseInt(water) : undefined,
      meals: meals.length > 0 ? meals : undefined,
      exercise: exercise.duration ? {
        type: exercise.type,
        duration: parseInt(exercise.duration),
        intensity: parseInt(exercise.intensity)
      } : undefined
    };
    
    dispatch(addHabit(habitData))
      .unwrap()
      .then(() => {
        toast({
          title: 'Habits saved',
          description: 'Your daily habits have been recorded',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        });
        // Reset form but keep date
        setSleep('');
        setWater('');
        setExercise({ type: 'cardio', duration: '', intensity: 5 });
        setMeals([]);
      })
      .catch(err => {
        toast({
          title: 'Error saving habits',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes('sleep')) {
          const hours = transcript.match(/\d+/);
          if (hours) setSleep(hours[0]);
        } else if (transcript.includes('water') || transcript.includes('drink')) {
          const liters = transcript.match(/\d+/);
          if (liters) setWater(liters[0]);
        } else if (transcript.includes('exercise') || transcript.includes('workout')) {
          const mins = transcript.match(/\d+/);
          if (mins) setExercise(prev => ({ ...prev, duration: mins[0] }));
        } else if (transcript.includes('meal') || transcript.includes('ate')) {
          const healthy = !transcript.includes('unhealthy');
          const type = transcript.includes('breakfast') ? 'breakfast' :
                      transcript.includes('lunch') ? 'lunch' :
                      transcript.includes('dinner') ? 'dinner' : 'snack';
          setMeals(prev => [...prev, {
            type,
            healthy,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      toast({
        title: 'Speech recognition not supported',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addMealWithDialog = (type) => {
    setSelectedMealType(type);
    onOpen();
  };

  const confirmMeal = () => {
    addMeal(selectedMealType, isHealthy);
    setMealTime('');
    setIsHealthy(true);
    onClose();
  };

  // Modified addMeal function to include custom time
  const addMeal = (type, healthy) => {
    setMeals(prev => [...prev, {
      type,
      healthy,
      time: mealTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <Box 
      p={4}
      borderRadius="2xl" 
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="xl"
      width="200%"
      maxW="1000px"
      mx="auto"
      my={8}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} color={useColorModeValue('teal.600', 'teal.200')} textAlign="center">
        Daily Health Tracker 🏋️
      </Text>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Date Input */}
          <GridItem colSpan={2}>
            <FormControl>
              <Flex align="center" gap={2} mb={2}>
                <FaRegClock />
                <FormLabel mb={0}>Date</FormLabel>
              </Flex>
              <Input
                type="date"
                value={date}
                size="md"
                onChange={(e) => setDate(e.target.value)}
                borderRadius="lg"
                focusBorderColor={useColorModeValue('teal.500', 'teal.200')}
                borderColor={useColorModeValue('teal.400', 'teal.200')}
              />
            </FormControl>
          </GridItem>

          {/* Sleep & Water */}
          <GridItem>
            <FormControl>
              <Flex align="center" gap={2} mb={2}>
                <Text>🌙</Text>
                <FormLabel mb={0}>Sleep (hours)</FormLabel>
              </Flex>
              <NumberInput value={sleep} min={0} max={12} size="md" onChange={(valueString) => setSleep(valueString)}  focusBorderColor={useColorModeValue('teal.500', 'teal.200')}
                borderColor={useColorModeValue('teal.400', 'teal.200')}>
                <NumberInputField placeholder="0-12" borderRadius="lg" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <Flex align="center" gap={2} mb={2}>
                <Text>💧</Text>
                <FormLabel mb={0}>Water (liters)</FormLabel>
              </Flex>
              <NumberInput value={water} min={0} max={10} step={0.25} size="md" onChange={(valueString) => setWater(valueString)}  focusBorderColor={useColorModeValue('teal.500', 'teal.200')}
                borderColor={useColorModeValue('teal.400', 'teal.200')} >
                <NumberInputField placeholder="0-10" borderRadius="lg" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>

          {/* Meals Section */}
          <GridItem colSpan={2}>
            <Box borderWidth="1px" borderRadius="xl" p={4} borderColor={useColorModeValue('teal.400', 'teal.200')}
  bg={useColorModeValue('white', 'gray.700')}>
              <Flex justify="space-between" mb={4}>
                <Flex align="center" gap={2}>
                  <FaAppleAlt />
                  <Text fontWeight="600">Meals</Text>
                </Flex>
                <Flex gap={2}>
                  {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                    <Button
                      key={meal}
                      size="sm"
                      onClick={() => addMealWithDialog(meal.toLowerCase())}
                    >
                      {meal}
                    </Button>
                  ))}
                </Flex>
              </Flex>

              {meals.length > 0 ? (
                <Flex wrap="wrap" gap={2}>
                  {meals.map((meal, i) => (
                    <Tag
                      key={i}
                      size="md"
                      colorScheme={meal.healthy ? 'green' : 'red'}
  variant={useColorModeValue('subtle', 'solid')}
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      <TagLabel>
                        {meal.type} @ {meal.time}
                      </TagLabel>
                      <TagCloseButton onClick={() => removeMeal(i)} />
                    </Tag>
                  ))}
                </Flex>
              ) : (
                <Alert status="info" borderRadius="lg" variant={useColorModeValue('subtle', 'solid')}>
                  <AlertIcon />
                  No meals logged yet
                </Alert>
              )}
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Box p={4} borderRadius="xl" bg={useColorModeValue('blue.50', 'gray.700')} 
  borderWidth="1px" 
  borderColor={useColorModeValue('blue.100', 'gray.600')} >
              <FormLabel display="flex" alignItems="center" gap={2} mb={4} fontSize="lg">
                🏋️ Exercise Tracking
              </FormLabel>
              
              <Grid 
                templateColumns={{ 
                  base: '1fr', 
                  md: 'repeat(3, 1fr)'
                }} 
                gap={4}
                alignItems="end"
              >
                {/* Exercise Name Input */}
                <FormControl>
                  <FormLabel>Exercise Name</FormLabel>
                  <Input
                    placeholder="e.g., Running, Weightlifting"
                    value={exercise.name}
                    onChange={(e) => setExercise(prev => ({ ...prev, name: e.target.value }))}
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="teal.600"
                borderColor="teal.400"
                  />
                </FormControl>

                {/* Duration Input */}
                <FormControl>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <NumberInput 
                    value={exercise.duration} 
                    min={0} 
                    max={300}
                    onChange={(value) => setExercise(prev => ({ ...prev, duration: value }))}
                    
                  >
                    <NumberInputField 
                      placeholder="0-300" 
                      size="lg" 
                      borderRadius="lg"
                      focusBorderColor="teal.600"
                borderColor="teal.400"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="teal.600" />
                      <NumberDecrementStepper color="teal.600" />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                {/* Intensity Input */}
                <FormControl>
                  <FormLabel>Intensity (1-10)</FormLabel>
                  <NumberInput 
                    value={exercise.intensity} 
                    min={1} 
                    max={10}
                    onChange={(value) => setExercise(prev => ({ ...prev, intensity: value }))}
                  >
                    <NumberInputField 
                      placeholder="1-10" 
                      size="lg" 
                      borderRadius="lg"
                      focusBorderColor="teal.600"
                borderColor="teal.400"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="teal.600" />
                      <NumberDecrementStepper color="teal.600" />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Grid>
            </Box>
          </GridItem>

        </Grid>

        {/* Action Buttons */}
        <Flex 
          justify="space-between" 
          mt={8} 
          gap={4} 
          maxW="1200px" 
          mx="auto"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <IconButton
            icon={<FaMicrophone />}
            aria-label="Voice input"
            colorScheme={isListening ? 'red' : 'teal'}
            onClick={startListening}
            isLoading={isListening}
            size="lg"
            borderRadius="xl"
            boxShadow="md"
            width={{ base: '100%', md: 'auto' }}
          />

          <Button 
            type="submit" 
            colorScheme="teal"
            size="lg"
            px={8}
            borderRadius="xl"
            boxShadow="md"
            isDisabled={!sleep && !water && meals.length === 0 && !exercise.duration}
            _hover={{ transform: 'scale(1.05)' }}
            width={{ base: '100%', md: 'auto' }}
          >
            Save Daily Habits
          </Button>
        </Flex>
      </form>
      {/* Meal Dialog */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" bg={useColorModeValue('white', 'gray.800')}>
          <ModalHeader>Add {selectedMealType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Meal Time</FormLabel>
              <Input
                type="time"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                size="lg"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Meal Type</FormLabel>
              <Flex gap={3}>
                <Button
                  flex={1}
                  colorScheme={isHealthy ? 'green' : 'gray'}
                  onClick={() => setIsHealthy(true)}
                  leftIcon={<FaHeartbeat />}
                >
                  Healthy
                </Button>
                <Button
                  flex={1}
                  colorScheme={!isHealthy ? 'red' : 'gray'}
                  onClick={() => setIsHealthy(false)}
                  leftIcon={<FaAppleAlt />}
                >
                  Unhealthy
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={confirmMeal}>
              Add Meal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}