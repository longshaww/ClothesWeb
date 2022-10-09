import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../../assets/styles/collections.nav.css';
export default function CollectionsLayout() {
    useEffect(() => {
        localStorage.removeItem('voucher');
    }, []);
    const location = useLocation();
    let param = location.pathname.split('/');
    if (param.length > 2) {
        param = param[2].toUpperCase();
    } else {
        param = param[1].toUpperCase();
    }
    return (
        <div>
            <Breadcrumb className="bg-light">
                <div className="container">
                    <BreadcrumbItem className="d-inline-block">
                        <Link to="/" className="nav-link">
                            Trang chủ
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem className="d-inline-block">
                        <Link to="/collections" className="nav-link">
                            Danh mục
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem className="d-inline-block">
                        <Link to={`/collections/${param}`} className="nav-link disabled text-muted">
                            {param}
                        </Link>
                    </BreadcrumbItem>
                </div>
            </Breadcrumb>

            <div className="container">
                {/* <div className="border-bottom border-dark mt-4">
                    <h1>{param}</h1>
                </div> */}

                <Outlet />
            </div>
        </div>
    );
}
