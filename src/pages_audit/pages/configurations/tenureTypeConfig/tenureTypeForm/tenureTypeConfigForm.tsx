import { FC, useState, useRef, useContext } from "react";
import { useMutation } from "react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useSnackbar } from "notistack";
import * as API from "../api";
import { TenureTypeConfigMetadata } from "./metaData";
import { MasterDetailsForm } from "components/formcomponent";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { cloneDeep } from "lodash-es";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";

interface updateTenureTypeConfigDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}

const updateTenureTypeConfigDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateTenureTypeConfigDataType) => {
    return updateMasterData(data);
  };

const TenureTypeConfigForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const myRef = useRef<any>(null);
  const [isLoading, setLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);

  const mutation = useMutation(
    updateTenureTypeConfigDataWrapperFn(API.updateTenureTypeConfigData),
    {
      onError: (error: any, { endSubmit, setLoading }) => {
        // setLoading(false);
        onActionCancel();
        endSubmit(true, error?.error_msg, error?.error_detail);
      },
      onSuccess: (data, { endSubmit, setLoading }) => {
        // setLoading(false);
        endSubmit(true);
        enqueueSnackbar("Record Updated successfully.", {
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
    mutation.mutate({ ...isErrorFuncRef.current });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };
  const onSubmitHandler = ({ data, displayData, endSubmit, setFieldError }) => {
    // setLoading(true);
    endSubmit(true);
    data["COMP_CD"] = authState.companyID;
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    setopenAccept(true);
  };

  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;

  metadata = cloneDeep(
    TenureTypeConfigMetadata
  ) as unknown as MasterDetailsMetaData;

  return (
    <>
      <MasterDetailsForm
        metaData={metadata}
        ref={myRef}
        // initialData={rows?.[0]?.data as InitialValuesType}
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
      {openAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  );
};

export const TenureTypeFormWrapper = ({ isDataChangedRef, closeDialog }) => {
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
      <TenureTypeConfigForm
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};
