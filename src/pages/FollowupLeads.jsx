import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import { Call, Edit, Visibility } from "@mui/icons-material"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";



const LeadsFollowup = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);


  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: 'https://ogha.onrender.com/getfollowupdata'
  //   }).then(res => {
  //     const modifiedData = res.data.map((entry, index) => ({
  //       srNo: index + 1,
  //       ...entry,
  //       folloupDateTime: new Date(entry.folloupDateTime).toLocaleDateString('en-US', {
  //         year: 'numeric',
  //         month: 'short',
  //         day: 'numeric'
  //       }),
  //       fullName: "",
  //       emailAddress: "",
  //       phoneNumber: "",
  //     }));
  
  //     const promises = modifiedData.map(entry => {
  //       return axios.get(`https://ogha.onrender.com/leadscapture/${entry.leadId}`)
  //         .then(response => ({ leadId: entry.leadId, relatedInfo: response.data }));
  //     });
  
  //     Promise.all(promises)
  //       .then(responses => {
  //         responses.forEach(({ leadId, relatedInfo }) => {
  //           const indexToUpdate = modifiedData.findIndex(entry => entry.leadId === leadId);
  //           if (indexToUpdate !== -1) {
  //             modifiedData[indexToUpdate].fullName = relatedInfo[0].fullName;
  //             modifiedData[indexToUpdate].emailAddress = relatedInfo[0].emailAddress;
  //             modifiedData[indexToUpdate].phoneNumber = relatedInfo[0].phoneNumber;
  //           }
  //         });
  //         setData([...modifiedData]);
  //       })
  //       .catch(error => {
  //         console.error("Error fetching related info:", error);
  //       });
  //   });
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ogha.onrender.com/getfollowupdata');
        const modifiedData = response.data.map((entry, index) => ({
          srNo: index + 1,
          ...entry,
          folloupDateTime: new Date(entry.folloupDateTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          fullName: '',
          emailAddress: '',
          phoneNumber: '',
        }));

        for (const entry of modifiedData) {
          try {
            const relatedResponse = await axios.get(`https://ogha.onrender.com/leadscapture/${entry.leadId}`);
            const relatedInfo = relatedResponse.data;
            
            if (relatedInfo.length > 0) {
              entry.fullName = relatedInfo[0].fullName;
              entry.emailAddress = relatedInfo[0].emailAddress;
              entry.phoneNumber = relatedInfo[0].phoneNumber;
            }
          } catch (error) {
            console.error('Error fetching related info:', error);
          }
        }

        setData([...modifiedData]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, []);
  





  const columns = [
    { field: "srNo", headerName: "Sr.No", width: 60 },
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
      width:150,
      cellClassName: "name-column--cell",
    },

    { field: "emailAddress", headerName: "Email", width:220, editable:'true' },
    { field: "criteria", headerName: "Criteria", width:150 },
    { field: "folloupDateTime", headerName: "Followup Date", width:150, },
    { field: "remarks", headerName: "Remark", width:150, editable:'true' },
    {
      field: "action",
      headerName: "Action",
      width:100,
      renderCell: (param) => (
        <Typography>
          <button className="btn" title="Followup" style={{color:'#0088CE'}}>
            <Link to={`/followupdetails/${param.row.leadId}`}>
              <Visibility />
            </Link>
          </button>
        </Typography>
      ),
    },

  ];



  return (
    <Box sx={{ backgroundColor: '#ebedef', minHeight: 'auto' }}>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Leads Followup" subtitle="" />

        <Box marginRight="20px">
          {/* <button className="btn btn-outline-primary">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/addlead">Add Leads</Link>

                    </button  > */}
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
              // backgroundColor: '#f7f7f8',
              backgroundColor: '#A8A8A9',
              color: "#000",
              borderBottom: "none",
              // color: colors.primary[800],
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
          <DataGrid rows={data} columns={columns} />
        </Box>
      </Box>


    </Box>

  );
};

export default LeadsFollowup;
