import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import FormPage from './component/FormPage';
import Firstpage from './component/FirstPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<FormPage/>} />
        <Route path="/first" element={<Firstpage/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
