import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './Pages/';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
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
