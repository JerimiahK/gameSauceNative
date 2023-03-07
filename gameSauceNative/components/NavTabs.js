import { View, Text, StyleSheet, Button } from "react-native";
// import Auth from "../utils/auth";

export default function NavTabs() {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  
return (
  <View style={style.navContainer}>
    <View>
      <Text style={style.navbarText}>GameSauce</Text>
    </View>
    <View style={style.headerButtons}>
      <Button
      title="Home"
      >
        <Text>Home</Text>
      </Button>
      <Button title="Games">
          <Text>Games</Text>
      </Button>
      <Button title="Login">
          <Text>Login</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarText: {
    paddingLeft: "5%",
    color: "#92b9e0",
    fontSize: "40%"
  },
  headerButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "5%",
  },
});