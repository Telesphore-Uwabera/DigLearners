import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gamifiedApiService from '../services/gamifiedApiService';
import './AgeGroupSelector.css';

const AgeGroupSelector = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ageGroups = [
    {
      id: '0-2',
      label: '0-2',
      description: 'Early Learning',
      icon: '👶',
      color: '#fbbf24'
    },
    {
      id: '3-4',
      label: '3-4',
      description: 'Pre-K',
      icon: '🧸',
      color: '#f59e0b'
    },
    {
      id: '5-6',
      label: '5-6',
      description: 'Kindergarten',
      icon: '🎨',
      color: '#10b981'
    },
    {
      id: '7+',
      label: '7+',
      description: 'Primary School',
      icon: '🎓',
      color: '#3b82f6'
    }
  ];

  const handleAgeGroupSelect = async (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
    setLoading(true);
    setError('');

    try {
      // Fetch content for the selected age group
      const response = await gamifiedApiService.getContentByAgeGroup(ageGroup);
      
      // Store the selected age group and content in localStorage
      localStorage.setItem('selectedAgeGroup', ageGroup);
      localStorage.setItem('ageGroupContent', JSON.stringify(response.data));
      
      // Navigate to the learner dashboard with age group content
      navigate('/dashboard/games', { 
        state: { 
          ageGroup, 
          content: response.data 
        } 
      });
    } catch (err) {
      setError('Failed to load content. Please try again.');
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="age-group-selector">
      <div className="selector-container">
        <div className="character-section">
          <div className="character">
            <div className="character-avatar">🎮</div>
            <div className="speech-bubble">
              <p>Choose your age group</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h1 className="platform-title">KEAKO world</h1>
          <p className="subtitle">To create personal learning plan</p>
          
          <div className="age-groups-grid">
            {ageGroups.map((group) => (
              <button
                key={group.id}
                className={`age-group-card ${selectedAgeGroup === group.id ? 'selected' : ''}`}
                onClick={() => handleAgeGroupSelect(group.id)}
                disabled={loading}
                style={{ '--card-color': group.color }}
              >
                <div className="age-group-icon">{group.icon}</div>
                <div className="age-group-label">{group.label}</div>
                <div className="age-group-description">{group.description}</div>
              </button>
            ))}
          </div>

          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading your personalized content...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => setError('')}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeGroupSelector;
