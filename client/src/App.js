import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Navbar from './Components/NavBar';
import LoginModal from './Components/LoginModal';
import Main from './Pages/Main';
import Write from './Pages/Article/Write';
import Article from './Pages/Article/Article';
import MypageLayout from './Pages/MyPage/MyPageLayout';
import Logs from './Pages/MyPage/Logs';
import Info from './Pages/MyPage/Info';
import Bookmarks from './Pages/MyPage/Bookmarks';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // modalHandler
  const openLoginModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const modalToggleHandler = () => {
    console.log('modal토글 함수 작동');
    setIsMember(!isMember);
  };

  // logoutHandler
  const logoutHandler = () => {
    console.log('로그아웃 버튼 눌림');
    axios.post('http://15.164.104.171:80/auth/logout').then(response => {
      if (response.status === 200) {
        console.log('logout ok');
        setIsLogin(!isLogin);
      }
    });
  };

  return (
    <BrowserRouter>
      <Navbar
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        openLoginModalHandler={openLoginModalHandler}
      >
        {isLogin ? (
          <ul className="loggedin-menu">
            <li>
              <Link to="mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="write">글쓰기</Link>
            </li>
            <li onClick={logoutHandler}>로그아웃</li>
          </ul>
        ) : (
          <li onClick={openLoginModalHandler}>로그인</li>
        )}
      </Navbar>
      <Routes>
        <Route
          path="*"
          element={
            <Main
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              logoutHandler={logoutHandler}
              isOpen={isOpen}
              isMember={isMember}
            />
          }
        />
        <Route path="/*">
          <Route path="mypage" element={<MypageLayout isLogin={isLogin} />}>
            <Route index element={<Logs />} />
            <Route path="logs/*" element={<Logs />} />
            <Route path="info" element={<Info />} />
            <Route path="bookmarks/*" element={<Bookmarks />} />
          </Route>
        </Route>

        <Route path="article" element={<Article />} />
        <Route path="write" element={<Write />} />
      </Routes>
      {isOpen === true ? (
        <LoginModal
          isLogin={isLogin}
          isMember={isMember}
          setIsLogin={setIsLogin}
          openLoginModalHandler={openLoginModalHandler}
          modalToggleHandler={modalToggleHandler}
        />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
