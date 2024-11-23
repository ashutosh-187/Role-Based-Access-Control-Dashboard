# User Management System

A **React-based User Management System** that provides functionality to manage users and roles, with advanced features like search, filter, sort, and bulk actions.

---

## Features

### User Management
- **Add Users**: Create new users with name, email, role, and status
- **Edit Users**: Modify existing user information
- **Delete Users**: Remove individual or multiple users
- **Bulk Actions**: Perform operations on multiple users simultaneously

### Role Management
- **Add Roles**: Create new role with name and permissions
- **Edit Roles**: Modify existing role information
- **Delete roles**: Remove individual or multiple users

### Search and Filter
- Real-time search functionality for names and emails
- Multi-role filtering capability
- Column-based sorting

---

## Tech Stack

### Frontend:
- React (JavaScript)
- Axios (API Client)
- CSS for Styling

### Backend:
- Node.js with Express.js
- MongoDB for Database

---

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or remote)

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/user-management-system.git](https://github.com/ashutosh-187/Role-Based-Access-Control-Dashboard.)
cd Role-Based-Access-Control-Dashboard

```

### 2. Install Dependencies

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd backend
npm install
```

### 3. Configure the Backend
Create a `.env` file in the backend directory:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/user_management
```
Note: Replace `MONGO_URI` with your MongoDB connection string if needed.

### 4. Run the Application

Start the backend:
```bash
cd backend
npm start
```

Start the frontend:
```bash
cd frontend
npm start
```

### 5. Access the Application
Open your browser and visit: `http://localhost:3000`


## Project Structure
```
user-management-system/
│
├── frontend/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js        # Main app entry point
│   │   └── style.css     # Styling
│   └── package.json
│
├── backend/          # Node.js backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── server.js     # Express server setup
│   └── package.json
│
└── README.md         # Project documentation
```

## API Documentation

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/users | Fetch all users |
| POST   | /api/users | Create a new user |
| PUT    | /api/users/:id | Update an existing user |
| DELETE | /api/users/:id | Delete a user |

### Role Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/roles | Fetch all roles |

## Usage Guide

### Managing Users
1. **Adding a User**:
   - Fill in the user form with name, email, role, and status
   - Click "Add User"
     
  
    <img width="1468" alt="Screenshot 2024-11-23 at 9 04 27 PM" src="https://github.com/user-attachments/assets/d8609367-32e7-46b3-ac1a-d03be974a5b8">


2. **Editing a User**:
   - Click the edit button next to the user
   - Update desired fields
   - Save changes
  
     <img width="1468" alt="Screenshot 2024-11-23 at 9 04 39 PM" src="https://github.com/user-attachments/assets/92d016f1-b876-4e25-ba05-763b9aac49fc">


3. **Deleting Users**:
   - Single user: Click the delete button next to the user
   - Multiple users:
     1. Select users via checkboxes
     2. Click "Delete Selected"
    
     <img width="1466" alt="Screenshot 2024-11-23 at 9 07 45 PM" src="https://github.com/user-attachments/assets/5ed45f9b-814a-415a-bd75-99dca491f671">

### Managing Roles
1. **Adding a Role with permission**:
   - Fill in the role name and select the permissions.
   - Click "Add Role"
  
<img width="1467" alt="Screenshot 2024-11-23 at 9 04 51 PM" src="https://github.com/user-attachments/assets/49f79acd-13f3-4169-8c12-43e0426ec6e2">

  
2. **Editing a Role**:
   - Click the edit button next to the role
   - Update desired fields
   - Save changes
  
  <img width="1437" alt="Screenshot 2024-11-23 at 9 10 09 PM" src="https://github.com/user-attachments/assets/93adbdb9-3c0f-4721-9a15-2737939c80cf">



### Search and Filter
- Use the search bar to find users by name or email
- Filter users by role using the dropdown menu
- Sort any column by clicking the column header

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
