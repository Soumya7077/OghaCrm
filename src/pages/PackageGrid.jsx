import { useTheme } from "@emotion/react";
import { Box, Button, Card, CardActionArea, CardContent, IconButton, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";


const PackageGrid = () => {
    const theme = useTheme();
    const [packageData, setPackageData] = useState([]);
    const [packageId, setPackageId] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5050/getpackages'
        }).then(res => {
            const modifiedData = res.data
                .map((entry, index) => ({
                    srNo: index + 1,
                    ...entry,
                }));
            setPackageData(modifiedData);
        });
    }, []);


    function DeleteClick(packageId) {
        setPackageId(packageId);
        setIsDeleteModalOpen(true);
    }

    function DeletePackageClick(e) {
        if (e.type === "click") {
            axios({
                method: 'put',
                url: `http://127.0.0.1:5050/deletePackage/${packageId}`,
                data: { IsActive: 0 }
            }).then(
                window.location.reload()
            )
        }
        console.log(packageId);
    }


    const subscriptionOptions = {
        3: "Gym",
        4: "Spa",
        5: "Salon",
        6: "Rejuvenation/ Aesthetics",
    };

    const columns = [
        { field: "srNo", headerName: "Sr No", width:90 },

        {
            field: "packageName",
            headerName: "Package Name",
            width:220,
            editable:'true'
        },
        {
            field: "cost",
            headerName: "Cost in Rs.",
            width:150
        },
        {
            field: "description",
            headerName: "Description",
            width:220,
            editable:'true'
        },
        {
            field: "duration",
            headerName: "Duration in days",
            width:150
        },
        {
            field: "forService",
            headerName: "For Service",
            width:150,
            valueGetter: (params) => subscriptionOptions[params.value]
        },
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (params) => (
                <Typography>
                    <button className="btn" title="Edit" value="editBtn">
                        <Link to={`/editPackage/${params.id}`} style={{color:'#0088CE'}}>
                            <Edit />
                        </Link>
                    </button>
                    <button className="btn" style={{color:'#A8A8A9'}} onClick={() => DeleteClick(params.id)} title="Delete" data-bs-toggle="modal" data-bs-target="#DeleteModal"><Delete /></button>
                </Typography>
            ),
        },

    ];

    return (
        <Box pb="20px" sx={{ backgroundColor: '#ebedef', minHeight: 'auto', }}>

            <Box>
                {isDeleteModalOpen && (
                    <div className="modal fade" id="DeleteModal" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-dark" id="exampleModalLabel">Delete Satff Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h4 className="text-danger">Are You Sure?<br /> Want to delete?</h4>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" value="Delete" id="Delete" onClick={DeletePackageClick} className="btn btn-danger">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Box>


            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Packages Grid View" subtitle="" />

                <Box marginRight="20px">

                    {/* <Link style={{ textDecoration: 'none', color: 'black' }} to="/addlead">Add Leads</Link> */}
                    <Link className="btn" style={{fontWeight:"700", border:"0.5px solid #0088CE",color:"#A8A8A9"}} to="/packages">Add Packages</Link>

                </Box>

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
                            fontSize: '16px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff !important',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color: 'black'
                        },
                    }}
                >
                    <DataGrid rows={packageData} columns={columns} />
                </Box>
            </Box>


        </Box>

    );
};

export default PackageGrid;