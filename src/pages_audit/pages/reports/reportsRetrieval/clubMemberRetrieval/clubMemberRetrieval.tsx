import { FC, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import { GradientButton } from "components/styledComponent/button";
import { useStyles } from "pages_audit/auth/style";
import * as API from "../../staticReports/api";
import { queryClient } from "cache";
import DialogActions from "@mui/material/DialogActions";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useQuery } from "react-query";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { PopupRequestWrapper } from "components/custom/popupReqest";
import { useSnackbar } from "notistack";

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
  refreshiconhover: {},
}));

const ClubMemberRetrieval: FC<{
  closeDialog?: any;
  metaData: any;
  defaultData: any;
  retrievalParaValues?: any;
  retrievalType: String;
  entityType: any;
}> = ({
  closeDialog,
  metaData,
  defaultData,
  retrievalParaValues,
  retrievalType,
  entityType,
}) => {
  const actionClasses = useStyles();
  const okButtonRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>(defaultData ?? []);
  const [selectAll, setSelectAll] = useState<any>(false);

  const selectedRowsRef = useRef<any>(null);
  const headerClasses = useTypeStyles();
  // const [isOpenSave, setIsOpenSave] = useState<any>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching } = useQuery(
    ["getClubMemberGridData", entityType],
    () => API.getClubMemberGridData(entityType)
  );
  const handleRowClick = (event: any, name: string) => {
    if (event.ctrlKey) {
      if (selectedRows.includes(name)) {
        setSelectedRows((prev) => prev.filter((row) => row !== name));
      } else {
        setSelectedRows([...new Set([...selectedRows, name])]);
      }
      // setSelectedRows([...selectedRows, name]);
    } else {
      setSelectedRows([name]);
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getClubMemberGridData"]);
    };
  }, []);

  // const onClickButton = (rows, buttonName) => {
  //   setIsOpenSave(false);
  // };

  const handleListItemDoubleClick = () => {
    if (okButtonRef.current) {
      okButtonRef.current.click();
    }
  };

  const getDisplayValueFromValue = (value: string) => {
    const selectedItem = data.find((item) => item.value === value);
    return selectedItem?.label ?? "";
  };
  return (
    <>
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
            Enter Retrieval Parameters
          </Typography>
        </Toolbar>
      </AppBar>
      <>
        {isLoading || isFetching ? (
          <LoaderPaperComponent />
        ) : (
          <Grid item xs={12} sm={12} md={12} style={{ padding: "10px" }}>
            <Box
              sx={{
                width: "100%",
                // maxWidth: 400,
                bgcolor: "background.paper",
                height: "35vh",
                overflow: "scroll",
                border: "ridge",
                borderRadius: "3",
              }}
            >
              <nav aria-label="main mailbox folders">
                <List style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                  {data.map((item) => (
                    <ListItemData
                      key={item?.value}
                      name={item?.label}
                      disabled={false}
                      selected={
                        selectAll ||
                        // item?.value === selectedRows ||
                        selectedRows.includes(item?.value)
                      }
                      onClick={(event) => handleRowClick(event, item?.value)}
                      onDoubleClick={handleListItemDoubleClick}
                    />
                  ))}
                </List>
              </nav>
            </Box>
          </Grid>
        )}
        {/* {isOpenSave ? (
            <PopupRequestWrapper
              MessageTitle="Data Validation"
              Message="Please Select One Row"
              onClickButton={(rows, buttonName) =>
                onClickButton(rows, buttonName)
              }
              buttonNames={["Ok"]}
              rows={[]}
              open={isOpenSave}
            />
          ) : null} */}
      </>
      <DialogActions
        className={actionClasses.verifybutton}
        style={{ marginTop: "2px", marginBottom: "2px" }}
      >
        <>
          <GradientButton
            onClick={(e) => {
              if (selectedRows.length === 0) {
                // setIsOpenSave(true);
                enqueueSnackbar("Please select at least one row.", {
                  variant: "error",
                });
              } else {
                selectedRowsRef.current = selectedRows;
                let retrievalValues = [
                  {
                    id: "A_TRAN_CD",
                    value: {
                      condition: "equal",
                      value: selectedRowsRef?.current
                        .map((key) => {
                          return key.toString();
                        })
                        .join(","),
                      columnName: "tranCode",
                      label: "Club",
                      displayValue: selectedRowsRef?.current
                        .map((key) => getDisplayValueFromValue(key.toString()))
                        .join(","),
                    },
                  },
                ];

                retrievalParaValues(retrievalValues, selectedRows);
              }
            }}
            ref={okButtonRef}
          >
            Ok
          </GradientButton>

          <GradientButton
            // disabled={result.isLoading || isLocalLoding}
            onClick={closeDialog}
          >
            Cancel
          </GradientButton>
        </>
      </DialogActions>
    </>
  );
};
export const ListItemData = ({
  name,
  disabled,
  selected,
  onClick,
  onDoubleClick,
}: {
  name: string;
  disabled: boolean;
  selected: boolean;
  onClick: any;
  onDoubleClick: any;
}) => {
  //@ts-ignore

  return (
    <div>
      <ListItem
        button
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: selected ? "var(--theme-color1)" : "transparent",
          color: selected ? "white" : "black",
        }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        disabled={false}
        selected={selected}
      >
        <ListItemText primary={name} />
      </ListItem>
      <Divider />
    </div>
  );
};
export const ClubMemberRetrievalWrapper = ({
  open,
  handleDialogClose,
  metaData,
  defaultData,
  retrievalParaValues,
  retrievalType,
}) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "100%",
            // minHeight: "36vh",
            // height: "36vh",
          },
        }}
        maxWidth="sm"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ClubMemberRetrieval
          metaData={metaData}
          closeDialog={handleDialogClose}
          defaultData={defaultData}
          retrievalParaValues={retrievalParaValues}
          retrievalType={retrievalType}
          entityType={"C"}
        />
      </Dialog>
    </>
  );
};
