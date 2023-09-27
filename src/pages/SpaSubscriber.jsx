import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";


const SpaSubscriber = () => {
    const theme = useTheme();
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
            field: "intime",
            headerName: " Start Time",
            flex: 1,
        },
        {
            field: "outtime",
            headerName: "End Time",
            flex: 1,
        },
        // {
        //     field: "for",
        //     headerName: "Subscribed For",
        //     flex: 1,
        // },
        // {
        //     field: "subscription",
        //     headerName: "Subscription Type",
        //     flex: 1,
        // },
        // {
        //     field: "startdate",
        //     headerName: "Start Date",
        //     flex: 1,
        // },
        
        // {
        //     field: "paid",
        //     headerName: "Amount Paid",
        //     flex: 1,
        // },
        // {
        //     field: "remaining",
        //     headerName: "Number Of Days",
        //     flex: 1,
        //     cellClassName: "remaining-days"
        // },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: () => (
                <Typography >
                    <button className="btn" title="Edit" data-bs-toggle="modal" data-bs-target="#editModal"><Edit /></button>
                    {/* <a href="/followupleads" className="btn" title="Follow Up"><Call /></a> */}
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', minHeight:'100vh' }}>

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
                <input type="email" className="form-control" value="jonsnow@gmail.com" placeholder="Enter Email Here" />
                <label className="form-label h6 text-dark" >Time</label>
                <input type="text" className="form-control" value="9:00" placeholder="Enter Start Time Here" />
                <label className="form-label h6 text-dark" >Time</label>
                <input type="text" className="form-control" value="10:30" placeholder="Enter End Time Here" />
               
               
                {/* <label className="form-label h6 text-dark" >Subscribed For</label> */}
                {/* <input type="text" className="form-control" value="Gym" placeholder="Enter Job Title Here" />
                <label className="form-label h6 text-dark" >Start Date</label> */}
                {/* <input type="text" className="form-control" value="12-09-2022" placeholder="Enter Address Here" />
                <label className="form-label h6 text-dark" >Subscription Type</label> */}
                {/* <select name="" id="" className="form-select" value="Premium">
                    <option>Choosee...</option>
                    <option>Premium</option>
                    <option>Professional</option>
                    <option>Starter</option>
                    <option>Basic</option>
                </select> */}
                {/* <label className="form-label h6 text-dark" >Amount Paid</label>
                <input type="text" className="form-control" value="10000" placeholder="Enter Amount Paid" /> */}
                {/* <label className="form-label h6 text-dark" >Number Of Days</label>
                <input type="text" className="form-control" value="100" placeholder="Enter Number of days" /> */}
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
                            fontSize: '12px'
                        },
                        "& .name-column--cell": {
                            color: 'black',
                            fontSize: '12px'
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: '#f7f7f8',
                            borderBottom: "none",
                            color: 'gray',
                            fontSize: '14px',
                            fontWeight:900
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#f7f7f8',
                            color:'black'
                        },
                        "& .remaining-days": {
                            justifyContent:'center',
                            alignItems:'center'
                        },
                    }}
                >
                    <DataGrid rows={mockDataContacts} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default SpaSubscriber;
