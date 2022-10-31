import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductList from '../../components/ProductList';
import axiosMethod from '../../middlewares/axios';
import Loading from '../../components/loading';
// Phú PLAY CODE
function Search({ collections }) {
    const [searchParam, setSearchParam] = useSearchParams();
    const keyword = searchParam.get('q');
    const [page, setPage] = useState(1);
    const [data, setData] = useState(undefined);
    const handlePagination = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axiosMethod(`search?q=${keyword}&page=${page}`, 'get');
                setData(res.products);
            } catch (error) {
                console.log(error);
            }
        }

        if (keyword.trim()) {
            fetchData();
        }
    }, [keyword, page]);

    return (
        <div id="search">
            <div className="container">
                <div className="border-bottom border-dark mt-4">
                    <h1>Kết quả tìm kiếm cho: {keyword}</h1>
                </div>
                {data && data.length > 0 && <ProductList data={data}></ProductList>}
                {data && data.length <= 0 && <h1>Không có kết quả tìm kiếm phù hợp</h1>}
                {!data && <Loading></Loading>}
            </div>
            {data && data.length > 0 && (
                <div className="d-flex justify-content-center p-3 m-3">
                    <Stack spacing={2}>
                        <Pagination
                            onChange={handlePagination}
                            page={page}
                            size="large"
                            variant="outlined"
                            count={7}
                            color="secondary"
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default Search;
