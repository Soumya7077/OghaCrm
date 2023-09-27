import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Delete, Edit } from "@mui/icons-material"

import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";



const SubscriberReports = () => {


    const [subscriberData, setSubscriberData] = useState();
    const [dateValue, setDateValue] = useState({ fromdate: '', todate: '' });



    const handleDateChange = (key, value) => {
        setDateValue(prevValue => ({
            ...prevValue,
            [key]: value
        }))
        console.log(dateValue);
    };

    const getSubscriberData = () => {
        axios
            .get(`https://ogha.onrender.com/getsubscriberreport?fromdate=${dateValue.fromdate}&todate=${dateValue.todate}`)
            .then((res) => {
                setSubscriberData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching subscriber data:", error);
            });

    };

    const addSrNoToData = (subscriberData) => {
        if (!subscriberData || subscriberData.length === 0) {
          return [];
        }
      
        return subscriberData.map((row, index) => ({
          ...row,
          srNo: index + 1
        }));
      };
      
      const subscriptionOptions = {
        3: "Gym",
        4: "Spa",
        5: "Salon",
        6: "Rejuvenation/ Aesthetics",
    };




    const columns = [
        { field: "srNo", headerName: "Sr No", width: 60 },
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
            field: "email",
            headerName: "Email",
            width:220,
            editable:'true'
          },
          {
            field: "subscriptionFor",
            headerName: "Subscription For",
            width:150,
            valueGetter: (params) => subscriptionOptions[params.value]
          },
          {
            field: "subscriptionType",
            headerName: "Subscription Type",
            width:150
          },
          {
            field: "startDate",
            headerName: "Start Date",
            width:150
          },
          {
            field: "amountPaid",
            headerName: "Paid Amount",
            width:150
          },
    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', height: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Subscriber Reports" subtitle="" />
            </Box>
            <Box m="30px">
                <div className="row">
                    <div className="col-md-4">
                        <label style={{ fontWeight: '600' }} htmlFor="fromdate" className="form-label">From Date</label>
                        <input type="date" className="form-control" onChange={e => handleDateChange('fromdate', e.target.value)} name="fromdate" id="fromdate" />
                    </div>
                    <div className="col-md-4">
                        <label style={{ fontWeight: '600' }} htmlFor="todate" className="form-label">To Date</label>
                        <input type="date" onChange={e => handleDateChange('todate', e.target.value)} className="form-control" name="todate" id="todate" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="" style={{ fontWeight: '600' }} className="form-label">Click Here..</label><br />
                        <button style={{ color: '#0088CE', border: '0.5px solid #0088CE' }} className="btn w-50 " onClick={getSubscriberData}>Go</button>
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
                            fontSize: '12px'
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
                    <DataGrid rows={addSrNoToData(subscriberData)} columns={columns} />
                </Box>
            </Box>


        </Box>

    );
};

export default SubscriberReports;
