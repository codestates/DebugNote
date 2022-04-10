import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Main from './Pages/Main';
import Write from './Pages/Article/Write';
import Article from './Pages/Article/Article';
import MypageLayout from './Pages/MyPage/MyPageLayout';
import Logs from './Pages/MyPage/Logs';
import Info from './Pages/MyPage/Info';
import Bookmarks from './Pages/MyPage/Bookmarks';
import Write from './Pages/Article/Write';
import Article from './Pages/Article/Article';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const logoutHandler = () => {
    axios.post('http://15.164.104.171:80/auth/logout').then(response => {
      if (response.status === 200) {
        console.log('logout ok');
        setIsLogin(!isLogin);
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              logoutHandler={logoutHandler}
            />
          }
        />
        <Route path="article" element={<Article />} />
        <Route path="write" element={<Write />} />
        <Route
          path="mypage"
          element={
            <MypageLayout isLogin={isLogin} logoutHandler={logoutHandler} />
          }
        >
          <Route index element={<Logs />} />
          <Route path="logs" element={<Logs />} />
          <Route path="info" element={<Info />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
<<<<<<< HEAD
=======
        <Route path="article" element={<Article />} />
        <Route path="write" element={<Write />} />
>>>>>>> 4e86df5 (Client [ADD] merge conflict handling)
      </Routes>
      {/* 메인페이지, 마이페이지(회원정보,북마크,게시글:기본), 게시글 상세페이지: article, 게2379시글 작성 */}
    </BrowserRouter>
  );
}

export default App;
