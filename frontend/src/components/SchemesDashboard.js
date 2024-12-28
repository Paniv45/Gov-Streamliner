import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../style/SchemesDashboard.css';

const SchemesDashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/test');
        setSchemes(response.data);
      } catch (err) {
        console.error('API fetch error:', err.message);
        setError('Error fetching schemes.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleSchemeClick = (id) => {
    // Navigate to the detailed page of the scheme
    navigate(`/scheme/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Available Schemes</h1>
      <ul className="schemes-list">
        {schemes.map((scheme) => (
          <li key={scheme._id} className="scheme-item">
            <button className="scheme-title" onClick={() => handleSchemeClick(scheme._id)}>
              {scheme.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemesDashboard;

