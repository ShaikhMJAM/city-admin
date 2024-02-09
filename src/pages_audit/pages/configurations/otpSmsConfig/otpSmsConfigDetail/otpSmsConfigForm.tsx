import { FC, useState, useRef, useContext, useEffect, useMemo } from "react";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { OtpSmsConfigMetadata } from "./metaData";
import { extractMetaData, utilFunction } from "components/utils";

import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { queryClient } from "cache";
import { makeStyles } from "@mui/styles";

const useTypeStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.2rem",
  },
  toolBar: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    background: "var(--theme-color1)",
    position: "sticky",
    top: 0,
    zIndex: 99,
    minHeight: "35px",
  },
}));
interface updateAUTHDetailDataType {
  data: any;
  endSubmit?: any;
  displayData?: any;
  setFieldError?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData(data);
  };

const OtpSmsConfigForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
  userMsgText: string;
}> = ({ isDataChangedRef, closeDialog, formView, userMsgText }) => {
  const headerClasses = useTypeStyles();
  const isErrorFuncRef = useRef<any>(null);
  const { state: rows }: any = useLocation();
  const [formMode, setFormMode] = useState(formView);
  const { authState } = useContext(AuthContext);
  const myTextFieldRef = useRef<any>(null);
  const mySMSTextRef = useRef<any>("");
  const myTextFieldPositionRef = useRef<any>(-1);
  const [smsText, SetSmsText] = useState(rows?.[0]?.data?.USER_MSG ?? "");
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const result = useQuery(["getOtpSmsTagList"], () =>
    API.getOtpSmsTagList({
      companyCode: authState.companyID,
      activityType: rows?.[0]?.data?.ACTIVITY_TYPE ?? "",
    })
  );
  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updateOtpSmsConfigGridData),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        onActionCancel();
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar(data, {
          variant: "success",
        });
        onActionCancel();
        isDataChangedRef.current = true;
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "string",
    drop: (item, monitor: any) => {
      if (formMode === "edit") {
        let data = String(monitor.getItem()?.id ?? "");
        if (myTextFieldPositionRef.current >= 0 && Boolean(data)) {
          let startText = smsText.substring(0, myTextFieldPositionRef.current);
          let endText = smsText.substring(myTextFieldPositionRef.current);
          myTextFieldPositionRef.current =
            myTextFieldPositionRef.current + data.length;
          SetSmsText(startText + "" + data + "" + endText);
        } else if (Boolean(data)) {
          SetSmsText(smsText + "" + data + "");
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const doubleClickEventHandel = (text) => {
    if (myTextFieldPositionRef.current >= 0 && Boolean(text)) {
      let startText = smsText.substring(0, myTextFieldPositionRef.current);
      let endText = smsText.substring(myTextFieldPositionRef.current);
      myTextFieldPositionRef.current =
        myTextFieldPositionRef.current + text.length;
      SetSmsText(startText + "" + text + "" + endText);
    } else if (Boolean(text)) {
      SetSmsText(smsText + "" + text + "");
    }
  };
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({ ...isErrorFuncRef.current });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getOtpSmsTagList"]);
    };
  }, []);

  const onSubmitHandler: SubmitFnType = (
    data: any,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    //@ts-ignore
    endSubmit(true);
    data["ACTIVE"] = data["ACTIVE"] === "Y" || data["ACTIVE"] ? true : false;
    const initialUserMsg = rows?.[0]?.data?.USER_MSG ?? "";
    const currentUserMsg = mySMSTextRef.current;
    let upd = utilFunction.transformDetailsData(data, rows?.[0]?.data ?? {});
    if (
      upd?._UPDATEDCOLUMNS?.length === 0 &&
      initialUserMsg === currentUserMsg
    ) {
      setFormMode("view");
    } else {
      data["USER_MSG"] = mySMSTextRef.current;
      data["ACTIVE"] = Boolean(data?.ACTIVE) ? "Y" : "N";
      isErrorFuncRef.current = {
        data,
        displayData,
        endSubmit,
        setFieldError,
      };

      setIsOpenSave(true);
    }

    // data["USER_MSG"] = mySMSTextRef.current;
    // data["ACTIVE"] = Boolean(data?.ACTIVE) ? "Y" : "N";

    // isErrorFuncRef.current = {
    //   data,
    //   displayData,
    //   endSubmit,
    //   setFieldError,
    // };
    // setIsOpenSave(true);
    // // }
  };
  useEffect(() => {
    mySMSTextRef.current = smsText;
  }, [smsText]);

  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(OtpSmsConfigMetadata, formMode),
    [OtpSmsConfigMetadata, formMode, ""]
  ) as MetaDataType;

  return (
    <>
      {result.isLoading || result.isFetching ? (
        <LoaderPaperComponent />
      ) : (
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            // style={{
            //   paddingTop: "10px",
            //   paddingLeft: "10px",
            //   paddingRight: "10px",
            // }}
          >
            <FormWrapper
              key={"otpSmsConfigForm" + formMode}
              metaData={masterMetadata as MetaDataType}
              initialValues={rows?.[0]?.data as InitialValuesType}
              onSubmitHandler={onSubmitHandler}
              //@ts-ignore
              displayMode={formMode}
              formStyle={{
                background: "white",
                // height: "30vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <>
                  {formMode === "view" ? (
                    <>
                      <Button
                        onClick={() => {
                          setFormMode("edit");
                        }}
                        color={"primary"}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={closeDialog}
                        color={"primary"}
                        //disabled={isSubmitting}
                      >
                        Close
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        // onClick={(event) => {
                        //   setIsOpenSave(true);
                        // }}
                        onClick={(event) => {
                          handleSubmit(event, "Save");
                        }}
                        disabled={isSubmitting}
                        color={"primary"}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          SetSmsText(rows?.[0]?.data?.USER_MSG ?? "");
                          setFormMode("view");
                        }}
                        disabled={isSubmitting}
                        color={"primary"}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              )}
            </FormWrapper>
          </Grid>
          {isOpenSave ? (
            <PopupMessageAPIWrapper
              MessageTitle="Confirmation"
              Message="Do you want to save this Request?"
              onActionYes={(rowVal) => onPopupYes(rowVal)}
              onActionNo={() => onActionCancel()}
              rows={rows?.[0]?.data}
              open={isOpenSave}
              loading={mutation.isLoading}
            />
          ) : null}
          <Grid item xs={8} sm={6} md={8} style={{ padding: "10px" }}>
            <div ref={drop}>
              <TextField
                id="outlined-multiline-static"
                label="SMS Text"
                placeholder="Enter SMS Text"
                multiline
                rows={10}
                // minRows={8}
                value={smsText}
                variant="outlined"
                color="secondary"
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={formMode === "view" ? true : false}
                // disabled={true}
                onChange={(event) => {
                  SetSmsText(event.target.value.trimStart());
                }}
                onBlur={(event) => {
                  myTextFieldPositionRef.current = event.target?.selectionStart;
                }}
                ref={myTextFieldRef}
                key={"SMSTestInput" + formMode}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            sm={6}
            md={4}
            style={{ paddingRight: "10px", paddingTop: "10px" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                height: "92%",
                overflow: "auto",
                border: "ridge",
                borderRadius: "3",
              }}
            >
              <Toolbar className={headerClasses.toolBar} variant={"dense"}>
                <Typography
                  className={headerClasses.title}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                >
                  Dynamic Keyword
                </Typography>
              </Toolbar>
              <nav aria-label="main mailbox folders">
                <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  {result?.data.map((item) => (
                    <ListItemData
                      key={"ListItem" + item?.SR_NO}
                      name={item?.TAG_NM}
                      doubleClickEventHandel={doubleClickEventHandel}
                      disabled={formMode === "view" ? true : false}
                    />
                  ))}
                </List>
              </nav>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export const ListItemData = ({
  name,
  doubleClickEventHandel,
  disabled,
}: {
  name: string;
  doubleClickEventHandel: any;
  disabled: boolean;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "string",
    item: { id: name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={dragRef} style={{ opacity: isDragging ? "0.5" : "1" }}>
      <ListItem disableGutters disablePadding>
        <ListItemButton
          disabled={disabled}
          onDoubleClick={() => {
            doubleClickEventHandel(name);
          }}
        >
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </div>
  );
};

export const OtpSmsConfigFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  formView,
}) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "65%",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <div
        // style={{
        //   paddingBottom: "20px",
        //   paddingRight: "5px",
        //   paddingLeft: "5px",
        // }}
        >
          <OtpSmsConfigForm
            isDataChangedRef={isDataChangedRef}
            closeDialog={handleDialogClose}
            formView={formView}
            userMsgText={""}
          />
        </div>
      </Dialog>
    </>
  );
};
