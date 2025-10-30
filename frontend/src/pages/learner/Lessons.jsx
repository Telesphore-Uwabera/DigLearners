import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import learnerApiService from '../../services/learnerApiService';

const Lessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await learnerApiService.getLessons();
        setLessons(res.lessons || []);
      } catch (e) {
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const startLesson = (lesson) => {
    navigate(`/dashboard/lesson/${lesson.id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '1.5rem' }}>Loading lessons...</div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1.5rem', color: '#ef4444' }}>{error}</div>
    );
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ margin: '0 0 1rem 0' }}>Lessons</h1>
      {lessons.length === 0 ? (
        <div>No lessons available yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {lessons.map((lesson) => (
            <div key={lesson.id} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.08)', border: '1px solid #eef2f7' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{lesson.subject || lesson.moduleType}</div>
              <h3 style={{ margin: '4px 0 8px 0', color: '#111827' }}>{lesson.title}</h3>
              <p style={{ margin: '0 0 12px 0', color: '#374151', fontSize: 14 }}>{lesson.description}</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>{lesson.difficulty || 'beginner'}</span>
                {lesson.ageGroup && (<span style={{ background: '#ecfeff', color: '#0e7490', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>Age {lesson.ageGroup}</span>)}
                {lesson.estimatedTime && (<span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>{lesson.estimatedTime} min</span>)}
                {lesson.isCompleted && (<span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>Completed</span>)}
              </div>
              <button onClick={() => startLesson(lesson)} style={{ width: '100%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Start</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lessons;


