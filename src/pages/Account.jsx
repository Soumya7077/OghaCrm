import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit, Mail, Message, Payment } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


const Account = () => {
    const theme = useTheme();
    const [paymentData, setPaymentData] = useState([]);
    const currentDate= new Date().toLocaleDateString()
    const voucherNo = "Ogh";
    const componentPDF = useRef();
    const [voucher, setVoucher] = useState({voucherNo:voucherNo,towards:"", paidTo:"Ogha", rupees:'',   })

    useEffect(() => {
        axios({
            method:"get",
            url:'http://127.0.0.1:5050/getCustomerList'
        }).then(res => {
            const modifiedData = res.data
                .map((entry, index) => ({
                    srNo: index + 1,
                    ...entry,
                }));
                setPaymentData(modifiedData);
        })
    },[]);

    function PaymentClick(e)
    {
        axios({
            method:'get',
            url:`http://127.0.0.1:5050/getCustomerListById/${e.target.value}`
        }).then(res => {
            setVoucher({
                towards:res.data.userName,
                rupees:res.data.cost
            })
        })
    }

    

    const GeneratePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Payment Invoice",
        onAfterPrint: () => alert("Generate a payment invoice in PDF")
    })

    const columns = [
        { field: "srNo", headerName: "Sr No", flex: 1 },
        {
            field: "userName",
            headerName: "Name",
            width:220,
            editable:'true',
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            width:150
        },
        {
            field: "email",
            headerName: "Email",
            width:220,
            editable:'true'
        },
        {
            field: "service",
            headerName: "Subscription For",
            width:150
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            width:150
        },
        {
            field: "cost",
            headerName: "Subscription Cost",
            width:150
        },
        {
            field: "packageName",
            headerName: "Package Name",
            width:150
        },
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (params) => (
                <Typography color='#0088CE'>
                    <button style={{
                    border: "0.5px solid #0088CE",
                    color: "#A8A8A9",
                    fontWeight: "500",
                  }} className="btn" onClick={PaymentClick} value={params.id} title="payment" data-bs-toggle="modal" data-bs-target="#paymentModal">Payment </button>

                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height: 'auto' }}>
            <Box>
            <div className="modal fade" id="paymentModal" >
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-body" ref={componentPDF}>
                <div className="row">
                    <div className="col-md-4 text-dark">
                        <div className="company-info">
                            <h4>Ogha</h4>
                            <p>Hi-Tech City, Hyderabad</p>
                            <p>Date: {currentDate}</p>
                        </div>
                    </div>
                    <div className="col-md-8 text-dark">
                        <div className="payment-invoice">
                            <div className="invoice-header">
                                <h3 className="text-center">Payment Invoice</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table text-dark">
                    <tr>
                        <td>Voucher No:</td>
                        <td style={{ borderBottom: "1px solid black"}}>12345</td>
                        <td style={{ paddingLeft: "300px", borderBottom: "1px solid black", width: "100px" }}>Dated: {currentDate}</td>
                    </tr>
                    <tr>
                        <td>Towards:</td>
                        <td colSpan="3" style={{ borderBottom: "1px solid black", width: "100px" }}>{voucher.towards}</td>
                    </tr>
                    <tr>
                        <td>Paid To:</td>
                        <td colSpan="3" style={{ borderBottom: "1px solid black", width: "100px" }}>Ogha</td>
                    </tr>
                    <tr>
                        <td style={{ width: "200px" }}>Sum of Rupees:</td>
                        <td colSpan="3" style={{ borderBottom: "1px solid black", width: "500px" }}> &#8377; {voucher.rupees}</td>
                    </tr>
                    {/* <tr>
                        <td>In Words:</td>
                        <td colSpan="3" style={{ borderBottom: "1px solid black", width: "100px" }}>One Hundred Thousand</td>
                    </tr> */}
                    
                </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={GeneratePdf}>Send</button>
            </div>
        </div>
    </div>
</div>

            </Box>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Payment" subtitle="" />
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
                            color: 'black'
                        },
                        
                    }}
                >
                    <DataGrid rows={paymentData} columns={columns} />
                </Box>
            </Box>


        </Box>

    );
};

export default Account;
