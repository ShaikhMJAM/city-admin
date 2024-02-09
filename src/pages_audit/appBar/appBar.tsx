import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "assets/images/netbankinglogo.png";
// import Logo from "assets/images/EasyNetPro.png";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { AuthContext } from "../auth";
import { useStyles } from "./style";
import * as API from "./api";
import { useQuery } from "react-query";
import { utilFunction } from "components/utils";
import SearchScreen from "./searchScreen";
import { Box } from "@mui/material";
//import { ShowEntities, ShowProducts } from "./entities";
// import { NotificationWrapper } from "../notification";

export const MyAppBar = ({ handleDrawerOpen, open }) => {
  const authController = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState<any>("");
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const queryData = useQuery<any, any, any>(["getUserProfileImage"], () =>
    API.getUserProfileImage({ userID: authController?.authState?.user?.id })
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (Boolean(queryData.data?.PROFILE_PHOTO)) {
      let blob = utilFunction.base64toBlob(queryData.data?.PROFILE_PHOTO);
      let profileImageURL =
        typeof blob === "object" && Boolean(blob)
          ? URL.createObjectURL(blob)
          : "";
      authController.setProfileImage(profileImageURL);
    }
  }, [queryData.data]);

  useEffect(() => {
    if (queryData.isLoading) {
      setUserAvatar("");
      return;
    }
    const avatar = Boolean(authController.getProfileImage)
      ? authController.getProfileImage
      : "";
    setUserAvatar(avatar);
  }, [authController.getProfileImage]);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton> */}
        {open !== true ? (
          <img
            src={Logo}
            alt="Ratnaafin"
            className={classes.logo}
            onClick={(e) => {
              e.preventDefault();
              navigate("./dashboard");
            }}
          />
        ) : null}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {authController?.authState?.companyName}
          <div style={{ display: "flex", gap: "8px" }}>
            <div>
              <Typography variant="caption" display="block" color="secondary">
                Branch: {authController?.authState?.user?.branchCode ?? ""} -{" "}
                {authController?.authState?.user?.branch ?? ""}
              </Typography>
              <Typography variant="caption" display="block" color="secondary">
                Last Login:{" "}
                {checkDateAndDisplay(
                  authController?.authState?.user?.lastLogin ?? ""
                )}
              </Typography>
            </div>
          </div>
        </Typography>

        <SearchScreen />

        <div className={classes.loggedInUser}>
          {/* <NotificationWrapper /> */}
          <IconButton onClick={handleClick}>
            <Box
              // className={classes.heading_user_img_border}
              sx={{
                cursor: "pointer",
                border: "2px dashed var(--theme-color1)",
                borderRadius: "50%",
                padding: "3px",
              }}
            >
              <Avatar
                key={authController?.authState?.user?.name ?? "profile-image"}
                aria-label={authController?.authState?.user?.name ?? ""}
                style={{
                  backgroundColor: "var(--theme-color1)",
                  height: "45px",
                  width: "45px",
                }}
                // src={
                //   Boolean(authController.getProfileImage)
                //     ? authController.getProfileImage
                //     : ""
                // }
                src={userAvatar}
              >
                {authController?.authState?.user?.name
                  ?.substring(0, 1)
                  .toUpperCase()}
              </Avatar>
            </Box>
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            elevation={3}
            // getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: { maxWidth: "240px" },
            }}
          >
            <div style={{ padding: "16px" }}>
              <Typography variant="h6" className={classes.userName}>
                {authController?.authState?.user?.name}
              </Typography>
              <Typography variant="h6" className={classes.userDesignation}>
                {authController?.authState?.companyName}
              </Typography>
              <Typography variant="h6" className={classes.userDesignation}>
                Role: {authController?.authState?.roleName}
              </Typography>
              <Typography variant="h6" className={classes.userDesignation}>
                User ID : {authController?.authState?.user?.id}
              </Typography>
              {/* <ShowEntities
                entities={authController?.authState?.access?.entities}
              />
              <ShowProducts
                products={authController?.authState?.access?.products}
              /> */}
            </div>

            <MenuItem
              onClick={() => {
                navigate("/netbanking/profile");
                handleClose();
              }}
              className={classes.userprofilehover}
            >
              <AccountCircleIcon color="secondary" />
              <span className={classes.vTop}>Profile</span>
            </MenuItem>

            <div style={{ padding: "16px" }}>
              <Button
                onClick={() => {
                  authController?.logout();
                  setUserAvatar("");
                  handleClose();
                }}
                fullWidth
                variant="outlined"
                style={{ background: "var(--theme-color1)", color: "white" }}
              >
                Logout
              </Button>
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const checkDateAndDisplay = (dateStr: string) => {
  // const dt = new Date(dateStr);
  // //@ts-ignore
  // if (dt instanceof Date && !isNaN(dt)) {
  //   return dt.toDateString();
  // }
  if (Boolean(dateStr)) {
    return dateStr;
  }
  return "N/A";
};
