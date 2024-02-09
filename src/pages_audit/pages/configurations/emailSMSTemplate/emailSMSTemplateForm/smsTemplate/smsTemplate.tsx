import { FC, useEffect, useState, useContext, useRef } from "react";
import { useMutation, useQueries, useQuery } from "react-query";
import { ClearCacheContext, queryClient } from "cache";
import Dialog from "@mui/material/Dialog";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { GradientButton } from "components/styledComponent/button";
import { useDrag, useDrop } from "react-dnd";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { utilFunction } from "components/utils";
import { Alert } from "components/common/alert";

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

const SMSTemplate: FC<{
  closeDialog?: any;
  tranCode: string;
  compCode: string;
}> = ({ closeDialog, tranCode, compCode }) => {
  const headerClasses = useTypeStyles();
  const myTextFieldRef = useRef<any>(null);
  const myTextFieldPositionRef = useRef<any>(-1);
  const [smsText, SetSmsText] = useState("");

  const result: any = useQueries([
    {
      queryKey: ["getEmailSMSConfigDtlList", tranCode],
      queryFn: () => API.getEmailSMSConfigDtlList(tranCode),
    },
    {
      queryKey: ["getSmsTemplate", tranCode],
      queryFn: () => API.getSmsTemplate(tranCode),
    },
  ]);

  const mutation = useMutation(API.updateEmailSMSConfig, {
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      closeDialog();
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getEmailSMSConfigDtlList", tranCode]);
      queryClient.removeQueries(["getSmsTemplate", tranCode]);
    };
  }, [tranCode]);

  useEffect(() => {
    SetSmsText(result[1]?.data?.[0]?.USER_MSG_TXT ?? "");
  }, [result[1].data]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "string",
    drop: (item, monitor: any) => {
      let data = String(monitor.getItem()?.id ?? "");
      if (myTextFieldPositionRef.current >= 0 && Boolean(data)) {
        let startText = smsText.substring(0, myTextFieldPositionRef.current);
        let endText = smsText.substring(myTextFieldPositionRef.current);
        myTextFieldPositionRef.current =
          myTextFieldPositionRef.current + data.length;
        SetSmsText(startText + "" + data + "" + endText);
      } else if (Boolean(data)) {
        SetSmsText(smsText + "" + data + "");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const doubleClickEventHandel = (text) => {
    if (myTextFieldPositionRef.current >= 0 && Boolean(text)) {
      let startText = smsText.substring(0, myTextFieldPositionRef.current);
      let endText = smsText.substring(myTextFieldPositionRef.current);
      myTextFieldPositionRef.current =
        myTextFieldPositionRef.current + text.length;
      SetSmsText(startText + "" + text + "" + endText);
    } else if (Boolean(text)) {
      SetSmsText(smsText + "" + text + "");
    }
  };
  return (
    <>
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
                  SMS Configuration
                </Typography>
                <GradientButton
                  onClick={() => {
                    let updatedValue = utilFunction.transformDetailsData(
                      { USER_MSG_TXT: smsText },
                      { USER_MSG_TXT: result[1]?.data?.[0]?.USER_MSG_TXT }
                    );
                    if (updatedValue._UPDATEDCOLUMNS.length === 0) {
                      closeDialog();
                      return;
                    }
                    mutation.mutate({
                      ...updatedValue,
                      USER_MSG_TXT: smsText,
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
          <Grid item xs={8} sm={6} md={8} style={{ padding: "10px" }}>
            <div ref={drop}>
              <TextField
                id="outlined-multiline-static"
                label="SMS Text"
                placeholder="Enter SMS Text"
                multiline
                // minRows={8}
                rows={12}
                value={smsText}
                variant="outlined"
                color="secondary"
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  SetSmsText(event.target.value.trimStart());
                }}
                onBlur={(event) => {
                  myTextFieldPositionRef.current = event.target?.selectionStart;
                }}
                ref={myTextFieldRef}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            sm={6}
            md={4}
            style={{ marginTop: "0.5rem", paddingRight: "10px" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                maxHeight: "37vh",
                overflow: "auto",
                border: "ridge",
                borderRadius: "3",
              }}
            >
              <Toolbar className={headerClasses.toolBar} variant={"dense"}>
                <Typography
                  className={headerClasses.keytitle}
                  color="inherit"
                  variant={"h6"}
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
export const SMSTemplateWrapper = ({
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
            width: "60%",
            minHeight: "35vh",
            maxHeight: "50vh",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <SMSTemplate
          tranCode={trnCode || ""}
          compCode={compCode || ""}
          closeDialog={handleDialogClose}
        />
      </Dialog>
    </>
  );
};
