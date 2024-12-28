// frontend/src/components/UserProfileForm.js

import React, { useState } from 'react';
import axios from 'axios';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    panCardNumber: '',
    aadhaarCardNumber: '',
    disabilityCertificateNumber: '',
    incomeCertificateNumber: '',
    panCard: null,
    aadhaarCard: null,
    disabilityCertificate: null,
    incomeCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('panCardNumber', formData.panCardNumber);
    formDataToSend.append('aadhaarCardNumber', formData.aadhaarCardNumber);
    formDataToSend.append('disabilityCertificateNumber', formData.disabilityCertificateNumber);
    formDataToSend.append('incomeCertificateNumber', formData.incomeCertificateNumber);
    formDataToSend.append('panCard', formData.panCard);
    formDataToSend.append('aadhaarCard', formData.aadhaarCard);
    formDataToSend.append('disabilityCertificate', formData.disabilityCertificate);
    formDataToSend.append('incomeCertificate', formData.incomeCertificate);

    try {
      const response = await axios.post('http://localhost:5000/api/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <><h1>User Profile Form</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="panCardNumber"
        placeholder="PAN Card Number"
        value={formData.panCardNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="aadhaarCardNumber"
        placeholder="Aadhaar Card Number"
        value={formData.aadhaarCardNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="disabilityCertificateNumber"
        placeholder="Disability Certificate Number"
        value={formData.disabilityCertificateNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="incomeCertificateNumber"
        placeholder="Income Certificate Number"
        value={formData.incomeCertificateNumber}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="panCard"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png"
        required
      />
      <input
        type="file"
        name="aadhaarCard"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png"
        required
      />
      <input
        type="file"
        name="disabilityCertificate"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png"
        required
      />
      <input
        type="file"
        name="incomeCertificate"
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png"
        required
      />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default UserProfileForm;
