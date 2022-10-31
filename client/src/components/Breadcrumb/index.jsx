import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';
const MBreadcrumb = ({ breadcrumbList }) => {
    return (
        <div className="container mt-2">
            <Breadcrumb className="bg-light breadcrumb-styled">
                {breadcrumbList.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        <Link
                            to={item.url}
                            className={
                                item.isActive
                                    ? 'breadcrumb-link'
                                    : 'breadcrumb-link disabled text-muted'
                            }
                        >
                            {item.text}
                        </Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </div>
    );
};

export default MBreadcrumb;
