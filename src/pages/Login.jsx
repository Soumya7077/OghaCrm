import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import {OghaLoginbg.png }from '../../public/assets';

const LoginPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [staffData, setStaffData] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [style, setStyle] = useState({display:'none'});
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://ogha.onrender.com/getstaffdetails'
    }).then(res => {
      setStaffData(res.data);
      // console.log(res.data);
    })
  }, []);

  function nameChange(e) {
    setName(e.target.value);
  }

  function passwordChange(e) {
    setPassword(e.target.value);
  }

  const LoginClick = () => {
    for (var staff of staffData) {
      if (staff.UserName == name && staff.Password == password) {
        setCookie("staffType",staff.UserType);
        setCookie("staffId", staff.id);
        // setCookie()
        navigate("/dashboard");
      }
      else if(staff.UserName != name || staff.password != password){
        setError("Invalid User Name or password, try again");
        setStyle({display:'block'});
      }
      else if (cookies["staffType"] == undefined){
        navigate("/");
      }
    }
  }


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url("assets/OghaLoginbg.png")`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Box
        sx={{
          width: 320,
          padding: 3,
          borderRadius: "8px",
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          width="100%"
          height="auto"
          src="assets/Ogha-.png"
          alt="Logo"
          style={{ display: "block", margin: "auto", marginBottom: "20px" }}
        />
        <hr />
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2, color: "#fff" }}>
          Login
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <label className="form-label text-white">User Name</label>
              <input type="text" className="form-control" onChange={nameChange} />
              <label className="form-label text-white">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={passwordChange}
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
              </div>
                
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: '15px' }}
                onClick={LoginClick}
                style={{backgroundColor: "#0088CE"}}
              >
                Login
                {/* <Link to="/dashboard" style={{ textDecoration: "none", color: "#fff" }}>
                  Login
                </Link> */}
              </Button>
              <div className="text-danger" style={style}>{error}</div>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default LoginPage;