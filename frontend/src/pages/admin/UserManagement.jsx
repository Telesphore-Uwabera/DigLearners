import React, { useState } from 'react';
import { useTranslation } from '../../lib/language';
import Icon from '../../components/icons/Icon';
import adminMockDataService from '../../services/adminMockDataService';
import './AdminPages.css';

const UserManagement = () => {
  const { t } = useTranslation();
  const [users] = useState(adminMockDataService.getUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'learner': return 'student';
      case 'teacher': return 'teacher';
      case 'parent': return 'users';
      case 'admin': return 'settings';
      default: return 'users';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#4CAF50' : '#F44336';
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage users, roles, and permissions</p>
      </div>

      {/* Filters and Search */}
      <div className="admin-filters">
        <div className="search-box">
          <Icon name="search" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="learner">Learners</option>
            <option value="teacher">Teachers</option>
            <option value="parent">Parents</option>
            <option value="admin">Admins</option>
          </select>
          
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* User Statistics */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="users" size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="check" size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{users.filter(u => u.status === 'active').length}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="student" size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{users.filter(u => u.role === 'learner').length}</div>
            <div className="stat-label">Learners</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="teacher" size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-number">{users.filter(u => u.role === 'teacher').length}</div>
            <div className="stat-label">Teachers</div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      <Icon name={getRoleIcon(user.role)} size={32} />
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="role-badge role-{user.role}">
                    <Icon name={getRoleIcon(user.role)} size={16} />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  >
                    <Icon name={user.status === 'active' ? 'check' : 'close'} size={12} />
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${user.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{user.progress}%</span>
                  </div>
                </td>
                <td>{new Date(user.lastActive).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Edit User">
                      <Icon name="edit" size={16} />
                    </button>
                    <button className="btn-icon" title="View Details">
                      <Icon name="eye" size={16} />
                    </button>
                    <button className="btn-icon" title="Send Message">
                      <Icon name="message" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="admin-pagination">
        <button className="btn-secondary">
          <Icon name="arrow-left" size={16} />
          Previous
        </button>
        <span className="pagination-info">
          Showing 1-{filteredUsers.length} of {users.length} users
        </span>
        <button className="btn-secondary">
          Next
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
