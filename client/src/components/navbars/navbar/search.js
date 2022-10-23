import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import 'boxicons';
export default function PostFilterForm(props) {
    // const { onSubmit } = props;
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearch(value);
    }
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
        if (!search) return;
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({
                q: search,
            })}`,
        });
    };
    return (
        <div className="search-box">
            <input
                className="form-control search-styled"
                placeholder="Tìm kiếm sản phẩm"
                value={search}
                onKeyUp={handleSearchKeyUp}
                onChange={handleSearchChange}
            ></input>

            <i onClick={handleSearchIconClick} class="bx icon-search bx-search"></i>
        </div>
    );
}
