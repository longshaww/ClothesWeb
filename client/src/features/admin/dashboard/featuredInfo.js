import globalStateAndAction from '../../../container/global.state.action';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
function FeaturedInfo({ chart }) {
    return (
        <>
            <Box>
                <Grid container spacing={3}>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng sản phẩm</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {chart?.productCount}
                                </Typography>
                                <Typography variant="subtitle1">SẢN PHẨM</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng đơn</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {chart?.billCount}
                                </Typography>
                                <Typography variant="subtitle1">ĐƠN HÀNG</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                        <Box p={5} sx={{ borderRadius: 1, boxShadow: 1 }}>
                            <Stack spacing={1}>
                                <Typography fontSize={22}>Tổng khách hàng</Typography>
                                <Typography fontWeight="bold" fontSize={20}>
                                    {chart?.userCount}
                                </Typography>
                                <Typography variant="subtitle1">KHÁCH HÀNG</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default globalStateAndAction(FeaturedInfo);
