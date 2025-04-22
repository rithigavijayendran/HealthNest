import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Heading, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const MotionBox = motion(Box);

export default function HabitRadar({ breakdown }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const gridColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');
  const teal = useColorModeValue('teal.400', 'teal.200');

  if (!breakdown) return null;

  const data = {
    labels: ['Sleep', 'Water', 'Nutrition', 'Exercise', 'Consistency'],
    datasets: [
      {
        label: 'Your Scores',
        data: [
          breakdown.sleep,
          breakdown.water,
          breakdown.nutrition,
          breakdown.exercise,
          breakdown.consistency
        ],
        backgroundColor: useColorModeValue('rgba(76, 175, 80, 0.2)', 'rgba(129, 199, 132, 0.2)'),
        borderColor: teal,
        borderWidth: 2,
        pointBackgroundColor: teal,
        pointHoverRadius: 6,
        tension: 0.3
      },
      {
        label: 'Goal',
        data: [100, 100, 100, 100, 50],
        backgroundColor: 'transparent',
        borderColor: useColorModeValue('rgba(244, 67, 54, 0.4)', 'rgba(239, 83, 80, 0.4)'),
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
          color: gridColor
        },
        angleLines: {
          color: gridColor
        },
        pointLabels: {
          color: textColor,
          font: {
            size: isMobile ? 12 : 14,
            weight: '500'
          }
        },
        ticks: {
          display: false,
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          padding: 16,
          font: {
            size: 14,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: useColorModeValue('white', 'gray.800'),
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: borderColor,
        borderWidth: 1,
        bodyFont: {
          size: 14,
          weight: '500'
        },
        padding: 12
      }
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      bg={cardBg}
      p={6}
      borderRadius="2xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      h={{ base: '400px', md: '400px' }}
      w="full"
      maxW="100%"
      minW={{ md: '600px' }}
      overflow="hidden"
      position="relative"
    >
      <Heading 
        size="md" 
        mb={4}
        textAlign="center"
        bgGradient="linear(to-r, teal.400, blue.500)"
        bgClip="text"
        fontWeight="600"
        fontSize="xl"
      >
        Habit Breakdown
      </Heading>
      <Box 
        h="calc(100% - 52px)"
        w="full"
        position="relative"
      >
        <Radar 
          data={data} 
          options={options} 
          updateMode="resize"
        />
      </Box>
    </MotionBox>
  );
}