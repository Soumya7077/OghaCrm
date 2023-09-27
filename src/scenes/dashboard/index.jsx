import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { mockDataContacts, mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { DataGrid } from "@mui/x-data-grid";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { DirectionsWalk, Groups, Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [walkin, setWalkin] = useState(0);
  const [staff, setStaff] = useState(0);
  const [leads, setLeads] = useState(0);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
    },
    {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
    },
   

];

  useEffect(() => {
    axios({
      method:'get',
      url:`https://ogha.onrender.com/getWalkinCustomer`,
    }).then(res => {
        console.log(res.data.length);
        setWalkin(res.data.length)
    });

    axios({
      method:'get',
      url:`https://ogha.onrender.com/getstaffdetails`
    }).then(res => {
      setStaff(res.data.length);
    })

    axios({
      method:'get',
      url:'https://ogha.onrender.com/leadscapture'
    }).then(res => {
      setLeads(res.data.length);
    })

  },[])


  // return (
  //   <Box  sx={{ backgroundColor: '#ebedef',minHeight:'auto' }}>
  //     {/* HEADER */}
  //     <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#ebedef',  }}>
  //       <Header title="DASHBOARD"  />
  //       </Box>
  //       <Box
  //       display="grid"
  //       gridTemplateColumns="repeat(12, 1fr)"
  //       gridAutoRows="140px"
  //       gap="0px"
  //     >
  //       {/* ROW 1 */}
  //       <Box
  //       sx={{marginLeft:'30px'}}
  //       m="10px"
  //       // sx={{ backgroundColor: '#ebedef',minHeight:'100vh' }}
  //         gridColumn="span 4"
  //         backgroundColor='#A8A8A9'
  //         color="white"
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <StatBox
  //           title={leads}
  //           subtitle="Leads"
  //           progress="0.75"
  //           icon={
  //             <Person
  //               sx={{ color: 'white', fontSize: "26px" }}
  //             />
  //           }
  //         />
  //       </Box>
  //       <Box
  //       m="10px"
  //         gridColumn="span 4"
  //         backgroundColor='#A8A8A9'
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <StatBox
  //           title={walkin}
  //           subtitle="Walkin"
  //           progress="0.50"
  //           icon={
  //             <DirectionsWalk
  //               sx={{ color: 'white', fontSize: "26px" }}
  //             />
  //           }
  //         />
  //       </Box>
  //       <Box
  //       sx={{marginRight:'30px'}}
  //       // mr="30px"
  //       m="10px"
  //         gridColumn="span 4"
  //         backgroundColor='#A8A8A9'
  //         display="flex"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <StatBox
  //           title={staff}
  //           subtitle="Staff"
  //           progress="0.30"
  //           icon={
  //             <Groups
  //               sx={{ color: 'white', fontSize: "26px" }}
  //             />
  //           }
  //         />
  //       </Box>

  //       {/* ROW 2 */}
  //       <Box
  //         m="0px"
  //         gridColumn="span 12"
  //         gridRow="span 3"
  //         // backgroundColor='#A8A8A9'
  //       >
  //         <Box
  //           mt="5px"
  //           p="0 30px"
  //         >
            
  //           <Box>
  //             {/* <Typography
  //               variant="h5"
  //               fontWeight="600"
  //               color='black'
  //             >
  //               Visitors
  //             </Typography> */}
  //             <Box
  //                   m="20px 0 0 0"
  //                   height="55vh"
                    
  //                   sx={{

  //                       "& .MuiDataGrid-root": {
  //                           border: "none",
  //                           // width:'400px'
  //                       },
  //                       "& .MuiDataGrid-cell": {
  //                           // borderBottom: "none",
  //                           color: 'black',
  //                           fontSize: '12px'
  //                       },
  //                       "& .name-column--cell": {
  //                           color: 'black',
  //                           fontSize: '12px'
  //                       },
  //                       "& .MuiDataGrid-columnHeaders": {
  //                           backgroundColor: '#A8A8A9',
  //                           borderBottom: "none",
  //                           color: 'white',
  //                           fontSize: '14px'
  //                       },
  //                       "& .MuiDataGrid-virtualScroller": {
  //                           backgroundColor: '#fff',
  //                       },
  //                       "& .MuiDataGrid-footerContainer": {
  //                           borderTop: "none",
  //                           backgroundColor: '#A8A8A9',
  //                           color:'white'
  //                       },
  //                   }}
  //               >
  //                   <DataGrid rows={mockDataContacts} columns={columns} />
  //               </Box>
  //             {/* <Typography
  //               variant="h3"
  //               fontWeight="bold"
  //               color={colors.greenAccent[500]}
  //             >
  //               $59,342.32
  //             </Typography> */}
  //           </Box>
  //           {/* <Box>
  //             <IconButton>
  //               <DownloadOutlinedIcon
  //                 sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
  //               />
  //             </IconButton>
  //           </Box> */}
  //         </Box>
  //         {/* <Box height="250px" m="-20px 0 0 0">
  //           <LineChart isDashboard={true} />
  //         </Box> */}
  //       </Box>

        
  //     </Box>
  //   </Box>
  // );

  return (
    <Box sx={{ backgroundColor: "#ebedef", minHeight: "auto" }}>
      {/* HEADER */} 
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "#ebedef" }}
      >
        <Typography variant="h4" style={{paddingLeft:"20px", color:"#A8A8A9"}}>DASHBOARD</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: theme.spacing(2),
          padding: theme.spacing(2),
        }}
      >
        {/* Leads */}
        <Box
          width={{ xs: "100%", sm: "calc(33.3333% - 16px)" }}
          p={2}
          bgcolor="#A8A8A9"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Person sx={{ fontSize: 32 }} /> {/* Icon */}
          <Typography variant="h6">Leads</Typography> {/* Label */}
          <Typography variant="h6">{leads}</Typography> {/* Value */}
        </Box>

        {/* Walk-in */}
        <Box
          width={{ xs: "100%", sm: "calc(33.3333% - 16px)" }}
          p={2}
          bgcolor="#A8A8A9"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <DirectionsWalk sx={{ fontSize: 32 }} /> {/* Icon */}
          <Typography variant="h6">Walk-in</Typography> {/* Label */}
          <Typography variant="h6">{walkin}</Typography> {/* Value */}
        </Box>

        {/* Staff */}
        <Box
          width={{ xs: "100%", sm: "calc(33.3333% - 16px)" }}
          p={2}
          bgcolor="#A8A8A9"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Groups sx={{ fontSize: 32 }} /> {/* Icon */}
          <Typography variant="h6">Staff</Typography> {/* Label */}
          <Typography variant="h6">{staff}</Typography> {/* Value */}
        </Box>
      </Box>
      {/* Your DataGrid or other content here */}
        {/* ROW 2 */}
     <Box
          m="0px"
          gridColumn="span 12"
          gridRow="span 3"
          // backgroundColor='#A8A8A9'
        >
          <Box
            mt="5px"
            p="0 30px"
          >
            
            <Box>
              {/* <Typography
                variant="h5"
                fontWeight="600"
                color='black'
              >
                Visitors
              </Typography> */}
              <Box
                    m="20px 0 0 0"
                    height="55vh"
                    
                    sx={{

                        "& .MuiDataGrid-root": {
                            border: "none",
                            // width:'400px'
                        },
                        "& .MuiDataGrid-cell": {
                            // borderBottom: "none",
                            color: 'black',
                            fontSize: '12px'
                        },
                        "& .name-column--cell": {
                            color: 'black',
                            fontSize: '12px'
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: '#A8A8A9',
                            borderBottom: "none",
                            color: 'white',
                            fontSize: '14px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color:'white'
                        },
                    }}
                >
                    <DataGrid rows={mockDataContacts} columns={columns} />
                </Box>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography> */}
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          {/* <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box> */}
        </Box>
    </Box>
  );
};

export default Dashboard;
