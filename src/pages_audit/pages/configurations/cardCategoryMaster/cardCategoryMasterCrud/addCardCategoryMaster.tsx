import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as API from "../api";
import { cardCategoryMasterDetailsMetaData } from "./cardCategoryMasterMetaData";
import { MasterDetailsForm } from "components/formcomponent";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
interface addMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  SetLoadingOWN?: any;
}

const addMasterFormDataFnWrapper =
  (addMasterFn) =>
  async ({ data }: addMasterDataType) => {
    return addMasterFn(data);
  };

const AddCardCategoryMaster = ({ isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const myRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const mutation = useMutation(
    addMasterFormDataFnWrapper(API.insertMastersData()),
    // {
    //   onError: (error: any, { endSubmit, SetLoadingOWN }) => {
    //     SetLoadingOWN(false, error?.error_msg, error?.error_detail ?? "");
    //   },
    //   onSuccess: (data, { endSubmit, SetLoadingOWN }) => {
    //     SetLoadingOWN(true, "");
    //     isDataChangedRef.current = true;
    //     enqueueSnackbar(data, {
    //       variant: "success",
    //     });
    //     closeDialog();
    //   },
    // }
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        if (isErrorFuncRef.current == null) {
          enqueueSnackbar(errorMsg, {
            variant: "error",
          });
        } else {
          isErrorFuncRef.current?.endSubmit(
            false,
            errorMsg,
            error?.error_detail ?? ""
          );
        }
        onActionCancel();
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });

        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );

  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };
  const onPopupYesAccept = (rows) => {
    mutation.mutate({
      data: rows,
    });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };
  const onSubmitHandler = ({
    data,
    displayData,
    setFieldError,
    resultValueObj,
    resultDisplayValueObj,
    endSubmit,
    setFieldErrors,
    actionFlag,
  }) => {
    //@ts-ignore
    endSubmit(true);
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    data["COMP_CD"] = authState.companyID;
    data["BRANCH_CD"] = authState.user.branchCode;
    setopenAccept(true);
  };

  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;

  metadata = cloneDeep(
    cardCategoryMasterDetailsMetaData
  ) as MasterDetailsMetaData;

  const renderResult = (
    <>
      <MasterDetailsForm
        metaData={metadata}
        ref={myRef}
        initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
        displayMode={"New"}
        isLoading={isLoading}
        onSubmitData={onSubmitHandler}
        isNewRow={true}
        formStyle={{
          background: "white",
          height: "15vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={AddNewRow}
                disabled={isSubmitting}
                //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={closeDialog}
                disabled={isSubmitting}
                color={"primary"}
              >
                Close
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      {openAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do You want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  );

  return renderResult;
};

export const AddCardCategoryMasterWrapper = ({
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          width: "65%",
        },
      }}
      maxWidth="md"
    >
      <AddCardCategoryMaster
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
