import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import '../../../assets/styles/collections.nav.css';
import MBreadcrumb from '../../../components/Breadcrumb';
import axiosMethod from '../../../middlewares/axios';
export default function DetailLayout() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState();
    useEffect(() => {
        async function fetchProductDetail() {
            const data = await axiosMethod(`product/${id}`, 'get');
            setProductDetail(data.nameProduct);
            return data;
        }
        fetchProductDetail();
    }, [id]);

    const breadcrumbList = [
        { isActive: true, text: 'Trang chủ', url: '/' },
        { isActive: true, text: 'Danh mục', url: '/collections' },
        { isActive: false, text: `${productDetail}`, url: `/product/${id}` },
    ];
    return (
        <div>
            <MBreadcrumb breadcrumbList={breadcrumbList} />
            <Outlet />
        </div>
    );
}
