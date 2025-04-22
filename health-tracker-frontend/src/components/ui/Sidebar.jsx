import { Box, Flex, Link, VStack, Icon, Text, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaPlusCircle, FaUser } from 'react-icons/fa';

const NavLink = ({ icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeBg = useColorModeValue('teal.50', 'teal.900');
  const activeColor = useColorModeValue('teal.600', 'teal.200');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const iconSize = useBreakpointValue({ base: '1.2rem', md: '1.4rem' });

  return (
    <Link
      as={RouterLink}
      to={to}
      w="full"
      p={3}
      borderRadius="lg"
      bg={isActive ? activeBg : 'transparent'}
      color={isActive ? activeColor : 'inherit'}
      position="relative"
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
        transform: 'translateX(4px)'
      }}
      transition="all 0.2s cubic-bezier(.4,0,.2,1)"
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        bg: isActive ? 'teal.400' : 'transparent',
        borderRadius: 'full'
      }}
    >
      <Flex align="center" ml={2}>
        <Icon 
          as={icon} 
          boxSize={iconSize}
          mr={{ base: 2, md: 3 }}
          opacity={0.9}
        />
        <Text 
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={isActive ? '600' : '500'}
        >
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

export default function Sidebar() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const shadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Box
      as="aside"
      w={{ base: 'full', md: '260px' }}
      h={{ base: 'auto', md: 'calc(100vh - 64px)' }}
      borderRight={{ md: '1px' }}
      borderColor={borderColor}
      bg={bg}
      pos={{ md: 'fixed' }}
      boxShadow={{ base: shadow, md: 'none' }}
      zIndex="sticky"
    >
      <VStack 
        align="flex-start" 
        spacing={1} 
        p={{ base: 2, md: 4 }}
        position={{ md: 'sticky' }}
        top={{ md: 4 }}
      >
        {/* Branding Header */}
        <Flex 
          w="full" 
          align="center" 
          mb={{ base: 2, md: 4 }} 
          px={3} 
          display={{ base: 'none', md: 'flex' }}
        >
          <Text fontSize="xl" fontWeight="700" color="teal.500">
            
          </Text>
        </Flex>

        {/* Navigation Links */}
        <NavLink icon={FaHome} to="/">
          Dashboard
        </NavLink>
        <NavLink icon={FaPlusCircle} to="/habits">
          Log Habits
        </NavLink>
        <NavLink icon={FaUser} to="/profile">
          Profile
        </NavLink>
        {/* <NavLink icon={FaChartLine} to="/stats">
        </NavLink> */}

        {/* Mobile Footer */}
        <Flex 
          mt={{ base: 4, md: 8 }} 
          w="full" 
          display={{ md: 'none' }}
          justify="center"
          color="gray.500"
        >
          <Text fontSize="xs">v1.0.0</Text>
        </Flex>
      </VStack>
    </Box>
  );
}