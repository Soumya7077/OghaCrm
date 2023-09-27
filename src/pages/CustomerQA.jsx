import { Box, Typography, useTheme } from "@mui/material";




const CustomerQA = () => {

  return(
    <Box p="20px" sx={{ backgroundColor: 'white', minHeight:'100vh', color:'white' }}>
        <h1 className="text-dark text-center"> <span className=" d-flex justify-content-center"><img src="assets/logo.jpeg" alt="" width="150" height="auto"/></span>Customer Questionnaire: Understanding Your Experience </h1> 
        <div className="text-dark"><hr/></div>
        <div className="container-fluid">
          <form style={{height:"550px",overflow:"auto"}}>

               
            <div className="form-group text-dark">
                <label for="question"><h4> Which activity helps in reducing stress and promotes relaxation? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label class="form-check-label" for="option1">Gym Workout</label>
                </div>
                <div class="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label class="form-check-label" for="option2">Spa Treatment</label>
                </div>
                <div class="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label class="form-check-label" for="option3">Salon Haircut</label>
                </div>
                <div class="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label class="form-check-label" for="option4">Rejuvenation Therapy</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What is the recommended frequency for weight training in a week? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Once a week</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">Twice a week</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Three times a week</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Four times a week</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> Which spa treatment typically involves soaking in a tub with warm water and essential oils? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1">Massage therapy</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">Body scrub</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Aromatherapy</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Sauna therapy</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What type of salon service involves adding color to your hair? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Manicure</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2"> Pedicure</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Haircut</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Rejuvenation Therapy</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What is the purpose of a facial rejuvenation treatment? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1">To increase muscle mass</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">To improve skin texture and reduce signs of aging</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">To strengthen nails</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">To increase flexibility</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> Which exercise is effective for targeting the abdominal muscles? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1">Squatst</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">Bicep curls</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Bicep curls</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Leg press</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What is the primary benefit of a steam room? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Relaxation and stress relief</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">Muscle building</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Weight loss</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Cardiovascular endurance</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> Which of the following is a common ingredient in skincare products for exfoliation? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Aloe vera</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2"> Olive oil</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Salicylic acid</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Vitamin C</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> Which type of massage involves long, gliding strokes and kneading of muscles to relax the body?</h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Deep tissue massage</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2"> Thai massage</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Swedish massage</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Hot stone massage</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What is the purpose of using a sauna? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> To dry and style hair</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2"> To remove dead skin cells</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3"> To relax and detoxify the body through sweating</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">To apply a mud mask on the face</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> What is a common ingredient in many hair conditioners that helps to improve hair texture and manageability? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1"> Shea butter</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2"> Baking soda</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3"> Coconut oil</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4"> Lemon juice</label>
                </div>
            </div>
            <div className="form-group text-dark">
                <label for="question"><h4> Which activity involves stretching exercises and physical postures to enhance flexibility and strength? </h4></label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="gym" id="option1"/>
                    <label className="form-check-label" for="option1">Gym Workout</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="spa" id="option2"/>
                    <label className="form-check-label" for="option2">Spa Treatment</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="salon" id="option3"/>
                    <label className="form-check-label" for="option3">Salon Haircut</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="answer" value="rejuvenation" id="option4"/>
                    <label className="form-check-label" for="option4">Rejuvenation Therapy</label>
                </div>
                <Box
                display="flex"
                justifyContent="flex-end"
                padding= "20px"
                >
                <button className="btn btn-primary btn-lg" style={{justifyContent:"end"}}> Submit </button>
                </Box>
            </div>
        </form>
    </div>
    </Box>
  )


}

export default CustomerQA;