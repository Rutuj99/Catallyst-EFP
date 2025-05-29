import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  VStack,
  Heading,
  useToast,
  Card,
  CardBody,
  Text
} from '@chakra-ui/react';
import axios from 'axios';

const EmployeeFeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedback: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.feedback.trim()) {
      toast({
        title: 'Error',
        description: 'Feedback text is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!formData.category) {
      toast({
        title: 'Error',
        description: 'Please select a category',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await axios.post('/feedback', formData);
      
      // Reset form
      setFormData({
        feedback: '',
        category: ''
      });
      
      toast({
        title: 'Success',
        description: 'Your feedback has been submitted anonymously',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={8}>
      <Card maxW="600px" mx="auto" boxShadow="lg">
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" mb={2}>Submit Feedback</Heading>
              <Text color="gray.600">Your feedback is anonymous and helps us improve</Text>
            </Box>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Your Feedback</FormLabel>
                  <Textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    size="lg"
                    rows={6}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Select category"
                  >
                    <option value="Work Environment">Work Environment</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Growth">Growth</option>
                    <option value="Others">Others</option>
                  </Select>
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  mt={4}
                >
                  Submit Feedback
                </Button>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default EmployeeFeedbackForm;