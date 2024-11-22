import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css'; 

function Users() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
    const [editingUser, setEditingUser] = useState(null);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('');
    const [filterUsername, setFilterUsername] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const checkForDuplicateEmail = (email, userId = null) => {
        const duplicate = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user._id !== userId);
        return duplicate;
    };
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleCreateUser = async () => {
        // Validate email format
    if (!validateEmail(newUser.email)) {
        alert('Please enter a valid email address.');
        return;
    }
        const duplicate = checkForDuplicateEmail(newUser.email);
        if (duplicate) {
            alert('A user with this email already exists.');
            return;
        }
    
        try {
            await axios.post('http://localhost:5001/api/users', newUser);
            setNewUser({ name: '', email: '', role: '', status: 'Active' });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(selectedUsers.map(id => axios.delete(`http://localhost:5001/api/users/${id}`)));
            setSelectedUsers([]);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting multiple users:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleUpdateUser = async () => {
        if (!validateEmail(editingUser.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const duplicate = checkForDuplicateEmail(editingUser.email, editingUser._id);
        if (duplicate) {
            alert('A user with this email already exists.');
            return;
        }
    
        try {
            await axios.put(`http://localhost:5001/api/users/${editingUser._id}`, editingUser);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    const toggleSelectUser = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const filteredAndSortedUsers = () => {
        let filtered = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) &&
            (!filterUsername || user.name.toLowerCase().includes(filterUsername.toLowerCase())) &&
            (!filterRole || user.role.toLowerCase().includes(filterRole.toLowerCase()))  
        );
    
        if (sortKey) {
            filtered = filtered.sort((a, b) => {
                const aValue = a[sortKey]?.toLowerCase() || '';
                const bValue = b[sortKey]?.toLowerCase() || '';
                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }
    
        return filtered;
    };
    
    

    return (
        <div className="user-management">
            <h2>{editingUser ? 'Edit User' : 'Manage Users'}</h2>

            {!editingUser && (
                <div className="user-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role._id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="status"
                                value="Active"
                                checked={newUser.status === 'Active'}
                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                            />
                            Active
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="status"
                                value="Inactive"
                                checked={newUser.status === 'Inactive'}
                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                            />
                            Inactive
                        </label>
                    </div>
                    <button onClick={handleCreateUser} className="btn btn-primary">Add User</button>
                </div>
            )}
            {editingUser && (
                <div className="user-form">
                    <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                        {roles.map(role => (
                            <option key={role._id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="status"
                                value="Active"
                                checked={editingUser.status === 'Active'}
                                onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                            />
                            Active
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="status"
                                value="Inactive"
                                checked={editingUser.status === 'Inactive'}
                                onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                            />
                            Inactive
                        </label>
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleUpdateUser}>Save Changes</button>
                        <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">Filter by Role</option>
                    {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
                {selectedUsers.length > 0 && (
                    <span onClick={handleBulkDelete} className="icon-bin">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                )}
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedUsers(users.map(user => user._id));
                                    } else {
                                        setSelectedUsers([]);
                                    }
                                }}
                                checked={selectedUsers.length === users.length}
                            />
                        </th>
                        <th onClick={() => {
                            setSortKey('name');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        }}>
                            Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th onClick={() => {
                            setSortKey('email');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        }}>
                            Email {sortKey === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedUsers().map(user => (
                        <tr key={user._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => toggleSelectUser(user._id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span className={`status status-${user.status.toLowerCase()}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="action-buttons">
                                <button onClick={() => handleEdit(user)} className="btn btn-primary">Edit</button>
                                <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
