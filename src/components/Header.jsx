import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box marginLeft="30px">
      <Typography
        variant="h4"
        color='#A8A8A9'
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
