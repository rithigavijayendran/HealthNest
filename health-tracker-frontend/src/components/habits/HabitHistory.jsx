import { 
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, 
  Progress, Tooltip, Icon, useColorModeValue, Skeleton, Flex
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useGetHabitsQuery } from '../../store/habitsSlice';

export default function HabitHistory() {
  const { data: habits, isLoading } = useGetHabitsQuery();
  const headerBg = useColorModeValue('teal.500', 'teal.700');
  const rowHover = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      p={6}
      borderRadius="2xl"
      bg={bgColor}
      boxShadow="xl"
      maxW="1000px"
      mx="auto"
      my={8}
    >
      <Text 
        fontSize="2xl" 
        fontWeight="bold" 
        mb={6} 
        color={useColorModeValue('teal.600', 'teal.200')}
      >
        Habit History 📅
      </Text>

      {isLoading ? (
        <Box>
          {[...Array(5)].map((_, i) => (
            <Skeleton 
              key={i} 
              h="40px" 
              mb={2} 
              borderRadius="lg"
              startColor={useColorModeValue('gray.100', 'gray.700')}
              endColor={useColorModeValue('gray.200', 'gray.600')}
            />
          ))}
        </Box>
      ) : !habits || habits.length === 0 ? (
        <Text 
          fontSize="lg" 
          color={useColorModeValue('gray.500', 'gray.400')} 
          textAlign="center" 
          py={8}
        >
          No habits recorded yet. Start tracking your progress! 🚀
        </Text>
      ) : (
        <Box 
          overflowX="auto" 
          borderRadius="xl" 
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Table variant="simple" size="md">
            <Thead bg={headerBg}>
              <Tr>
                <Th color="white" borderTopLeftRadius="xl">Date</Th>
                <Th isNumeric color="white">Sleep 😴</Th>
                <Th isNumeric color="white">Water 💧</Th>
                <Th isNumeric color="white">Exercise 🏋️</Th>
                <Th color="white" borderTopRightRadius="xl">
                  <Flex align="center" gap={2}>
                    Nutrition 🥗
                    <Tooltip label="Healthy meals / Total meals">
                      <Icon as={FiInfo} w={4} h={4} color="whiteAlpha.800" />
                    </Tooltip>
                  </Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {habits.map((habit) => (
                <Tr 
                  key={habit._id} 
                  _hover={{ bg: rowHover }}
                  transition="background 0.2s"
                >
                  <Td fontWeight="500" color={textColor}>
                    {new Date(habit.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Td>
                  <Td isNumeric fontFamily="mono" color={textColor}>
                    {habit.sleep?.toFixed(1) || '-'}
                  </Td>
                  <Td isNumeric fontFamily="mono" color={textColor}>
                    {habit.water?.toFixed(1) || '-'}
                  </Td>
                  <Td isNumeric fontFamily="mono" color={textColor}>
                    {habit.exercise?.duration || '-'}
                  </Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Text fontFamily="mono" flexShrink={0} color={textColor}>
                        {habit.meals?.filter(m => m.healthy).length || 0}/{habit.meals?.length || 0}
                      </Text>
                      {habit.meals?.length > 0 && (
                        <Progress 
                          value={(habit.meals.filter(m => m.healthy).length / habit.meals.length) * 100}
                          flex={1}
                          size="sm"
                          borderRadius="full"
                          colorScheme={useColorModeValue('teal', 'teal')}
                          bg={useColorModeValue('teal.50', 'teal.800')}
                        />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}