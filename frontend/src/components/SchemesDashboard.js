// frontend/src/components/SchemesDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchemesDashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching schemes');
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Available Schemes</h1>
      <ul>
        {schemes.map((scheme) => (
          <li key={scheme._id}>
            <h2>{scheme.name}</h2>
            <p>{scheme.description}</p>
            {/* Add more scheme details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemesDashboard;
