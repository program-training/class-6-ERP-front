import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const rowSkeletons = Array.from({ length: 10 }, (_, index) => (
  <Skeleton key={index} height={130} style={{ margin: '8px 0' }} />
));

function SkeletonTable() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography component="div" style={{ borderRadius: '4px', padding: '16px' }}>
          {rowSkeletons}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SkeletonTable;
