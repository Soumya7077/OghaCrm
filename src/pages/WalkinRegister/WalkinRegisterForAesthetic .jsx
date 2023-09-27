



import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import './WalkinRegister.css';
import { useCookies } from 'react-cookie';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const WalkinRegisterForAesthetic = () => {
  const CreatedOn = new Date().toLocaleDateString();
  const { id } = useParams();
  const [selectPkg, setSelectPkg] = useState([])
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies();
  const [endDate, setEndDate] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    CreatedOn: CreatedOn,

  });

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:5050/getWalkinDetails/${id}`,
    }).then((res) => {
      setFormValues({
        name: res.data[0].fullName || "",
        phone: res.data[0].phoneNumber || "",
        email: res.data[0].emailAddress || "",
      });
      console.log("formvalues", formValues)
    });
  }, [id]);


  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package before submitting.");
      return;
    }
    const values = { name: formValues.name, phone: formValues.phone, email: formValues.email, packageId: packageData[0].id, packageName: packageData[0].packageName, packageCost: packageData[0].cost, service: packageData[0].forService, paymentStatus: "Not Paid",endDate:endDate, createdOn: CreatedOn, createdBy:cookie["staffId"] }
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5050/addsubscription',
      data: values
    }).then(
      navigate("/account")
    )
  }


  const getPackageDetails = (e) => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5050/getPackageDetails/${e.target.value}`
    }).then(res => {
      setPackageData(res.data);
      console.log(res.data);
      const durationInDays = res.data[0].duration;
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + durationInDays);
      setEndDate(currentDate.toLocaleDateString());
    })
   
  }


  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:5050/aestheticpackages"
    }).then((res) => {
      setSelectPkg(res.data)
    })
  }, []);




  return (
    <Box>
      <div className="container my-2">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form className="create-user-form shadow-lg rounded p-3" onSubmit={handleSubmit} encType="multipart/form-data">
              <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#A8A8A9' }}>{"Walkin Register"}</h2>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" className="form-label" style={{ color: '#A8A8A9' }}>
                      Full Name <span className='text-danger'>*</span>
                    </label>
                    <input type="text"
                      className="form-control"
                      placeholder="Enter Full Name Here"
                      value={formValues.name}
                      name="fullName" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="packageImage" className="form-label" style={{ color: '#A8A8A9' }}>
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
                    <label htmlFor="packageCost" className="form-label" style={{ color: '#A8A8A9' }}>
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
                    <center>
                      <div >
                        <div className="container ">
                          <div className="row ">
                            <div className="col mt-4 mb-4">
                              <div className='d-flex justify-content-between flex-wrap'>
                                {
                                  selectPkg.map(gym =>
                                    <div key={gym.id} className="card m-2" style={{ borderRadius: "5px", border: "0px solid white", width: "220px", height: "430px" }}>
                                      <center>
                                        <div className='p-4'>
                                          <h4 className='m-0' style={{ color: '#0088CE' }}>{gym.packageName}</h4>
                                          {/* <p style={{ color: "#8d8d8d" }}>{gym.description}</p> */}
                                        </div>
                                        <div className='bg-light' style={{ borderRadius: "5px" }}>
                                          <h1 className='m-0 pt-4' style={{ fontSize: "50px" }}>&#8377; {gym.cost}</h1>
                                          <h5 className='mb-4 mt-0' style={{ color: '#0088CE' }}>{gym.duration} days</h5>
                                          <div className='d-flex flex-column align-items-center' style={{ justifyContent: "center" }}>
                                            {gym.description.split(', ').map((item, index) => (
                                              <div key={index} className='d-flex' style={{ justifyContent: "center", paddingBottom: "5px" }}>
                                                <h4 className='mx-2'><i className="bi bi-check-lg " style={{ color: '#0088CE' }}></i></h4>
                                                <p style={{ fontSize: "14px" }}>{item}</p>
                                              </div>
                                            ))}
                                          </div>
                                          <button type="button" className="btn m-3" style={{ fontSize: "14px", borderRadius: "10px", color: '#A8A8A9', border: '0.5px solid #0088CE' }}>Click Here</button>

                                        </div>
                                        <div className=' m-4'>
                                          <input type='radio' checked={selectedPackage === gym.id}
                                            onChange={() => setSelectedPackage(gym.id)} className='form-check-input me-2' onClick={getPackageDetails} value={gym.id} name='packageName' />
                                          <label className='form-label'>Select Package</label>
                                        </div>
                                      </center>

                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </center>
                  </div>

                </div>
              </div>

              <div className="mb-3">
                <div className='mt-2'>
                  <button type="submit" className="btn me-2" style={{ color: '#A8A8A9', border: '0.5px solid #0088CE', fontWeight: '500' }}>
                    {"Submit"}
                  </button>
                  <Link to="/receptionwalkinstaff" className="btn" style={{ color: '#0088CE', border: '0.5px solid #A8A8A9', fontWeight: '500' }}>
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

export default WalkinRegisterForAesthetic;