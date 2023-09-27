import React, { useEffect, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddWalkin = () => {
  const CreatedOn = new Date().toLocaleDateString();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const formId = useRef();
  const { id } = useParams();
  const [style, setStyle] = useState({ display: "none" });
  const [existingRecord, setExistingRecord] = useState(false);
  const [error, setError] = useState({
    mobileError: "",
    nameError: "",
    mailError: "",
    remarkError: "",
  });
  const [cookie, setCookie, removeCookie] = useCookies();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    remark: "",
    CreatedOn: CreatedOn,
    CreatedBy: cookie["staffId"],
  });

  const SubmitForm = (e) => {
    e.preventDefault();

    if (
      error.mobileError !== ''
      //  || error.nameError !== '' ||
      // error.mailError !== '' ||
      // error.remarkError !== ''
    ) {
      // If any validation error exists, do not submit the form
      return;
    }

    if (id) {
      axios({
        method: "put",
        url: `http://127.0.0.1:5050/updateWalkin/${id}`,
        data: formData,
      }).then(navigate("/receptionwalkin"));
      // setUpdate({ display: " Submit" });
    } else if (existingRecord == true) {
      axios({
        method: "put",
        url: `http://127.0.0.1:5050/updateleadstowalkin/${formData.phone}`,
        data: {
          type: "Walkin",
          remark: formData.remark,
          CreatedBy: cookie["staffId"],
        },
      }).then(navigate("/receptionwalkin"));
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:5050/addWalkin",
        data: formData,
      }).then(navigate("/receptionwalkin"));
    }
    
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/getWalkinDetails/${id}`,
    }).then((res) => {
      setFormData({
        name: res.data[0].fullName || "",
        phone: res.data[0].phoneNumber || "",
        email: res.data[0].emailAddress || "",
        remark: res.data[0].Remark || "",
        CreatedOn: res.data[0].CreatedOn || "",
        CreatedBy: res.data[0].CreatedBy || "",
      });
      setIsLoading(false); // Data fetched, set loading to false
    });
  }, [id]);

  const handleTextChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    console.log(formData);

    if (fieldName === "phone") {
      setError((prevError) => ({
        ...prevError,
        mobileError: value === "" ? "Please enter a mobile number" : "",
      }));
    } else if (fieldName === "name") {
      const name = /^[a-zA-Z\s]*$/;
      const isValidName = name.test(value);
      setError((prevError) => ({
        ...prevError,
        // nameError: value === '' ? 'Please enter a name' : ''
        nameError: isValidName ? "" : "Please enter a valid full name",
      }));
    } else if (fieldName === "email") {
      setError((prevError) => ({
        ...prevError,
        mailError: value === "" ? "Please enter an email" : "",
      }));
    } else if (fieldName === "remark") {
      setError((prevError) => ({
        ...prevError,
        remarkError: value === "" ? "Please enter a remark" : "",
      }));
    }
  };

  const verify = () => {
    const phoneNumber = formData.phone;
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/getWalkinData/${phoneNumber}`,
    }).then((res) => {
      console.log("verify", res.data);
      if (res.data) {
        setExistingRecord(true);
        setFormData({
          phone: phoneNumber,
          name: res.data.fullName,
          email: res.data.emailAddress,
          remark: res.data.Remark,
          CreatedOn: CreatedOn,
          CreatedBy: cookie["staffId"],
        });
        // setStyle({ display: "none" });
      }
      else if (!res.data) {
        setStyle({
          display: "block",
        });
        setExistingRecord(false);
        setFormData({
          phone: phoneNumber,
          name: "",
          email: "",
          remark: "",
          CreatedOn: CreatedOn,
          CreatedBy: cookie["staffId"],
        });
      }
    });
  };

  const handleError = (e) => {
    if (formData.phone == "") {
      setError({
        mobileError: "Please enter a mobile number",
      });
    } else {
      setError({
        mobileError: "",
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#ebedef", height: "auto" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form
              id="walkinForm"
              ref={formId}
              className="create-user-form shadow-lg rounded p-3"
              onSubmit={SubmitForm}
              encType="multipart/form-data"
            >
              <h2
                className="text-center mb-4"
                style={{ fontWeight: "700", color: "#A8A8A9" }}
              >
                {id ? "Update Walkin Details" : "Create New  Walkin Profile"}
              </h2>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="packageImage"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex justify-content-between ">
                      <input
                        required
                        maxLength="12"
                        onBlur={(e) =>
                          handleError("phoneError", e.target.value)
                        }
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          handleTextChange("phone", e.target.value)
                        }
                        className="form-control "
                        placeholder="Enter Phone Number Here"
                      />

                      <button
                        onClick={verify}
                        className="btn btn-primary mx-2 wth"
                      >
                        Verify
                      </button>
                    </div>
                    {/* Phone Nmber is not found */}
                    <label style={style} className="text-danger mt-2">
                      New Walkin Kindly Register
                    </label>
                    <label className="text-danger">{error.mobileError}</label>
                  </div>

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
                      value={formData.name}
                      onChange={(e) => handleTextChange("name", e.target.value)}
                      className="form-control"
                      placeholder="Enter Full Name Here"
                    />
                    <label className="text-danger">{error.nameError}</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="packageCost"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleTextChange("email", e.target.value)
                      }
                      className="form-control"
                      placeholder="Enter Email Here"
                    />
                    <label className="text-danger">{error.mailError}</label>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="phoneNumber"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Remark <span className="text-danger">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.remark}
                      onChange={(e) =>
                        handleTextChange("remark", e.target.value)
                      }
                      className="form-control"
                      placeholder="Enter Remark Here"
                    ></textarea>
                    <label className="text-danger">{error.remarkError}</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="mt-2">
                  <button
                    type="submit"
                    style={{
                      border: "0.5px solid #0088CE",
                      color: "#A8A8A9",
                      fontWeight: "800",
                    }}
                    className="btn me-2"
                  >
                    {id ? "Update" : "Submit"}
                  </button>
                  <Link
                    style={{
                      border: "0.5px solid #A8A8A9",
                      color: "#0088CE",
                      fontWeight: "800",
                    }}
                    to="/receptionwalkin"
                    className="btn"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddWalkin;
