import { FC, useState } from "react";
import Alert, { AlertProps } from "@mui/lab/Alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { GradientButton } from "components/styledComponent/button";
interface MyAlertProps {
  errorMsg: string;
  errorDetail?: string;
}

export const MyAlert: FC<MyAlertProps & AlertProps> = ({
  errorMsg,
  errorDetail,
  ...others
}) => {
  const [showMore, setShowMore] = useState(false);
  // const { authState } = useContext(AuthContext);
  return (
    <>
      <Alert
        {...others}
        action={
          Boolean(errorDetail) ? (
            <Button
              color="secondary"
              onClick={() => setShowMore((more) => !more)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          ) : null
        }
        style={{ background: "white" }}
      >
        <span style={{ fontWeight: "bold", color: "red" }}>{errorMsg}</span>
        {/* {showMore ? (
          <Fragment>
            <br />
            <hr />
            <span>{errorDetail}</span>
          </Fragment>
        ) : null} */}
      </Alert>
      <Dialog
        open={showMore}
        fullWidth={false}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            setShowMore(false);
          }
        }}
      >
        <DialogTitle>Error Details</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorDetail}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <GradientButton onClick={() => setShowMore(false)}>OK</GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
