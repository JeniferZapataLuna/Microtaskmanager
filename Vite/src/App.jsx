import React from 'react';
import Home from './Pages/Home';
import Pagina2 from './Pages/pagina2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pagina2" element={<Pagina2/>} />
    </Routes>
      </>
      
  );
}

export default App;
