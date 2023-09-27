
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const initialFieldErrors = {
  promotionName: '',
  promotionDate: '',
  descriptionEmail: '',
  descriptionMessage: '',
};

const PromotionForm = () => {
  var CreatedOn = new Date().toLocaleDateString();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [promotionData, setPromotionData] = useState({ promotionName: '', promotionDate: '', description1: '',description2: '', createdOn: CreatedOn, createdBy : cookie["staffId"] });
  const navigate = useNavigate();
  const { id } = useParams();
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);


  const handlePromotionChange = (key, value) => {
    setPromotionData(prevState => ({
      ...prevState,
      [key]: value
    }));
    console.log(promotionData);
    if (key === 'promotionName') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        promotionName: value.trim() === '' ? 'Promotion Name is required' : '',
      }));
    } else if (key === 'promotionDate') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        promotionDate: value === '' ? 'Promotion Date is required' : '',
      }));
    } else if (key === 'descriptionEmail') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        descriptionEmail: value.trim() === '' ? 'Description for Email is required' : '',
      }));
    } else if (key === 'descriptionMessage') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        descriptionMessage: value.trim() === '' ? 'Description for Message is required' : '',
      }));
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://ogha.onrender.com/getPromotionDetails/${id}`
    }).then(res => {
      setPromotionData({
        promotionName: res.data[0].promotionName,
        promotionDate: new Date(res.data[0].promotionDate).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        description1: res.data[0].descriptionEmail,
        description2: res.data[0].descriptionMessage,
        createdBy:cookie["staffId"]
      });
    })
  }, [id])

  const handleSubmit = () => {
    let hasErrors = false;

    if (promotionData.promotionName.trim() === '') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        promotionName: 'Promotion Name is required',
      }));
      hasErrors = true;
    }
    if (promotionData.promotionDate === '') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        promotionDate: 'Promotion Date is required',
      }));
      hasErrors = true;
    }
    if (promotionData.description1.trim() === '') {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        descriptionEmail: 'Description for Email is required',
        // descriptionMessage: 'Description for Message is required',
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      if (id) {
        axios({
          method: 'put',
          url: `https://ogha.onrender.com/updatepromotion/${id}`,
          data: promotionData,
        }).then( navigate('/promotiongrid'));
      } else {
        axios({
          method: 'post',
          url: 'https://ogha.onrender.com/addpromotion',
          data: promotionData,
        }).then( navigate('/promotiongrid'));
      }
    }
  };

  return (
    <Box>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form className="create-user-form shadow-lg rounded p-5" onSubmit={handleSubmit} encType="multipart/form-data">
              <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#A8A8A9' }}>{id ? "Update Promotion Details" : "Create New  Promotion"}</h2>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullname" className="form-label" style={{ color: '#A8A8A9' }}>
                      Promotion Name <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control"
                      value={promotionData.promotionName} onChange={e => handlePromotionChange('promotionName', e.target.value)}
                    />
                    {fieldErrors.promotionName && <p className="text-danger">{fieldErrors.promotionName}</p>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="packageImage" className="form-label" style={{ color: '#A8A8A9' }}>
                      Promotion Date <span className='text-danger'>*</span>
                    </label>
                    <input
                      required
                      type="date"
                      value={promotionData.promotionDate} onChange={e => handlePromotionChange('promotionDate', e.target.value)}
                      className="form-control justify-content-center"
                    />
                    {fieldErrors.promotionDate && <p className="text-danger">{fieldErrors.promotionDate}</p>}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="description" className="form-label" style={{ color: '#A8A8A9' }}>
                      Promotion Description (For Email) <span className='text-danger'>*</span>
                    </label>
                    <textarea
                      type="text"
                      id="description1"
                      name="description"
                      className="form-control"
                      value={promotionData.description1} onChange={e => handlePromotionChange('description1', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="description" className="form-label" style={{ color: '#A8A8A9' }}>
                      Promotion Description (For Message) <span className='text-danger'>*</span>
                    </label>
                    <textarea
                      type="text"
                      id="description2"
                      name="description"
                      className="form-control"
                      value={promotionData.description2} onChange={e => handlePromotionChange('description2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className='mt-2'>
                  <button type="submit" className="btn  me-2" style={{ color: '#A8A8A9', border: '0.5px solid #0088CE', fontWeight: '500' }}>
                    {id ? "Update" : "Submit"}
                  </button>
                  <Link to="/promotiongrid" className="btn" style={{ color: '#0088CE', border: '0.5px solid #A8A8A9', fontWeight: '500' }}>
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

export default PromotionForm;
