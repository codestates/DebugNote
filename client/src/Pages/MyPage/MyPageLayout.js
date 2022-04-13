import { Outlet } from 'react-router-dom';
import './MyPageLayout.css';
import '../../App.css';
import Tab from '../../Components/Tab';
export default function MyPageLayout() {
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
}
