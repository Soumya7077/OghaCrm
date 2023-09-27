import { useTheme } from "@emotion/react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from "mdb-react-ui-kit";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { Link, useLocation, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataContacts, mockDataFollowup } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";


const FollowupGrids = () => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({
    criteria: "",
    visitDate: "",
    remark: ""
  });

  //   const [formData, setFormData] = useState(initialValues);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [address, setAddress] = useState('');
  const [source, setSource] = useState('');
  const [followupData, setFollowupData] = useState([]);
  const [futureDate, setFutureDate] = useState(null);
  const [oneDayDate, setOneDayDate] = useState(null);
  const [title, setTitle] = useState("");
  const [followUpStyle, setFollowupStyle] = useState({PointerEvent:"none", opacity:"0.8"});
  const [visitDateStyle, setVisitDateStyle] = useState({PointerEvent:"none", opacity:"0.8"});

  const handleOnClickNotIntersted = (e) => {
    console.log(e.target.value);
    if(e.target.value=="Follow up"){
      setFollowupStyle({PointerEvent:"auto", opacity:"1"});
      setVisitDateStyle({PointerEvent:"none", opacity:"0.8"});
    }
    else if(e.target.value == "Interested"){
      setFollowupStyle({PointerEvent:"none", opacity:"0.8"});
      setVisitDateStyle({PointerEvent:"auto", opacity:"1"});
    }
    else if(e.target.value == "Not Interested"){
      setFollowupStyle({PointerEvent:"none", opacity:"0.8"});
      setVisitDateStyle({PointerEvent:"none", opacity:"0.8"});
    }
    // setfollowUpDisable(e.target.value);
  }
 


  const [formValue, setFormValue] = useState({
    leadId: parseInt(id),
    criteria: "",
    visitDate: "",
    remark: "",
  });

  useEffect(() => {
    const currentDate = new Date();
    const AfterTwoDayDate = new Date(
      currentDate.getTime() + 48 * 60 * 60 * 1000
    ); // Adding 48 hours in milliseconds
    const AfterOneDayDate = new Date(
      currentDate.getTime() + 24 * 60 * 60 * 1000
    ); // Adding 48 hours in milliseconds

    setFutureDate(AfterTwoDayDate);
    setOneDayDate(AfterOneDayDate);
  }, []);

  const values = formValue;
  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/followupdetails/${id}`,
    }).then((res) => {
      console.log(res.data);
      const modifiedData = res.data.map((entry, index) => ({
        srNo: index + 1, // Adding 1 to start Sr.No from 1
        ...entry,
        folloupDate: new Date(entry.folloupDateTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        followupTime: new Date(entry.folloupDateTime).toLocaleTimeString()
      }));
      setFollowupData(modifiedData);
      //   console.log(modifiedData);
    });
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch lead data using editId and populate formData
      console.log(`Fetching data for editId: ${id}`);
      axios.get(`http://127.0.0.1:5050/leadscapture/${id}`).then((res) => {
        console.log("API response:", res.data);
        setData(res.data);
        // setFormData(res.data);

        const title = res.data[0].type === "Walkin" ? "Walkin Followup" : "Leads Followup";
        setTitle(title);

        setFullName(res.data[0].fullName);
        setPhoneNumber(res.data[0].phoneNumber);
        setEmailAddress(res.data[0].emailAddress)
        setJobTitle(res.data[0].jobTitle)
        setAddress(res.data[0].address)
        setSource(res.data[0].source)
        // setIsInterested(res.data[0].isInterested)
        // setFolloupDateTime(res.data[0].folloupDateTime)
      });
    }

    // data.map((t)=>{
    //   if(t.type === "Wakin"){
    //      setTitle("Wakin")
    //   }else{
    //     setTitle("Lead")
    //   }
    // })
  }, [id]);





  const validateField = (fieldName, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "This field is required.";
    }
    setFormErrors((errors) => ({
      ...errors,
      [fieldName]: errorMessage,
    }));
  };

  const handleChangeCriteria = (key, value) => {
    setFormValue((data) => ({
      ...data,
      [key]: value,
    }));
    validateField(key, value);
  };
  // console.log(formValue);

  function formSubmit(e) {
    e.preventDefault();

    if (followUpStyle.opacity === "1" && formValue.folloupDateTime === "") {
      // "Followup Time" is enabled but empty
      setFormErrors((prevError) => ({
        ...prevError,
        interestedError: "Please enter a Followup Time",
      }));
      return; // Prevent form submission
    }

    if (
      visitDateStyle.opacity === "1" &&
      formValue.folloupDateTime === ""
    ) {
      // "Visit Date" is enabled but empty
      setFormErrors((prevError) => ({
        ...prevError,
        visitError: "Please enter a Visit Date",
      }));
      return; // Prevent form submission
    }

    let isValid = true;
    const errors = {};
    for (const key in formValue) {
      const value = formValue[key];
      validateField(key, value);
      if (!value) {
        errors[key] = "This field is required.";
        isValid = false;
      }
    }
    setFormErrors(errors);

    if (isValid) {
      axios({
        method: "post",
        url: "http://127.0.0.1:5050/addFollowupDetails",
        data: values,
      }).then(
        window.location.reload()
      )
    }
  }
  const followUpDisabled = formValue.criteria === "Follow up";
  const interestedUpDisabled = formValue.criteria === "Interested";
  const notInterestedDisabled = formValue.criteria === "Not Interested";

  const columns = [
    { field: "srNo", headerName: "Sr No", flex: 1 },
    {
      field: "folloupDate",
      headerName: "Dates",
      flex: 1,
    },
    {
      field: "followupTime",
      headerName: "Time",
      flex: 1,
    },

    {
      field: "criteria",
      headerName: "Criteria",
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
    },
  ];

  return (
    <Box pb="20px" sx={{ backgroundColor: "#ebedef", minHeight: "auto" }}>
      {/* Edit Modal Starts*/}

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" justifyContent="center">
          <Header title={title} subtitle="" />
          {title === "Walkin Followup" ? (
            <Link className="mt-2" to="/receptionwalkin">
              <ArrowBack /> Go back
            </Link>
          ) : (
            <Link className="mt-2" to="/followupleads">
              <ArrowBack /> Go back
            </Link>
          )}
        </Box>
      </Box>
      <Box m="20px" justifyContent="space-around" display="flex">

        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Full Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Mobile</th>
              <th scope='col'>Source</th>
              <th scope='col'>Address</th>
              <th scope='col'>Follow up</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data.map(res =>
                <tr>
                  <td>{res.fullName}</td>
                  <td>{res.emailAddress}</td>
                  <td>{res.phoneNumber}</td>
                  <td>{res.source}</td>
                  <td>{res.address}</td>
                  <td><button
                    style={{ border: '0.5px solid #0088CE', color: '#0088CE', fontWeight: '500' }}
                    className="btn"
                    data-bs-target="#nextFollowup"
                    data-bs-toggle="modal"

                  >
                    Followup
                  </button></td>
                </tr>
              )
            }

          </MDBTableBody>
        </MDBTable>


      </Box>
      <Box>
        <form onSubmit={formSubmit}>
          <div
            className="modal fade"
            id="nextFollowup"
            tabindex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark" id="exampleModalLabel">
                    Followup Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label className="form-label h6 text-dark">Criteria</label>
                  <br />
                  <input
                    type="radio"
                    className="form-input me-2"
                    name="criteria"
                    value="Follow up"
                    onChange={(e) =>
                      handleChangeCriteria("criteria", e.target.value)
                    }
                    onClick={handleOnClickNotIntersted}
                  />
                  <span className="text-dark me-4">Followup</span>
                  <input
                    type="radio"
                    className="form-input me-2"
                    name="criteria"
                    value="Interested"
                    onChange={(e) =>
                      handleChangeCriteria("criteria", e.target.value)
                    }
                    onClick={handleOnClickNotIntersted}
                  />
                  <span className="text-dark me-4">Interested</span>
                  <input
                    type="radio"
                    className="form-input me-2"
                    name="criteria"
                    value="Not Interested"
                    onChange={(e) =>
                      handleChangeCriteria("criteria", e.target.value)
                    }
                    onClick={handleOnClickNotIntersted}
                  />
                  <span className="text-dark me-4">Not Interested</span><br />
                  {formErrors.criteria && <span className="text-danger">{formErrors.criteria}</span>}
                  <br />
                  <select
                    onChange={(e) =>
                      handleChangeCriteria("visitDate", e.target.value)
                    }
                    class="form-select ms-4"
                    style={{ width: "155px" }}
                    aria-label="Default select example"
                    // disabled={interestedUpDisabled || notInterestedDisabled}
                    disabled={followUpStyle.opacity !== "1"}
                    required={followUpStyle.opacity === "1"}
                  >
                    <option selected value=""> Follow up Time</option>
                    <option value={oneDayDate}>24 Hrs</option>
                    <option value={futureDate}>48 Hrs</option>
                  </select>
                  <label className="form-label h6 text-dark">Visit date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="visitDate"
                    // disabled={followUpDisabled || notInterestedDisabled}
                    onChange={(e) =>
                      handleChangeCriteria("visitDate", e.target.value)
                    }
                    disabled={visitDateStyle.opacity !== "1"}
                    required={visitDateStyle.opacity === "1"}
                  />
                  <label className="form-label h6 text-dark">Remarks</label>
                  <textarea
                    className="form-control"
                    name="remark"
                    onChange={(e) =>
                      handleChangeCriteria("remark", e.target.value)
                    }
                  ></textarea>
                  {formErrors.remark && <span className="text-danger">{formErrors.remark}</span>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    style={{ border: '0.5px solid #0088CE', color: '#A8A8A9', fontWeight: '800', backgroundColor: '#0088CE' }}
                    type="submit"
                    className="btn"
                  // data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Box>
      <Box m="20px">
        <Box
          m="20px 0 0 0"
          height="45vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              // color:'black'
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
              color: "black",
              fontSize: "12px",
            },
            "& .name-column--cell": {
              color: 'black',
              fontSize: "12px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#A8A8A9",
              borderBottom: "none",
              color: 'white',
              fontSize: "14px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#A8A8A9",
              color: "white",
            },
          }}
        >
          <DataGrid rows={followupData} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

export default FollowupGrids;