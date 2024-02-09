import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as API from "../api";
import { UniversityMasterDetailsMetaData } from "./universityMetaData";
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

const AddUniversityMaster = ({ isDataChangedRef, closeDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const myRef = useRef<any>(null);
  const isErrorFuncRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const authController = useContext(AuthContext);
  const mutation = useMutation(
    addMasterFormDataFnWrapper(API.insertMastersData()),
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
        setIsOpenSave(false);
        closeDialog();
      },
    }
  );
  const { data } = useQuery<any, any>(["GetMiscValue"], () =>
    API.GetMiscValue()
  );
  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
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
    // setLoading(true);
    endSubmit(true);

    if (Boolean(data["EFFECTIVE_DT"])) {
      data["EFFECTIVE_DT"] = format(
        new Date(data["EFFECTIVE_DT"]),
        "dd/MM/yyyy"
      );
    }
    isErrorFuncRef.current = {
      data: {
        ...data,
        COMP_CD: authController.authState.companyID,
        ENTITY_TYPE: "U",
      },
      displayData,
      endSubmit,
      setFieldError,
    };
    data["COMP_CD"] = authState.companyID;
    data["BRANCH_CD"] = authState.user.branchCode;
    data["ENTITY_TYPE"] = "U";
    setIsOpenSave(true);
    // mutation.mutate({
    //   data,
    //   SetLoadingOWN,
    //   endSubmit,
    // });
  };

  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;

  metadata = cloneDeep(
    UniversityMasterDetailsMetaData
  ) as MasterDetailsMetaData;

  const renderResult = (
    <>
      <MasterDetailsForm
        metaData={metadata}
        ref={myRef}
        initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
        displayMode={"new"}
        isLoading={isLoading}
        onSubmitData={onSubmitHandler}
        isNewRow={true}
        formStyle={{
          background: "white",
          // height: "25vh",
          // overflowY: "auto",
          // overflowX: "hidden",
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

      {isOpenSave ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={isOpenSave}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  );

  return renderResult;
};

export const AddUniversityMasterWrapper = ({
  isDataChangedRef,
  closeDialog,
}) => {
  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
      maxWidth="md"
    >
      <AddUniversityMaster
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
