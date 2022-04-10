import { Link } from 'react-router-dom';

export default function Navbar({
  isLogin,
  logoutHandler,
  openLoginModalHandler,
}) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">DebugNote</Link>
        </li>
        {isLogin ? (
          <ul className="loggedin-menu">
            <li>
              <Link to="">마이페이지</Link>
            </li>
            <li>
              <Link to="">글쓰기</Link>
            </li>
            <li onClick={logoutHandler}>로그아웃</li>
          </ul>
        ) : (
          <li onClick={openLoginModalHandler}>로그인</li>
        )}
      </ul>
    </nav>
  );
}
