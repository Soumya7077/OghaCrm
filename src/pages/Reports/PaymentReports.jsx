import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"

import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";



const PaymentReports = () => {


    const [paymentData, setPaymentData] = useState();
    const [dateValue, setDateValue] = useState({ fromdate: '', todate: '' });
    const [paymentStatus, setPaymentStatus] = useState('');



    const handleValue = (key, value) => {
        setDateValue(prevValue => ({
            ...prevValue,
            [key]: value
        }))
        console.log(dateValue);
    };

    const handlePayment = (e) => {
        setPaymentStatus(e.target.value);
    }

    const getPaymentReport = () => {
        axios
            .get(`https://ogha.onrender.com/getpaymentreport?fromdate=${dateValue.fromdate}&todate=${dateValue.todate}&paymentStatus=${paymentStatus}`)
            .then((res) => {
                console.log(res.data);
                setPaymentData(res.data); // Uncomment this line to update state
            })
            .catch((error) => {
                console.error("Error fetching subscriber data:", error);
            });


    };

    const addSrNoToData = (paymentData) => {
        if (!paymentData || paymentData.length === 0) {
            return [];
        }

        return paymentData.map((row, index) => ({
            ...row,
            srNo: index + 1
        }));
    };





    const columnsWithoutPaidDate = [
        { field: "srNo", headerName: "Sr No", width: 60 },
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
          headerName: "Package For",
          width:150
        },
        {
          field: "packageName",
          headerName: "Package Name",
          width:220,
          editable:'true'
        },
        {
          field: "paymentStatus",
          headerName: "Payment Status",
          width:150
        },
        {
          field: "cost",
          headerName: "Payment Amount",
          width:150
        },
      ];
      
      const columnsWithPaidDate = [
        ...columnsWithoutPaidDate,
        {
          field: "createdOn",
          headerName: "Paid Date",
          flex: 1,
          renderCell: (params) => (
            <Typography>
              {new Date(params.value).toLocaleDateString()}
            </Typography>
          ),
        },
      ];
      
      const chosenColumns =
        paymentStatus === "Paid" ? columnsWithPaidDate : columnsWithoutPaidDate;
      
      if (paymentStatus === "Not Paid") {
        const indexOfPaymentAmount = chosenColumns.findIndex(
          (column) => column.field === "cost"
        );
        if (indexOfPaymentAmount !== -1) {
          chosenColumns.splice(indexOfPaymentAmount, 1);
        }
      }
      


    return (
        <Box sx={{ backgroundColor: '#ebedef', height: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Payment Reports" subtitle="" />
            </Box>
            <Box m="30px">
                <div className="row">
                    <div className="col-md-3">
                        <label style={{ fontWeight: '600' }} htmlFor="fromdate" className="form-label">From Date</label>
                        <input type="date" className="form-control" onChange={e => handleValue('fromdate', e.target.value)} name="fromdate" id="fromdate" />
                    </div>
                    <div className="col-md-3">
                        <label style={{ fontWeight: '600' }} htmlFor="todate" className="form-label">To Date</label>
                        <input type="date" onChange={e => handleValue('todate', e.target.value)} className="form-control" name="todate" id="todate" />
                    </div>
                    <div className="col-md-6 d-flex">
                        <div className="col-md-2">
                            <label htmlFor="" style={{ fontWeight: '600' }} className="form-label">Paid</label><br />
                            <input type="radio" onClick={handlePayment} className="form-check-input" name="paymentStatus" id="Paid" value="Paid" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="" style={{ fontWeight: '600' }} className="form-label">Not Paid</label><br />
                            <input type="radio" onClick={handlePayment} className="form-check-input" name="paymentStatus" id="NotPaid" value="Not Paid" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" style={{ fontWeight: '600' }} className="form-label">Click Here..</label><br />
                            <button style={{ color: '#0088CE', border: '0.5px solid #0088CE' }} className="btn w-50 " onClick={getPaymentReport}>Go</button>
                        </div>
                    </div>

                </div>

                <Box
                    m="20px 0 0 0"
                    height="65vh"
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
                    <DataGrid rows={addSrNoToData(paymentData)} columns={chosenColumns} />
                </Box>
            </Box>


        </Box>

    );
};

export default PaymentReports;
