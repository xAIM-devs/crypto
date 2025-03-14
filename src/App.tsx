import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FalconX from './components/FalconX';
import ComingSoon from './components/ComingSoon';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FalconX />} />
        <Route path="/technology" element={<ComingSoon />} />
        <Route path="/ai-agents" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
};

export default App;
