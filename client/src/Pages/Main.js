import './Main.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Main({ isLogin }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">DebugNote</Link>
          </li>
          {isLogin ? (
            <ul className="loggein-menu">
              <li>
                <Link to="">마이페이지</Link>
              </li>
              <li>
                <Link to="">글쓰기</Link>
              </li>
              <li onClick={() => alert('로그아웃')}>로그아웃</li>
            </ul>
          ) : (
            <li>로그인</li>
          )}
        </ul>
      </nav>
      <section className="search">
        <select>
          <option>제목</option>
          <option>내용</option>
        </select>
        <div>
          <input placeholder="검색어를 입력해주세요"></input>
          <button>검색</button>
        </div>
      </section>
      <section className="articles">게시글 영역</section>
    </div>
  );
}
