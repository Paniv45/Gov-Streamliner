import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchemesDashboard from './components/SchemesDashboard';
import SchemeDetails from './components/SchemeDetails';
import UserProfileForm from './components/UserProfileForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchemesDashboard />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />
        <Route path="/UserProfileForm" element={<UserProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App;
