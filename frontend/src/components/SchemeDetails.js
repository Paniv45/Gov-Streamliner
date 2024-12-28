import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access URL params
import '../style/SchemeDetails.css'

const SchemeDetails = () => {
  const { id } = useParams(); // Get the scheme id from URL
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/api/scheme/${id}`);
        
        setScheme(response.data);
      } catch (err) {
        console.error('API fetch error:', err); // Log the error
        setError('Error fetching scheme details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="scheme-details-container">
      <h1>{scheme.title}</h1>
      <p><strong>Tags:</strong>{scheme.tags}</p>
      <p><strong>Description:</strong> {scheme.desc}</p>
      <p><strong>Benefits:</strong> {scheme.benifits}</p>
      <p><strong>Document Required:</strong>{scheme.docs_required}</p>
      <p><strong>Application Process:</strong> {scheme.application_process}</p>
    </div>
  );
};

export default SchemeDetails;
