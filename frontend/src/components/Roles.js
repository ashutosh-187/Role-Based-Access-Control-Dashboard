import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function Roles() {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const [editingRole, setEditingRole] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [sortKey, setSortKey] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/api/roles');
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleCreateRole = async () => {
        if (newRole.name && newRole.permissions.length) {
            try {
                await axios.post('http://localhost:5001/api/roles', newRole);
                setNewRole({ name: '', permissions: [] });
                fetchRoles();
            } catch (error) {
                console.error('Error adding role:', error);
            }
        } else {
            alert('Please enter a role name and permissions');
        }
    };

    const handleEditRole = (role) => {
        setEditingRole({ ...role });
    };

    const handleUpdateRole = async () => {
        if (editingRole.name && editingRole.permissions.length) {
            try {
                await axios.put(`http://localhost:5001/api/roles/${editingRole._id}`, editingRole);
                setEditingRole(null);
                fetchRoles();
            } catch (error) {
                console.error('Error updating role:', error);
            }
        } else {
            alert('Please enter a role name and permissions');
        }
    };

    const handleDeleteRole = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/roles/${id}`);
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(selectedRoles.map(roleId => axios.delete(`http://localhost:5001/api/roles/${roleId}`)));
            fetchRoles();
            setSelectedRoles([]);
        } catch (error) {
            console.error('Error deleting roles:', error);
        }
    };

    const togglePermission = (permission) => {
        if (editingRole) {
            const updatedPermissions = editingRole.permissions.includes(permission)
                ? editingRole.permissions.filter(p => p !== permission)
                : [...editingRole.permissions, permission];
            setEditingRole({ ...editingRole, permissions: updatedPermissions });
        } else {
            const updatedPermissions = newRole.permissions.includes(permission)
                ? newRole.permissions.filter(p => p !== permission)
                : [...newRole.permissions, permission];
            setNewRole({ ...newRole, permissions: updatedPermissions });
        }
    };

    const handleSelectRole = (roleId) => {
        setSelectedRoles(prevState => 
            prevState.includes(roleId) ? prevState.filter(id => id !== roleId) : [...prevState, roleId]
        );
    };

    const filteredAndSortedRoles = () => {
        return roles
            .filter(role => role.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                const valueA = a[sortKey].toLowerCase();
                const valueB = b[sortKey].toLowerCase();
                if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    };

    const permissions = ['Add', 'Write', 'Update', 'Delete', 'View'];

    return (
        <div className="user-management">
            <h2>{editingRole ? 'Edit Role' : 'Manage Roles'}</h2>
            {/* Edit role form */}
            {editingRole && (
                <div className="user-form">
                    <h3>Edit Role: {editingRole.name}</h3>
                    <input
                        type="text"
                        value={editingRole.name}
                        onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                    />
                    <div className="permissions-container">
                        <label className="permissions-label">Permissions:</label>
                        <div className="permissions-grid">
                            {permissions.map(permission => (
                                <label key={permission} className="permission-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={editingRole.permissions.includes(permission)}
                                        onChange={() => togglePermission(permission)}
                                    />
                                    <span className="checkbox-label">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleUpdateRole}>Save Changes</button>
                        <button className="btn btn-secondary" onClick={() => setEditingRole(null)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Role creation form */}
            {!editingRole && (
                <div className="user-form">
                    <input
                        type="text"
                        placeholder="Role Name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    />
                    <div className="permissions-container">
                        <label className="permissions-label">Permissions:</label>
                        <div className="permissions-grid">
                            {permissions.map(permission => (
                                <label key={permission} className="permission-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={newRole.permissions.includes(permission)}
                                        onChange={() => togglePermission(permission)}
                                    />
                                    <span className="checkbox-label">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleCreateRole}>Add Role</button>
                </div>
            )}
            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Search roles"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {selectedRoles.length > 0 && (
                    <span onClick={handleBulkDelete} className="icon-bin">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                )}
            </div>

            
            {/* Roles table */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRoles(roles.map(role => role._id));
                                    } else {
                                        setSelectedRoles([]);
                                    }
                                }}
                                checked={selectedRoles.length === roles.length}
                            />
                        </th>
                        <th
                            className={sortKey === 'name' ? `sorted-${sortOrder}` : ''}
                            onClick={() => {
                                setSortKey('name');
                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                            }}
                        >
                            Role Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                        </th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedRoles().map(role => (
                        <tr key={role._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRoles.includes(role._id)}
                                    onChange={() => handleSelectRole(role._id)}
                                />
                            </td>
                            <td>{role.name}</td>
                            <td>
                                <div className="permission-tags">
                                    {role.permissions.map(permission => (
                                        <span key={permission} className="permission-tag">
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEditRole(role)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteRole(role._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Roles;
