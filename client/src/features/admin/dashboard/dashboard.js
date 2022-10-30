import Chart from '../dashboard/chart';
import FeaturedInfo from '../dashboard/featuredInfo';
import '../../../assets/styles/admin/home.css';
import globalStateAndAction from '../../../container/global.state.action';
import { useCookies } from 'react-cookie';
import Stack from '@mui/material/Stack';
import StatisticFilter from './statisticFilter';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import axiosMethod from '../../../middlewares/axios';

function Dashboard() {
    const [cookies] = useCookies(['accessToken']);
    const [chart, setChart] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [filter, setFilter] = useState({
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
        billState: 'PENDING',
        paymentMethod: 'COD',
    });
    useEffect(() => {
        setSearchParams(filter);
    }, [filter]);

    useEffect(() => {
        const getData = async () => {
            const endpoint = `admin/dashboard${window.location.search}`;
            const data = await axiosMethod(endpoint, 'GET', null, {
                authorization: 'Bearer ' + cookies.accessToken,
            });
            setChart(data.body);
        };
        getData();
    }, [filter]);

    return (
        <div className="home mt-5">
            <Stack m={5} spacing={4}>
                <StatisticFilter filter={filter} setFilter={setFilter} />
                <FeaturedInfo chart={chart} />
                <Chart data={chart.bills} title="Money Analytics" grid dataKey="total" />
            </Stack>
        </div>
    );
}
export default globalStateAndAction(Dashboard);
