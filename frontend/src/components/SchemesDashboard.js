import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUserCircle } from 'react-icons/fa'; // Import icon for profile
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

  const handleProfileClick = () => {
    // Navigate to the profile page
    navigate('/UserProfileForm');
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Available Schemes</h1>

        {/* Profile icon button */}
        <button className="profile-button" onClick={handleProfileClick}>
          <FaUserCircle size={30} />
        </button>
      </div>

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
