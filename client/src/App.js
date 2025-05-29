import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import EmployeeFeedbackForm from './components/EmployeeFeedbackForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Box maxW="1200px" mx="auto" p={4}>
          <Routes>
            <Route path="/" element={<EmployeeFeedbackForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;