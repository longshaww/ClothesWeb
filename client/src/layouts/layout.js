import NavbarApp from '../components/navbars/navbar/navbar';
import Footer from '../components/footer/footer';
import { Outlet } from 'react-router-dom';
import GoToTop from '../components/GoToTopButton/go.to.top';
import '../assets/styles/layout.css';
export default function Layout() {
    return (
        <div>
            <div style={{ height: '20% ' }}>
                <NavbarApp />
                <GoToTop />
            </div>

            <div style={{ marginTop: '100px', height: '70% ' }}>
                <Outlet />
            </div>
            <div className = "footer-design">
                <Footer />
            </div>
        </div>
    );
}
