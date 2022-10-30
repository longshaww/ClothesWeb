import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
} from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Chart({ title, data, dataKey, grid }) {
    return (
        <Box p={5} sx={{ boxShadow: 1, borderRadius: 1 }}>
            <Typography>{title}</Typography>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="createdAt" stroke="#5550bd" />
                    <YAxis />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
