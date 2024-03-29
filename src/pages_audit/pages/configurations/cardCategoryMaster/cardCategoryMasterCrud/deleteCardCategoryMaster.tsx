//@ts-ignore
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@mui/material/DialogContent";
import * as API from "../api";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import { AuthContext } from "pages_audit/auth";

// interface DeleteFormDataType {
//   transactionID?: number;
// }

const DeleteFormDataFnWrapper = (deleteFormData) => async (data) => {
  const a = deleteFormData(data);
  return a;
};

const DeleteCardCategoryMaster = ({
  closeDialog,
  transactionID,
  isDataChangedRef,
  rows,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const mutation = useMutation(
    DeleteFormDataFnWrapper(
      API.deleteBytransactionID({
        COMP_CD: authState.companyID,
        BRANCH_CD: authState.user.branchCode,
        ...rows?.[0]?.data,
        _isDeleteRow: true,
      })
    ),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("Records successfully deleted", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  return (
    <Dialog open={true} maxWidth="sm">
      <DialogTitle>Would you like to delete the selected record?</DialogTitle>
      <DialogContent>
        {mutation.isLoading ? (
          "Deleting..."
        ) : mutation.isError ? (
          <Alert
            severity="error"
            // I suspect this, mutation.error?.error_msg is misspelt. Try errorMessage
            errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
            errorDetail={mutation.error?.error_detail ?? ""}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="secondary"
          disabled={mutation.isLoading}
        >
          No
        </Button>
        <Button
          onClick={() => mutation.mutate({ transactionID })}
          color="secondary"
          disabled={mutation.isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteCardCategoryMasterWrapper = ({
  closeDialog,
  isDataChangedRef,
}) => {
  const { state: rows } = useLocation();
  //@ts-ignore
  const transactionID = rows?.map((one) => one.id);
  return (
    <DeleteCardCategoryMaster
      transactionID={transactionID}
      closeDialog={closeDialog}
      isDataChangedRef={isDataChangedRef}
      rows={rows}
    />
  );
};
