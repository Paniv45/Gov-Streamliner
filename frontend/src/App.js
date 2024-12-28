import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfileForm from './components/UserProfileForm';
import SchemesDashboard from './components/SchemesDashboard';


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<SchemesDashboard />} />
          <Route path="/UserProfileForm" element={<UserProfileForm />} />
          <Route path="/SchemesDashboard" element={<SchemesDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

