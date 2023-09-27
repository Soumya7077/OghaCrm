import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const GymSubscriber = () => {
    const theme = useTheme();
    const params = useParams();
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        // console.log("res.params", params)
        axios({
            method: 'get',
            url: "https://ogha.onrender.com/getSubscriber/" +(params.type)
        }).then(
            res => {
                const modifiedData = res.data.map((entry, index) => ({
                    srNo: index + 1,
                    ...entry
                }));
                setTypeData(modifiedData)
            })
    }, [params.type])
    const columns = [
        { field: "srNo", headerName: "Sr.No", flex: 1 },
        {
            field: "fullName",
            headerName: "Name",
            flex: 1,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            editable:'true'
        },
        {
            field: "perferedTime",
            headerName: "Time",
            flex: 1,
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', minHeight:'auto' }}>

             {/* Edit Modal Starts*/}

             <Box>



<div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark" id="exampleModalLabel">Edit Subscriber</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <label className="form-label h6 text-dark" >Full Name</label>
                <input type="text" className="form-control" value="Jon Snow" placeholder="Enter Full Name Here" />
                <label className="form-label h6 text-dark" >Phone Number</label>
                <input type="text" className="form-control" value="(665)121-5454" placeholder="Enter Phone Number Here" />
                <label className="form-label h6 text-dark" >Email</label>
                <input type="text" className="form-control" value="9:00" placeholder="Enter Job Title Here" />
                <label className="form-label h6 text-dark" >Time</label>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Subscribed List" subtitle="" />

                <Box marginRight="20px">
                    {/* <button className="btn btn-outline-primary">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/addsubscribeduser">Add New Subscriber</Link>

                    </button  > */}
                </Box>
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
                            color: 'black',
                            fontSize: '16px',
                            fontWeight:900
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color:'white'
                        },
                        "& .remaining-days": {
                            justifyContent:'center',
                            alignItems:'center'
                        },
                    }}
                >
                    <DataGrid rows={typeData} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default GymSubscriber;