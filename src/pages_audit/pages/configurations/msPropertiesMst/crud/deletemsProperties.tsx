import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Alert } from "components/common/alert";
import { LoadingTextAnimation } from "components/common/loader";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import * as API from "../api";
interface updateMsPropertiesTemplDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}
const updateMsPropertiesTemplDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateMsPropertiesTemplDataType) => {
    return updateMasterData(data);
  };
export const DeleteMsProperties = ({
  isOpen,
  closeDialog,
  isDataChangedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state: rows }: any = useLocation();
  const mutation = useMutation(
    updateMsPropertiesTemplDataWrapperFn(API.updateMsPropertiesData),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar("Record deleted successfully.", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );
  const CallDeleteMsPropertiesRecords = () => {
    mutation.mutate({
      data: {
        ...(rows?.[0]?.data ?? {}),
        _isNewRow: false,
        _isDeleteRow: true,
      },
    });
  };
  return (
    <Dialog open={isOpen} maxWidth="sm">
      <DialogTitle>
        Are you sure to delete selected Mobile Number Validation Template?
      </DialogTitle>
      <DialogContent>
        {mutation.isLoading ? (
          //   "Deleting..."
          <LoadingTextAnimation key={"loaderforDeleteing"} text="Deleting..." />
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
          onClick={CallDeleteMsPropertiesRecords}
          color="secondary"
          disabled={mutation.isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
