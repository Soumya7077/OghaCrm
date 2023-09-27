import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit, Mail, Message, WindPowerOutlined } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";


const PromotionMail = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [mailBody, setMailBody] = useState('');
    const [selectedEmailAddresses, setSelectedEmailAddresses] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);




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
            //   console.log(modifiedData);
        });
    }, []);

    function MailChange(e) {
        setMailBody(e.target.value);
    }

    const openEditModal = (emailAddress) => {
        if (selectedEmailAddresses.includes(emailAddress)) {
            setSelectedEmailAddresses(selectedEmailAddresses.filter(email => email !== emailAddress));
        } else {
            setSelectedEmailAddresses([...selectedEmailAddresses, emailAddress]);
        }
    };


    const SendMailClick = () => {
        selectedEmailAddresses.forEach(emailAddress => {
            const requestData = {
                selectedEmailAddress: emailAddress,
                mailBody: mailBody
            };
            axios({
                method: 'post',
                url: `https://ogha.onrender.com/sendmail`,
                data: requestData
            }).then(res => {
                console.log("Mail Sent to:", emailAddress);
            });
        });
    };

    function handleChange(selectedRowIds) {
        const selectedEmailAddresses = selectedRowIds.map((selectedId) => {
            const selectedRow = data.find((row) => row.id === selectedId);
            return selectedRow?.emailAddress;
        });
    
        console.log("Selected Email Addresses:", selectedEmailAddresses);
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
        { field: "address", headerName: "Address", width:150, editable:'true' },
        { field: "source", headerName: "Source", width:150 },
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (params) => (
                <Typography >
                    <button
                    style={{ color:'#A8A8A9', fontWeight:'800'}}
                        className="btn"
                        title="sendmail"
                        onClick={() => openEditModal(params.row.emailAddress)}
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                    >
                        <Message />
                    </button>
                </Typography>
            ),

        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height: 'auto' }}>

            {/* Edit Modal Starts*/}

            <Box>
                <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark" id="exampleModalLabel">Send a mail</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label h6 text-dark" >To Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={selectedEmailAddresses}
                                    placeholder="Enter Email Here"
                                    readOnly
                                />

                                <label className="form-label h6 text-dark" >Type a mail</label>
                                <textarea name="" onChange={MailChange} className="form-control" id="" cols="30" rows="5"></textarea>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={SendMailClick} data-bs-dismiss="modal">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            <Box>
                <div className="modal fade" id="MailModal" tabindex="-1" aria-labelledby="mailModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark" id="exampleModalLabel">Send a mail</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* <label className="form-label h6 text-dark" >Email</label> */}
                                {/* <textarea type="textarea" className="form-control" value={selectedEmailAddresses} placeholder="Enter Email Here" ></textarea> */}
                                <label className="form-label h6 text-dark" >Write a Promotion Message</label>
                                <textarea name="" onChange={MailChange} className="form-control" id="" cols="30" rows="5"></textarea>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn" style={{border:'0.5px solid #0088CE', color:'#A8A8A9', fontWeight:'800', backgroundColor:'#0088CE'}}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Send Promotion Email" subtitle="" />

                <Box marginRight="20px">
                    <button className="btn" style={{border:'0.5px solid #0088CE', color:'#A8A8A9', fontWeight:'800'}} data-bs-target="#MailModal" data-bs-toggle="modal">
                        Send Mail To All

                    </button  >
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
                            color: '#000',
                            fontSize: '16px'
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: '#fff',
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: '#A8A8A9',
                            color: 'white'
                        },
                    }}
                >
                    {/* <DataGrid onSelectionModelChange={e =>handleChange(data[e])} checkboxSelection rows={data} columns={columns} /> */}
                    <DataGrid
                        checkboxSelection
                        rows={data}
                        columns={columns}
                        onSelectionModelChange={(selectionModel) => handleChange(selectionModel)}
                    />

                </Box>
            </Box>


        </Box>

    );
};

export default PromotionMail;
