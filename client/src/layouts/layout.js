import NavbarApp from '../components/navbars/navbar/navbar';
import Footer from '../components/footer/footer';
import { Outlet } from 'react-router-dom';
import GoToTop from '../components/GoToTopButton/go.to.top';
import '../assets/styles/layout.css';
import { useSelector } from 'react-redux';
export default function Layout() {
    const height = useSelector((state) => state?.heightNav.height);

    return (
        <div className="m-main">
            <NavbarApp />

            <GoToTop />

            <div className="m-article" style={{ marginTop: `${height}px` }}>
                <Outlet />
            </div>
            <div className="footer-design">
                <Footer />
            </div>
        </div>
    );
}
