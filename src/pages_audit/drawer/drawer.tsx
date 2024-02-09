import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import Logo from "assets/images/netbankinglogo.png";
// import Logo from "assets/images/EasyNetPro.png";

import { useStyles } from "./style";

export const MyDrawer = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
  children,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      style={{ height: "100vh" }}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <img
          src={Logo}
          alt="Netbanking"
          className={classes.logo}
          style={{ display: open ? "block" : "none" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("./dashboard");
          }}
        />
        <IconButton
          onClick={handleDrawerClose}
          style={{ display: open ? "flex" : "none" }}
        >
          <ChevronLeftIcon
            // onClick={handleDrawerOpen}

            style={{ color: "var(--theme-color1)" }}
          />
        </IconButton>
        <IconButton
          onClick={handleDrawerOpen}
          // style={{ display: "none" }}
          style={{ display: open ? "none" : "flex", right: "2px" }}
        >
          <MenuIcon style={{ color: "var(--theme-color1)" }} />
        </IconButton>
      </div>
      <Divider className={classes.hrCSS} />
      {children}
    </Drawer>
  );
};
