# Catallyst- Employee Feedback Portal
A simple web application where employees can submit anonymous feedback, and an admin can view and categorize the feedback.

Deployed Link -  https://catallyst-efp.vercel.app/

![image](https://github.com/user-attachments/assets/f55e07a0-1d48-419b-aea5-d317c82d6764)

![image](https://github.com/user-attachments/assets/03392f75-f8aa-4c4a-b9f8-a470e998fa03)

## Tech Stack

- **Frontend**: React.js
- **Styling**: Chakra UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **API Architecture**: RESTful APIs



## Features Implemented

### Employee Side
- Anonymous feedback submission form
- Category selection (Work Environment, Leadership, Growth, Others)

### Admin Side
- View all submitted feedback in a table
- Filter feedback by category
- Mark feedback as reviewed
- Delete feedback

## API Structure

- `POST /feedback` – Submit feedback
- `GET /feedback` – Get all feedback
- `GET /feedback?category=xyz` – Filter by category
- `PATCH /feedback/:id/reviewed` – Mark as reviewed
- `DELETE /feedback/:id` – Delete feedback

## How to Run the App

- The application is deployed on **Vercel**. You can directly access it here: [Frontend Link](https://catallyst-efp.vercel.app/)
- The backend is deployed on **Render**. You can access it here: [Backend Link](https://catallyst-efp.onrender.com/)


## Assumptions Made

- No authentication is required for the admin portal in this simple version
- The application uses a shared MongoDB database
- All feedback is treated as anonymous
- The admin has full access to all feedback entries
