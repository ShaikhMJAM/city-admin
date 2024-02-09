import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { keyMapper } from "components/custom-hooks/keyMapper";
import { useShortcutKeys } from "components/custom-hooks/useShortcutKeys";
import { GradientButton } from "components/styledComponent/button";
import { useStyles } from "pages_audit/auth/style";
import { useRef } from "react";

export const PopupMessageAPIWrapper = ({
  MessageTitle,
  Message,
  onActionYes,
  onActionNo,
  rows,
  open = false,
  loading = false,
}) => {
  //const { state: rowsdata }: any = useLocation();
  const classes = useStyles();
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
    <>
      <Dialog fullWidth={false} open={open}>
        <DialogTitle className={classes.dialogTitleClass}>
          {MessageTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ color: "black", marginTop: "8px", marginBottom: "6px" }}
          >
            {Message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.verifybutton}>
          <GradientButton
            ref={yesBtnRef}
            endIcon={loading ? <CircularProgress size={20} /> : null}
            onClick={() => onActionYes(rows)}
            disabled={loading}
          >
            Yes
          </GradientButton>
          <GradientButton //disabled={loading}
            ref={noBtnRef}
            onClick={() => onActionNo()}
            disabled={loading}
          >
            No
          </GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
