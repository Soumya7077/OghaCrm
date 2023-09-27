import { useTheme } from "@emotion/react";
import { Box, Button, Card, CardActionArea, CardContent, IconButton, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


const TodaySchedule = () => {
    const theme = useTheme();
    const [assignedList, setAssignedList] = useState([]);
    const [packageId, setPackageId] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ogha.onrender.com/todayschedule/${cookie["staffId"]}`
        }).then(res => {
            const modifiedData = res.data
                .map((entry, index) => ({
                    srNo: index + 1,
                    ...entry,
                }));
            setAssignedList(modifiedData);
        });
    }, []);




    const columns = [
        { field: "srNo", headerName: "Sr No", flex: 1 },

        {
            field: "fullName",
            headerName: "Customer Name",
            width:220,
            editable:'true'
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width:150
            
        },
        {
            field: "email",
            headerName: `Email`,
            width:220,
            editable:'true'
        },
        {
            field: "startDate",
            headerName: "Start Date",
            width:150,
            renderCell: (params) => (
                <Typography>
                  {new Date(params.value).toLocaleDateString()}
                </Typography>
              ),
        },
        {
            field: "perferedTime",
            headerName: "Prefered Time",
            width:150
        },
        {
            field: "subscriptionType",
            headerName: "SubScription Type",
            width:150
        },

    ];

    return (
        <Box pb="20px" sx={{ backgroundColor: '#ebedef', minHeight: 'auto', }}>



            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Today Schedule List" subtitle="" />
            </Box>





            <Box m="20px">

                <Box
                    m="20px 0 0 0"
                    height="65vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            // color:'black'
                        },
                        "& .MuiDataGrid-cell": {
                            // borderBottom: "none",
                            color: 'black',
                            fontSize: '16px'
                        },
                        "& .name-column--cell": {
                            color: 'black',
                            fontSize: '16px'
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: '#A8A8A9',
                            borderBottom: "none",
                            color: 'black',
                            fontSize: '16px',
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color: 'white'
                        },
                    }}
                >
                    <DataGrid rows={assignedList} columns={columns} />
                </Box>
            </Box>


        </Box>

    );
};

export default TodaySchedule;
