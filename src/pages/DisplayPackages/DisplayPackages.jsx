

import React, { useEffect, useState } from 'react';
import './DisplayPackages.css'; // You can create this CSS file to style your page
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import axios from "axios";


function DisplayPackages() {
  const [activeCategory, setActiveCategory] = useState('3');
  const [packageData, setPackageData] = useState([]);

 

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5050/getGymPackage',
    }).then((res) => {
      setPackageData(res.data);
    });
  }, []);
  

  const handleCategoryClick = (category) => {
    console.log(category);
    setActiveCategory(category);

    axios({
      method:'get',
      url:`http://127.0.0.1:5050/getCategorywisePackage/${category}`
    }).then(res => {
      setPackageData(res.data);
    })

  };





  function GymContent() {
    return <div>
      <Box >
        <Box p="20px" display="flex" justifyContent="space-around">
          <center>
            <div >
              <div className="container ">
                <div className="row ">
                  <div className="col mt-4 mb-4">
                    <div className='d-flex justify-content-between flex-wrap'>
                      {
                        packageData.map(gym =>
                          <div className="card m-2" style={{ borderRadius: "5px", border: "0px solid white", width: "280px", height: "430px" }}>
                            <center>
                              <div className='p-4'>
                                <h4 className='text-primary m-0'>{gym.packageName}</h4>
                                {/* <p style={{ color: "#8d8d8d" }}>{gym.description}</p> */}
                              </div>
                              <div className='bg-light' style={{ borderRadius: "5px" }}>
                                <h1 className='m-0 pt-4' style={{ fontSize: "50px" }}>&#8377; {gym.cost}</h1>
                                <h5 className='text-primary mb-4 mt-0' >{gym.duration} days</h5>
                                <div className='d-flex flex-column align-items-center' style={{ justifyContent: "center" }}>
                                  {gym.description.split(', ').map((item, index) => (
                                    <div key={index} className='d-flex' style={{ justifyContent: "center", paddingBottom: "5px" }}>
                                      <h4 className='mx-2'><i className="bi bi-check-lg text-primary "></i></h4>
                                      <p style={{ fontSize: "14px" }}>{item}</p>
                                    </div>
                                  ))}
                                </div>
                                <Link to={`/addsubscriber?packageId=${gym.id}`} className="btn btn-outline-primary m-3" style={{ fontSize: "14px", borderRadius: "10px" }}>Click Here</Link>

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
        </Box>
      </Box>
    </div>;
  }

  function SalonContent() {
    return <div>
      <Box p="20px" display="flex" justifyContent="space-around">
      <center>
            <div >
              <div className="container ">
                <div className="row ">
                  <div className="col mt-4 mb-4">
                    <div className='d-flex justify-content-between flex-wrap'>
                      {
                        packageData.map(gym =>
                          <div className="card m-2" style={{ borderRadius: "5px", border: "0px solid white", width: "280px", height: "430px" }}>
                            <center>
                              <div className='p-4'>
                                <h4 className='text-primary m-0'>{gym.packageName}</h4>
                                {/* <p style={{ color: "#8d8d8d" }}>{gym.description}</p> */}
                              </div>
                              <div className='bg-light' style={{ borderRadius: "5px" }}>
                                <h1 className='m-0 pt-4' style={{ fontSize: "50px" }}>&#8377; {gym.cost}</h1>
                                <h5 className='text-primary mb-4 mt-0' >{gym.duration} days</h5>
                                <div className='d-flex flex-column align-items-center' style={{ justifyContent: "center" }}>
                                  {gym.description.split(', ').map((item, index) => (
                                    <div key={index} className='d-flex' style={{ justifyContent: "center", paddingBottom: "5px" }}>
                                      <h4 className='mx-2'><i className="bi bi-check-lg text-primary "></i></h4>
                                      <p style={{ fontSize: "14px" }}>{item}</p>
                                    </div>
                                  ))}
                                </div>
                                <button type="button" className="btn btn-outline-primary m-3" style={{ fontSize: "14px", borderRadius: "10px" }}>Click Here</button>

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
      </Box>
    </div>;
  }

  function SpaContent() {
    return <div>
      <Box p="20px" display="flex" justifyContent="space-around">
      <center>
            <div >
              <div className="container ">
                <div className="row ">
                  <div className="col mt-4 mb-4">
                    <div className='d-flex justify-content-between flex-wrap'>
                      {
                        packageData.map(gym =>
                          <div className="card m-2" style={{ borderRadius: "5px", border: "0px solid white", width: "280px", height: "430px" }}>
                            <center>
                              <div className='p-4'>
                                <h4 className='text-primary m-0'>{gym.packageName}</h4>
                                {/* <p style={{ color: "#8d8d8d" }}>{gym.description}</p> */}
                              </div>
                              <div className='bg-light' style={{ borderRadius: "5px" }}>
                                <h1 className='m-0 pt-4' style={{ fontSize: "50px" }}>&#8377; {gym.cost}</h1>
                                <h5 className='text-primary mb-4 mt-0' >{gym.duration} days</h5>
                                <div className='d-flex flex-column align-items-center' style={{ justifyContent: "center" }}>
                                  {gym.description.split(', ').map((item, index) => (
                                    <div key={index} className='d-flex' style={{ justifyContent: "center", paddingBottom: "5px" }}>
                                      <h4 className='mx-2'><i className="bi bi-check-lg text-primary "></i></h4>
                                      <p style={{ fontSize: "14px" }}>{item}</p>
                                    </div>
                                  ))}
                                </div>
                                <button type="button" className="btn btn-outline-primary m-3" style={{ fontSize: "14px", borderRadius: "10px" }}>Click Here</button>

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
      </Box>
    </div>;
  }


  function AestheticContent() {
    return <div>
      <Box p="20px" display="flex" justifyContent="space-around">
      <center>
            <div >
              <div className="container ">
                <div className="row ">
                  <div className="col mt-4 mb-4">
                    <div className='d-flex justify-content-between flex-wrap'>
                      {
                        packageData.map(gym =>
                          <div className="card m-2" style={{ borderRadius: "5px", border: "0px solid white", width: "280px", height: "430px" }}>
                            <center>
                              <div className='p-4'>
                                <h4 className='text-primary m-0'>{gym.packageName}</h4>
                                {/* <p style={{ color: "#8d8d8d" }}>{gym.description}</p> */}
                              </div>
                              <div className='bg-light' style={{ borderRadius: "5px" }}>
                                <h1 className='m-0 pt-4' style={{ fontSize: "50px" }}>&#8377; {gym.cost}</h1>
                                <h5 className='text-primary mb-4 mt-0' >{gym.duration} days</h5>
                                <div className='d-flex flex-column align-items-center' style={{ justifyContent: "center" }}>
                                  {gym.description.split(', ').map((item, index) => (
                                    <div key={index} className='d-flex' style={{ justifyContent: "center", paddingBottom: "5px" }}>
                                      <h4 className='mx-2'><i className="bi bi-check-lg text-primary "></i></h4>
                                      <p style={{ fontSize: "14px" }}>{item}</p>
                                    </div>
                                  ))}
                                </div>
                                <button type="button" className="btn btn-outline-primary m-3" style={{ fontSize: "14px", borderRadius: "10px" }}>Click Here</button>

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
      </Box>
    </div>;
  }


  return (
    <Box pb="20px" sx={{ backgroundColor: '#ebedef', minHeight: '100vh', }}>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to our Wellness Center</h1>
          <div className="category-tabs">
            <div
              className={`category-tab ${activeCategory === '3' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('3')}
            >
              Gym
            </div>
            <div
              className={`category-tab ${activeCategory === '5' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('5')}
            >
              Salon
            </div>
            <div
              className={`category-tab ${activeCategory === '4' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('4')}
            >
              Spa
            </div>
            <div
              className={`category-tab ${activeCategory === '6' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('6')}
            >
              Aesthetic
            </div>
          </div>
        </header>
        <main>
          {/* Render content based on the activeCategory */}
          {activeCategory === '3' && <GymContent />}
          {activeCategory === '5' && <SalonContent />}
          {activeCategory === '4' && <SpaContent />}
          {activeCategory === '6' && <AestheticContent />}
        </main>
      </div>
    </Box>
  );
}






export default DisplayPackages;
