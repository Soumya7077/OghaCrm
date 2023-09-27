import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";




const LeadsReport = () => {
    const [data, setData] = useState([]);
    const theme = useTheme();
    const isActiveValue = { IsActive: 0 }
    const navigate = useNavigate();
    const [cookie, setCookie, removeCokie] = useCookies();

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://ogha.onrender.com/leadscapture'
        }).then(res => {
            const modifiedData = res.data.map((entry, index) => ({
                srNo: index + 1, // Adding 1 to start Sr.No from 1
                ...entry,
            }));
            console.log(modifiedData);
            setData(modifiedData);
        });
    }, []);






    function handleOnClickDelete(e) {
        var flag = window.confirm(`Are you sure ?\nWant to Delete? ${e}`)
        if (flag == true) {
            axios({
                method: 'put',
                url: `https://ogha.onrender.com/deletelead/${e}`,
                data: isActiveValue
            }).then(
                window.location.reload()
            )
        } else {
            alert("Cancel");
        }
    }


    const columns = [
        { field: "srNo", headerName: "Sr.No", width: 60 },
        {
            field: "fullName",
            headerName: "Name",
            width:220,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        { field: "phoneNumber", headerName: "Phone Number", width:150, cellClassName: "name-column--cell" },
        { field: "emailAddress", headerName: "Email", width:220, editable:'true' },
        { field: "jobTitle", headerName: "Job Title", width:220 },
        { field: "address", headerName: "Address", width:220, editable:'true' },
        { field: "source", headerName: "Source", width:150 },
    ];


    return (
        <Box sx={{ backgroundColor: '#ebedef', minHeight: 'auto' }}>
            <Box>
            </Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Leads Report" subtitle="" />
            </Box>
            <Box m="20px">

                <Box
                    m="20px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
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
                            minHeight: '5px',
                            // color: colors.primary[800],
                            color: "#fff",
                            fontSize: '18px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            height: '5px',
                            color: 'white'
                        },
                    }}
                >
                    <DataGrid rows={data} columns={columns} />
                </Box>
            </Box>


        </Box>

    );
};

export default LeadsReport;