import { Flex, Box, Heading, Button, useColorMode, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue } from '@chakra-ui/react';
import { FaMoon, FaSun, FaSignOutAlt, FaUserCog, FaBars } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex 
      as="nav" 
      align="center"
      justify="space-between"
      p={{ base: 3, md: 4 }}
      px={{ base: 4, md: 8 }}
      bg={colorMode === 'light' ? 'teal.500' : 'teal.700'}
      color="white"
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex align="center">
        <Heading 
          as={RouterLink} 
          to="/" 
          size={{ base: 'md', md: 'lg' }}
          cursor="pointer"
          fontWeight="700"
          letterSpacing="wide"
        >
          HealthNest
        </Heading>
      </Flex>
      
      <Flex align="center" gap={{ base: 2, md: 2 }}>
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle theme"
          variant="ghost"
          color="white"
          fontSize={{ base: 'md', md: 'lg' }}
          _hover={{ bg: 'rgba(255,255,255,0.1)' }}
          _active={{ bg: 'rgba(255,255,255,0.2)' }}
        />
        
        {user && (
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              p={0}
              _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              _active={{ bg: 'rgba(255,255,255,0.2)' }}
            >
              <Avatar
                size={{ base: 'sm', md: 'md' }}
                name={user.name}
                bg="teal.300"
                color="white"
                fontWeight="600"
              />
            </MenuButton>
            <MenuList 
              color={colorMode === 'light' ? 'gray.800' : 'white'}
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
              boxShadow="xl"
              minW="180px"
            >
              <MenuItem 
                as={RouterLink} 
                to="/profile" 
                icon={<FaUserCog />}
                _hover={{ bg: colorMode === 'light' ? 'teal.50' : 'teal.600' }}
              >
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleLogout} 
                icon={<FaSignOutAlt />}
                _hover={{ bg: colorMode === 'light' ? 'red.50' : 'red.600' }}
                color={colorMode === 'light' ? 'red.500' : 'red.300'}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
}