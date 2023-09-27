import { Box, Typography, useTheme } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';




const RatingReview= () => {

  return(
    <Box p="20px" sx={{ backgroundColor: 'white', minHeight:'100vh', color:'white' }}>
       <h1 className="text-dark text-center"> <span className=" d-flex justify-content-center"><img src="assets/logo.jpeg" alt="" width="150" height="auto"/></span>   Dear Jon Snow, please give us your valuable </h1>
        <h3 className="text-dark text-center"> Rating and Review </h3> 
        <div className="text-dark"><hr/></div>
        <div className="container-fluid">
          <form style={{height:"550px",overflow:"auto",}}>
            <Box display="flex" justifyContent="center" m="20px">
            <table className="text-dark">
                <tr>
                    <th> <h5> Ogha X You Salon </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha Bites Cafe </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha Innergy Studio </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha X You Salon </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha Level Up Gym </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha Revive Asthetics </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
                <tr>
                    <th> <h5> Ogha Zen Spa </h5></th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> </td>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <th> <h5> Review </h5> </th>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <td > <textarea className="form-control w-100"></textarea></td>
                </tr>
            </table>
            </Box>
            <Box display="flex" justifyContent="center" m="20px">
              <button
                type="btn"
                // onClick={handleFormSubmit}
                className="btn btn-outline-primary"
              >
                Submit
              </button>
            </Box>
            {/* <div className="row">
                <div className="col-3 text-dark">
                    <h5>Ogha X You Salon  </h5> 
                    <h5>Ogha Bites Cafe</h5>
                    <h5>Ogha Innergy Studio</h5>
                    <h5>Ogha Level Up Gym</h5>
                    <h5>Ogha Revive Asthetics</h5>
                    <h5>Ogha Zen Spa</h5>
                </div>
                <div className="col-3 text-dark">
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                <div>
                    <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/> <StarBorderIcon/>
                </div>
                </div>
                <div className="col-3 text-dark"> 
                    <h4>Review</h4> 
                    <h4>Review</h4>
                    <h4>Review</h4>
                    <h4>Review</h4>
                    <h4>Review</h4>
                    <h4>Review</h4>
                 </div>
                <div className="col-3"></div>
            </div> */}
          </form>
    </div>
    </Box>
  )


}

export default RatingReview;