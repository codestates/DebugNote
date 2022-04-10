import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import TestNavbar from './Components/temp/TestNavBar';

import Main from './Pages/Main';
import Write from './Pages/Article/Write';
import Article from './Pages/Article/Article';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <TestNavbar />
      <Routes>
        <Route
          path="/"
          element={<Main isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        {/* <Route path="mypage" element={}>
          <Route index element={}/>
          <Route path="info" element={}/>
          <Route path="bookmark" element={}/>
        </Route>*/}
        <Route path="article" element={<Article />} />
        <Route path="write" element={<Write />} />
      </Routes>
      {/* 메인페이지, 마이페이지(회원정보,북마크,게시글:기본), 게시글 상세페이지: article, 게2379시글 작성 */}
    </BrowserRouter>
  );
}

export default App;
