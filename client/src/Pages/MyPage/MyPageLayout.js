import { Link, Outlet } from 'react-router-dom';
import './MyPageLayout.css';
import NavBar from '../../Components/NavBar';
import Tab from '../../Components/Tab';
import Pagination from '../../Components/Pagination';
export default function MyPageLayout({ logoutHandler }) {
  return (
    <>
      <NavBar logoutHandler={logoutHandler}>
        <ul className="mypage-menu">
          <li>
            <Link to="">글쓰기</Link>
          </li>
          <li onClick={logoutHandler}>
            <Link to="/">로그아웃</Link>
          </li>
        </ul>
      </NavBar>
      <section className="tabmenu-content">
        <Tab />
        <section className="content">
          <Outlet />
        </section>
        <Pagination />
      </section>
    </>
  );
}

{
  /*마이페이지의 경우, 로그인 없이도 현재 접속이 가능하기 때문에 막아야 함*/
}
