import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import Header from "../../components/Header";

const Geography = () => {
  const theme = useTheme();
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid black`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
