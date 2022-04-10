import { Link } from 'react-router-dom';

export default function TestNavbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">DebugNote</Link>
        </li>
        <ul className="loggedin-menu">
          <li>
            <Link to="">마이페이지</Link>
          </li>
          <li>
            <Link to="write">글쓰기</Link>
          </li>
          <li>로그아웃</li>
        </ul>
      </ul>
    </nav>
  );
}
