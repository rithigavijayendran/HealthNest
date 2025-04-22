import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';
import { refreshToken } from './store/authSlice';

function App() {
  const { accessToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedRefreshToken && !storedAccessToken) {
      dispatch(refreshToken(storedRefreshToken));
    } else if (storedAccessToken) {
      dispatch({
        type: 'auth/setTokens',
        payload: {
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken
        }
      });
    }
  }, [dispatch]);

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />

      <Flex>
        {accessToken && <Sidebar />}
        <Box 
          flex={1} 
          ml={{ base: 0, md: accessToken ? '250px' : 0 }} 
          p={4}
        >
          <Routes>
            <Route path="/" element={accessToken ? <Dashboard /> : <Navigate to="/login" state={{ from: location }} />} />
            <Route path="/habits" element={accessToken ? <Habits /> : <Navigate to="/login" state={{ from: location }} />} />
            <Route path="/profile" element={accessToken?<Profile />:<Navigate to="/"/>} />
            <Route path="/login" element={!accessToken ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!accessToken ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
