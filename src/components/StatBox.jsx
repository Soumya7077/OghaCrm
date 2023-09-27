import { Box, Typography, useTheme } from "@mui/material";  

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();

  return (
    <Box width="80%" m="0 10px">
      <Box display="flex" justifyContent="space-between">
        <Box display={"flex"} justifyContent="center">
          <Box mr="130px" mt="20px">
          {icon}
          </Box>
          <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: 'white' }}
          >
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
          {subtitle}
        </Typography>
          </Box>
        </Box>
        <Box >
          {/* <ProgressCircle progress={progress} /> */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: 'black' }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
