import { Fragment, useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/lab/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useMutation } from "react-query";
import { DOCCRUDContext } from "./context";
import { useSnackbar } from "notistack";

interface DeleteFormDataType {
  docType: string;
  docUUID?: string;
}

const DeleteDocumentDataFnWrapper =
  (deleteDocuments) =>
  async ({ docType, docUUID }: DeleteFormDataType) => {
    return deleteDocuments(docType, docUUID);
  };

export const DeleteAction = ({ dataChangedRef, closeDialog, docUUID }) => {
  const { deleteDocuments, context } = useContext(DOCCRUDContext);
  const docType = context.docCategory.filter((one) => one.primary === true)[0]
    .type;
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    DeleteDocumentDataFnWrapper(deleteDocuments.fn(deleteDocuments.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        dataChangedRef.current = true;
        enqueueSnackbar("Documents successful deleted", { variant: "success" });
        closeDialog();
      },
    }
  );

  return (
    <Fragment>
      {mutation.isError ? (
        <Alert severity="error">
          {mutation?.error?.error_msg ?? "Unknown Error occured"}
        </Alert>
      ) : null}
      {mutation.isLoading ? <LinearProgress variant={"indeterminate"} /> : null}
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete the selected Records
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="primary"
          disabled={mutation.isLoading}
        >
          No
        </Button>
        <Button
          color="primary"
          onClick={() => mutation.mutate({ docType: docType, docUUID })}
          disabled={mutation.isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Fragment>
  );
};
