# Catallyst- Employee Feedback Portal
A simple web application where employees can submit anonymous feedback, and an admin can view and categorize the feedback.

Deployed Link -  https://catallyst-efp.vercel.app/

![image](https://github.com/user-attachments/assets/f55e07a0-1d48-419b-aea5-d317c82d6764)

![image](https://github.com/user-attachments/assets/03392f75-f8aa-4c4a-b9f8-a470e998fa03)







## Features Implemented

### Employee Side
- Anonymous feedback submission form
- Category selection (Work Environment, Leadership, Growth, Others)
- No login required for submission

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

### Prerequisites
- Node.js and npm installed
- MongoDB account (connection string is already configured)

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the server:
```bash
# In the server directory
npm start
```

4. Start the client:
```bash
# In the client directory
npm start
```

5. Access the application:
   - Employee portal: http://localhost:3000
   - Admin portal: http://localhost:3000/admin

## Assumptions Made

- No authentication is required for the admin portal in this simple version
- The application uses a shared MongoDB database
- The application is for internal use within a company
- All feedback is treated as anonymous
- The admin has full access to all feedback entries
