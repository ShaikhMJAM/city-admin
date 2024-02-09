import { AppBar, Dialog, Grid, IconButton, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Transition } from "pages_audit/common";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { ActionTypes } from "components/dataTable";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { MsPropertiesDetailsMetaDatas } from "./metadata";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { makeStyles } from "@mui/styles";

import { useNavigate } from "react-router-dom";
import { MSProperitiesFormWrapper } from "./MSProperitesForm";
const useTypeStyles = makeStyles((theme) => ({
  title: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "center",
  },
  title1: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
  typography: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "left",
  },
  gridMain: {
    display: "flex",
    margin: "5px 5px 5px 5px",
  },
  gridLabel: {
    color: "Black",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "5px",
  },
  gridRows: {
    color: "var(--theme-color1)",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  gridHeader: {
    margin: "0px 20px 0px 20px",
  },
  topScrollPaper: {
    alignItems: "center",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
  refreshiconhover: {},
}));

const actions: ActionTypes[] = [
  {
    actionName: "edit",
    actionLabel: "Edit",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const MsPropertiesDetails = ({
  ClosedEventCall,
  isDataChangedRef,
  defaultmode = "view",
}) => {
  const classes = useDialogStyles();

  const myMemberDataRef = useRef<any>({});
  const myEntryTypeRef = useRef<any>("edit");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isAddProperities, setIsAddProperities] = useState(false);
  const { state: rows }: any = useLocation();
  const headerClasses = useTypeStyles();
  const mutationRet: any = useMutation(API.getMsPropertiesDetailGridData);
  const [girdData, setGridData] = useState<any>([]);
  const myGridRef = useRef<any>(null);
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "close") {
        ClosedEventCall();
      } else if (data?.name === "add") {
        myEntryTypeRef.current = "add";
        setIsAddProperities(true);
        myMemberDataRef.current = rows?.[0]?.data ?? {};
        isDataChangedRef.current = rows?.[0]?.data ?? {};
      } else if (data?.name === "edit") {
        myEntryTypeRef.current = "edit";
        myMemberDataRef.current = data?.rows?.[0]?.data ?? {};
        isDataChangedRef.current = rows?.[0]?.data ?? {};
        setIsAddProperities(true);
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );

  useEffect(() => {
    mutationRet.mutate({
      A_APPLICATION_NAME: rows[0]?.data?.APPLICATION_NAME,
      A_PROFILE_NM: rows[0]?.data?.PROFILE_NM,
      A_LABEL: rows[0]?.data?.LABEL,
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(mutationRet?.data)) {
      setGridData(mutationRet?.data);
    } else {
      setGridData([]);
    }
  }, [mutationRet?.data]);

  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "65%",
            height: "auto",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <div style={{ padding: "10px" }}>
          {/* {mutationRet.isLoading || mutationRet.isFetching ? (
            <div style={{ height: 100, paddingTop: 10 }}>
              <div style={{ padding: 10 }}>
                <LoaderPaperComponent />
              </div>
              {typeof ClosedEventCall === "function" ? (
                <div style={{ position: "absolute", right: 0, top: 0 }}>
                  <IconButton onClick={ClosedEventCall}>
                    <HighlightOffOutlinedIcon />
                  </IconButton>
                </div>
              ) : null}
            </div>
          ) : mutationRet.isError ? (
            <>
              <div
                style={{
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  height: 100,
                  paddingTop: 10,
                }}
              >
                <AppBar position="relative" color="primary">
                  <Alert
                    severity="error"
                    errorMsg={mutationRet.error?.error_msg ?? "Unknow Error"}
                    errorDetail={mutationRet.error?.error_detail ?? ""}
                    color="error"
                  />
                  {typeof ClosedEventCall === "function" ? (
                    <div style={{ position: "absolute", right: 0, top: 0 }}>
                      <IconButton onClick={ClosedEventCall}>
                        <HighlightOffOutlinedIcon />
                      </IconButton>
                    </div>
                  ) : null}
                </AppBar>
              </div>
            </>
          ) : null} */}

          {mutationRet?.isError ? (
            <>
              <Alert
                severity="error"
                errorMsg={mutationRet?.error?.error_msg ?? ""}
                errorDetail={mutationRet?.error?.error_detail ?? ""}
              />
              {typeof ClosedEventCall === "function" ? (
                <div style={{ position: "absolute", right: 0, top: 0 }}>
                  <IconButton onClick={ClosedEventCall}>
                    <HighlightOffOutlinedIcon />
                  </IconButton>
                </div>
              ) : null}
            </>
          ) : null}
          <div
            style={{
              borderRadius: "4px",
              margin: "3px",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <div className={headerClasses.gridMain}>
              <div className={headerClasses.gridHeader}>
                <div className={headerClasses.gridLabel}>Application Name</div>
                <div className={headerClasses.gridRows}>
                  {rows?.[0]?.data?.APPLICATION_NAME}
                </div>
              </div>
              <div className={headerClasses.gridHeader}>
                <div className={headerClasses.gridLabel}>Profile Name</div>
                <div className={headerClasses.gridRows}>
                  {rows?.[0]?.data?.PROFILE_NM}
                </div>
              </div>
              <div className={headerClasses.gridHeader}>
                <div className={headerClasses.gridLabel}>Label</div>
                <div className={headerClasses.gridRows}>
                  {rows?.[0]?.data?.LABEL}
                </div>
              </div>
            </div>
          </div>

          <GridWrapper
            key={"MsProperties"}
            finalMetaData={MsPropertiesDetailsMetaDatas as GridMetaDataType}
            data={girdData}
            setData={setGridData}
            loading={mutationRet.isLoading}
            actions={actions}
            setAction={setCurrentAction}
            refetchData={[]}
            ref={myGridRef}
          />
          {isAddProperities ? (
            <MSProperitiesFormWrapper
              isDataChangedRef={isDataChangedRef}
              formView={myEntryTypeRef.current}
              handleDialogClose={() => {
                if (isDataChangedRef.current === true) {
                  // refetch();
                  mutationRet.mutate({
                    A_APPLICATION_NAME: rows[0]?.data?.APPLICATION_NAME,
                    A_PROFILE_NM: rows[0]?.data?.PROFILE_NM,
                    A_LABEL: rows[0]?.data?.LABEL,
                  });
                  isDataChangedRef.current = false;
                }
                setIsAddProperities(false);
              }}
              initialValues={myMemberDataRef.current}
            />
          ) : null}
          {rows[0]?.data?.LABEL === "maskedcolumn.properties" ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{ padding: "0px 10px 10px 20px" }}
            >
              <>
                <Typography
                  className={headerClasses.typography}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                >
                  Note:
                </Typography>
                <Typography
                  className={headerClasses.typography}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                  style={{ fontSize: "inherit" }}
                >
                  <ul style={{ paddingLeft: "15px" }}>
                    <li>
                      1. *-Replace the key value with * upto length.
                      EX.ACCOUNT=*{" "}
                    </li>
                    <li>
                      2. If blank then replace key value with empty string.
                      EX.accountNumber={" "}
                    </li>
                    <li>
                      3. If format is specify then system will match the format
                      and masked value as per given format but format length
                      must be same as key value length. If format not match with
                      value length then no masking will perform.
                      EX.$[1234******123,1234******123578]{" "}
                    </li>
                    <li>
                      4. If key name specify here is contain values as JSON
                      object/JSON array then the value will be replaced with
                      "".'{" "}
                    </li>
                  </ul>
                </Typography>
              </>
            </Grid>
          ) : null}
        </div>
      </Dialog>
    </Fragment>
  );
};
