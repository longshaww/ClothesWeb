import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosMethod from '../middlewares/axios';

import { FETCHED_COLLECTIONS, ADD_COLLECTIONS, SET_SEARCH_INPUT } from '../constants/constants';

const MySwal = withReactContent(Swal);

const setCollections = (data) => ({
    type: FETCHED_COLLECTIONS,
    payload: data,
});

const addProduct = (data) => ({
    type: ADD_COLLECTIONS,
    payload: data,
});

const setSearchInput = (data) => ({
    type: SET_SEARCH_INPUT,
    payload: data,
});

const fetchCollections = (endpoint) => async (dispatch) => {
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await axiosMethod(endpoint, 'GET');
                dispatch(setCollections(data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch]);
};

const filterCollections = () => async (dispatch) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const q = searchParam.get('q');
    const data = useRef('');
    useEffect(() => {
        async function fetchData() {
            try {
                if (q === 'q=') {
                    data.current = await axiosMethod('collections', 'get');
                } else {
                    data.current = await axiosMethod(`search?q=${q}`, 'get');
                }
                dispatch(setCollections(data.current));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch, q]);
};

const postProduct = (room) => async (dispatch) => {
    const res = await axios.post(`${process.env.REACT_APP_ROOM_API}`, room);
    await MySwal.fire({
        title: <p>Đã thêm phòng mới</p>,
        icon: 'success',
    });
    dispatch(addProduct(res.data));
};

export {
    addProduct,
    fetchCollections,
    postProduct,
    setCollections,
    setSearchInput,
    filterCollections,
};
