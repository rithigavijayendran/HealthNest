import { Box, Flex, Grid, Heading, Spinner, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HealthGlobe from '../components/dashboard/HealthGlobe';
import HabitRadar from '../components/dashboard/HabitRadar';
import TrendPrediction from '../components/dashboard/TrendPrediction';
import StreakCounter from '../components/habits/StreakCounter';
import { getHealthScore, getTrendPrediction } from '../store/habitsSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { healthScore, trend, isLoading } = useSelector(state => state.habits);
  const { user } = useSelector(state => state.auth);
  const cardBg = useColorModeValue('white', 'gray.700');
  const headerBorder = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    dispatch(getHealthScore());
    dispatch(getTrendPrediction());
  }, [dispatch]);

  return (
    <Box maxW="1200px" mx="auto" p={1} mb={2} ml={8}>
      {/* Dashboard Header */}
      <Flex 
        justify="space-between" 
        align="center" 
        mb={4}
        p={4}
        bg={cardBg}
        borderRadius="2xl"
        boxShadow="xl"
        borderBottomWidth="2px"
        borderColor={headerBorder}
      >
        <Heading size="xl" color="teal.600">
          Health Dashboard
        </Heading>
        <StreakCounter streak={user?.streak || 0} />
      </Flex>

      {/* Main Content */}
      <Grid 
        templateColumns={{ base: '1fr', md: '1.2fr 0.8fr' }} 
        gap={6}
        mb={6}
      >
        {/* Health Visualization Section */}
        <Box 
          bg={cardBg}
          p={6}
          borderRadius="2xl"
          boxShadow="md"
          _hover={{ transform: 'translateY(-2px)', transition: 'all 0.3s' }}
        >
          <Heading size="lg" mb={6} color="teal.500">
            Wellness Overview
          </Heading>
          {isLoading ? (
            <Skeleton height="400px" borderRadius="xl" />
          ) : (
            <HealthGlobe score={healthScore?.score || 0} />
          )}
        </Box>

        {/* Habit Breakdown Section */}
        <Box 
          bg={cardBg}
          p={6}
          borderRadius="2xl"
          boxShadow="md"
          _hover={{ transform: 'translateY(-2px)', transition: 'all 0.3s' }}
        >
          <Heading size="lg" mb={6} color="teal.500">
            Habit Analysis
          </Heading>
          {isLoading ? (
            <Skeleton height="400px" borderRadius="xl" />
          ) : (
            <HabitRadar breakdown={healthScore?.breakdown} />
          )}
        </Box>
      </Grid>

      {/* Trend Prediction Section */}
      <Box 
        bg={cardBg}
        p={6}
        borderRadius="2xl"
        boxShadow="xl"
        _hover={{ transform: 'translateY(-2px)', transition: 'all 0.3s' }}
      >
        <Flex align="center" mb={6} gap={3}>
          <Heading size="lg" color="teal.500">
            Future Trends
          </Heading>
          <Box fontSize="sm" color="gray.500" fontStyle="italic">
            Next 30 days prediction
          </Box>
        </Flex>
        {isLoading ? (
          <Skeleton height="200px" borderRadius="xl" />
        ) : (
          <TrendPrediction trend={trend} />
        )}
      </Box>
    </Box>
  );
}