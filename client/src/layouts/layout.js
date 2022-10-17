import NavbarApp from '../components/navbars/navbar/navbar';
// import Footer from "../components/footer/footer";
import { Outlet } from 'react-router-dom';
import GoToTop from '../components/GoToTopButton/go.to.top';
export default function Layout() {
    return (
        <div>
            <NavbarApp />
            <GoToTop />
            {/* height của NavbarApp = 130px, postion-fixed */}
            <div style={{ marginTop: '130px' }}>
                <Outlet />
            </div>
        </div>
    );
}
