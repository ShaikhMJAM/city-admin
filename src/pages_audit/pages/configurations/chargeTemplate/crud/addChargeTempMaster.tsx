import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as API from "../api";
import { chargeTempMasterDetailsMetaData } from "../metadata/form";
import { MasterDetailsForm } from "components/formcomponent";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { useContext, useRef, useState } from "react";
import { format } from "date-fns/esm";
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

const AddChargeTempMaster = ({ isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const myRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);

  const mutation = useMutation(
    addMasterFormDataFnWrapper(API.insertMastersData()),
    {
      onError: (error: any, { endSubmit, SetLoadingOWN }) => {
        // SetLoadingOWN(false, error?.error_msg, error?.error_detail ?? "");
        onActionCancel();
      },
      onSuccess: (data, { endSubmit, SetLoadingOWN }) => {
        // SetLoadingOWN(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar(data, {
          variant: "success",
        });
        closeDialog();
        onActionCancel();
      },
    }
  );
  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };
  const onSubmitHandler = ({
    data,
    resultValueObj,
    resultDisplayValueObj,
    endSubmit,
    setFieldErrors,
    actionFlag,
    displayData,
    setFieldError,
  }) => {
    // setLoading(true);
    endSubmit(true);
    const SetLoadingOWN = (isLoading, error_msg = "", error_detail = "") => {
      setLoading(isLoading);
      endSubmit(isLoading, error_msg, error_detail);
    };
    if (Boolean(data["EFFECTIVE_DT"])) {
      data["EFFECTIVE_DT"] = format(
        new Date(data["EFFECTIVE_DT"]),
        "dd/MM/yyyy"
      );
    }
    data["COMP_CD"] = authState.companyID;
    data["BRANCH_CD"] = authState.user.branchCode;
    // mutation.mutate({ data, SetLoadingOWN, endSubmit });
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    setIsOpenAccept(true);
  };
  const onPopupAccept = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
  };
  const onActionCancel = () => {
    setIsOpenAccept(false);
  };

  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;

  metadata = cloneDeep(
    chargeTempMasterDetailsMetaData
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
        containerstyle={{
          paddingRight: "10px",
          paddingLeft: "10px",
          paddingTop: "5px",
        }}
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
                // disabled={isSubmitting}
                //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                // disabled={isSubmitting}
                // endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={closeDialog}
                // disabled={isSubmitting}
                color={"primary"}
              >
                Close
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={isOpenAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  );

  return renderResult;
};

export const AddChargeTempMasterWrapper = ({
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      <AddChargeTempMaster
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
