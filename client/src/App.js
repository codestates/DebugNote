import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Pages/Main';
import MypageLayout from './Pages/MyPage/MyPageLayout';
import Logs from './Pages/MyPage/Logs';
import Info from './Pages/MyPage/Info';
import Bookmarks from './Pages/MyPage/Bookmarks';
import Write from './Pages/Article/Write';
import Article from './Pages/Article/Article';
import PrivateRoute from './Routes/Privateroute';

function App() {
  //const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="mypage" element={<MypageLayout />}>
          <Route index element={<Logs />} />
          <Route path="logs/*" element={<Logs />} />
          <Route path="info" element={<Info />} />
          <Route path="bookmarks/*" element={<Bookmarks />} />
        </Route>
        <Route path="write" element={<Write />} />
      </Routes>
      {/*페이지 별 접근 권한 설정 완료*/}
    </BrowserRouter>
  );
}

export default App;
