import { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import FlagIcon from '@mui/icons-material/Flag';
import SpaIcon from '@mui/icons-material/Spa';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useCookies } from "react-cookie";
import { AccountBox, Assignment, AssistWalker, CardMembership, ContentCut, DirectionsWalk, HotTub, Inventory, Message, Payment, PendingActions, Person2, RequestQuote, SportsGymnastics, TextSnippet } from "@mui/icons-material";

const SubMenuItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();


  return (
    <MenuItem
      active={selected === title}
      style={{
        color: '#000',
        fontSize: "10px", 
      }}
      onClick={() => setSelected(title)}
      icon={null} 
    >
      <Link to={to}>
        <Box display="flex" alignItems="center">
          <span style={{ marginRight: "5px", color:'white' }}>{icon}</span>
          <Typography fontSize="13px" color="#fff">{title}</Typography>
        </Box>
      </Link>
    </MenuItem>
  );
};

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  subMenuItems,
  openSubMenu,
  handleSubMenuToggle,
}) => {
  const theme = useTheme();


  const isSubMenuOpen = openSubMenu === title;

  const toggleSubMenu = () => {
    handleSubMenuToggle(title);
  };

  if (subMenuItems && subMenuItems.length > 0) {
    return (
      <SubMenu
        title={title}
        icon={icon}
        style={{
          color: '#fff',
          fontSize: "18px",
        }}
        opened={isSubMenuOpen}
        onClick={toggleSubMenu}
      >
        {subMenuItems.map((subItem) => (
          <SubMenuItem
            key={subItem.title}
            title={subItem.title}
            to={subItem.to}
            icon={subItem.icon}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </SubMenu>
    );
  }

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: '#fff',
        fontSize: "18px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link style={{color:'white'}} to={to}>{title}</Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [marketingStyle, setMarketingStyle] = useState({ display: 'none' });
  const [receiptionistStyle, setReceiptionistStyle] = useState({ display: 'none' });
  const [gymtStyle, setGymStyle] = useState({ display: 'none' });
  const [spaStyle, setSpaStyle] = useState({ display: 'none' });
  const [salonStyle, setSalonStyle] = useState({ display: 'none' });
  const [aesthesticsStyle, setAesthesticsStyle] = useState({ display: 'none' });
  const [financeStyle, setFinanceStyle] = useState({ display: 'none' });
  const [adminStyle, setAdminStyle] = useState({ display: 'none' });
  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (cookie["staffType"] == 1) {
      setMarketingStyle({
        display: 'block'
      });
    }
    else if (cookie["staffType"] == 2) {
      setReceiptionistStyle({ display: 'block' });
    }
    else if (cookie["staffType"] == 3) {
      setGymStyle({ display: 'block' });
    }
    else if (cookie["staffType"] == 4) {
      setSpaStyle({ display: 'block' })
    }

    else if (cookie["staffType"] == 5) {
      setSalonStyle({ display: 'block' });
    }
    else if (cookie["staffType"] == 6) {
      setAesthesticsStyle({ display: 'block' });
    }
    else if (cookie["staffType"] == 7) {
      setFinanceStyle({ display: 'block' });
    }
    else if (cookie["staffType"] == 8) {
      setMarketingStyle({ display: "block" });
      setReceiptionistStyle({ display: "block" });
      setGymStyle({ display: "block" });
      setSpaStyle({ display: "block" });
      setSalonStyle({ display: "block" });
      setAesthesticsStyle({ display: "block" });
      setFinanceStyle({ display: "block" });
      setAdminStyle({ display: "block" });
    }

  }, []);

  const handleSubMenuToggle = (title) => {
    if (openSubMenu === title) {
      setOpenSubMenu(null); // Close the clicked sub-menu
    } else {
      setOpenSubMenu(title); // Open the clicked sub-menu
    }
  };
  const closeAllSubMenus = () => {
    setOpenSubMenu(null);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#0088CE !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 15px 5px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#fff !important",
        },
        "& .pro-menu-item.active": {
          color: "#fff !important",
        },
        minHeight: 'auto',
        
      }}

    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              closeAllSubMenus(); // Close all sub-menus when toggling menu collapse
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: 'white',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3">
                  <img
                    alt="profile-user"
                    width="150px"
                    height="50px"
                    src={`../../assets/Ogha logo White colour.png`}
                    style={{ cursor: "pointer" }}
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* ... your additional content */}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}  >
            <Box>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />} // This adds the HomeOutlinedIcon as the icon for Dashboard
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
            <Box style={marketingStyle}>
              <Item
                title="Marketing CRM"
                to="#"
                selected={selected}
                setSelected={setSelected}
                icon={<StoreIcon />}
                subMenuItems={[
                  { title: "Leads Capture", to: "/leadscapture", icon: <PeopleOutlinedIcon /> },
                  { title: "Leads Followup", to: "/followupleads", icon: <ContactsOutlinedIcon /> },
                  { title: "Send Promotion Mail", to: "/promotionmail", icon: <ReceiptOutlinedIcon /> },
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
            <Box style={receiptionistStyle}>
              <Item
                title="Reception"
                to="#"
                icon={<AccountBox />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Walkin Customers", to: "/receptionwalkin", icon: <PersonOutlinedIcon /> },
                  { title: "Subscribed Customers", to: "/subscription", icon:<SubscriptionsIcon /> },
                  { title: "Gym Trainers", to: "getStaff/3", icon:<SportsGymnastics /> },
                  { title: "Spa Therapists", to: "getStaff/4", icon:<HotTub /> },
                  { title: "Salon Style Directors", to: "getStaff/5", icon:<ContentCut /> },
                  { title: "Display Packages", to: "/displaypackages", icon: <Inventory /> },
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
            <Box style={gymtStyle}>
              <Item
                title="Gym"
                to="#"
                selected={selected}
                icon={<FitnessCenterIcon />}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Walkin Customers", to: "/receptionwalkinstaffforgym", icon: <PersonOutlinedIcon /> },
                  { title: "Subscriber ", to: "/getsubscriber/3", icon:<SubscriptionsIcon /> },
                  { title: "Customer Attendance ", to: "/customerattendance", icon:<TextSnippet/> },
                  { title: "Assigned List", to:`assignedlist/${cookie["staffId"]}`, icon:<Assignment />},
                  { title: "Today Schedule List", to:`todayschedule/${cookie["staffId"]}`, icon:<PendingActions />}
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
            <Box style={spaStyle}>
              <Item
                title="Spa"
                to="#"
                icon={<SpaIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[

                  { title: "Walkin Customers", to: "/receptionwalkinstaffforspa", icon: <PersonOutlinedIcon /> },
                  { title: "Subscriber ", to: "/getsubscriber/4",icon:<SubscriptionsIcon /> },
                  { title: "Customer Attendance ", to: "/customerattendance", icon:<TextSnippet/>},
                  { title: "Assigned List", to:`/assignedlist/${cookie["staffId"]}`, icon:<Assignment />},
                  { title: "Today Schedule List", to:`todayschedule/${cookie["staffId"]}`, icon:<PendingActions />}
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
            <Box style={salonStyle}>
              <Item
                title="Salon"
                to="#"
                icon={<EventSeatIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Walkin Customers", to: "/receptionwalkinstaffforsalon", icon: <PersonOutlinedIcon /> },
                  { title: "Subscriber", to: "/getsubscriber/5",icon:<SubscriptionsIcon /> },
                  { title: "Customer Attendance ", to: "/customerattendance",icon:<TextSnippet/> },
                  { title: "Assigned List", to:`/assignedlist/${cookie["staffId"]}`, icon:<Assignment />},
                  { title: "Today Schedule List", to:`todayschedule/${cookie["staffId"]}`, icon:<PendingActions />}
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>

            <Box style={aesthesticsStyle}>
              <Item
                title="Aesthetics"
                to="#"
                icon={<AccessibilityIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Walkin Customers", to: "/receptionwalkinstaffforaesthetic", icon: <PersonOutlinedIcon /> },
                  { title: "Subscriber", to: "/getsubscriber/6",icon:<SubscriptionsIcon /> },
                  { title: "Customer Attendance ", to: "/customerattendance", icon:<TextSnippet/> },
                  { title: "Assigned List", to:`/assignedlist/${cookie["staffId"]}`, icon:<Assignment />},
                  { title: "Today Schedule List", to:`todayschedule/${cookie["staffId"]}`, icon:<PendingActions />}
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
            <Box style={financeStyle}>
              <Item
                title="Finance"
                to="#"
                icon={<AccountBalanceIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Payment", to: "/account", icon: <Payment /> }
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>

            <Box style={adminStyle}>
              <Item
                title="Admin"
                to="#"
                icon={<AdminPanelSettingsIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "User Management", to: "/usermanage", icon: <PersonOutlinedIcon /> },
                  { title: "Packages Management", to: "/packagegrid", icon:<TextSnippet /> },
                  { title: "Subscription Management", to: "/subscription", icon:<SubscriptionsIcon /> },
                  { title: "Promotion Management", to: "/promotiongrid", icon:<Message /> },
                  { title: "Customer Attendance ", to: "/customerattendance", icon:<TextSnippet /> },
                ]}

              />
            </Box>
            <Box>
              <Item
                title="Reports"
                to="#"
                icon={<FlagIcon />}
                selected={selected}
                setSelected={setSelected}
                subMenuItems={[
                  { title: "Leads report", to: "/leadsreports", icon:<Person2/> },
                  { title: "Walk-ins report", to: "/walkinreports", icon:<DirectionsWalk /> },
                  { title: "Subscriber report", to: "/subscriberreports" ,icon:<CardMembership /> },
                  { title: "Payments report", to: "/paymentreports", icon:<RequestQuote /> },
                  { title: "Customer Questionnaire report", to: "#" },
                  { title: "Services wise consumption report", to: "#" },
                ]}
                openSubMenu={openSubMenu}
                handleSubMenuToggle={handleSubMenuToggle}
              />
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
