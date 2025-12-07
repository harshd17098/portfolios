import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MERNPortfolio from './pages/MERNPortfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MERNPortfolio />} />
        <Route path="/portfolio" element={<MERNPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;