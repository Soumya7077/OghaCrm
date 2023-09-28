import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { format } from 'date-fns'


const AddLead = () => {
  const CreatedOn = new Date().toLocaleDateString();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    jobTitle: "",
    address: "",
    source: "",
    type: "Lead",
    isInterested: "",
    folloupDateTime: "",
    remark: "",
    CreatedOn: CreatedOn,
  });

  const navigate = useNavigate();
  const { edit } = useParams();
  const [style, setStyle] = useState({ display: "none" });
  const [btn, setBtn] = useState({ display: "" });
  const [followUpStyle, setFollowupStyle] = useState({PointerEvent:"none", opacity:"0.8"});
  const [visitDateStyle, setVisitDateStyle] = useState({PointerEvent:"none", opacity:"0.8"});
  
  
 

 
  const [followUpDisable, setfollowUpDisable] = useState('');
  // const [interstedDisable, setInterstedDisable] = useState('');
  // const [notInterstedDisable, setnotInterstedDisable] = useState('');


  const [error, setError] = useState({
    mobileError: "",
    nameError: "",
    mailError: "",
    remarkError: "",
    jobError: "",
    addressError: "",
    sourceError: "",
    interestedError: "",
    visitError: "",
  });

   const handleOnClickNotIntersted = (e) => {
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
      setfollowUpDisable(e.target.value);
    }
   
      useEffect(() => {
       
      },[]);
     
      const SubmitForm = (e) => {
        e.preventDefault();

        if (error.nameError || error.jobError || error.mobileError ) {
          return; // Prevent form submission
        }


        if (formData.phoneNumber) {
          if (followUpStyle.opacity === "1" && formData.folloupDateTime === "") {
            setError((prevError) => ({
              ...prevError,
              interestedError: "Please enter a Followup Time",
            }));
            return; // Prevent form submission
          }
      
          if (visitDateStyle.opacity === "1" && formData.folloupDateTime === "") {
            setError((prevError) => ({
              ...prevError,
              visitError: "Please enter a Visit Date",
            }));
            return; // Prevent form submission
          }
      
          // Check if it's in edit mode, and if not, then verify the mobile number
          if (!edit) {
            const phoneNumber = formData.phoneNumber;
            axios({
              method: "get",
              url: `https://ogha.onrender.com/getWalkinData/${phoneNumber}`,
            }).then((res) => {
              if (Object.keys(res.data).length > 0) {
                setStyle({ display: "block" });
              } else {
                // If the mobile number is unique, proceed with form submission
                axios({
                  method: "post",
                  url: "https://ogha.onrender.com/addlead",
                  data: formData,
                }).then(navigate("/leadscapture"));
              }
            });
          } else {
            // If it's in edit mode, directly update the lead
            axios({
              method: "put",
              url: `https://ogha.onrender.com/updatelead/${edit}`,
              data: formData,
            }).then(navigate("/leadscapture"));
          }
        } else if (edit) {
          // If it's in edit mode, directly update the lead
          axios({
            method: "put",
            url: `https://ogha.onrender.com/updatelead/${edit}`,
            data: formData,
          }).then(navigate("/leadscapture"));
        }
        console.log('put', formData);
      };
      

  // const SubmitForm = (e) => {
  //   e.preventDefault();
  //   if (formData.phoneNumber){
          
  //     if (followUpStyle.opacity === "1" && formData.folloupDateTime === "") {
  //       // "Followup Time" is enabled but empty
  //       setError((prevError) => ({
  //         ...prevError,
  //         interestedError: "Please enter a Followup Time",
  //       }));
  //       return; // Prevent form submission
  //     }

  //     if (
  //       visitDateStyle.opacity === "1" &&
  //       formData.folloupDateTime === ""
  //     ) {
  //       // "Visit Date" is enabled but empty
  //       setError((prevError) => ({
  //         ...prevError,
  //         visitError: "Please enter a Visit Date",
  //       }));
  //       return; // Prevent form submission
  //     }

  //     const phoneNumber = formData.phoneNumber;
  //     axios({
  //       method: "get",
  //       url: `https://ogha.onrender.com/getWalkinData/${phoneNumber}`,
  //     }).then((res) => {
  //         if(Object.keys(res.data).length > 0){
  //           setStyle({display:"block"});
  //         }else{
  //           axios({
  //             method: "post",
  //             url: "https://ogha.onrender.com/addlead",
  //             data: formData,
  //           }).then(navigate("/leadscapture"));
  //         }
         
  //     })
  //   } else if (edit) {
  //     axios({
  //       method: "put",
  //       url: `https://ogha.onrender.com/updatelead/${edit}`,
  //       data: formData,
  //     }).then(navigate("/leadscapture"));
  //     // setUpdate({ display: " Submit" });
  //   } 
  //   console.log('put',formData)
  // };
     
  useEffect(() => {
    axios.get(`https://ogha.onrender.com/leadscaptureforedit/${edit}`).then((res) => {  
        console.log(res.data);
      setFormData({
        fullName: res.data.leadsCapture[0].fullName || "",
        phoneNumber: res.data.leadsCapture[0].phoneNumber || "",
        emailAddress: res.data.leadsCapture[0].emailAddress || "",
        jobTitle: res.data.leadsCapture[0].jobTitle || "",
        address: res.data.leadsCapture[0].address || "",
        source: res.data.leadsCapture[0].source || "",
        type: "Lead",
        isInterested: res.data.leadsFollowup[0].criteria || "",
        // // folloupDateTime: res.data[0].folloupDateTime || "",
        folloupDateTime: format(new Date(res.data.leadsFollowup[0].folloupDateTime),'yyyy-MM-dd'),
        // startDate: format(new Date(res.data[0].startDate),'yyyy-MM-dd'),
        // // remark: res.data[0].Remark || "",
        remark: res.data.leadsFollowup[0].remarks || "", // Corrected property name
        // CreatedOn: res.data[0].CreatedOn || "",
      });
      if (res.data.leadsFollowup[0].criteria === "Follow up") {
        setFollowupStyle({ pointerEvents: "auto", opacity: "1" });
        setVisitDateStyle({ pointerEvents: "none", opacity: "0.8" });

        setFollowUpTime(res.data.leadsFollowup[0].folloupDateTime || "");
      } else if (res.data.leadsFollowup[0].criteria === "Interested") {
        setFollowupStyle({ pointerEvents: "none", opacity: "0.8" });
        setVisitDateStyle({ pointerEvents: "auto", opacity: "1" });
      } else if (res.data.leadsFollowup[0].criteria === "Not Interested") {
        setFollowupStyle({ pointerEvents: "none", opacity: "0.8" });
        setVisitDateStyle({ pointerEvents: "none", opacity: "0.8" });
      }
    });
  }, [edit]);

  const handleTextChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    

    if (fieldName === "fullName") {
      const fullNameRegex = /^[a-zA-Z\s]*$/;
      const isValidFullName = fullNameRegex.test(value);
      setError((prevError) => ({
        ...prevError,
        // nameError: value === isValidFullName ? "Please enter a valid full name" : "",
        nameError: isValidFullName ? "" : "Please enter a valid full name",
      }));
    } else if (fieldName === "phoneNumber") {
      const phoneNumberRegex = /^[6-9]\d{9}$/;
      const isValidPhoneNumber = phoneNumberRegex.test(value);
      setError((prevError) => ({
        ...prevError,
        // mobileError: isValidPhoneNumber  === "" ? "Please enter a valid Indian phone number" : "",
        mobileError: isValidPhoneNumber ? "" : "Please enter a valid Indian phone number",
      }));
    } else if (fieldName === "emailAddress") {
      setError((prevError) => ({
        ...prevError,
        mailError: value === "" ? "Please enter a Email Address" : "",
      }));
    } else if (fieldName === "jobTitle") {
      const jobTitleRegex = /^[a-zA-Z\s]*$/;  
      const isValidJobTitle = jobTitleRegex.test(value);
      setError((prevError) => ({
        ...prevError,
        // jobError: value === "" ? "Please enter an Job Title" : "",
        jobError: isValidJobTitle ? "" : "Please enter a valid Job Title",
      }));
    } else if (fieldName === "address") {
      setError((prevError) => ({
        ...prevError,
        addressError: value === "" ? "Please enter a Address" : "",
      }));
    } else if (fieldName === "source") {
      setError((prevError) => ({
        ...prevError,
        sourceError: value === "" ? "Please enter a Source" : "",
      }));
    } else if (fieldName === "isInterested") {
      setError((prevError) => ({
        ...prevError,
        interestedError: value === "" ? "Please enter a Criteri" : "",
      }));
    } else if (fieldName === "folloupDateTime") {
      setError((prevError) => ({
        ...prevError,
        visitError: value === "" ? "Please enter a Vist Date" : "",
      }));
    } else if (fieldName === "remark") {
      setError((prevError) => ({
        ...prevError,
        remarkError: value === "" ? "Please enter a Remark" : "",
      }));
    }
  };

  const [followUpTime, setFollowUpTime] = useState("");

  const [futureDate, setFutureDate] = useState(null);
  const [oneDayDate, setOneDayDate] = useState(null);
  const [visitDate, setVisitDate] = useState(null);

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

  return (
    <Box sx={{ backgroundColor: "#ebedef" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form
              className="create-user-form shadow-lg rounded p-2"
              onSubmit={SubmitForm}
              encType="multipart/form-data"
            >
              <h2
                className="text-center mb-3"
                style={{ color: "#A8A8A9", fontWeight: "700" }}
              >
                {edit ? "Update Lead" : "Create New  Lead"}
              </h2>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="fullname"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("fullName", e.target.value)
                      }
                      value={formData.fullName}
                      name="fullName"
                      placeholder="Enter Full Name Here"
                    />
                    <label className="text-danger">{error.nameError}</label>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="packageImage"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("phoneNumber", e.target.value)
                      }
                      value={formData.phoneNumber}
                      name="phoneNumber"
                      placeholder="Enter Phone Number Here"
                    />
                    <label className="text-danger">{error.mobileError}</label>
                    <label style={style} className="text-danger mt-2" >
                    Phone Number is already registered
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("emailAddress", e.target.value)
                      }
                      value={formData.emailAddress}
                      name="emailAddress"
                      placeholder="Enter Email Here"
                    />
                    <label className="text-danger">{error.mailError}</label>
                  </div>
                  <div className="col-md-6 justify-content-center">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Job Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("jobTitle", e.target.value)
                      }
                      value={formData.jobTitle}
                      name="jobTitle"
                      required
                      placeholder="Enter Job Title Here"
                    />
                    <label className="text-danger">{error.jobError}</label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                     required
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("address", e.target.value)
                      }
                      value={formData.address}
                      name="address"
                      placeholder="Enter Address Here"
                    />
                    <label className="text-danger">{error.addressError}</label>
                  </div>
                  <div className="col-md-6 justify-content-center">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Source <span className="text-danger">*</span>
                    </label>
                    <select
                     required
                      className="form-select"
                      onChange={(e) =>
                        handleTextChange("source", e.target.value)
                      }
                      value={formData.source}
                      name="source"
                    >
                      <option value="">Select Option</option>
                      {/* <option value="Online">Online</option> */}
                      <option value="Offline">Offline</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="facebook">facebook</option>
                      <option value="News Papers">News Papers</option>
                      <option value="Other Resource">Other Resource</option>
                    </select>
                    <label className="text-danger">{error.sourceError}</label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Criteria <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                    required
                      type="radio"
                      className="form-check-input me-2"
                      onChange={(e) =>
                        handleTextChange("isInterested", e.target.value)
                      }
                      onClick={handleOnClickNotIntersted}
                      checked={formData.isInterested === "Follow up"}
                      value="Follow up"
                      // checked={
                      //   formik.values.isInterested === "Follow up" ||
                      //   isInterestedValue === "Follow up"
                      // }
                      name="isInterested"
                    />

                    <label
                      className="form-label me-2"
                      style={{ color: "black", fontWeight: "500" }}
                    >
                      Follow up
                    </label>
                    <input
                      type="radio"
                      className="form-check-input me-2"
                      onChange={(e) =>
                        handleTextChange("isInterested", e.target.value)
                      }
                      onClick={handleOnClickNotIntersted}
                      checked={formData.isInterested === "Interested"}
                      value="Interested"
                      // checked={formik.values.isInterested === "Interested"}
                      name="isInterested"
                    />
                    <label
                      className="form-label me-2"
                      style={{ color: "black", fontWeight: "500" }}
                    >
                      Interested
                    </label>
                    <input
                      type="radio"
                      className="form-check-input me-2"
                      onChange={(e) =>
                        handleTextChange("isInterested", e.target.value)
                      }
                       onClick={handleOnClickNotIntersted}
                       checked={formData.isInterested === "Not Interested"}
                      value="Not Interested"
                      // checked={formik.values.isInterested === "Not Interested"}
                      name="isInterested"
                    />
                    <label
                      className="form-label me-2"
                      style={{ color: "black", fontWeight: "500" }}
                    >
                      Not Interested
                    </label>
                  </div>
                  <div className="col-md-6 justify-content-center">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Followup Time
                    </label>
                    <select
                      class="form-select"
                      onChange={(e) =>
                        handleTextChange("folloupDateTime", e.target.value)
                      }
                      aria-label="Default select example"
                      disabled={followUpStyle.opacity !== "1"}
                      required={followUpStyle.opacity === "1"} // Make it required when enabled
                      // disabled={interested || notInterested}
                    >
                      <option value="-1">Follow up Time</option>
                      <option value={oneDayDate}>24 Hrs</option>
                      <option value={futureDate}>48 Hrs</option>
                    </select>
                    <label className="text-danger">{error.interestedError}</label>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Visit Date
                    </label>
                    <input
                      disabled={visitDateStyle.opacity !== "1"}
                      required={visitDateStyle.opacity === "1"} // Make it required when enabled
                      type="date"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("folloupDateTime", e.target.value)
                      }
                      value={formData.folloupDateTime}
                      name="folloupDateTime"
                      placeholder="Yes/No"
                    />
                      <label className="text-danger">{error.visitError}</label>
                  </div>
                  <div className="col-md-6 justify-content-center">
                    <label
                      htmlFor="description"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Remark <span className="text-danger">*</span>
                    </label>
                    <textarea
                      required
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        handleTextChange("remark", e.target.value)
                      }
                      value={formData.remark}
                      name="remark"
                      placeholder="Enter Remark Here"
                    />
                     <label className="text-danger">{error.remarkError}</label>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <button
                  type="submit"
                  className="btn me-2"
                  style={{
                    border: "0.5px solid #0088CE",
                    color: "#A8A8A9",
                    fontWeight: "500",
                  }}
                >
                  {edit ? "Update" : "Submit"}
                </button>
                <Link
                  to="/promotiongrid"
                  className="btn"
                  style={{
                    border: "0.5px solid #A8A8A9",
                    color: "#0088CE",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddLead;
