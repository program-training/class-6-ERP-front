
import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        size={68}
        sx={{
          color: 'primary.main',
        }}
      />
    </Box>
  );
}

export default LoadingSpinner;

