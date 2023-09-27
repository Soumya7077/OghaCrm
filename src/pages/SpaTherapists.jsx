import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";


const SpaTherapists = () => {
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
        // {
        //     field: "job",
        //     headerName: "Job Title",
        //     flex: 1,
        // },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
       
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: () => (
                <Typography >
                    <button className="btn  me-2 " title="Edit" ><Link to="/adduser" ><Edit /></Link></button>
                    {/* <button className="btn " title="Delete" data-bs-toggle="modal" data-bs-target="#DeleteModal"><Delete /></button> */}
                    {/* <a href="/followupleads" className="btn" title="Follow Up"><Call /></a> */}
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height:'100vh' }}>

             {/* Edit Modal Starts*/}

             <Box>



<div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark" id="exampleModalLabel">Edit Staff Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <label className="form-label h6 text-dark" >Full Name</label>
                <input type="text" className="form-control" value="Jon Snow" placeholder="Enter Full Name Here" />
                <label className="form-label h6 text-dark" >Phone Number</label>
                <input type="text" className="form-control" value="(665)121-5454" placeholder="Enter Phone Number Here" />
                <label className="form-label h6 text-dark" >Email</label>
                <input type="email" className="form-control" value="jonsnow@gmail.com" placeholder="Enter Email Here" />
                {/* <label className="form-label h6 text-dark" >Job Title</label>
                <input type="text" className="form-control" value="Software developer" placeholder="Enter Job Title Here" /> */}
                <label className="form-label h6 text-dark" >Address</label>
                <input type="text" className="form-control" value="0912 Won Street, Alabama, SY 10001" placeholder="Enter Address Here" />
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
    </div>
</div>
<div className="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark" id="exampleModalLabel">Delete Satff Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h4 className="text-danger">Are You Sure?<br/> Want to delete?</h4>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>
    </div>
</div>
</Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Spa Therapists" subtitle="" />

                <Box marginRight="20px">
                    {/* <button className="btn btn-outline-primary">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/adduser">Add Staff</Link>

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
                            fontSize: '14px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#f7f7f8',
                            color:'black'
                        },
                    }}
                >
                    <DataGrid rows={mockDataContacts} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default SpaTherapists;
