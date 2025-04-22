import { 
  Box, 
  Heading, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs,
  Flex,
  Icon,
  useColorModeValue,
  Grid
} from '@chakra-ui/react';
import { FaPlusCircle, FaHistory, FaChartLine } from 'react-icons/fa';
import HabitInput from '../components/habits/HabitInput';
import HabitHistory from '../components/habits/HabitHistory';
import { getHabits } from '../store/habitsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Habits() {
  const dispatch = useDispatch();
  const tabBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  return (
    <Grid
      h="100vh"
      w="180vh"
      templateRows="auto 1fr"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      {/* Header */}
      <Flex
        bg="white"
        p={6}
        boxShadow="sm"
        borderBottomWidth="1px"
        borderColor={borderColor}
        align="center"
        justify="space-between"
        ml={4}
      >
        <Heading 
          size="xl" 
          fontWeight="800"
          bgGradient="linear(to-r, teal.400, teal.600)"
          bgClip="text"
        >
          Habit Management Suite
        </Heading>
        <Flex align="center" gap={4}>
          <Icon as={FaChartLine} w={6} h={6} color="teal.500" />
        </Flex>
      </Flex>

      {/* Main Content */}
      <Tabs 
        variant="unstyled"
        isLazy
        h="full"
        display="flex"
        flexDirection="column"
        ml={4}
      >
        <TabList
          px={8}
          pt={4}
          bg={tabBg}
          boxShadow="sm"
          borderBottomWidth="1px"
          borderColor={borderColor}
        >
          <Flex gap={8} mb={4}>
            <Tab 
              _selected={{
                color: 'white',
                bg: 'teal.500',
                boxShadow: 'md',
              }}
              borderRadius="full"
              px={6}
              py={3}
              ml={4}
              fontWeight="500"
              transition="all 0.2s"
            >
              <Flex align="center" gap={2} >
                <Icon as={FaPlusCircle} />
                Daily Entry
              </Flex>
            </Tab>
            <Tab
              _selected={{
                color: 'white',
                bg: 'teal.500',
                boxShadow: 'md',
              }}
              borderRadius="full"
              px={6}
              py={3}
              ml={4}
              fontWeight="500"
              transition="all 0.2s"
            >
              <Flex align="center" gap={2}>
                <Icon as={FaHistory} />
                Progress History
              </Flex>
            </Tab>
          </Flex>
        </TabList>

        <TabPanels flex={1} p={8} overflow="auto">
          <TabPanel h="full" p={0}>
            <Box
              h="full"
              bg="#88d8c0"
              borderRadius="2xl"
              boxShadow="xl"
              p={8}
            >
              <HabitInput />
            </Box>
          </TabPanel>
          <TabPanel h="full" p={0}>
            <Box
              h="full"
              bg="#88d8c0"
              borderRadius="2xl"
              boxShadow="xl"
              overflow="hidden"
            >
              <HabitHistory />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Grid>
  );
}