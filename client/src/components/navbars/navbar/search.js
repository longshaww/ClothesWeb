import { useRef, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import 'boxicons';
export default function PostFilterForm(props) {
    const navigate = useNavigate();
    const ref = useRef();

    function handleSearchKeyUp(e) {
        const value = e.target.value;
        if (e.keyCode === 13) {
            if (!value) return;
            navigate({
                pathname: '/search',
                search: `?${createSearchParams({
                    q: value,
                })}`,
            });
        }
    }
    const handleSearchIconClick = () => {
        var value = ref.current.value;

        if (!value) return;
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({
                q: value,
            })}`,
        });
    };
    return (
        <div className="search-box">
            <input
                autoComplete="nope"
                className="form-control search-styled"
                placeholder="Tìm kiếm sản phẩm"
                ref={ref}
                name="search-box"
                type="text"
                onKeyUp={handleSearchKeyUp}
            ></input>

            <i onClick={handleSearchIconClick} className="bx icon-search bx-search"></i>
        </div>
    );
}
