import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Main from './Pages/Main';

function App() {
  const [isLogin, setIsLogin] = useState(false);
<<<<<<< HEAD
  const handleResponseSuccess = () => {
    setIsLogin(!isLogin);
  };
=======

>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
<<<<<<< HEAD
          element={
            <Main
              isLogin={isLogin}
              handleResponseSuccess={handleResponseSuccess}
            />
          }
=======
          element={<Main isLogin={isLogin} setIsLogin={setIsLogin} />}
>>>>>>> d7a91e4f3b4efd7246a7db75aa602df3458aabc8
        />
        {/* <Route path="mypage" element={}>
          <Route index element={}/>
          <Route path="info" element={}/>
          <Route path="bookmark" element={}/>
        </Route>
        <Route path="article" element={}/>
        <Route path="write"  element={}/> */}
      </Routes>
      {/* 메인페이지, 마이페이지(회원정보,북마크,게시글:기본), 게시글 상세페이지: article, 게2379시글 작성 */}
    </BrowserRouter>
  );
}

export default App;
