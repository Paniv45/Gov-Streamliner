import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../style/SchemeDetails.css';

const SchemeDetails = () => {
  const { id } = useParams(); // Get the scheme ID from the URL
  const [scheme, setScheme] = useState(null); // Store scheme data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [uploadedImages, setUploadedImages] = useState({}); // Store uploaded images
  const [pdfGenerated, setPdfGenerated] = useState(false); // Track if PDF is generated

  // Fetch scheme details when component mounts
  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/scheme/${id}`);
        setScheme(response.data);
      } catch (err) {
        console.error('API fetch error:', err);
        setError('Error fetching scheme details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  // Handle image upload for documents
  const handleImageUpload = (doc, file) => {
    setUploadedImages((prev) => ({ ...prev, [doc]: file }));
  };

  // Generate PDF function
  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Documents Required for ' + scheme.tags, 10, 10); // Heading


    let yOffset = 20;

    // Loop through uploaded documents and add them to the PDF
    Object.entries(uploadedImages).forEach(([docName, file], index) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        doc.setFontSize(12);
        doc.text(docName, 10, yOffset); // Document name
        doc.addImage(img, 'JPEG', 10, yOffset + 10, 50, 50); // Document image
        yOffset += 60; // Space between document entries

        if (index === Object.keys(uploadedImages).length - 1) {
          doc.save('Documents-Required.pdf'); // Save the PDF
          setPdfGenerated(true); // Set PDF generated state
        }
      };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="scheme-details-container">
      <h1>{scheme.title}</h1>
      <p><strong>Tags:</strong> {scheme.tags}</p>
      <p><strong>Description:</strong> {scheme.desc}</p>
      <p><strong>Benefits:</strong> {scheme.benefits}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>

      {/* Display the application process */}
      <div className="application-process">
        <h2>Application Process</h2>
        {Array.isArray(scheme.application_process) ? (
          <ol>
            {scheme.application_process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>{scheme.application_process}</p>
        )}
      </div>

      {/* Display the documents required for upload */}
      <div className="documents">
        <h2>Documents Required</h2>
        <ul>
          {scheme.docs_required.map((doc, index) => (
            <li key={index}>
              <span>{doc}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(doc, e.target.files[0])}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Button to generate PDF */}
      <button onClick={handleGeneratePdf} className="generate-pdf-button">Generate PDF</button>
      {pdfGenerated && <p>PDF has been successfully generated!</p>}
    </div>
  );
};

export default SchemeDetails;
