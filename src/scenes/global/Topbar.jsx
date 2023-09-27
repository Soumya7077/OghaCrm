import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [style, setStyle] =  useState({display:'none'});

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const LogoutClick = () => {
      removeCookie("staffType");
      removeCookie("staffId");
      navigate("/");
  }

  useEffect(() => {
    if(cookie["staffType"] == 8){
      setStyle({display:'block'});
    }
  },[cookie["staffType"]]);

  return (
    <Box display="flex"  justifyContent="space-between" p={2} sx={{backgroundColor:'#ebedef',}}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={''}
        borderRadius="3px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex" position="relative">
        {/* <IconButton sx={{ color: "black" }} onClick={toggleDropdown} onMouseLeave={() => setIsDropdownOpen(false)}>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        <IconButton
          sx={{ color: "black" }}
          onClick={toggleDropdown}
          // onMouseOver={toggleDropdown}
        >
          <PersonOutlinedIcon />
        </IconButton>
        {isDropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              zIndex: 1000,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li
                style={{
                  padding: "10px 20px",
                  color: "#333",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <Link style={style} to= {`/editstaff/${cookie["staffId"]}`} className="btn">Profile</Link>
              </li>
              <li
                style={{
                  padding: "10px 20px",
                  color: "#333",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <button className="btn" onClick={LogoutClick}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
