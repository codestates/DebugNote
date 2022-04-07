import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Main from './Pages/Main';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main isLogin={isLogin} />} />
        <Route path="mypage" element>
          <Route index element />
          <Route path="info" element />
          <Route path="bookmark" element />
        </Route>
        <Route path="article" element />
        <Route path="write" element />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
