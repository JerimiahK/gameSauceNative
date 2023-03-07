import { View, Text, StyleSheet } from "react-native";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
// import Auth from "../utils/auth";

export default function NavTabs() {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  
return (
        
        <View style={style.navContainer}>
          <View>
          <Text style={style.navbarText}>
          GameSauce
          </Text>
          </View>
          <View style={style.headerButtons}>
            <Button sx={{ minWidth: "0px" }}>
              <HomeIcon sx={{ color: "#92b9e0" }} />
              <Typography
                sx={{
                  color: "#C5C6C7",
                }}
              >
                <Text
                >
                  Home
                </Text>
              </Typography>
            </Button>
            <Button sx={{ minWidth: "0px" }}>
              <SportsHockeyIcon sx={{ color: "#92b9e0" }} />
              <Typography
                sx={{
                  color: "#C5C6C7",
                }}
              >
                <Text
                >
                  Games
                </Text>
              </Typography>
            </Button>
            <Button sx={{ minWidth: "0px" }}>
              <LoginIcon sx={{ color: "#92b9e0" }} />
              <Typography
                sx={{
                  color: "#C5C6C7",
                }}
              >
                <Text>
                  Login
                </Text>
              </Typography>
            </Button>
          </View>
        </View>
  
    // <View style="navContainer">
    //   <View style="headerText">
    //     <a id="navbarText" href="/">
    //       GameSauce
    //     </a>
    //   </View>
    //   {Auth.loggedIn() === true ? (
    //     <>
    //       <View style="headerButtons">
    //         <Button sx={{ minWidth: "0px" }}>
    //           <HomeIcon sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               href="/"
    //             >
    //               Home
    //             </Text>
    //           </Typography>
    //         </Button>
    //         <Button sx={{ minWidth: "0px" }}>
    //           <SportsHockeyIcon sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               href="/games"
    //             >
    //               Games
    //             </Text>
    //           </Typography>
    //         </Button>
    //         <Button sx={{ minWidth: "0px" }}>
    //           <LogoutIcon onClick={logout} sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               onClick={logout}
    //             >
    //               Logout
    //             </Text>
    //           </Typography>
    //         </Button>
    //       </View>
    //     </>
    //   ) : (
    //     <>
    //       <View style="headerButtons">
    //         <Button sx={{ minWidth: "0px" }}>
    //           <HomeIcon sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               href="/"
    //             >
    //               Home
    //             </Text>
    //           </Typography>
    //         </Button>
    //         <Button sx={{ minWidth: "0px" }}>
    //           <SportsHockeyIcon sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               href="/games"
    //             >
    //               Games
    //             </Text>
    //           </Typography>
    //         </Button>
    //         <Button sx={{ minWidth: "0px" }}>
    //           <LoginIcon sx={{ color: "#92b9e0" }} />
    //           <Typography
    //             sx={{
    //               color: "#C5C6C7",
    //             }}
    //           >
    //             <Text
    //               sx={{
    //                 textDecoration: "none",
    //               }}
    //               color="inherit"
    //               href="/login"
    //             >
    //               Login
    //             </Text>
    //           </Typography>
    //         </Button>
    //       </View>
    //     </>
    //   )}
    // </View>
  );
}

const style = StyleSheet.create({
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarText: {
    paddingLeft: "10px",
    color: "#92b9e0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "250%",
  },
  headerButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }
})