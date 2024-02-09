import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStylesBootstrapNav = makeStyles((theme: Theme) => ({
  navBarCSS: {
    padding: "4px 1rem ",
    backgroundColor: "#fff !important",
    minHeight: "64px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
  headerDropdown: {
    backgroundColor: "#fff",
    minWidth: "205px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderBottom: "3px solid  #26A456",
    marginTop: "0px",
  },
  navLinkHeader: {
    color: "#555",
    fontSize: "14px",
    lineHeight: "1.2",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: ".5rem",
    paddingLeft: ".5rem",
    fontWeight: 600,
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    "& hover": {
      color: "#0b6fb8",
    },
  },
  productLink: {
    color: "#555",
    padding: "0 1rem 8px 1rem",
    display: "inline-block",
    verticalAlign: "middle",
    cursor: "pointer",
    textTransform: "capitalize",
  },
  font13: {
    fontSize: "13px",
  },
  loginDropdown: {
    width: "160px",
  },
}));

export const useStylesSideBar = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: "left",
  },
  drawer: {
    paddingTop: "70px",
    width: "240px",
  },
  item: {
    display: "flex",
    borderBottom: "1px solid #93242433",
    borderRadius: "4px",
    marginLeft: "7px",
    marginTop: "10px",
    width: "90%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    background: "var(--white)",
    "& svg": {
      color: " var(--theme-color1)",
    },
    "&:hover": {
      boxShadow:
        "8px 8px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      background: "var(--theme-color2)",
    },
  },
  drawerIconSize: {
    width: "33px",
  },
  button: {
    color: "#0063A3",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "var(--theme-color1)",
      // boxShadow: "0px 15px 20px rgb(221 176 176 / 37%)",
    },
  },
  btnRoot: {
    paddingLeft: "24px",
    justifyContent: "left ",
  },
  navLinks: {
    height: "calc(100vh - 78px)",
    overflowY: "auto",
    overflowX: "hidden",
    // background: "var(--white)",
  },
  navLinksforseparateView: {
    height: "calc(100vh - 160px)",
    overflowY: "auto",
    overflowX: "hidden",
    // background: "var(--theme-color1)",
  },
  nestedMenuLevel1: {
    paddingLeft: "20px",
    paddingRight: theme.spacing(3),
    fontSize: "13px",
    "& div > svg": {
      fontSize: "14px",
    },
  },
  nestedMenuLevel2: {
    paddingLeft: "24px",
    fontSize: "12px",
    "& div > svg": {
      fontSize: "9px",
    },
  },
  listIcon: {
    minWidth: "32px !important",
    color: "var(--theme-color1)",
    fontWeight: 700,
    fontSize: "1.25rem",
  },
  link: {
    color: "var(--theme-color1)",
    fontSize: "1rem ",
    marginTop: "2px",
    marginBottom: "2px",
    textOverflow: "ellipsis",
    "& span": {
      fontWeight: 400,
      whiteSpace: "break-spaces",
    },
    "& p": {
      color: "var(--theme-color1)",
    },
  },
  linktext: {
    backgroundColor: "var(--white)",
    "&:hover": {
      "& div": {
        color: "var(--theme-color1) !important",
      },
      "& div > svg": {
        color: "var(--theme-color1) !important",
      },
    },
  },
  faSmall: {
    fontSize: "13px ",
  },
  openList: {
    ":not(activeMenuItem)": {
      "& > div": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
      "&  *": {
        color: "var(--theme-color2)",
      },
    },
  },
  openCurrent: {
    backgroundColor: "var(--theme-color1) !important",
    "&  *": {
      color: "var(--white)",
    },
  },
  slimList: {
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  activeMenuItem: {
    backgroundColor: "var(--theme-color1)!important ", //"var(--theme-color2)!important",
    "& > div": {
      color: "var(--white)!important",
    },
    "& svg": {
      color: "var(--white)",
    },
    // "& hover": {
    //   "& > div": {
    //     color: "var(--white)",
    //   },
    // },
    "& p": {
      color: "var(--white)!important",
    },
  },
}));
