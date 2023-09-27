import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import Select from "react-select";
import { useCookies } from "react-cookie";
import { formatDate } from "@fullcalendar/core";
import { format } from 'date-fns'

const initialFieldErrors = {
  fullName: "",
  phoneNumber: "",
  email: "",
  subscriptionFor: "",
  subscriptionType: "",
  startDate: "",
  amountPaid: "",
  perferedTime: "",
  userId: "",
};

const AddSubscribedUser = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [customerDropDown, setCustomerDropDown] = useState({ display: "none" });
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState({
    display: "block",
  });
  const { id } = useParams();
  const [staffData, setStaffData] = useState([]);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [cookie, setCookie, removeCookie] = useCookies();
  const [packageType, setPackageType] = useState([]);
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("packageId");

  const [customerName, sertCustomerName] = useState([]);

  const [formValue, setFormValue] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    subscriptionFor: "",
    subscriptionType: "",
    startDate: "",
    amountPaid: "",
    duration: "",
    perferedTime: "",
    userId: "",
    createdOn: new Date().toLocaleDateString(),
    createdBy: cookie["staffId"],
  });

  const values = formValue;

  useEffect(() => {
    if (packageId) {
      axios({
        method: "get",
        url: `http://127.0.0.1:5050/addsubscriber?packageId=${packageId}`,
      }).then((res) => {
        const data = res.data[0];
        setFormValue((prevState) => ({
          ...prevState,
          subscriptionFor: data.forService,
          subscriptionType: data.id,
          amountPaid: data.cost,
          duration: data.duration,
        }));
      });
    }
  }, [packageId]);

  const handleFormValue = (key, value) => {
    setFormValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    console.log(formValue);
    if (key === "subscriptionType") {
      axios({
        method: "get",
        url: `http://127.0.0.1:5050/getPackageDetails/${value}`,
      }).then((res) => {
        console.log(res.data);
        setFormValue((prevState) => ({
          ...prevState,
          amountPaid: res.data[0].cost,
          duration: res.data[0].duration,
        }));
      });
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [key]: value.trim() === "" ? `${key} is required` : "",
    }));
  };

  useEffect(() => {
    if (formValue.subscriptionFor !== "") {
      axios({
        method: "get",
        url: `http://127.0.0.1:5050/getStaffData/${formValue.subscriptionFor}`,
      }).then((res) => {
        setStaffData(res.data);
      });

      axios({
        method: "get",
        url: `http://127.0.0.1:5050/getCategorywisePackage/${formValue.subscriptionFor}`,
      }).then((res) => {
        setPackageType(res.data);
      });
    }
  }, [formValue.subscriptionFor]);

  function handleFormSubmit(e) {
    e.preventDefault();

    let hasErrors = false;
    const newFieldErrors = { ...initialFieldErrors };

    for (const key in formValue) {
      if (typeof formValue[key] === "string" && formValue[key].trim() === "") {
        newFieldErrors[key] = `${key} is required`;
        hasErrors = true;
      }
    }

    setFieldErrors(newFieldErrors);

    if (id) {
      axios({
        method: "put",
        url: `http://127.0.0.1:5050/updatesubscriber/${id}`,
        data: formValue,
      }).then(navigate("/subscription"));
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:5050/subscriberUser",
        data: values,
      }).then(navigate("/subscription"));
    }
  }

  useEffect(() => {
    if (!id) {
      setCustomerDropDown({
        display: "block",
      });
      setCustomerPhoneNumber({
        display: "none",
      });
    }
  }, [id]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/getsubscriberdetails/${id}`,
    }).then((res) => {
      console.log(res.data);
      setFormValue({
        fullName: res.data[0].fullName,
        phoneNumber: res.data[0].phoneNumber,
        email: res.data[0].email,
        subscriptionFor: res.data[0].subscriptionFor,
        subscriptionType: res.data[0].subscriptionType,
        startDate: format(new Date(res.data[0].startDate),'yyyy-MM-dd'),
        amountPaid: res.data[0].amountPaid,
        perferedTime: res.data[0].perferedTime,
        userId: res.data[0].userId,
        createdOn: new Date().toLocaleDateString(),
        createdBy: cookie["staffId"],
      });
    });
  }, [id]);

  // const formattedDate = format(new Date(formValue.startDate), 'yyyy-MM-dd');
    console.log("startDate",formValue.startDate)

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5050/customerList",
    }).then((res) => {
      sertCustomerName(res.data);
    });
  }, []);

  const customerNumber = customerName.map((customer) => ({
    value: customer.id,
    label: customer.phoneNumber,
  }));

  function getSubscriberDetails(e) {
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/leadscapture/${e.value}`,
    }).then((res) => {
      setFormValue((prevState) => ({
        ...prevState,
        fullName: res.data[0].fullName,
        phoneNumber: res.data[0].phoneNumber,
        email: res.data[0].emailAddress,
      }));
    });
  }

  return (
    <Box>
      <div className="container my-2">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form
              className="create-user-form shadow-lg rounded p-3"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <h2
                className="text-center mb-2"
                style={{ color: "#A8A8A9", fontWeight: "700" }}
              >
                {id ? "Update Subscriber" : "Add a new Subscriber"}
              </h2>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6" style={customerDropDown}>
                    <label
                      htmlFor="fullname"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Existing Customer <span className="text-danger">*</span>
                    </label>
                    <Select
                      // isMulti
                      // required
                      options={customerNumber}
                      placeholder="Enter a mobile number"
                      className=" text-dark"
                      onChange={getSubscriberDetails}
                    ></Select>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="fullName"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Full Name Here"
                      name="fullName"
                      onChange={(e) =>
                        handleFormValue("fullName", e.target.value)
                      }
                      value={formValue.fullName}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-danger">{fieldErrors.fullName}</p>
                    )}
                  </div>
                  <div className="col-md-6" style={customerPhoneNumber}>
                    <label
                      htmlFor="phoneNumber"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone Number Here"
                      name="phoneNumber"
                      value={formValue.phoneNumber}
                      onChange={(e) =>
                        handleFormValue("phoneNumber", e.target.value)
                      }
                    />
                    {fieldErrors.phoneNumber && (
                      <p className="text-danger">{fieldErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email Here"
                      name="email"
                      value={formValue.email}
                      onChange={(e) => handleFormValue("email", e.target.value)}
                    />
                    {fieldErrors.email && (
                      <p className="text-danger">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="startDate"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Start date <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      value={formValue.startDate}
                      name="startDate"
                      onChange={(e) =>
                        handleFormValue("startDate", e.target.value)
                      }
                    />
                    {fieldErrors.startDate && (
                      <p className="text-danger">{fieldErrors.startDate}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="subscriptionFor"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Subscription For <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      name="subscriptionFor"
                      id=""
                      value={formValue.subscriptionFor}
                      className="form-select form-control"
                      onChange={(e) =>
                        handleFormValue("subscriptionFor", e.target.value)
                      }
                    >
                      <option value="">Select Subscription For</option>
                      <option value="3">Gym</option>
                      <option value="4">Spa</option>
                      <option value="5">Salon</option>
                      <option value="6"> Rejuvenation/ Aesthetics</option>
                    </select>
                    {fieldErrors.subscriptionFor && (
                      <p className="text-danger">
                        {fieldErrors.subscriptionFor}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="subscriptionType"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Subscription Type <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      value={formValue.subscriptionType}
                      name="subscriptionType"
                      id=""
                      className="form-select form-control"
                      onChange={(e) =>
                        handleFormValue("subscriptionType", e.target.value)
                      }
                    >
                      <option value="">Select Subscription Type </option>
                      {packageType.map((type) => (
                        <option value={type.id}>{type.packageName}</option>
                      ))}
                    </select>
                    {fieldErrors.subscriptionType && (
                      <p className="text-danger">
                        {fieldErrors.subscriptionType}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="amountPaid"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Amount Paid <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      value={formValue.amountPaid}
                      type="text"
                      className="form-control"
                      placeholder="Amount Paid"
                      name="amountPaid"
                      onChange={(e) =>
                        handleFormValue("amountPaid", e.target.value)
                      }
                    />

                    {fieldErrors.amountPaid && (
                      <p className="text-danger">{fieldErrors.amountPaid}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="perferedTime"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Prefered Time <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      value={formValue.perferedTime}
                      type="time"
                      className="form-control"
                      placeholder="Enter Prefered Time"
                      name="perferedTime"
                      onChange={(e) =>
                        handleFormValue("perferedTime", e.target.value)
                      }
                    />
                    {fieldErrors.perferedTime && (
                      <p className="text-danger">{fieldErrors.perferedTime}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label
                      htmlFor="userId"
                      className="form-label"
                      style={{ color: "#A8A8A9" }}
                    >
                      Assign Trainer/ Therapist{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      className="form-select form-control"
                      value={formValue.userId}
                      name="userId"
                      onChange={(e) =>
                        handleFormValue("userId", e.target.value)
                      }
                    >
                      <option value=""> Select Trainer </option>
                      {staffData.map((staff) => (
                        <option value={staff.id}>{staff.FullName}</option>
                      ))}
                    </select>
                    {fieldErrors.userId && (
                      <p className="text-danger">{fieldErrors.userId}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mt-4">
                      <button
                        type="x"
                        className="btn me-2"
                        style={{
                          border: "0.5px solid #0088CE",
                          color: "#0088CE",
                          fontWeight: "500",
                        }}
                      >
                        {id ? "Update" : "Submit"}
                      </button>
                      <Link
                        to="/subscription"
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
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddSubscribedUser;
