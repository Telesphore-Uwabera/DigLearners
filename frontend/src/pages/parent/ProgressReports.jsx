import React, { useState } from 'react';
import { useTranslation } from '../../lib/language';
import { getProgressReportsData } from '../../services/parentMockDataService';
import '../../components/DashboardStyles.css';

const ProgressReports = () => {
  const { t, currentLanguage } = useTranslation();
  const data = getProgressReportsData();
  const [selectedChild, setSelectedChild] = useState(data.children[0].id);

  const currentChild = data.children.find(child => child.id === selectedChild);

  return (
    <div className="dashboard-container">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              {currentLanguage === 'rw' 
                ? 'Raporo y\'Imikurire' 
                : 'Progress Reports'
              }
            </h1>
            <p>
              {currentLanguage === 'rw'
                ? 'Reba imikurire y\'umwanya y\'umwana wese'
                : 'Detailed learning progress for each child'
              }
            </p>
          </div>
        </div>

        {/* Child Selector */}
        <div className="child-selector">
          <h3>
            {currentLanguage === 'rw' ? 'Hitamo Umwana' : 'Select Child'}
          </h3>
          <div className="child-tabs">
            {data.children.map((child) => (
              <button
                key={child.id}
                className={`child-tab ${selectedChild === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChild(child.id)}
              >
                <span className="child-avatar">{child.avatar}</span>
                <span className="child-name">{child.name}</span>
                <span className="child-grade">{child.grade}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Child Progress */}
        {currentChild && (
          <div className="child-progress-detail">
            <div className="progress-header">
              <div className="child-info">
                <div className="child-avatar-large">{currentChild.avatar}</div>
                <div>
                  <h2>{currentChild.name}</h2>
                  <p>{currentChild.grade}</p>
                </div>
              </div>
              <div className="overall-progress">
                <div className="progress-circle-large">
                  <span>{currentChild.overallProgress}%</span>
                </div>
                <p>
                  {currentLanguage === 'rw' ? 'Imikurire Yose' : 'Overall Progress'}
                </p>
              </div>
            </div>

            {/* Subject Progress */}
            <div className="subjects-section">
              <h3>
                {currentLanguage === 'rw' ? 'Ibyiciro' : 'Subjects'}
              </h3>
              <div className="subjects-grid">
                {currentChild.subjects.map((subject, index) => (
                  <div key={index} className="subject-card">
                    <div className="subject-header">
                      <h4>{subject.name}</h4>
                      <span className="subject-progress">{subject.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <div className="subject-stats">
                      <span>
                        {subject.lessonsCompleted}/{subject.totalLessons} {currentLanguage === 'rw' ? 'yarangije' : 'completed'}
                      </span>
                      <span>
                        {currentLanguage === 'rw' ? 'Ikorwa ryanyuma:' : 'Last activity:'} {subject.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="weekly-progress">
              <h3>
                {currentLanguage === 'rw' ? 'Imikurire y\'Icyumweru' : 'Weekly Progress'}
              </h3>
              <div className="progress-chart">
                {currentChild.weeklyProgress.map((week, index) => (
                  <div key={index} className="week-bar">
                    <div className="week-info">
                      <span className="week-label">{week.week}</span>
                      <span className="week-lessons">{week.lessons} {currentLanguage === 'rw' ? 'amahugurwa' : 'lessons'}</span>
                      <span className="week-time">{week.time}</span>
                    </div>
                    <div className="week-progress-bar">
                      <div 
                        className="week-progress-fill" 
                        style={{ width: `${(week.lessons / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Areas for Improvement */}
            <div className="assessment-section">
              <div className="strengths">
                <h3>
                  {currentLanguage === 'rw' ? 'Ubushobozi' : 'Strengths'}
                </h3>
                <ul>
                  {currentChild.strengths.map((strength, index) => (
                    <li key={index}>✅ {strength}</li>
                  ))}
                </ul>
              </div>
              <div className="improvements">
                <h3>
                  {currentLanguage === 'rw' ? 'Aho Gukura' : 'Areas for Improvement'}
                </h3>
                <ul>
                  {currentChild.areasForImprovement.map((area, index) => (
                    <li key={index}>📈 {area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="summary-stats">
          <h3>
            {currentLanguage === 'rw' ? 'Incamake' : 'Summary'}
          </h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👶</div>
              <div className="stat-content">
                <h3>{data.summary.totalChildren}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Abana' : 'Total Children'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{data.summary.averageProgress}%</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Imikurire Ryose' : 'Average Progress'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{data.summary.totalLessonsCompleted}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Amahugurwa Yarangije' : 'Lessons Completed'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <h3>{data.summary.totalLearningTime}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Igihe cy\'Kwiga' : 'Learning Time'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;
