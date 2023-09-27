import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
// import {LeadsCapture} from "../src/pages/Leadscapture"
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Calendar from "./scenes/calendar/calendar";
import LeadsCapture from "./pages/Leadscapture";
import AddLead from "./pages/AddLead";
import LeadsFollowup from "./pages/FollowupLeads";
import PromotionMail from "./pages/PromotionMail";
import LoginPage from "./pages/Login";
import UserGrid from "./pages/Usergrid";
import UserForm from "./pages/Staff/UserForm";
import PackageManage from "./pages/packagemanage";
import LeadsSubscription from "./pages/Subscriptionmanage";
import AddSubscribedUser from "./pages/AddSubscriber";
import CustomerAttendance from "./pages/CustomerAttendance";
import AddCustomer from "./pages/AddCustomer";
import PromotionForm from "./pages/PromotionForm";
import ReceptionWalkin from "./pages/ReceptionWalkin";
import CustomerQA from "./pages/CustomerQA";
import DisplayPackages from "./pages/DisplayPackages/DisplayPackages";
import Invoice from "./pages/Invoice/Invoice";
import FollowupGrids from "./pages/FollowupDetails";
import PackageGrid from "./pages/PackageGrid";
import AddWalkin from "./pages/Addwalkin";
import Account from "./pages/Account";
import ReceptionWalkinStaff from "./pages/ReceptionWalkinStaff";
import WalkinRegister from "./pages/WalkinRegister/WalkinRegister";
import WalkinRegisterGym from "./pages/Gym";
import WalkinRegisterSalon from "./pages/Salon";
import WalkinRegisterSpa from "./pages/Spa";
import WalkinRegisterAstrtics from "./pages/Aestetics";
import RatingReview from "./pages/RatingReview";
import GymTrainers from "./pages/GymTrainers";
import SpaTherapists from "./pages/SpaTherapists";
import SalonStyleDirectors from "./pages/SalonStyleDirectors";
import GymSubscriber from "./pages/GymSubscriber";
import SalonSubscriber from "./pages/SpaSubscriber";
import SpaSubscriber from "./pages/SpaSubscriber";
import PromotionGrid from "./pages/promotionGrid";
import { useCookies } from "react-cookie";
import ReceptionWalkinStaffForGym from "./pages/ReceptionWalkinStaffForGym";
import ReceptionWalkinStaffForSalon from "./pages/ReceptionWalkinStaffForSalon";
import ReceptionWalkinStaffForSpa from "./pages/ReceptionWalkinStaffForSpa";
import ReceptionWalkinStaffForAesthetic from "./pages/ReceptionWalkinStaffForAesthetics";
import WalkinRegisterForGym from "./pages/WalkinRegister/WalkinRegisterForGym";
import WalkinRegisterForSalon from "./pages/WalkinRegister/WalkinRegisterForSalon";
import WalkinRegisterForAesthetic from "./pages/WalkinRegister/WalkinRegisterForAesthetic ";
import WalkinRegisterForSpa from "./pages/WalkinRegister/WalkinRegisterForSpa";
import AssignList from "./pages/AssignList";
import SubscriberReports from "./pages/Reports/SubscriberReports";
import PaymentReports from "./pages/Reports/PaymentReports";
import WalkinReport from "./pages/Reports/WalkinReports";
import LeadsReport from "./pages/Reports/LeadsReports";
import TodaySchedule from "./pages/TodayScheduleList";



function App() {
  const location = useLocation(); 
  const [isSidebar, setIsSidebar] = useState(true);
  const isCustomerQA = location.pathname === "/customerqa";
  const isRatingReview = location.pathname === "/ratingreview"
  const showSidebarAndTopbar = location.pathname !== "/" && !isCustomerQA && !isRatingReview;
  const [cookies, setCookies, removeCookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies["staffType"] == undefined){
        navigate("/");
    }
  },[]);
 


  return (
    
        
        <div className="app">
          <CssBaseline />
        {showSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
          {showSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/packagegrid" element={<PackageGrid />} />
              <Route path="/editPackage/:id" element={<PackageManage />}/>
              <Route path="/" element={<LoginPage />} />
              <Route path="/usermanage" element={<UserGrid /> }/>
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/promotiongrid" element={<PromotionGrid />} />
              <Route path="/followupdetails/:id" element={<FollowupGrids />} />
              <Route path="/adduser" element={<UserForm />} />
              <Route path="/editstaff/:id" element={<UserForm />} />
              <Route path="/packages" element={<PackageManage />} />
              <Route path="/subscription" element={<LeadsSubscription />} />
              <Route path="/leadscapture" element={<LeadsCapture />} />
              <Route path="/addsubscribeduser" element={<AddSubscribedUser />} />
              <Route path="/addsubscriber" element={<AddSubscribedUser />} />
              <Route path="/customerattendance"  element={<CustomerAttendance />}/>
              <Route path="/addcustomer" element={<AddCustomer />} />
              <Route path="/displaypackages" element={<DisplayPackages />}/>
              <Route path="/promotion" element={<PromotionForm />} />
              <Route path="/editPromotion/:id" element={<PromotionForm />} />
              <Route path="/receptionwalkin"  element={<ReceptionWalkin />}/>
              <Route path="/receptionwalkinstaff"  element={<ReceptionWalkinStaff />}/>
              <Route path="/walkingregister"  element={<WalkinRegister />}/>
              <Route path="/walkingregistergym"  element={<WalkinRegisterGym />}/>
              <Route path="/walkingregistersalon"  element={<WalkinRegisterSalon />}/>
              <Route path="/walkingregisterspa"  element={<WalkinRegisterSpa />}/>
              <Route path="/walkingregisterastrtics"  element={<WalkinRegisterAstrtics />}/>
              <Route path="/addwalkin" element={<AddWalkin/>}/>
              <Route path="/getWalkinDetails/:id" element={<AddWalkin/>}/>
              <Route path="/customerqa" element={<CustomerQA />} />
              <Route path="/addlead" element={<AddLead />} />
              <Route path="/ratingreview" element={<RatingReview />} />
              <Route path="/addlead/:edit" element={<AddLead />} />
              <Route path="/followupleads" element={<LeadsFollowup />} />
              <Route path="/promotionmail" element={<PromotionMail />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/account" element={<Account />} />
              <Route path="/getsubscriberdetails/:id" element={<AddSubscribedUser />} />
              <Route path="/walkingregisterDetails/:id" element={<WalkinRegister />}/>
              <Route path="/getStaff/:type" element={<GymTrainers />} />
              <Route path="/receptionwalkinstaffforgym"  element={<ReceptionWalkinStaffForGym />}/>
              <Route path="/receptionwalkinstaffforsalon"  element={<ReceptionWalkinStaffForSalon />}/>
              <Route path="/receptionwalkinstaffforspa"  element={<ReceptionWalkinStaffForSpa />}/>
              <Route path="/receptionwalkinstaffforaesthetic"  element={<ReceptionWalkinStaffForAesthetic />}/>
              <Route path="/walkinregisterforgym/:id"  element={<WalkinRegisterForGym />}/>
              <Route path="/walkinregisterforsalon/:id"  element={<WalkinRegisterForSalon />}/>
              <Route path="/walkinregisterforaesthetic/:id"  element={<WalkinRegisterForAesthetic />}/>
              <Route path="/walkinregisterforspa/:id"  element={<WalkinRegisterForSpa />}/>
              <Route path="/getsubscriber/:type" element={<GymSubscriber />} />
              <Route path="/assignedlist/:id" element={<AssignList />} />
              <Route path="/subscriberreports" element={<SubscriberReports />} />
              <Route path="/paymentreports" element={<PaymentReports />} />
              <Route path="/walkinreports"  element={<WalkinReport />} />
              <Route path="/leadsreports"  element={<LeadsReport />} />
              <Route path="/todayschedule/:id" element={<TodaySchedule />} />
            </Routes>
          </main>
        </div>
  );
}

export default App;
