# User Management System

A **React-based User Management System** that provides functionality to manage users and roles, with advanced features like search, filter, sort, and bulk actions.

---

## Features

- **Add Users**: Create new users with name, email, role, and status.
- **Edit Users**: Update user details via an intuitive form.
- **Delete Users**: Remove individual or multiple users at once.
- **Search**: Quickly locate users by name or email.
- **Filter by Roles**: Filter users based on their roles.
- **Sort**: Sort users by name, email, role, or status.
- **Bulk Actions**: Select multiple users using checkboxes and delete them in one go.

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

## Features

### User Management
- **Add Users**: Create new users with name, email, role, and status
- **Edit Users**: Modify existing user information
- **Delete Users**: Remove individual or multiple users
- **Bulk Actions**: Perform operations on multiple users simultaneously

### Search and Filter
- Real-time search functionality for names and emails
- Multi-role filtering capability
- Column-based sorting

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

2. **Editing a User**:
   - Click the edit button next to the user
   - Update desired fields
   - Save changes

3. **Deleting Users**:
   - Single user: Click the delete button next to the user
   - Multiple users:
     1. Select users via checkboxes
     2. Click "Delete Selected"

### Search and Filter
- Use the search bar to find users by name or email
- Filter users by role using the dropdown menu
- Sort any column by clicking the column header

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
