import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const LeadsCapture = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const isActiveValue = { IsActive: 0 }; // , ModifiedBy:cookie["Username"], ModifiedOn:time.toLocaleDateString() + " " + time.toLocaleTimeString()
  const navigate = useNavigate();
  const [cookie, setCookie, removeCokie] = useCookies();
  const [leadId, setLeadId] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://ogha.onrender.com/leadscapture",
    }).then((res) => {
      const modifiedData = res.data.map((entry, index) => ({
        srNo: index + 1, // Adding 1 to start Sr.No from 1
        ...entry,
      }));
      console.log(modifiedData);
      setData(modifiedData);
      //   console.log(modifiedData);
    });
  }, []);

  // function AddClick(e){
  //       var createLead = "Create A new Lead";
  //       setCookie('addBtn', e.target.value);
  //       setCookie('create', createLead)
  //       navigate("/addlead");
  // }


  function DeleteClick(Id) {
    setLeadId(Id);
    // setIsDeleteModalOpen(true); // Open the delete confirmation modal
  }

  function DeleteLeadClick(e) {
    if (e.type === "click") {
      axios({
        method: "put",
        url: `https://ogha.onrender.com/deletelead/${leadId}`,
        data: { IsActive: 0 },
      }).then(window.location.reload());
    }
    console.log(leadId);
  }


  

  // function handleOnClickDelete(e) {
  //   // console.log(e);
  //   var flag = window.confirm(`Are you sure ?\nWant to Delete? ${e}`);

  //   if (flag == true) {
  //     axios({
  //       method: "put",
  //       url: `https://ogha.onrender.com/deletelead/${e}`,
  //       data: isActiveValue,
  //     }).then(window.location.reload());
  //   } else {
  //     alert("Cancel");
  //   }
  // }

  const columns = [
    { field: "srNo", headerName: "Sr.No", width: 60 },
    {
      field: "fullName",
      headerName: "Name",
      width:220,
      editable:'true',
      // flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width:150,
      cellClassName: "name-column--cell",
    },
    { field: "emailAddress", headerName: "Email",width:220, editable:'true' },
    { field: "jobTitle", headerName: "Job Title", width:220 },
    { field: "address", headerName: "Address", width:220, editable:'true' },
    { field: "source", headerName: "Source", width:100 },
    //   { field: "isInterested", headerName: "Is Interested", flex: 1 },
    //   { field: "folloupDateTime", headerName: "Followup Date-Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width:150,
      renderCell: (params) => (
        <Typography color="#0088CE">
          <button
            className="btn"
            style={{ color: "#0088CE" }}
            title="Edit"
            value="editBtn"
          >
            {/* <Link to={`/addlead/${params.row.id}`}>
                  <Edit />
                </Link> */}

            <Link to={`/addlead/${params.id}`}>
              <Edit />
            </Link>
          </button>
          <IconButton
            onClick={() => DeleteClick(params.id)}
            style={{ color: "#A8A8A9" }}
            aria-label="delete"
            data-bs-toggle="modal"
            data-bs-target="#DeleteModal"
          >
            <Delete />
          </IconButton>
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#ebedef", minHeight: "auto" }}>
      {/* Edit Modal Starts*/}

      <Box>
        <div className="modal fade" id="DeleteModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Delete Lead Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <h4 className="text-danger">
                  Are You Sure?
                  <br /> Want to delete?
                </h4>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    value="Delete"
                    id="Delete"
                    onClick={DeleteLeadClick}
                    className="btn btn-danger"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Leads Capture" subtitle="" />

        <Box marginRight="20px">
          <Link
            className="btn"
            style={{
              border: "0.5px solid #0088CE",
              color: "#0088CE",
              fontWeight: "500",
            }}
            to="/addlead"
          >
            {/* <Link style={{ textDecoration: 'none', color: 'black' }} to="/addlead">Add Leads</Link> */}
            Add Leads
          </Link>
        </Box>
      </Box>
      <Box m="20px">
        <Box
          m="20px 0 0 0"
          height="75vh"
          width="100%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
              color: "black",
              fontSize: "16px",
            },
            "& .name-column--cell": {
              color: "black",
              fontSize: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#A8A8A9",
              borderBottom: "none",
              minHeight: "5px",
              color: "#000",
              fontSize: "16px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#A8A8A9",
              height: "5px",
              color: "white",
            },
          }}
        >
          <DataGrid rows={data} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

export default LeadsCapture;