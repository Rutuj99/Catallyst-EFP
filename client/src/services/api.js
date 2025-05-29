import axios from 'axios';

// Set baseURL directly for PC
// const api = axios.create({
//   baseURL: 'http://localhost:5000' 
// });


// Hosted on render 
const api = axios.create({
  baseURL: 'https://catallyst-efp.onrender.com' 
});

// Feedback API functions
export const feedbackApi = {
  getAllFeedback: (category) => {
    const url = category ? `/feedback?category=${encodeURIComponent(category)}` : '/feedback';
    return api.get(url);
  },

  submitFeedback: (feedbackData) => {
    return api.post('/feedback', feedbackData);
  },

  markAsReviewed: (id) => {
    return api.patch(`/feedback/${id}/reviewed`);
  },

  deleteFeedback: (id) => {
    return api.delete(`/feedback/${id}`);
  }
};

export default api;
