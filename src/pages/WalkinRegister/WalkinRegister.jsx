// import {
//   Box,
//   Button,
//   Card,
//   CardActionArea,
//   CardContent,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../components/Header";
// import { styled } from "@mui/system";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const WalkinRegister = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const CreatedOn = new Date().toLocaleDateString();
//   const { id } = useParams();
//   const [selectPkg, setSelectPkg] = useState([])
//   const navigate = useNavigate();

//   const [formValues, setFormValues] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     CreatedOn: CreatedOn,

//   });

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: `https://ogha.onrender.com/getWalkinDetails/${id}`,
//     }).then((res) => {
//       setFormValues({
//         name: res.data[0].fullName || "",
//         phone: res.data[0].phoneNumber || "",
//         email: res.data[0].emailAddress || "",
//       });
//       console.log("formvalues", formValues)
//     });
//   }, [id]);


//   function handleSubmit() {
//     axios({
//       method: 'post',
//       url: 'https://ogha.onrender.com/selectPackage',
//       data: formValues
//     }).then(
//       navigate("/dashboard")
//     )
//   }



//   useEffect(() => {
//     axios({
//       method: "get",
//       url: "https://ogha.onrender.com/getpackages"
//     }).then((res) => {
//       setSelectPkg(res.data)
//     })
//   }, [])


//   const handleValues = (fieldName, value) => {
//     setFormValues((values) => ({
//       ...values,
//       [fieldName]: value
//     }))
//   }


//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };



//   return (
//     <Box pb="20px" sx={{ backgroundColor: "#ebedef", minHeight: "100vh" }}>
//       <Header title="Walkin Register" />


//       <form onSubmit={handleSubmit}>
//         <Box
//           // display="grid"
//           gap="30px"
//           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//           sx={{
//             margin: "30px",
//             padding: "15px",
//             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             // color:'black'
//           }}
//         >
//           <div className="d-flex justify-content-between p-3">
//             <label
//               className="form-label h6 text-dark justify-content-center"
//               style={{ paddingTop: "10px" }}
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="form-control w-75 justify-content-center"
//               placeholder="Enter Full Name Here"
//               value={formValues.name}
//               name="fullName"
//             />
//           </div>
//           <div className="d-flex justify-content-between p-3">
//             <label
//               className="form-label h6 text-dark"
//               style={{ paddingTop: "10px" }}
//             >
//               Phone
//             </label>
//             <input
//               type="number"
//               className="form-control w-75"
//               placeholder="Enter Phone Number Here"
//               value={formValues.phone}
//               name="phoneNumber"
//             />
//           </div>
//           <div className="d-flex justify-content-between p-3">
//             <label
//               className="form-label h6 text-dark"
//               style={{ paddingTop: "10px" }}
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control w-75"
//               placeholder="Enter Email Here"
//               value={formValues.email}
//               name="emailAddress"
//             />
//           </div>
//           <div className="d-flex justify-content-between p-3">

//           </div>
//           <Box p="20px" display="flex" justifyContent="space-between">

//             <div className="container-fluid">
//               <div className="d-flex justify-content-evenly flex-wrap">
//                 {
//                   selectPkg.map(pkg =>
//                     <div key={pkg.id}
//                       className="card text-center"
//                       style={{ borderRadius: 0 }}
//                     >

//                       <div className="card-header px-5 py-2">
//                         <img src={pkg.img} height="150" className="card-img-top" alt="" />
//                         <h4 className="card-title">{pkg.packageName}</h4>
//                         {/* <h4>{pkg.packageName}</h4>
//                         <p>{pkg.description}</p> */}
//                       </div>
//                       <div className="card-body p-2">
//                         <dl>
//                           <dt>Price</dt>
//                           <dd>{pkg.cost}</dd>
//                           <dt>Duration</dt>
//                           <dd> <span className="bi bi-star-fill text-success"></span> {pkg.duration} </dd>
//                         </dl>

//                       </div>
//                       <div className="card-footer p-2">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="gympkg"
//                             id="radioOption1"
//                             value="Basic"
//                             onChange={(e) => handleValues("basic", e.target.value)}
//                           />
//                           <label className="form-check-label" for="radioOption1">
//                             <h4> Select Package </h4>
//                           </label>
//                         </div>
//                       </div>
//                     </div>)
//                 }

//               </div>
//             </div>
//           </Box>
//           <Box display="flex" justifyContent="center">
//             <Box display="flex" justifyContent="center" m="20px">
//               <button type="submit" className="btn btn-outline-primary">
//                 Submit
//               </button>
//             </Box>
//             <Box display="flex" justifyContent="center" m="20px">
//               {/* <Link to="/leadscapture" type="submit" className="btn btn-outline-danger" >
//                 Cancel
//               </Link> */}
//               <button type="submit" className="btn btn-outline-danger">
//                 Cancel
//               </button>
//             </Box>
//           </Box>
//         </Box>
//       </form>

//     </Box>
//   );
// };

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };

// export default WalkinRegister;



import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import './WalkinRegister.css';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const WalkinRegister = () => {
  const CreatedOn = new Date().toLocaleDateString();
  const { id } = useParams();
  const [selectPkg, setSelectPkg] = useState([])
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    CreatedOn: CreatedOn,

  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://ogha.onrender.com/getWalkinDetails/${id}`,
    }).then((res) => {
      setFormValues({
        name: res.data[0].fullName || "",
        phone: res.data[0].phoneNumber || "",
        email: res.data[0].emailAddress || "",
      });
      console.log("formvalues", formValues)
    });
  }, [id]);


  function handleSubmit() {
    axios({
      method: 'post',
      url: 'https://ogha.onrender.com/selectPackage',
      data: formValues
    }).then(
      navigate("/dashboard")
    )
  }



  useEffect(() => {
    axios({
      method: "get",
      url: "https://ogha.onrender.com/getpackages"
    }).then((res) => {
      setSelectPkg(res.data)
    })
  }, [])


  const handleValues = (fieldName, value) => {
    setFormValues((values) => ({
      ...values,
      [fieldName]: value
    }))
  }


  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <div className="container my-2">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form className="create-user-form shadow-lg rounded p-3" onSubmit={handleSubmit} encType="multipart/form-data">
              <h2 className="text-dark text-center mb-4" style={{ fontWeight: '700' }}>{"Walkin Register"}</h2>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" className="form-label">
                      Full Name <span className='text-danger'>*</span>
                    </label>
                    <input type="text"
                      className="form-control"
                      placeholder="Enter Full Name Here"
                      value={formValues.name}
                      name="fullName" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="packageImage" className="form-label">
                      Phone Number <span className='text-danger'>*</span>
                    </label>
                    <input type="number"
                      className="form-control"
                      placeholder="Enter Phone Number Here"
                      value={formValues.phone}
                      name="phoneNumber" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="packageCost" className="form-label">
                      Email <span className='text-danger'>*</span>
                    </label>
                    <input type="email"
                      className="form-control"
                      placeholder="Enter Email Here"
                      value={formValues.email}
                      name="emailAddress" />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                    <div className="container-fluid">
                      <div className="d-flex justify-content-evenly flex-wrap">
                        {
                          selectPkg.map(pkg =>
                            <div key={pkg.id}
                              className="card text-center pkg-card"
                              style={{ borderRadius: 0 }}
                            >

                              <div className="card-header px-5 py-2">
                                <img src={pkg.img} height="150" className="card-img-top" alt="" />
                                <h4 className="card-title">{pkg.packageName}</h4>
                                {/* <h4>{pkg.packageName}</h4>
                        <p>{pkg.description}</p> */}
                              </div>
                              <div className="card-body p-2">
                                <dl>
                                  <dt>Price</dt>
                                  <dd>{pkg.cost}</dd>
                                  <dt>Duration</dt>
                                  <dd> <span className="bi bi-star-fill text-success"></span> {pkg.duration} </dd>
                                  
                                </dl>

                              </div>
                              <div className="card-footer p-2">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gympkg"
                                    id="radioOption1"
                                    value="Basic"
                                    onChange={(e) => handleValues("basic", e.target.value)}
                                  />
                                  <label className="form-check-label" for="radioOption1">
                                    <h4> Select Package </h4>
                                  </label>
                                </div>
                              </div>
                            </div>)
                        }
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <input required type="text" value={formData.phone} onChange={e => handleTextChange('phone', e.target.value)} className="form-control" placeholder="Enter Phone Number Here" />
                  </div>
                  <div className="col-md-4">
                    <input required type="text" value={formData.phone} onChange={e => handleTextChange('phone', e.target.value)} className="form-control" placeholder="Enter Phone Number Here" />
                  </div> */}
                </div>
              </div>

              <div className="mb-3">
                <div className='mt-2'>
                  <button type="submit" className="btn btn-outline-primary me-2">
                    {"Submit"}
                  </button>
                  <Link to="/receptionwalkinstaff" className="btn btn-outline-danger">
                    Cancel
                  </Link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div >
    </Box >
  );
};

export default WalkinRegister;
