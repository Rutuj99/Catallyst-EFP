import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  HStack,
  Text,
  useToast,
  Flex,
  IconButton,
  Tooltip,
  Card,
  CardBody,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { feedbackApi } from '../services/api';

const AdminDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const toast = useToast();

  // Fetch feedback data
  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await feedbackApi.getAllFeedback(selectedCategory);
      setFeedbackList(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to load feedback data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const markAsReviewed = async (id) => {
    try {
      await feedbackApi.markAsReviewed(id);
      setFeedbackList(prevList =>
        prevList.map(item =>
          item._id === id ? { ...item, reviewed: true } : item
        )
      );
      toast({
        title: 'Success',
        description: 'Feedback marked as reviewed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error marking feedback as reviewed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update feedback status',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await feedbackApi.deleteFeedback(id);
        setFeedbackList(prevList => prevList.filter(item => item._id !== id));
        toast({
          title: 'Success',
          description: 'Feedback deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting feedback:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete feedback',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box py={8}>
      <Card boxShadow="lg">
        <CardBody>
          <Heading size="lg" mb={6}>Admin Dashboard</Heading>

          <Flex justify="space-between" align="center" mb={6}>
            <HStack>
              <Text fontWeight="medium">Filter by Category:</Text>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="All Categories"
                w="200px"
              >
                <option value="Work Environment">Work Environment</option>
                <option value="Leadership">Leadership</option>
                <option value="Growth">Growth</option>
                <option value="Others">Others</option>
              </Select>
            </HStack>

            <Text fontWeight="medium">
              Total: {feedbackList.length} feedback entries
            </Text>
          </Flex>

          {loading ? (
            <Flex justify="center" py={10}>
              <Spinner size="xl" color="blue.500" />
            </Flex>
          ) : error ? (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          ) : feedbackList.length === 0 ? (
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              No feedback entries found.
            </Alert>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Feedback</Th>
                    <Th>Category</Th>
                    <Th>Submitted</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {feedbackList.map((item) => (
                    <Tr key={item._id}>
                      <Td maxW="400px" whiteSpace="normal">{item.feedback}</Td>
                      <Td>
                        <Badge colorScheme={
                          item.category === 'Work Environment' ? 'green' :
                          item.category === 'Leadership' ? 'purple' :
                          item.category === 'Growth' ? 'blue' : 'gray'
                        }>
                          {item.category}
                        </Badge>
                      </Td>
                      <Td>{formatDate(item.createdAt)}</Td>
                      <Td>
                        <Badge colorScheme={item.reviewed ? 'green' : 'yellow'}>
                          {item.reviewed ? 'Reviewed' : 'Pending'}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          {!item.reviewed && (
                            <Tooltip label="Mark as Reviewed">
                              <IconButton
                                icon={<CheckIcon />}
                                colorScheme="green"
                                size="sm"
                                onClick={() => markAsReviewed(item._id)}
                                aria-label="Mark as reviewed"
                              />
                            </Tooltip>
                          )}
                          <Tooltip label="Delete Feedback">
                            <IconButton
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => deleteFeedback(item._id)}
                              aria-label="Delete feedback"
                            />
                          </Tooltip>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
