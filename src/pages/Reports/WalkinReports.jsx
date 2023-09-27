import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const WalkinReport = () => {
  const theme = useTheme();
  const [data, setData] =  useState([]);

  useEffect(()=>{
    axios({
      method:'get',
      url:'http://127.0.0.1:5050/getWalkinCustomer'
    }).then(res=>{
      const formatData = res.data.map((item, index) => ({
        ...item, srNo:index+1
      }));
      // console.log(formatData);
      setData(formatData);
    })
  },[])

  const columns = [
    { field: "srNo", headerName: "Sr No" },
    {
      field: "fullName",
      headerName: "Name",
      width:220,
      editable:'true',
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width:150
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width:220,
      editable:'true'
    },
    {
      field: "Remark",
      headerName: "Remark",
      width:220,
      editable:'true'
    },
    
  ];

  return (
    <Box sx={{ backgroundColor: "#ebedef", height: "auto" }}>
      {/* <Header title="Walkin Customers" subtitle="" /> */}
      
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Walkin Report" subtitle="" />
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
              color: "black",
              fontSize: "16px",
            },
            "& .name-column--cell": {
              color: 'black',
              fontSize: "16px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#A8A8A9",
              borderBottom: "none",
              color: 'black',
              fontSize: "16px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#A8A8A9",
              color: "black",
            },
            
          }}
        >
          <DataGrid rows={data} columns={columns} />
        </Box>
      </Box>

      <div
        class="modal fade"
        id="edit"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Walkin Customer Edit
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div>
                  <label className="text-dark form-label"> Name </label>
                  <div>
                    <input
                      type="text"
                      value="Jon Snow"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-dark form-label"> Phone Number</label>
                  <div>
                    <input
                      type="text"
                      value="(665)121-5454"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-dark form-label">
                    {" "}
                    Email Address{" "}
                  </label>
                  <div>
                    <input
                      type="text"
                      value="jonsnow@gmail.com"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-dark form-label"> Remark </label>
                  <div>
                    {/* <input type="text" className="form-control"/> */}
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="Followup"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                Follow-up Details
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                {/* <!-- Follow-up Date --> */}
                <div className="form-group">
                  <label for="followupDate" className="form-label text-dark">
                    Follow-up Date
                  </label>
                  <input type="date" class="form-control" id="followupDate" />
                </div>
                {/* <!-- Follow-up Purpose --> */}
                <div className="form-group">
                  <label for="followupPurpose" className="form-label text-dark">
                    Follow-up Purpose
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="followupPurpose"
                  />
                </div>
                {/* <!-- Follow-up Notes --> */}
                <div className="form-group">
                  <label for="followupNotes" className="form-label text-dark">
                    Follow-up Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="followupNotes"
                    rows="3"
                  />
                </div>
                {/* <!-- Follow-up Outcome --> */}
                <div class="form-group">
                  <label for="followupOutcome" className="form-label text-dark">
                    Follow-up Outcome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="followupOutcome"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="thankyou"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h2 className="text-dark"> Dear Pradip,</h2>
              <h4 className="text-dark" style={{ textAlign: "justify" }}>
                {" "}
                Thank you for choosing us for your fitness, spa, salon, and
                rejuvenation needs. Your support means the world to us. We look
                forward to serving you again soon!
              </h4>
              <div>
                <h4 className="text-dark">Best regards,</h4>
                <h2 className="text-dark" style={{ marginLeft: "30px" }}>
                  {" "}
                  Ogha
                </h2>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default WalkinReport;