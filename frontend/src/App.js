import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './components/Users'; // Assuming the Users component is in the same directory
import Roles from './components/Roles';  // Assuming you will create a Roles component

function App() {
    return (
        <Router>
            <div>
                <header className="app-header">
                    <h1>Admin Dashboard</h1>
                    <nav>
                        <ul className="nav-links">
                            <li>
                                <Link to="/manage-users">Manage Users</Link>
                            </li>
                            <li>
                                <Link to="/manage-roles">Manage Roles</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path="/manage-users" element={<Users />} />
                    <Route path="/manage-roles" element={<Roles />} />
                    <Route path="/" element={<Users />} /> {/* Default route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
