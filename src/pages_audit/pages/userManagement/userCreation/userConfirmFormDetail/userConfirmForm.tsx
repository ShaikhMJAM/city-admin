import { FC, useState, useContext, useCallback } from "react";
import { useMutation } from "react-query";
import { InitialValuesType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { UserconfirmFormMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { UpdateConfirmGridWrapper } from "../updateConfirm";
import { AuthContext } from "pages_audit/auth";
interface updateMasterDataType {
  confirmed: string;
  username: string;
}

const updateMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ confirmed, username }: updateMasterDataType) => {
    return updateMasterData(confirmed, username);
  };

const UserConfirmForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { state: rows }: any = useLocation();
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const authController = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.getUpdateSubConfirmGridData),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        enqueueSnackbar(errorMsg, {
          variant: "error",
        });
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });
        isDataChangedRef.current = true;
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
      onSettled: () => {
        onActionCancel();
      },
    }
  );

  const onAcceptPopupYes = (rows) => {
    mutation.mutate({
      confirmed: "Y",
      username: rows?.[0]?.data.USER_NAME ?? "",
    });
  };
  const onRejectPopupYes = (rows) => {
    mutation.mutate({
      confirmed: "R",
      username: rows?.[0]?.data.USER_NAME ?? "",
    });
  };

  const onActionCancel = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    if (isDataChangedRef.current === true) {
      // refetch();
      isDataChangedRef.current = false;
    }
  };
  const ClosedEventCall = useCallback(() => {
    setIsOpenUpdate(false);
  }, []);
  return (
    <>
      <FormWrapper
        key={"UserConfirmForm"}
        metaData={UserconfirmFormMetadata}
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={[]}
        //@ts-ignore
        displayMode={formView}
        formStyle={{
          background: "white",
          height: "55vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <>
          <Button
            onClick={() => {
              setIsOpenUpdate(true);
            }}
            color={"primary"}
          >
            Update Details
          </Button>
          <Button
            onClick={() => {
              if (
                (rows[0]?.data?.LAST_ENTERED_BY || "").toLowerCase() ===
                (authController?.authState?.user?.id || "").toLowerCase()
              ) {
                enqueueSnackbar("You can not accept your own entry.", {
                  variant: "warning",
                });
              } else {
                setIsOpenAccept(true);
              }
            }}
            color={"primary"}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              if (
                (rows[0]?.data?.LAST_ENTERED_BY || "").toLowerCase() ===
                (authController?.authState?.user?.id || "").toLowerCase()
              ) {
                enqueueSnackbar("You can not reject your own entry.", {
                  variant: "warning",
                });
              } else {
                setIsOpenReject(true);
              }
            }}
            color={"primary"}
          >
            Reject
          </Button>
          {typeof closeDialog === "function" ? (
            <Button onClick={closeDialog} color={"primary"}>
              Close
            </Button>
          ) : null}
        </>
      </FormWrapper>
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to accept this Request?"
          onActionYes={(row) => onAcceptPopupYes(row)}
          onActionNo={() => onActionCancel()}
          rows={rows}
          open={isOpenAccept}
          // loading={result.isLoading}
        />
      ) : null}
      {isOpenReject ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to reject this Request?"
          onActionYes={(row) => onRejectPopupYes(row)}
          onActionNo={() => onActionCancel()}
          rows={rows}
          open={isOpenReject}
          // loading={result.isLoading}
        />
      ) : null}
      {/* {isOpenUpdate ? (
        
      ) : null} */}
      {isOpenUpdate ? (
        <UpdateConfirmGridWrapper
          open={isOpenUpdate}
          closeDialog={() => {
            ClosedEventCall();
          }}
          rowData={rows?.[0]?.data}
        />
      ) : null}
    </>
  );
};

export const UserConfirmFormWrapper = ({
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
            width: "70%",
            // minHeight: "33vh",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <UserConfirmForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
