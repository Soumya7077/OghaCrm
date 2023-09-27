
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCookies } from 'react-cookie';


const initialFieldErrors = {
  packageName: '',
  // packageImage: '',
  packageCost: '',
  packageDuration: '',
  service: '',
  description: '',
};

const PackageManage = () => {
  const createdOn = new Date().toLocaleDateString();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [packageData, setPackageData] = useState({ packageName: '', packageCost: 0, packageDuration: '', service: '', description: '', createdOn: createdOn, createdBy : cookie['staffId'] })
  const navigate = useNavigate();
  const { id } = useParams();
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);


  const handlePackageChange = (key, value) => {
    setPackageData(prevstate => ({
      ...prevstate,
      [key]: value
    }))
    console.log(packageData);

    if (key === 'packageName') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        packageName: value.trim() === '' ? 'Package Name is required' : '',
      }));
    } else if (key === 'packageCost') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        packageCost: value === '' ? 'Cost is required' : '',
      }));
    } else if (key === 'packageDuration') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        packageDuration: value.trim() === '' ? 'Duration is required' : '',
      }));
    } else if (key === 'service') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        service: value === '' ? 'Service is required' : '',
      }));
    } else if (key === 'description') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        description: value.trim() === '' ? 'Description is required' : '',
      }));
    }
  }
  

  const handleSubmit = () => {
    if (id) {
      axios({
        method: 'put',
        url: `http://127.0.0.1:5050/updatePackage/${id}`,
        data: packageData
      }).then(
        navigate("/packagegrid")
      )
    }
    else {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5050/addpackges',
        data: packageData,
      }).then(
        navigate("/packagegrid")
      )
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5050/getPackageDetails/${id}`
    }).then(res => {
      console.log(res.data);
      setPackageData({
        packageName: res.data[0].packageName,
        packageImage: res.data[0].img,
        packageCost: res.data[0].cost,
        packageDuration: res.data[0].duration,
        service: res.data[0].forService,
        description: res.data[0].description,
        createdOn: createdOn,
        createdBy: cookie["staffId"]
      })
    })
  }, [id])

  return (
    <Box height="auto">
      <div className="container my-2" style={{height:'auto'}}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form className="create-user-form shadow-lg rounded p-3" onSubmit={handleSubmit} encType="multipart/form-data">
              <h2 className=" text-center mb-2" style={{ fontWeight: '700', color:'#A8A8A9' }}>{id ? "Update Package Details" : "Create New  Package"}</h2>
              <div className="mb-1">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" className="form-label" style={{color:"#A8A8A9"}}>
                      Package Name <span className='text-danger'>*</span>
                    </label>
                    <input
                    required
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={packageData.packageName}
                      onChange={e => handlePackageChange("packageName", e.target.value)}
                    />
                    {fieldErrors.packageName && <p className="text-danger">{fieldErrors.packageName}</p>}
                  </div>
                  <div className="col-md-6">
                  <label htmlFor="packageCost" className="form-label" style={{color:"#A8A8A9"}}>
                      Cost <span className='text-danger'>*</span>
                    </label>
                    <input
                    required
                      type="text"
                      id="packageCost"
                      name="packageCost"
                      className="form-control"
                      value={packageData.packageCost}
                      onChange={e => handlePackageChange("packageCost", e.target.value)}
                    />
                    {fieldErrors.packageCost && <p className="text-danger">{fieldErrors.packageCost}</p>}
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <div className="row">
                  <div className="col-md-6">
                  <label htmlFor="fullname" className="form-label" style={{color:"#A8A8A9"}}>
                      For Service <span className='text-danger'>*</span>
                    </label>
                    <select required className='form-select' value={packageData.service}
                      onChange={e => handlePackageChange("service", e.target.value)}>
                      <option>Choose..</option>
                      <option value="3">Gym</option>
                      <option value="4">Spa</option>
                      <option value="5">Salon</option>
                      <option value="6">Aesthetics</option>
                    </select>
                    {fieldErrors.service && <p className="text-danger">{fieldErrors.service}</p>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label" style={{color:"#A8A8A9"}}>
                      Duration <span className='text-danger'>*</span>
                    </label>
                    <input
                    required
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={packageData.packageDuration}
                      onChange={e => handlePackageChange("packageDuration", e.target.value)}
                    />
                    {fieldErrors.packageDuration && <p className="text-danger">{fieldErrors.packageDuration}</p>}
                  </div>
                </div>
              </div>
              <div className='mb-2'>
                <div className='row'>
                  <div className='col-md-12'>
                    <label htmlFor="phoneNumber" className="form-label" style={{color:"#A8A8A9"}}>
                      Description <span className='text-danger'>*</span>
                    </label>
                    <div className="">
                      <ReactQuill
                      style={{height:'190px', marginBottom:'25px'}}
                      theme='snow'
                        value={packageData.description}
                        onChange={(value) => handlePackageChange("description", value)}
                      />
                      {fieldErrors.description && <p className="text-danger">{fieldErrors.description}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <div className='mt-4'>
                  <button type="submit" className="btn me-2" style={{color:"#A8A8A9", border:'0.5px solid #0088CE'}}>
                    {id ? "Update" : "Submit"}
                  </button>
                  <Link to="/packagegrid" className="btn" style={{color:"#0088CE", border:'0.5px solid #A8A8A9'}}>
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

export default PackageManage;
