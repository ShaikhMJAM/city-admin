import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router";
//import { AuthSDK } from "registry/fns/auth";
import { queryClient } from "cache";
import { AuthContextType, AuthStateType, ActionType } from "./type";
import * as API from "./api";
import LinearProgress from "@mui/material/LinearProgress";
import { AuthSDK } from "registry/fns/auth";
import { RefreshTokenData } from "./api";
import { utilFunction } from "components/utils/utilFunctions";
import { GeneralAPI } from "registry/fns/functions";
import CRC32C from "crc-32";
const inititalState: AuthStateType = {
  access_token: {},
  isLoggedIn: false,
  role: "",
  roleName: "",
  userSubType: "",
  companyID: "",
  companyName: "",
  groupName: "",
  access: {},
  menulistdata: [],
  user: {
    branch: "",
    branchCode: "",
    name: "",
    lastLogin: "",
    id: "",
    session_id: "",
  },
};

const authReducer = (
  state: AuthStateType,
  action: ActionType
): AuthStateType => {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return inititalState;
    }
    default: {
      return state;
    }
  }
};
let timeoutID: any = null;
let timeoutLogout: any = null;
export const AuthContext = createContext<AuthContextType>({
  login: () => true,
  logout: () => true,
  isLoggedIn: () => false,
  authState: inititalState,
  getProfileImage: "",
  setProfileImage: () => false,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inititalState);
  const [authenticating, setAuthenticating] = useState(true);
  const [profileImage, setProfileImagestate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [comingFromRoute, setComingRouteFrom] = useState(location.pathname);

  /*eslint-disable react-hooks/exhaustive-deps*/
  const login = useCallback(
    (payload: AuthStateType, stopNavigation?: boolean) => {
      dispatch({
        type: "login",
        payload: {
          ...payload,
          isLoggedIn: true,
        },
      });
      AuthSDK.setToken(payload.access_token);
      AuthSDK.loginUserDetails(payload);
      RefreshTokenAtExpired(
        payload.access_token?.expires_in,
        payload.access_token?.generateTime,
        payload.access_token?.refresh_token
      );
      setLoginDatainLocalStorage({ ...payload, isLoggedIn: true });
      if (stopNavigation) {
        return;
      }
      if (comingFromRoute === "/netbanking/login") {
        navigate("/netbanking", {
          replace: true,
        });
      } else {
        navigate(comingFromRoute, {
          replace: true,
        });
      }
    },
    [dispatch, navigate, comingFromRoute]
  );
  const logout = useCallback(() => {
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: any = JSON.parse(result);
      if (
        Boolean(localStorageAuthState?.isLoggedIn) &&
        Boolean(localStorageAuthState?.user?.id)
      ) {
        API.LogoutAPI({
          userID: localStorageAuthState?.user?.id,
          session_id: localStorageAuthState?.user?.session_id,
          token_id: localStorageAuthState?.access_token?.access_token,
        });
      }
    }
    localStorage.removeItem("authDetails");
    localStorage.removeItem("tokenchecksum");
    localStorage.removeItem("token_status");
    // localStorage.removeItem("routeHistory");
    dispatch({
      type: "logout",
      payload: {},
    });
    if (Boolean(timeoutID)) {
      clearTimeout(timeoutID);
    }
    queryClient.clear();
    if (window.location.pathname === "/netbanking/forgotpassword") {
    } else if (window.location.pathname === "/netbanking/forgot-totp") {
    } else {
      setComingRouteFrom("/netbanking/");
      navigate("/netbanking/login");
    }
  }, [dispatch, navigate]);

  const isLoggedIn = () => {
    return state.isLoggedIn;
  };
  const setProfileImage = (imgData) => {
    if (Boolean(imgData)) {
      setProfileImagestate(imgData);
    }
  };
  const setLoginDatainLocalStorage = async (payload) => {
    let payloadStr = JSON.stringify(payload);
    localStorage.setItem("tokenchecksum", await GenerateCRC32(payloadStr));
    localStorage.setItem("authDetails", payloadStr);
  };
  window.addEventListener("storage", async () => {
    let result = localStorage.getItem("authDetails");
    if (result === null) {
      logout();
    } else {
      // localStorage.getItem("tokenchecksum");
      let checksumdata = localStorage.getItem("tokenchecksum");
      let genChecksum = await GenerateCRC32(
        localStorage.getItem("authDetails") || ""
      );

      if (checksumdata !== genChecksum) {
        if (Boolean(timeoutLogout)) {
          clearTimeout(timeoutLogout);
        }
        timeoutLogout = setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  });

  useEffect(() => {
    //@ts-ignore
    window.__logout = logout;
    return () => {
      //@ts-ignore
      window.__logout = null;
    };
  }, [logout]);
  useEffect(() => {
    GeneralAPI.putOpenWindowName(window.location.pathname);
  }, [window.location.pathname]);
  useEffect(() => {
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: AuthStateType = JSON.parse(result);
      // if (Boolean(localStorageAuthState?.token ?? "")) {
      //   API.verifyToken(localStorageAuthState.token).then((result) => {
      //     if (result.status === "success") {
      login(localStorageAuthState, true);
      //     } else if (result.status === "failure") {
      //       if (result.data instanceof Error) {
      //         navigate("/error/Internet");
      //       } else {
      //         logout();
      //       }
      //     }
      setAuthenticating(false);
      //   });
      // } else {
      //   logout();
      //   setAuthenticating(false);
      // }
    } else {
      logout();
      setAuthenticating(false);
    }
  }, [login, logout, setAuthenticating]);
  const RefreshTokenAtExpired = async (
    expireTime,
    generateTime,
    expireToken
  ) => {
    if (!isNaN(expireTime) && !isNaN(generateTime)) {
      let geneTime = Number.parseInt(generateTime);
      let exTime = Number.parseInt(expireTime);
      let totalTime = (utilFunction.getCurrentDateinLong() - geneTime) / 1000;
      exTime = exTime - totalTime - 10;
      if (exTime > 0) {
        exTime = exTime * 1000;

        if (Boolean(timeoutID)) {
          clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(async () => {
          let accessToken = await RefreshTokenData(expireToken);
          setnewToken(accessToken);
        }, exTime);
      } else {
        let accessToken = await RefreshTokenData(expireToken);
        setnewToken(accessToken);
      }
    }
  };
  const setnewToken = (access_token) => {
    if (!Boolean(access_token)) return;
    let result = localStorage.getItem("authDetails");
    if (result !== null) {
      let localStorageAuthState: AuthStateType = JSON.parse(result);
      localStorageAuthState = {
        ...localStorageAuthState,
        access_token: {
          ...localStorageAuthState.access_token,
          ...access_token,
        },
      };
      // console.log(
      //   "setnewToken",
      //   access_token,
      //   localStorageAuthState.access_token
      // );
      setLoginDatainLocalStorage(localStorageAuthState);
      AuthSDK.setToken(localStorageAuthState.access_token);
      RefreshTokenAtExpired(
        localStorageAuthState.access_token?.expires_in,
        localStorageAuthState.access_token?.generateTime,
        localStorageAuthState.access_token?.refresh_token
      );
    }
  };
  const GenerateCRC32 = async (str) => {
    let fingerprint = await AuthSDK.Getfingerprintdata();
    return String(CRC32C.str((str || "") + fingerprint));
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        authState: state,
        getProfileImage: profileImage,
        setProfileImage,
      }}
    >
      {authenticating ? <LinearProgress color="secondary" /> : children}
    </AuthContext.Provider>
  );
};
