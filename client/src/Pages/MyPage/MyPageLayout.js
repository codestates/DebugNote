import { Outlet } from 'react-router-dom';
import './MyPageLayout.css';
import '../../App.css';
import Tab from '../../Components/Tab';
// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();
export default function MyPageLayout() {
  // if (cookies.get('accToken')) {
  return (
    <div className="mypage-layout">
      <section className="tabmenu-content">
        <Tab />
        <section className="content">
          <Outlet />
        </section>
      </section>
    </div>
  );
  // } else {
  //   return <div>접근 권한이 없습니다</div>;
  // }
}
