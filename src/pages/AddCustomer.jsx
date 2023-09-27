import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { Link } from "react-router-dom";


const AddCustomer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box pb="20px" sx={{backgroundColor:'#ebedef', minHeight:'100vh', }}>
      <Header  title="Add a new Customer" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              
              // display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                margin:'30px',
                padding:'15px',
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                backgroundColor:'#fff',
                borderRadius:'10px'
                // color:'black'
              }}
            >
              <div className="d-flex justify-content-between p-3" >
              <label className="form-label h6 text-dark justify-content-center" style={{paddingTop:'10px'}}>Customer Name</label>
              <input type="text" className="form-control w-75 justify-content-center" placeholder="Enter Full Name Here" />
              </div>
              <div className="d-flex justify-content-between p-3" >
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}}>At</label>
              <input type="text" className="form-control w-75" placeholder="Enter Here" />
              </div>
              <div className="d-flex justify-content-between p-3">
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}}>Date</label>
              <input type="date" className="form-control w-75" />
              </div>
               <div className="d-flex justify-content-between p-3">
               <label className="form-label h6 text-dark"style={{paddingTop:'10px'}} >In Time</label>
                <input type="text" className="form-control w-75" placeholder="Enter In Time" />
               </div>
              <div className="d-flex justify-content-between p-3">
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}}>Out Time </label>
              <input type="text" className="form-control w-75" placeholder="Enter out time" />  
              </div>
              <div className="d-flex justify-content-between p-3">
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}} >Remarks</label>
                <textarea className="form-control w-75"></textarea>
              </div>
             
              <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" m="20px">
              <button type="submit" className="btn btn-outline-primary" >
                Submit
              </button>
            </Box>
            <Box display="flex" justifyContent="center" m="20px">
              <Link to="/customerattendance" type="submit" className="btn btn-outline-danger" >
                Cancel
              </Link>
            </Box>
              </Box>
            </Box>
            
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default AddCustomer;
