import { FC, useEffect, useState, useContext, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import {
  AppBar,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  List,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { GradientButton } from "components/styledComponent/button";
import { useDrag, useDrop } from "react-dnd";
import { useMutation, useQueries, useQuery } from "react-query";
import { ClearCacheContext, queryClient } from "cache";
import * as API from "../api";
import { useSnackbar } from "notistack";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { utilFunction } from "components/utils";
// import EmailEditor from "react-email-editor";
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
  keytitle: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1rem",
  },
  typography: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "left",
    marginLeft: "10px",
  },
  toolBar: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    background: "var(--theme-color1)",
    position: "sticky",
    top: 0,
    zIndex: 99,
    minHeight: "35px",
  },
  refreshiconhover: {},
}));

const EmailTemplate: FC<{
  closeDialog?: any;
  tranCode: string;
  compCode: string;
}> = ({ closeDialog, tranCode, compCode }) => {
  const headerClasses = useTypeStyles();
  const [emailText, SetEmailText] = useState("");
  const myTextFieldRef = useRef<any>(null);
  const myTextFieldPositionRef = useRef<any>(-1);
  const fileUploadControl = useRef<any | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation(API.updateEmailSMSConfig, {
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      console.log("success", data);
      closeDialog();
    },
  });

  const result: any = useQueries([
    {
      queryKey: ["getEmailSMSConfigDtlList", tranCode],
      queryFn: () => API.getEmailSMSConfigDtlList(tranCode),
    },
    {
      queryKey: ["getEmailTemplate", tranCode],
      queryFn: () => API.getEmailTemplate(tranCode),
    },
  ]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getEmailSMSConfigDtlList", tranCode]);
      queryClient.removeQueries(["getEmailTemplate", tranCode]);
    };
  }, [tranCode]);

  useEffect(() => {
    SetEmailText(result[1]?.data?.[0]?.MAIL_MSG ?? "");
  }, [result[1].data]);

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
          let startText = emailText.substring(
            0,
            myTextFieldPositionRef.current
          );
          let endText = emailText.substring(myTextFieldPositionRef.current);
          myTextFieldPositionRef.current =
            myTextFieldPositionRef.current + data.length;
          SetEmailText(startText + "" + data + "" + endText);
        } else if (Boolean(data)) {
          SetEmailText(emailText + "" + data + "");
        }
      } else {
        let { files } = monitor.getItem() ?? {};
        if (files && Array.isArray(files) && files.length > 0) {
          if (files[0]?.type === "text/html") {
            const reader = new FileReader();
            reader.onload = () => {
              const fileContent = reader.result;
              SetEmailText("" + fileContent);
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
  const doubleClickEventHandel = (text) => {
    if (myTextFieldPositionRef.current >= 0 && Boolean(text)) {
      let startText = emailText.substring(0, myTextFieldPositionRef.current);
      let endText = emailText.substring(myTextFieldPositionRef.current);
      myTextFieldPositionRef.current =
        myTextFieldPositionRef.current + text.length;
      SetEmailText(startText + "" + text + "" + endText);
    } else if (Boolean(text)) {
      SetEmailText(emailText + "" + text + "");
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    if (files && Array.isArray(filesArray) && files.length > 0) {
      if (files[0]?.type === "text/html") {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result;
          SetEmailText("" + fileContent);
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

  return (
    <>
      {/* <Grid container>
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
                  Email Configuration
                </Typography>
                <GradientButton
                  onClick={() => {
                    emailEditorRef?.current?.editor.exportHtml((data) => {
                      const { design, html } = data;

                      onSaveData(design, html);
                    });
                  }}
                >
                  Save
                </GradientButton>
                <GradientButton onClick={closeDialog}>Close</GradientButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              padding: "10px",
            }}
          >
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
          </Grid>
        </Grid> */}
      {result[0].isLoading ||
      result[0].isFetching ||
      result[1].isLoading ||
      result[1].isFetching ? (
        <div style={{ margin: "2rem" }}>
          <LoaderPaperComponent />
          {typeof closeDialog === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeDialog}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : result[0].isError ? (
        <>
          <div style={{ margin: "1.2rem" }}>
            <Alert
              severity="error"
              errorMsg={
                result[0].error?.error_msg ?? "Something went to wrong.."
              }
              errorDetail={result[0].error?.error_detail ?? ""}
            />
          </div>
          {typeof closeDialog === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeDialog}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </>
      ) : (
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
                  Email Configuration
                </Typography>
                <GradientButton
                  onClick={() => fileUploadControl?.current?.click()}
                >
                  Import
                </GradientButton>
                <GradientButton
                  onClick={() => {
                    let updatedValue = utilFunction.transformDetailsData(
                      { MAIL_MSG: emailText },
                      { MAIL_MSG: result[1]?.data?.[0]?.MAIL_MSG }
                    );
                    if (updatedValue._UPDATEDCOLUMNS.length === 0) {
                      closeDialog();
                      return;
                    }
                    mutation.mutate({
                      ...updatedValue,
                      MAIL_MSG: emailText,
                      TRAN_CD: tranCode,
                      COMP_CD: compCode,
                    });
                  }}
                  endIcon={
                    mutation?.isLoading ? <CircularProgress size={20} /> : null
                  }
                  disabled={mutation?.isLoading}
                >
                  Save
                </GradientButton>
                <GradientButton onClick={closeDialog}>Close</GradientButton>
              </Toolbar>
            </AppBar>
          </Grid>
          {result[1].isError && (
            <Alert
              severity="error"
              errorMsg={
                result[1]?.error?.error_msg ?? "Something went to wrong.."
              }
              errorDetail={result[1]?.error?.error_detail}
              color="error"
            />
          )}
          <Grid item xs={9} sm={7} md={9} style={{ padding: "10px" }}>
            <div ref={drop}>
              <TextField
                id="outlined-multiline-static"
                label="Email Text"
                placeholder="Enter Email Text"
                multiline
                // minRows={8}
                rows={24}
                value={emailText}
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
                  SetEmailText(event.target.value.trimStart());
                }}
                onBlur={(event) => {
                  myTextFieldPositionRef.current = event.target?.selectionStart;
                }}
                ref={myTextFieldRef}
                InputProps={{ style: { height: "65.35vh" } }}
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
          <Grid
            item
            xs={3}
            sm={4}
            md={3}
            style={{ marginTop: "0.5rem", paddingRight: "10px" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 260,
                bgcolor: "background.paper",
                height: "66vh",
                overflow: "auto",
                border: "ridge",
                borderRadius: "3",
              }}
            >
              <Toolbar className={headerClasses.toolBar} variant={"dense"}>
                <Typography
                  className={headerClasses.keytitle}
                  color="inherit"
                  variant={"h4"}
                  component="div"
                >
                  Keys
                </Typography>
              </Toolbar>
              <nav aria-label="main mailbox folders">
                <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  {result[0]?.data.map((item) => (
                    <ListItemData
                      key={"ListItem" + item?.SR_CD}
                      name={item?.KEY_VALUE}
                      doubleClickEventHandel={doubleClickEventHandel}
                    />
                  ))}
                </List>
              </nav>
            </Box>
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
      )}
    </>
  );
};
export const ListItemData = ({
  name,
  doubleClickEventHandel,
}: {
  name: string;
  doubleClickEventHandel: any;
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "string",
    item: { id: name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={dragRef} style={{ opacity: isDragging ? "0.5" : "1" }}>
      <ListItem
        button
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
        onDoubleClick={() => {
          doubleClickEventHandel(name);
        }}
      >
        <ListItemText primary={name} />
      </ListItem>
      <Divider />
    </div>
  );
};
export const EmailTemplateWrapper = ({
  open,
  handleDialogClose,
  trnCode,
  compCode,
}) => {
  const classes = useDialogStyles();
  const { getEntries } = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
    };
  }, [getEntries]);
  return (
    <>
      <Dialog
        open={open}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "68%",
            // minHeight: "35vh",
            // height: "78vh",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <EmailTemplate
          closeDialog={handleDialogClose}
          tranCode={trnCode || ""}
          compCode={compCode || ""}
        />
      </Dialog>
    </>
  );
};
