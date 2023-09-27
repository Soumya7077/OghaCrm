import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";  


const UserGrid = () => {
    const theme = useTheme();
    const [staffData, setStaffData] = useState([]);
    const [staffId, setStaffId] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        axios({
            method:'get',
            url:'https://ogha.onrender.com/getstaffdetails'
        }).then(res => {
            const modifiedData = res.data.map((entry, index)=>({
                srNo: index+1,
                ...entry
            }));
            setStaffData(modifiedData);
        })
    },[]);

    function DeleteClick(staffId) {
        setStaffId(staffId);
        // setIsDeleteModalOpen(true); // Open the delete confirmation modal
    }
    

    function DeleteStaffClick(e)
    {
        if(e.type === "click"){
            axios({
                method:'put',
                url:`https://ogha.onrender.com/deletestaff/${staffId}`,
                data:{IsActive:0}
            }).then(
                window.location.reload()
            )
        }
        console.log(staffId);
    }

    const activeStaffData = staffData.filter((entry) => entry.IsActive === 1);

    const columns = [
        { field: "srNo", headerName: "Sr No", width: 60 },
        {
            field: "FullName",
            headerName: "Name",
            width:220,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        {
            field: "PhoneNumber",
            headerName: "Phone Number",
            width:150
        },
        {
            field: "Email",
            headerName: "Email",
            width:220,
            editable:'true'
        },
        {
            field: "JobTitle",
            headerName: "Job Title",
            width:220
        },
        {
            field: "Address",
            headerName: "Address",
            width:220
        },
       
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (params) => (
                <Typography>
                    <button className="btn  me-2" title="Edit" ><Link className="btn" style={{color:'#0088CE'}} to={`/editstaff/${params.id}`}><Edit /></Link></button>
                    <button className="btn" style={{color:'#A8A8A9'}} onClick={() => DeleteClick(params.id)} title="Delete" data-bs-toggle="modal" data-bs-target="#DeleteModal"><Delete /></button>
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height:'auto' }}>

             {/* Edit Modal Starts*/}

             <Box>





    <div className="modal fade" id="DeleteModal">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark">Delete Satff Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <h4 className="text-danger">Are You Sure?<br/> Want to delete?</h4>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" value="Delete" id="Delete" onClick={DeleteStaffClick} className="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>
    </div>
</div>

</Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Staff Management" subtitle="" />

                <Box marginRight="20px">
                    
                        <Link className="btn"  style={{fontWeight:"700", border:"2px solid #0088CE",color:"#A8A8A9", textDecoration: 'none'}}   to="/adduser">Add Staff</Link>
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
                            fontSize: '16px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color:'black'
                        },
                    }}
                >
                    <DataGrid rows={activeStaffData} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default UserGrid;