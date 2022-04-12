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
import Edit from './Pages/Article/Edit';

function App() {
  //* 로그인 후 받은 id
  const [myId, setMyId] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  // 컴포넌트가 렌더링된 후  불러온 게시물 10개
  const [loadedArticles, setLoadedArticles] = useState([]);
  // 상세 페이지에서 조회중인 게시글 제목, 본문 상태
  const [currentArticle, setCurrentArticle] = useState({
    id: '',
    title: '',
    content: '',
    createdAt: '',
    nickname: '',
  });

  const [boardId, setBoardId] = useState('');
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

  console.log(
    '<App /> 상세페이지 로드 후 끌어올린 게시물 상세 정보',
    currentArticle,
  );
  console.log('myId->', myId);

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
              openLoginModalHandler={openLoginModalHandler}
              isOpen={isOpen}
              isMember={isMember}
              loadedArticles={loadedArticles}
              setLoadedArticles={setLoadedArticles}
            />
          }
        />
        <Route
          path={':id'}
          element={
            <Article
              currentArticle={currentArticle}
              setCurrentArticle={setCurrentArticle}
              myId={myId}
            />
          }
        />
        <Route
          path="edit"
          element={
            <Edit
              currentArticle={currentArticle}
              setCurrentArticle={setCurrentArticle}
            />
          }
        />
        <Route
          path="mypage"
          element={
            <MypageLayout isLogin={isLogin} logoutHandler={logoutHandler} />
          }
        >
          <Route index element={<Info />} />
          <Route path="logs/*" element={<Logs />} />
          <Route path="info" element={<Info />} />
          <Route path="bookmarks/*" element={<Bookmarks />} />
        </Route>
        <Route
          path="write"
          element={<Write setCurrentArticle={setCurrentArticle} />}
        />
        <Route
          path="notfound"
          element={<h1>404 Not Found - 게시물이 없습니다.</h1>}
        />
      </Routes>
      {isOpen === true ? (
        <LoginModal
          isLogin={isLogin}
          isMember={isMember}
          setIsLogin={setIsLogin}
          openLoginModalHandler={openLoginModalHandler}
          modalToggleHandler={modalToggleHandler}
          setMyId={setMyId}
        />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
