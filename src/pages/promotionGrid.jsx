import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";


const PromotionGrid = () => {
    const theme = useTheme();
    const [promotionData, setPromotionData] = useState([]);
    const [promotionId, setPromotionId] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        axios({
            method:'get',
            url:'https://ogha.onrender.com/promotion'
        }).then(res => {
            const modifiedData = res.data.map((entry, index)=>({
                srNo: index+1,
                ...entry
            }));
            setPromotionData(modifiedData);
        })
    },[]);

    function DeleteClick(id) {
        setPromotionId(id);
        setIsDeleteModalOpen(true); 
    }
    

    function DeletePromotionClick(e)
    {
        if(e.type === "click"){
            axios({
                method:'put',
                url:`https://ogha.onrender.com/deletePromotion/${promotionId}`,
                data:{IsActive:0}
            }).then(res => {
                console.log(res.data);
                // window.location.reload();
            });
        }
        console.log(promotionId);
    }

    const columns = [
        { field: "srNo", headerName: "Sr No", width: 60 },
        {
            field: "promotionName",
            headerName: "Name",
            flex: 1,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        {
            field: "promotionDate",
            headerName: "Promotion Date",
            flex: 1,
            renderCell: (params) => (
              new Date(params.value).toLocaleDateString() // Corrected code
            ),
          },
          
          {
            field: "promotionDescription",
            headerName: "Promotion Description",
            flex: 1,
            editable:'true',
            renderCell: (params) => (
              <span>
                {params.row.descriptionEmail ? params.row.descriptionEmail : params.row.descriptionMessage}
              </span>
            ),
          },
       
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => (
                <Typography>
                    <button className="btn  me-2" title="Edit" ><Link className="btn" to={`/editPromotion/${params.id}`} style={{color:'#0088CE'}}><Edit /></Link></button>
                    <button className="btn" style={{color:'#A8A8A9'}} onClick={() => DeleteClick(params.id)} title="Delete" data-bs-toggle="modal" data-bs-target="#DeleteModal"><Delete /></button>
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height:'auto' }}>

             {/* Edit Modal Starts*/}

             <Box>





    <div className="modal fade" id="DeleteModal"  >
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
                <button type="submit" value="Delete" id="Delete" onClick={DeletePromotionClick} className="btn btn-danger">Yes</button>
            </div>
        </div>
    </div>
    </div>
</div>

</Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Promotion Management" subtitle="" />

                <Box marginRight="20px">
                    
                        <Link className="btn" style={{ textDecoration: 'none', border:'0.5px solid #0088CE', color:'#A8A8A9' }} to="/promotion">Add Promotion</Link>
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
                    <DataGrid rows={promotionData} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default PromotionGrid;
