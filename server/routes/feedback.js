const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /feedback - Submit feedback
router.post('/', async (req, res) => {
  try {
    const { feedback, category } = req.body;
    
    if (!feedback || !category) {
      return res.status(400).json({ message: 'Feedback text and category are required' });
    }
    
    const newFeedback = new Feedback({
      feedback,
      category
    });
    
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// GET /feedback - Get all feedback with filter
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const feedbackList = await Feedback.find(query).sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

// PATCH Mark feedback as reviewed on the basis of the id
router.patch('/:id/reviewed', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { reviewed: true },
      { new: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
});

module.exports = router;