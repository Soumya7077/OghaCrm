import React, { useEffect, useState } from 'react';
import './UserForm.css'; // Import your custom CSS file
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const initialFieldErrors = {
  name: '',
  phone: '',
  email: '',
  job: '',
  address: '',
  usertype: '',
  username: '',
  password: '',
};

const UserForm = () => {
  const CreatedOn = new Date().toLocaleDateString();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', job: '', address: '', usertype: '', username: '', password: '', Createdon: CreatedOn, createdBy :cookie["staffId"] })
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState([]);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);


  const handleTextChange = (fieldName, value) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    console.log(formData);

    if (fieldName === 'name') {
      const fullNameRegex = /^[a-zA-Z\s]*$/;
      const isValidFullName = fullNameRegex.test(value);
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        // name: value.trim() === '' ? 'Full Name is required' : '',
        name: isValidFullName ? "" : "Please enter a valid full name",
      }));
    } else if (fieldName === 'phone') {
      const phoneNumberRegex = /^[6-9]\d{9}$/;
      const isValidPhoneNumber = phoneNumberRegex.test(value);
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        // phone: value.trim() === '' ? 'Phone Number is required' : '',
        phone: isValidPhoneNumber ? "" : "Please enter a valid Indian phone number",
      }));
    } else if (fieldName === 'email') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid Email' : '',
      }));
    } else if (fieldName === 'job') {
      const fullNameRegex = /^[a-zA-Z\s]*$/;
      const isValidJobTitle = fullNameRegex.test(value);
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        // job: value.trim() === '' ? 'Job Title is required' : '',
        job: isValidJobTitle ? "" : "Please enter a valid Job Title",
      }));
    } else if (fieldName === 'address') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        address: value.trim() === '' ? 'Address is required' : '',
      }));
    } else if (fieldName === 'usertype') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        usertype: value === '-1' ? 'User Type is required' : '',
      }));
    } else if (fieldName === 'username') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        username: value.trim() === '' ? 'Username is required' : '',
      }));
    } else if (fieldName === 'password') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: value.trim() === '' ? 'Password is required' : '',
      }));
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5050/getstafftype'
    }).then(res => {
      setType(res.data);
    })
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5050/editstaff/${id}`
    }).then(res => {
      setFormData({
        name: res.data[0].FullName || '',
        phone: res.data[0].PhoneNumber || '',
        email: res.data[0].Email || '',
        job: res.data[0].JobTitle || '',
        address: res.data[0].Address || '',
        usertype: res.data[0].UserType || '',
        username: res.data[0].UserName || '',
        password: res.data[0].Password || '',
        createdBy : cookie["staffId"]
      })
    })
  }, [id]);


  const SubmitForm = (e) => {

       e.preventDefault();

       if (
        fieldErrors.name ||
        fieldErrors.phone ||
        fieldErrors.email ||
        fieldErrors.job ||
        fieldErrors.address ||
        fieldErrors.usertype ||
        fieldErrors.username ||
        fieldErrors.password
      ) {
        // There are validation errors, do not submit the form
        return;
      }

    let hasErrors = false;

    // Check for errors in field values
    if (formData.name.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Full Name is required',
      }));
      hasErrors = true;
    }
    if (formData.phone.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Phone Number is required',
      }));
      hasErrors = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid Email',
      }));
      hasErrors = true;
    }
    if (formData.job.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        job: 'Job Title is required',
      }));
      hasErrors = true;
    }
    if (formData.address.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        address: 'Address is required',
      }));
      hasErrors = true;
    }
    if (formData.usertype === '-1') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        usertype: 'User Type is required',
      }));
      hasErrors = true;
    }
    if (formData.username.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username is required',
      }));
      hasErrors = true;
    }
    if (formData.password.trim() === '') {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      if (id) {
        axios({
          method: 'put',
          url: `http://127.0.0.1:5050/updatestaff/${id}`,
          data: formData
        }).then(
          navigate("/usermanage")
        )
      } else {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:5050/addstaff',
          data: formData
        }).then(
          navigate("/usermanage")
        )
      }
    }
  }

  return (
    <Box>
      <div className="container my-2">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form className="create-user-form shadow-lg rounded p-3" onSubmit={SubmitForm}>
              <h2 className=" text-center mb-4" style={{ fontWeight: '900', color: "#A8A8A9" }}>{id ? "Update Staff Details" : "Create Staff Details"}</h2>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" style={{ color: "#A8A8A9" }} className="form-label">
                      Full Name <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter Full Name Here'
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={formData.name}
                      onChange={e => handleTextChange('name', e.target.value)}
                    />
                    {fieldErrors.name && <p className="text-danger">{fieldErrors.name}</p>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" style={{ color: "#A8A8A9" }} className="form-label">
                      Phone Number <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter Phone Number Here'
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phone}
                      onChange={e => handleTextChange('phone', e.target.value)}
                    />
                    {fieldErrors.phone && <p className="text-danger">{fieldErrors.phone}</p>}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" style={{ color: "#A8A8A9" }} className="form-label">
                      Email <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter Email Here'
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={formData.email}
                      onChange={e => handleTextChange('email', e.target.value)}
                    />
                    {fieldErrors.email && <p className="text-danger">{fieldErrors.email}</p>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" style={{ color: "#A8A8A9" }} className="form-label">
                      Address <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter Address Here'
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.address}
                      onChange={e => handleTextChange('address', e.target.value)}
                    />
                    {fieldErrors.address && <p className="text-danger">{fieldErrors.address}</p>}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" style={{ color: "#A8A8A9" }} className="form-label">
                      User Name <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter UserName Here'
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={formData.username}
                      onChange={e => handleTextChange('username', e.target.value)}
                    />
                    {fieldErrors.username && <p className="text-danger">{fieldErrors.username}</p>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" style={{ color: "#A8A8A9" }} className="form-label">
                      Password <span className='text-danger'>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        required
                        placeholder='Enter Password Here'
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={e => handleTextChange('password', e.target.value)}
                      />
                      <button
                        type="button"
                        className=" input-group-text"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye"></i>
                        ) : (
                          <i className="bi bi-eye-slash"></i>
                        )}
                      </button>
                      {fieldErrors.usertype && <p className="text-danger">{fieldErrors.usertype}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" style={{ color: "#A8A8A9" }} className="form-label">
                      User Type <span className='text-danger'>*</span>
                    </label>
                    <select required className='form-select form-control' value={formData.usertype} onChange={e => handleTextChange('usertype', e.target.value)}>
                      <option value="-1">Choosee...</option>
                      {
                        type.map(staff =>
                          <option value={staff.id}>{staff.type}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className="col-md-6 ">
                    <label htmlFor="fullname" style={{ color: "#A8A8A9" }} className="form-label">
                      Job Title <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      placeholder='Enter Job Title Here'
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={formData.job}
                      onChange={e => handleTextChange('job', e.target.value)}
                    />
                    {fieldErrors.job && <p className="text-danger">{fieldErrors.job}</p>}
                  </div>
                </div>
                <div className='mt-2'>
                  <button type="submit" className="btn me-2" style={{ border: '0.5px solid #0088CE', color: '#A8A8A9', fontWeight: '500' }}>
                    {id ? "Update Staff" : "Create Staff"}
                  </button>
                  <Link to="/usermanage" className="btn " style={{ border: '0.5px solid #A8A8A9', color: '#0088CE', fontWeight: '500' }}>
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

export default UserForm;