//@ts-ignore
import { useLocation } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Alert } from "components/common/alert";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { LoadingTextAnimation } from "components/common/loader";
import { useShortcutKeys } from "components/custom-hooks/useShortcutKeys";
import { keyMapper } from "components/custom-hooks/keyMapper";
import { useRef } from "react";

export const MessageBoxWrapper = ({
  isOpen = false,
  validMessage,
  onActionYes,
  onActionNo,
  rows,
  isLoading = false,
  isError = false,
  error_msg = "",
  error_detail = "",
  loadingText = "Loading...",
}) => {
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  useShortcutKeys({
    key: keyMapper.savePopupYes,
    actionHandler: () => {
      if (yesBtnRef.current) yesBtnRef.current?.click();
    },
  });

  useShortcutKeys({
    key: keyMapper.savePopupNo,
    actionHandler: () => {
      if (noBtnRef.current) noBtnRef.current?.click();
    },
  });

  return (
    <Dialog open={isOpen} maxWidth="sm">
      <DialogTitle>{validMessage}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          //   "Deleting..."
          <LoadingTextAnimation key={"loaderforDeleteing"} text={loadingText} />
        ) : isError ? (
          <Alert
            severity="error"
            // I suspect this, mutation.error?.error_msg is misspelt. Try errorMessage
            errorMsg={error_msg ?? "Unknown Error occured"}
            errorDetail={error_detail ?? ""}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          ref={noBtnRef}
          onClick={() => onActionNo()}
          color="secondary"
          disabled={isLoading}
        >
          No
        </Button>
        <Button
          ref={yesBtnRef}
          onClick={() => onActionYes(rows)}
          color="secondary"
          disabled={isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const MessageBoxNavigateWrapper = ({
  validMessage,
  onActionYes,
  onActionNo,
  isLoading = false,
  isError = false,
  error_msg = "",
  error_detail = "",
  loadingText = "Loading...",
}) => {
  const { state: rows } = useLocation();
  return (
    <MessageBoxWrapper
      isOpen={true}
      validMessage={validMessage}
      isLoading={isLoading}
      onActionYes={onActionYes}
      onActionNo={onActionNo}
      isError={isError}
      rows={rows}
      error_msg={error_msg}
      error_detail={error_detail}
      loadingText={loadingText}
    />
  );
};
