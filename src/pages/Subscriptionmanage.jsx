import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";


const LeadsSubscription = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        axios.all([
            axios.get("http://127.0.0.1:5050/subscriberUser"),
            axios.get("http://127.0.0.1:5050/getstaffdetails"),
            axios.get("http://127.0.0.1:5050/getpackages")
        ]).then(axios.spread((subscriberRes, staffRes, packageRes) => {
            const modifiedData = subscriberRes.data.map((entry, index) => ({
                srNo: index + 1,
                ...entry,
            }));
            setData(modifiedData);
            setStaffData(staffRes.data);
            setPackageData(packageRes.data);
            setIsLoading(false); 
            // console.log("Staff Data:", staffData);
            
        }));

        

    }, []);





    const subscriptionOptions = {
        3: "Gym",
        4: "Spa",
        5: "Salon",
        6: "Rejuvenation/ Aesthetics",
    };

    const columns = [
        { field: "srNo", headerName: "SR. No", width: "50" },
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
            headerName: "Subscribed For",
            width:150,
            valueGetter: (params) => subscriptionOptions[params.value],
        },
        {
            field: "subscriptionType",
            headerName: "Subscription Type",
            width:220,
            editable:'true',
            valueGetter: (params) => {
                const packages = packageData.find((packages) => packages.id === parseInt(params.value));
                // console.log("Staff ID:", params.value, "Found Staff:", packages);
                return packages ? packages.packageName : "";
            },
        },
        {
            field: "startDate",
            headerName: "Start Date",
            width: 150,
            renderCell: (params) => {
              return (
                <span>
                  {new Date(params.value).toLocaleDateString()}
                </span>
              );
            }
          },          

        {
            field: "amountPaid",
            headerName: "Amount Paid",
            width:150
        },

        {
            field: "perferedTime",
            headerName: "Prefered time",
            width:150
        },
        {
            field: "userId",
            headerName: "Trainer/Therapist",
            width:220,
            editable:'true',
            cellClassName: "remaining-days",
            valueGetter: (params) => {
                const staff = staffData.find((staff) => staff.id === params.value);
                // console.log("Staff ID:", params.value, "Found Staff:", staff); // Debugging: Log staff matching
                return staff ? staff.FullName : "";
            },
        },
        {
            field: "action",
            headerName: "Action",
            width:100,
            renderCell: (customerEdit) => (
                <Typography color='#0088CE'>

                    <Link
                    style={{color:'#0088CE'}}
                        to={`/getsubscriberdetails/${customerEdit.id}`}
                        className="btn"
                        title="subscriber"
                    >
                        {" "}
                        <Edit />{" "}
                    </Link>
                    {/* <a href="/followupleads" className="btn" title="Follow Up"><Call /></a> */}
                </Typography>
            ),
        },

    ];

    return (
        <Box sx={{ backgroundColor: '#ebedef', minHeight: 'auto' }}>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Subscribed List" subtitle="" />

                <Box marginRight="20px">

                    <Link className="btn" to="/addsubscribeduser"style={{border:'0.5px solid #0088CE', color:'#0088CE', fontWeight:'500'}}>Add New Subscriber</Link>
                </Box>
            </Box>
            <Box m="20px">

                {
                    isLoading ? (
                        <Typography>Loading..</Typography>
                    ) : (
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
                                    fontSize: '16px',
                                    fontWeight: 900
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: '#fff',
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none",
                                    backgroundColor: '#A8A8A9',
                                    color: 'white'
                                },
                                "& .remaining-days": {
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                },
                            }}
                        >
                            <DataGrid rows={data} columns={columns} />
                        </Box>
                    )
                }
            </Box>


        </Box>

    );
};

export default LeadsSubscription;