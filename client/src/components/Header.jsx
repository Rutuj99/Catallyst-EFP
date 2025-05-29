import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Button, Link } from '@chakra-ui/react';

const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <Box bg="blue.600" px={4} py={3} color="white">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Heading as="h1" size="lg">
          Employee Feedback Portal
        </Heading>
        <Box>
          {isAdmin ? (
            <Link as={RouterLink} to="/">
              <Button colorScheme="whiteAlpha" size="sm">
                Employee View
              </Button>
            </Link>
          ) : (
            <Link as={RouterLink} to="/admin">
              <Button colorScheme="whiteAlpha" size="sm">
                Admin Dashboard
              </Button>
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;