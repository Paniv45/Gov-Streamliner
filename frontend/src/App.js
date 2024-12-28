import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchemesDashboard from './components/SchemesDashboard';
import SchemeDetails from './components/SchemeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchemesDashboard />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
