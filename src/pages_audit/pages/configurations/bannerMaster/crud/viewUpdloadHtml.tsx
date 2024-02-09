import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { GradientButton } from "components/styledComponent/button";
import { useDrop } from "react-dnd";

const useTypeStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    background: "var(--theme-color1)",
  },
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
  typography: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "left",
    marginLeft: "10px",
  },
  refreshiconhover: {},
}));

export const ViewUpdloadHtml = ({
  open,
  onClose,
  detailsData,
  userMsgText,
  onSaveData,
}) => {
  const classes = useDialogStyles();
  const headerClasses = useTypeStyles();
  const fileUploadControl = useRef<any | null>(null);
  const myTextFieldPositionRef = useRef<any>(-1);
  const myTextFieldRef = useRef<any>(null);
  const [htmlText, setHtmlText] = useState(userMsgText);
  const { enqueueSnackbar } = useSnackbar();
  const [isFileChanged, setIsFileChanged] = useState(false);

  const [{ isOver, canDrop, isTextDrop, isNativeText }, drop] = useDrop({
    accept: ["string", "__NATIVE_FILE__", "__NATIVE_TEXT__"],

    drop: (item: any, monitor) => {
      if (
        (item?.type ?? monitor.getItemType() ?? "") === "string" ||
        (item?.type ?? monitor.getItemType() ?? "") === "__NATIVE_TEXT__"
      ) {
        let data = String(
          monitor.getItem()?.id ?? monitor.getItem()?.text ?? ""
        );
        if (myTextFieldPositionRef.current >= 0 && Boolean(data)) {
          let startText = htmlText.substring(0, myTextFieldPositionRef.current);
          let endText = htmlText.substring(myTextFieldPositionRef.current);
          myTextFieldPositionRef.current =
            myTextFieldPositionRef.current + data.length;
          setHtmlText(startText + "" + data + "" + endText);
          setIsFileChanged(true);
        } else if (Boolean(data)) {
          setHtmlText(htmlText + "" + data + "");
          setIsFileChanged(true);
        }
      } else {
        let { files } = monitor.getItem() ?? {};
        if (files && Array.isArray(files) && files.length > 0) {
          if (files[0]?.type === "text/html") {
            const reader = new FileReader();
            reader.onload = () => {
              const fileContent = reader.result;
              setHtmlText("" + fileContent);
              setIsFileChanged(true);
            };
            reader.readAsText(files[0]);
          } else {
            enqueueSnackbar(
              "Sorry, the content you are trying to upload must be in HTML format.",
              { variant: "error" }
            );
          }
        }
      }
    },
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
        isTextDrop: monitor.getItemType() === "string",
        isNativeText: monitor.getItemType() === "__NATIVE_TEXT__",
      };
    },
  });

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    if (files && Array.isArray(filesArray) && files.length > 0) {
      if (files[0]?.type === "text/html") {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          setHtmlText("" + fileContent);
          setIsFileChanged(true);
        };
        reader.readAsText(files[0]);
      } else {
        enqueueSnackbar(
          "Sorry, the content you are trying to upload must be in HTML format.",
          { variant: "error" }
        );
      }
    }
  };

  useEffect(() => {
    const htmlContentFromBase64 = atob(userMsgText);
    setHtmlText(htmlContentFromBase64);
  }, []);

  return (
    <Dialog
      open={open}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "60%",
        },
      }}
      maxWidth="md"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <div>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              paddingTop: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <AppBar
              position="relative"
              color="secondary"
              style={{ marginBottom: "5px" }}
            >
              <Toolbar className={headerClasses.root} variant={"dense"}>
                <Typography
                  className={headerClasses.title}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                >
                  View / Upload Html
                </Typography>
                <GradientButton
                  onClick={() => fileUploadControl?.current?.click()}
                >
                  Import
                </GradientButton>
                <GradientButton
                  onClick={() => {
                    onSaveData(htmlText, detailsData.SR_CD, isFileChanged);
                  }}
                >
                  Save
                </GradientButton>
                <GradientButton onClick={onClose}>Close</GradientButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <div ref={drop} style={{ minHeight: "480px" }}>
              <TextField
                id="outlined-multiline-static"
                label="Html text"
                multiline
                // minRows={8}
                rows={24}
                value={htmlText}
                variant="outlined"
                color="secondary"
                // style={{ width: "100%" }}
                style={{
                  width: "100%",
                  backgroundColor:
                    isOver && !isTextDrop ? "lightGray" : "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setHtmlText(event.target.value);
                  setIsFileChanged(true);
                }}
                onBlur={(event) => {
                  myTextFieldPositionRef.current = event.target?.selectionStart;
                }}
                ref={myTextFieldRef}
                InputProps={{ style: { height: "auto" } }}
                inputProps={{ style: { height: "100%" } }}
              />
              {isOver && !isTextDrop && (
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "white",
                    position: "relative",
                    margin: "-230px 0px 0px 0px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isNativeText ? "Drop Here" : "Drop HTML File Here"}
                </div>
              )}
            </div>
          </Grid>
          <Typography
            className={headerClasses.typography}
            color="inherit"
            variant={"h6"}
            component="div"
            style={{ fontSize: "inherit" }}
          >
            Note: To import an HTML file, either drag and drop it into the Email
            Text box or click the "Import" button above.
          </Typography>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={fileUploadControl}
            onChange={handleFileSelect}
            onClick={(e) => {
              //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
              //@ts-ignore
              e.target.value = "";
            }}
          />
        </Grid>
      </div>
    </Dialog>
  );
};
