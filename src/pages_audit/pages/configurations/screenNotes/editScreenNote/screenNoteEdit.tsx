import { FC, useState, useRef, useContext } from "react";
import { TextField } from "components/styledComponent/textfield";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import { ScreenNoteEditMetadata } from "./metaData";
import { CircularProgress, DialogActions, DialogContent } from "@mui/material";
import { useMutation } from "react-query";
import * as API from "../api";
import { useStyles } from "pages_audit/auth/style";
import { GradientButton } from "components/styledComponent/button";
import { GeneralAPI } from "registry/fns/functions";
import { StringtoUnicode, utilFunction } from "components/utils";
import { AuthContext } from "pages_audit/auth";

export const ScreenNoteEditWrapper: FC<{
  isDataChangedRef: any;
  handleDialogClose?: any;
  defaultView?: "edit";
}> = ({ isDataChangedRef, handleDialogClose, defaultView = "edit" }) => {
  const classes = useDialogStyles();
  const actionClasses = useStyles();
  const { state: rows }: any = useLocation();
  const OtherLanguageCode = "bn";
  const [isLocalLoding, setLocalLoading] = useState(false);
  const authController = useContext(AuthContext);
  const isErrorFuncRef = useRef<any>(null);
  const [inputdata, setInputData] = useState({
    engdata: rows?.[0]?.data?.SCREEN_MSG,
    localdata: rows?.[0]?.data?.SCREEN_MSG_BN,
    isError: false,
    errorMsg: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const result = useMutation(API.updateScreenNote, {
    onSuccess: (response: any) => {
      //refetch();
      enqueueSnackbar(response, {
        variant: "success",
      });
      isDataChangedRef.current = true;
      handleDialogClose();
      //onActionCancel();
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
      //onActionCancel();
    },
  });
  const handleChange = (event) => {
    if (event.target.name === "english") {
      setInputData((values) => ({
        ...values,
        engdata: event.target.value,
        isError: false,
      }));
    } else {
      setInputData((values) => ({ ...values, localdata: event.target.value }));
    }
  };
  const onTranslateProccess = async () => {
    setLocalLoading(true);
    let resText = await GeneralAPI.getTranslateDataFromGoogle(
      Boolean(inputdata.engdata) ? inputdata.engdata : inputdata.localdata,
      Boolean(inputdata.engdata) ? "en" : OtherLanguageCode,
      Boolean(inputdata.engdata) ? OtherLanguageCode : "en"
    );
    setLocalLoading(false);
    if (Boolean(resText)) {
      if (Boolean(inputdata.engdata)) {
        setInputData((values) => ({ ...values, localdata: resText }));
      } else {
        setInputData((values) => ({
          ...values,
          engdata: resText,
          isError: false,
        }));
      }
    }
  };
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    let upd = utilFunction.transformDetailsData(data, rows?.[0]?.data ?? {});
    if (defaultView && upd?._UPDATEDCOLUMNS?.length === 0) {
      handleDialogClose();
    } else {
      isErrorFuncRef.current = {
        data: {
          ...data,
          ...upd,
          COMP_CD: authController.authState.companyID,
          _isNewRow: defaultView === "edit" ? true : false,
          SCREEN_ID: rows[0]?.data?.SCREEN_ID,
          SCREEN_MSG: rows[0]?.data?.SCREEN_MSG,
          SCREEN_MSG_BN: rows[0]?.data?.SCREEN_MSG_BN,
        },
        displayData,
        endSubmit,
        setFieldError,
      };

      // setIsOpenSave(true);
    }
  };

  const saveScreenNote = (engNote, localNote) => {
    let screenID = rows[0]?.data?.SCREEN_ID ?? "";
    let oldData = {
      ...rows[0]?.data,
      SCREEN_MSG_BN: StringtoUnicode(
        rows[0]?.data?.SCREEN_MSG_BN ?? ""
      ).replaceAll("\\u", "\\"),
    };
    let upd = utilFunction.transformDetailsData(
      {
        SCREEN_ID: screenID,
        SCREEN_MSG: engNote.replaceAll("\r\n", "\n").replaceAll("\n", "\r\n"),
        SCREEN_MSG_BN: StringtoUnicode(localNote)
          .replaceAll("\\u", "\\")
          .replaceAll("\r\n", "\n")
          .replaceAll("\n", "\r\n"),
      },
      oldData
    );
    isErrorFuncRef.current = {
      ...upd,
      SCREEN_ID: screenID,
      SCREEN_MSG: engNote.replaceAll("\r\n", "\n").replaceAll("\n", "\r\n"),
      SCREEN_MSG_BN: StringtoUnicode(localNote)
        .replaceAll("\\u", "\\")
        .replaceAll("\r\n", "\n")
        .replaceAll("\n", "\r\n"),
    };

    if (upd?._UPDATEDCOLUMNS?.length === 0) {
      handleDialogClose();
    } else {
      result.mutate(isErrorFuncRef.current);
    }
  };
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "65%",
            // minHeight: "36vh",
            // height: "36vh",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <FormWrapper
          key={`paraEditDetail`}
          metaData={ScreenNoteEditMetadata as MetaDataType}
          initialValues={rows?.[0]?.data as InitialValuesType}
          onSubmitHandler={onSubmitHandler}
          //@ts-ignore
          // displayMode={formMode}
          formStyle={{
            background: "white",
            // height: "calc(42vh - 100px)",
            // overflowY: "auto",
            // overflowX: "hidden",
          }}
          containerstyle={{ padding: "10px" }}
        >
          {({ isSubmitting, handleSubmit }) => <></>}
        </FormWrapper>
        <DialogContent style={{ padding: "0px 12px" }}>
          <TextField
            autoFocus={true}
            label={"English*"}
            placeholder="Enter English Message"
            fullWidth
            multiline={true}
            minRows={8}
            maxRows={8}
            type={"text"}
            name="english"
            value={inputdata.engdata.trimStart()}
            onChange={handleChange}
            error={inputdata.isError}
            helperText={inputdata.isError ? inputdata.errorMsg : ""}
            InputLabelProps={{ shrink: true }}
            disabled={result.isLoading}
            autoComplete="off"
            // onKeyPress={(e) => {
            //   if (e.key === "F9") {
            //   }
            // }}
          />
          <TextField
            autoFocus={false}
            label={"Bangla"}
            placeholder="Enter Bangla Message"
            fullWidth
            multiline={true}
            minRows={8}
            maxRows={8}
            type={"text"}
            name="local"
            value={inputdata.localdata.trimStart()}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            disabled={result.isLoading}
            autoComplete="off"
            onKeyPress={(e) => {
              // if (e.key === "Enter" && isEntertoSubmit) {
              //   inputButtonRef?.current?.click?.();
              // }
            }}
          />
        </DialogContent>
        <DialogActions
          className={actionClasses.verifybutton}
          style={{ marginTop: "2px", marginBottom: "2px" }}
        >
          <>
            <GradientButton
              endIcon={result.isLoading ? <CircularProgress size={20} /> : null}
              disabled={isLocalLoding}
              onClick={() => {
                if (!Boolean(inputdata.engdata)) {
                  setInputData((values) => ({
                    ...values,
                    isError: true,
                    errorMsg: "This field is required.",
                  }));
                } else {
                  saveScreenNote(inputdata.engdata, inputdata.localdata);
                }
              }}
              // ref={inputButtonRef}
            >
              Save
            </GradientButton>

            <GradientButton
              disabled={result.isLoading || isLocalLoding}
              onClick={handleDialogClose}
            >
              Close
            </GradientButton>
            {!Boolean(inputdata.engdata) || !Boolean(inputdata.localdata) ? (
              <GradientButton
                disabled={result.isLoading || isLocalLoding}
                onClick={onTranslateProccess}
                endIcon={isLocalLoding ? <CircularProgress size={20} /> : null}
              >
                Translate
              </GradientButton>
            ) : null}
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

// export const ScreenNoteEditWrapper = ({
//   handleDialogClose,
//   isDataChangedRef,
// }) => {
//   const classes = useDialogStyles();
//   const { state: rows }: any = useLocation();
//   return (
//     <>
//       <Dialog
//         open={true}
//         //@ts-ignore
//         TransitionComponent={Transition}
//         PaperProps={{
//           style: {
//             width: "100%",
//             // minHeight: "36vh",
//             // height: "36vh",
//           },
//         }}
//         maxWidth="md"
//         classes={{
//           scrollPaper: classes.topScrollPaper,
//           paperScrollBody: classes.topPaperScrollBody,
//         }}
//       >
//         <ScreenNoteEdit
//           isDataChangedRef={isDataChangedRef}
//           closeDialog={handleDialogClose}
//         />
//       </Dialog>
//     </>
//   );
// };
