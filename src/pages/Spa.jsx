import { Box, Button, Card, CardActionArea, CardContent, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { styled } from '@mui/system';



const WalkinRegisterSpa = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };


  const StyledCard = styled(Card)(({ theme }) => ({
    width: 280,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #3498db, #9b59b6)',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif', // Stylish font family
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));
  
  const StylishCard = ({ title, price, description }) => (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom style={{ fontSize: '2rem' }}>
          {title}
        </Typography>
        <Typography variant="h6" gutterBottom style={{ fontSize: '1.6rem' }}>
          {price}
        </Typography>
        <Typography variant="body2" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
          <ul style={{ paddingLeft: '20px' }}>
            {description.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {item}
              </li>
            ))}
          </ul>
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="secondary" fullWidth style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            Buy Now
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
  
  
  
  
  

  return (
    <Box pb="20px" sx={{backgroundColor:'#ebedef', minHeight:'100vh', }}>
      <Header  title="Walk-in Register" />

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
              <label className="form-label h6 text-dark justify-content-center" style={{paddingTop:'10px'}}>Full Name</label>
              <input type="text" className="form-control w-75 justify-content-center" placeholder="Enter Full Name Here" />
              </div>
              <div className="d-flex justify-content-between p-3" >
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}}>Phone</label>
              <input type="number" className="form-control w-75" placeholder="Enter Phone Number Here" />
              </div>
              <div className="d-flex justify-content-between p-3">
              <label className="form-label h6 text-dark" style={{paddingTop:'10px'}}>Email</label>
              <input type="email" className="form-control w-75" placeholder="Enter Email Here" />
              </div>
               <div className="d-flex justify-content-between p-3">
               {/* <label className="form-label h6 text-dark"style={{paddingTop:'10px'}} >Select Package</label>
                <select name="" id="" className="form-select w-75">
                    <option>Choose..</option>
                    <option>Gym</option>
                    <option value="">Spa</option>
                    <option value="">Salon</option>
                    <option>Aetheist</option>
                </select> */}

                

               </div>
               <Box p="20px" display="flex" justifyContent="space-between">
    <StylishCard
      title="GET YOUR MEMBERSHIP"
      price="Rs. 1000 Monthly"
      description={[
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
      ]}
    />
    <StylishCard
      title="GET YOUR MEMBERSHIP"
      price="Rs. 1000 Monthly"
      description={[
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
      ]}
    />
    <StylishCard
      title="GET YOUR MEMBERSHIP"
      price="Rs. 1000 Monthly"
      description={[
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
        "State-of-the-Art Facilities: Gain access to our cutting-edge gym equipped with the latest exercise machines, free weights, cardio equipment, and more. Experience an environment that motivates and supports your fitness goals.",
      ]}
    />
    {/* Add more StylishCard components as needed */}
  </Box>
              <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center" m="20px">
              <button type="submit" className="btn btn-outline-primary" >
                Submit
              </button>
            </Box>
            <Box display="flex" justifyContent="center" m="20px">
              {/* <Link to="/leadscapture" type="submit" className="btn btn-outline-danger" >
                Cancel
              </Link> */}
              <button type="submit" className="btn btn-outline-danger" >
              Cancel
              </button>
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

export default WalkinRegisterSpa;