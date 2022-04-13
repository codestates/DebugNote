import { Outlet, Navigate } from 'react-router-dom';
import './MyPageLayout.css';
import '../../App.css';
import Tab from '../../Components/Tab';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
export default function MyPageLayout() {
  return cookies.get('accToken') ? (
    <div className="mypage-layout">
      <section className="tabmenu-content">
        <Tab />
        <section className="content">
          <Outlet />
        </section>
      </section>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
