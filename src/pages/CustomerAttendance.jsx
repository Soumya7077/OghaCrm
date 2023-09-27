import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";


const CustomerAttendance = () => {
    const theme = useTheme();
    const [customers, setCustomers] = useState([]);
    const [data, setdata]=useState({});
    const [attendence, setAttendence] = useState([]);
    const currentDate = new Date().toLocaleDateString();
    const [error, setError] = useState({dateError:"", intimeError:"", outtimeError:"", remarksError:""});
    const [formValue, setFormValue] = useState({date:'',intime:'', outtime:'', remarks:''});

    useEffect(() => {
        axios({
          method: "get",
          url: "https://ogha.onrender.com/getCustomerList",
        }).then((res) => {
          const modifiedData = res.data.map((entry, index) => ({
            srNo: index + 1,
            ...entry,
            intime: "",
            outtime: "",
            remarks: "",
          }));
    
          const promises = modifiedData.map((entry) => {
            return axios.get(
              `https://ogha.onrender.com/getCustomerAttendence/${entry.id}`
            );
          });
    
          Promise.all(promises)
            .then((responses) => {
              const updatedData = responses.map((response, index) => {
                const relatedInfo = response.data;
                if (relatedInfo.length > 0) {
                  return {
                    ...modifiedData[index],
                    intime: relatedInfo[0].intime || "",
                    outtime: relatedInfo[0].outtime || "",
                    remarks: relatedInfo[0].remarks || "",
                  };
                } else {
                  return modifiedData[index]; // Keep the original data if no attendance info
                }
              });
    
              setAttendence(updatedData)
            })
            .catch((error) => {
              console.error("Error fetching related info:", error);
            });
        });
      }, []);
    
      useEffect(() => {
        console.log("attendence has been updated:", attendence);
        // Perform any additional actions here
      }, [attendence]);


    const handleChange = (key, value) => {
        setFormValue((data) => ({
          ...data,
          [key]: value,
        }));
      };

    function setdataClick(e)
    {
        axios({
            method:'get',
            url:`https://ogha.onrender.com/getCustomerListById/${e}`
        }).then(res => {
            setdata(res.data);
        })
        axios({
            method:'get',
            url:'https://ogha.onrender.com/getCustomerAttendence/'+e
        }).then(res => {
           console.log(res.data);
        })
    }

    function AttendenceClick(e){
        e.preventDefault();
        const values = {customerId : data.id, customerName: data.userName, phoneNo: data.phone, email: data.email, date:formValue.date,intime:formValue.intime, outtime:formValue.outtime, remarks:formValue.remarks }
        if(formValue.date == ""){
            setError({
                dateError:"Please Select a date"
            });
        }else if(formValue.intime == "") {
            setError({
                intimeError:"Please Select In Time"
            });
        }else if(formValue.outtime == ""){
            setError({
                outtimeError:"Please Select Out Time"
            });
        }else if(formValue.remarks == ""){
            setError({
                remarksError:"Please Select Remarks"
            });
        }
        else {
            axios({
                method:'post',
                url:'https://ogha.onrender.com/saveattendence',
                data:values
            }).then(
                window.location.reload()
            )
        }

        
    }

    const columns = [
        { field: "srNo", headerName: "Sr No", flex: 1 },
        {
            field: "userName",
            headerName: "Customer Name",
            width:220,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone No",
            width:150
        },
        {
            field: "email",
            headerName: "Email",
            width:220,
            editable:'true'
        },
        {
            field: "intime",
            headerName: "In Time",
            width:100
        },
        {
            field: "outtime",
            headerName: "Out Time",
            width:100
        },
        {
            field: "remarks",
            headerName: "Remarks",
            width:220,
            editable:'true'
        },
        
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (params) => (
                <Typography>
                    <button
                        className="btn"
                        style={{ color: "#0088CE" }}
                        title="Edit"
                        onClick={() => setdataClick(params.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                    >
                        <Edit />
                    </button>
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height:'auto' }}>

             {/* Edit Modal Starts*/}

             <Box>



<div className="modal fade" id="editModal" >
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark">Edit Customer Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <label className="form-label h6 text-dark" >Full Name</label>
                <input type="text" className="form-control" value={data.userName} placeholder="Enter Full Name Here" />
                {/* <label className="form-label h6 text-dark" >At</label>
                <input type="text" className="form-control" value="Gym" placeholder="Enter Phone Number Here" /> */}
                <label className="form-label h6 text-dark" >Date</label>
                <input type="date" required className="form-control" onChange={e => handleChange('date',e.target.value)} placeholder="Enter Email Here" />
                <span className="text-danger">{error.dateError}</span><br/>
                <label className="form-label h6 text-dark" >In Time</label>
                <input type="time" required className="form-control" onChange={e => handleChange('intime',e.target.value)}  />
                <span className="text-danger">{error.intimeError}</span><br/>
                <label className="form-label h6 text-dark" >Out Time</label>
                <input type="time" required className="form-control" onChange={e => handleChange('outtime',e.target.value)} />
                <span className="text-danger">{error.outtimeError}</span><br/>
                <label className="form-label h6 text-dark" >Remarks</label>
               <textarea className="form-control" onChange={e => handleChange('remarks',e.target.value)}></textarea>
               <span className="text-danger">{error.remarksError}</span>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn" onClick={AttendenceClick} style={{backgroundColor:'#0088CE'}}>Save changes</button>
            </div>
        </div>
    </div>
</div>
</Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Customer Attendence" subtitle="" />

                {/* <Box marginRight="20px">
                    <button className="btn btn-outline-primary">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/addcustomer">Add New Customer</Link>

                    </button  >
                </Box> */}
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
                            color:'white'
                        },
                    }}
                >
                    <DataGrid rows={attendence} columns={columns} />
                </Box>
            </Box>

           
        </Box>

    );
};

export default CustomerAttendance;
