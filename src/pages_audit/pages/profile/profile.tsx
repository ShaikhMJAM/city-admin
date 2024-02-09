import { AuthContext } from "pages_audit/auth";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import * as API from "./api";
import { queryClient } from "cache";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { Alert } from "components/common/alert";
import { UserLoginDtlGridMetaData, UserProfileMetaData } from "./metaData";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { utilFunction } from "components/utils/utilFunctions";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";
import { GridMetaDataType } from "components/dataTableStatic";
import { ChangePassword } from "./changePassword";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "./style.css";
import { ProfilePhotoUpdate } from "./profilePhotoUpload";
import { GeneralAPI } from "registry/fns/functions";
import TotpEnbaledDisabled from "./totp/totp-enabled-disable";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { authState, setProfileImage } = useContext(AuthContext);
  const myGridRef = useRef<any>(null);
  const userID = authState?.user?.id;
  const urlObj = useRef<any>(null);
  const fileUploadControl = useRef<any | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showTOTP, setshowTOTP] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [filesdata, setFilesData] = useState<any>([]);
  const [totpAuthStatus, setTotpAuthStatus] = useState<any>("");
  const [ProfilePictureURL, setProfilePictureURL] = useState<any | null>(null);
  const { t } = useTranslation();
  //typeof blob === "object" && Boolean(blob) ? URL.createObjectURL(blob) : ""
  //);
  const queryData = useQuery<any, any, any>(["getUserDetails"], () =>
    API.getUserDetails({ userID })
  );
  const userActivityData = useQuery<any, any, any>(
    ["getUserLoginDetails"],
    () => API.getUserLoginDetails({ userID })
  );

  useEffect(() => {
    GeneralAPI.setDocumentName("Profile");
    return () => {
      queryClient.removeQueries(["getUserDetails"]);
      queryClient.removeQueries(["getUserLoginDetails"]);
    };
  }, []);
  useEffect(() => {
    if (Boolean(queryData.data?.PROFILE_PHOTO)) {
      let blob = utilFunction.base64toBlob(queryData.data?.PROFILE_PHOTO);
      urlObj.current =
        typeof blob === "object" && Boolean(blob)
          ? URL.createObjectURL(blob)
          : "";
      setProfilePictureURL(urlObj.current);
      setProfileImage(urlObj.current);
    }
    setTotpAuthStatus(queryData.data?.TOTP_ENABLED);
  }, [queryData.data]);
  const handleProfileUploadClose = (flag, imgdata) => {
    if (
      Boolean(flag) &&
      flag === "Y" &&
      typeof imgdata === "object" &&
      Boolean(imgdata)
    ) {
      urlObj.current =
        typeof imgdata === "object" && Boolean(imgdata)
          ? URL.createObjectURL(imgdata)
          : "";
      setProfilePictureURL(urlObj.current);
      setProfileImage(urlObj.current);
    }
    setProfileUpdate(false);
  };
  const handleFileSelect = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    if (filesArray.length > 0) {
      setFilesData(filesArray);
      setProfileUpdate(true);
    }
  };
  return (
    <Fragment>
      {queryData.isLoading ||
      queryData.isFetching ||
      userActivityData.isLoading ||
      userActivityData.isFetching ? (
        <LoaderPaperComponent />
      ) : queryData.isError || userActivityData.isError ? (
        <Alert
          severity={
            queryData.isError
              ? queryData.error?.severity ?? "error"
              : userActivityData.error?.severity ?? "error"
          }
          errorMsg={
            queryData.isError
              ? queryData.error?.error_msg ?? "Unknown error occured"
              : userActivityData.error?.error_msg ?? "Unknown error occured"
          }
          errorDetail={
            queryData.isError
              ? queryData.error?.error_detail ?? ""
              : userActivityData.error?.error_detail ?? ""
          }
        />
      ) : (
        <>
          <Grid
            key={"mainGrid"}
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            direction="row"
          >
            <Grid
              key={"Griditem1"}
              item
              xs={12}
              md={12}
              lg={12}
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              style={{
                marginBottom: "1px",
                marginTop: "5px",
                marginRight: "12px",
              }}
            >
              <AppBar position="relative" color="secondary">
                <Toolbar variant="dense">
                  <Typography
                    component="div"
                    variant="h6"
                    color="inherit"
                    style={{
                      flex: "1 1 100%",
                      color: "var(--white)",
                      letterSpacing: "1px",
                      fontSize: "1.5rem",
                    }}
                  >
                    {t(
                      UserProfileMetaData?.form?.label ?? "profile.UserProfile"
                    )}
                  </Typography>
                  <div style={{ flexGrow: 1 }}></div>
                  {queryData.data?.TOTP_PARA === "Y" ? (
                    <Button
                      onClick={() => {
                        setshowTOTP(true);
                      }}
                      color="primary"
                      style={{ marginRight: 10 }}
                    >
                      {totpAuthStatus === "N"
                        ? t("profile.EnableTOTPAuth")
                        : totpAuthStatus === "Y"
                        ? t("profile.DisableTOTPAuth")
                        : ""}
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => {
                      setShowProfile(true);
                    }}
                    color="primary"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("profile.ChangePassword")}
                  </Button>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid
              key={"Griditem2"}
              item
              xs={12}
              md={3}
              lg={3}
              container
              spacing={1}
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{ marginBottom: "1px" }}
            >
              <Paper
                style={{
                  width: "100%",
                  height: "43vh",
                  padding: "50px 24px",
                  // borderRadius: "5%",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "18vh",
                      height: "18vh",
                      margin: "auto",
                      border: "1px dashed #9a9a9a",
                      borderRadius: "50%",
                      padding: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div className="image-data">
                      <Avatar
                        key={"ProfilePicture"}
                        alt="User"
                        src={
                          Boolean(ProfilePictureURL) ? ProfilePictureURL : ""
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {(queryData.data?.NAME || userID)
                          .toUpperCase()
                          .substring(0, 1)}
                      </Avatar>
                    </div>
                    <div
                      className="image-upload-icon"
                      onClick={() => fileUploadControl?.current?.click()}
                    >
                      <IconButton>
                        <AddAPhotoIcon htmlColor="white" />
                      </IconButton>
                      <Typography
                        component={"span"}
                        style={{
                          margin: "0",
                          color: "white",
                          lineHeight: "1.5",
                          fontSize: "0.75rem",
                          fontFamily: "Public Sans,sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        Update Photo
                      </Typography>
                      <input
                        name="fileselect"
                        type="file"
                        style={{ display: "none" }}
                        ref={fileUploadControl}
                        onChange={handleFileSelect}
                        accept=".png,.jpg,.jpeg"
                        onClick={(e) => {
                          //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
                          //@ts-ignore
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "x-large",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      color: "var(--theme-color1)",
                      textTransform: "capitalize",
                    }}
                  >
                    {(queryData.data?.NAME || userID).toLowerCase()}
                  </div>
                  <div
                    style={{ fontSize: "small", textTransform: "capitalize" }}
                  >
                    {(queryData.data?.USER_LEVEL || "").toLowerCase()}
                  </div>
                </div>
                {/* <CardProfile /> */}
              </Paper>
            </Grid>
            <Grid
              key={"Griditem3"}
              item
              xs={12}
              md={9}
              lg={9}
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
              style={{ marginBottom: "1px" }}
            >
              <Paper
                className="paddingPaper"
                style={{
                  width: "100%",
                }}
              >
                <FormWrapper
                  key="UserProfile"
                  metaData={UserProfileMetaData as MetaDataType}
                  initialValues={queryData.data}
                  onSubmitHandler={() => {}}
                  displayMode={"view"}
                  hideDisplayModeInTitle={true}
                  formStyle={{
                    background: "white",
                    height: "40vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                  hideHeader={true}
                />
              </Paper>
            </Grid>
            <Grid
              key={"Griditem4"}
              item
              xs={12}
              md={12}
              lg={12}
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
              style={{ marginBottom: "0px", marginRight: "12px" }}
            >
              <GridWrapper
                key={`UserLoginReqGrid`}
                finalMetaData={UserLoginDtlGridMetaData as GridMetaDataType}
                data={userActivityData.data ?? []}
                setData={() => null}
                //loading={result.isLoading}
                actions={[]}
                setAction={() => {}}
                refetchData={() => {}}
                ref={myGridRef}
              />
            </Grid>
          </Grid>
          <ChangePassword
            showProfile={showProfile}
            onClose={() => setShowProfile(false)}
          />
          {showTOTP ? (
            <TotpEnbaledDisabled
              open={showTOTP}
              onClose={(isSuccess, isLocked) => {
                if (isSuccess) {
                  setTotpAuthStatus((old) => {
                    if (old === "N") {
                      return "Y";
                    } else {
                      return "N";
                    }
                  });
                }
                setshowTOTP(false);
              }}
              authFlag={totpAuthStatus === "N" ? "ENABLED" : "DISABLED"}
            />
          ) : null}
          {profileUpdate && filesdata.length > 0 ? (
            <ProfilePhotoUpdate
              open={profileUpdate}
              onClose={handleProfileUploadClose}
              files={filesdata}
              userID={userID}
            />
          ) : null}
        </>
      )}
    </Fragment>
  );
};
