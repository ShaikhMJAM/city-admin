import { useEffect, useState, useContext, useRef } from "react";
import { ClearCacheContext, queryClient } from "cache";
import Dialog from "@mui/material/Dialog";
import {
  AppBar,
  CircularProgress,
  IconButton,
  InputAdornment,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { GradientButton } from "components/styledComponent/button";
import { CarryForwardScreenRightsGridWrapper } from "./copyRightsDetail";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as API from "../api";
import { TextField } from "components/styledComponent";
import SearchIcon from "@mui/icons-material/Search";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { StrictModeDroppable } from "components/strictDroppable/strictModeDroppable";

const useStyles = makeStyles((theme: Theme) => ({
  Container: {
    display: "flex",
    // other CSS styles here
  },
  TaskList: {
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    background: "var(--theme-color2)",
    minWidth: "31.6%",
    borderRadius: "5px",
    padding: "10px 10px",
    marginRight: "45px",
  },
  TaskColumnStyles: {
    margin: "8px",
    display: "flex",
    width: "96.6%",
    minHeight: "89vh",
    maxHeight: "89vh",
  },
  Title: {
    color: "var(--theme-color1)",
    background: "rgba(0, 0, 0, 0.08)",
    padding: "2px 10px",
    borderRadius: "5px",
    // alignSelf: "flex-start",
    fontWeight: "bold",
    width: "55%",
    height: "2rem",
    display: "flex",
    alignItems: "center",
  },
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    background: "var(--theme-color1)",
  },
  title1: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
  TaskList2: {
    overflowX: "hidden",
    height: "100%",
    overflowY: "auto",
    marginTop: "10px",
    paddingRight: "5px",
  },
  Search: {
    display: "flex",
    // flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "spaceBetween",
  },
}));

const ScreenAccessDetail = ({ closeDialog }) => {
  const [isCarryForwardRights, setCarryForwardRights] = useState(false);
  const isDataChangedRef = useRef(false);
  const { state: rows }: any = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState({
    PENDING_ACCESS: "",
    CURRENT_ACCESS: "",
  });
  const [data, setData] = useState<any>({
    id: 0,
    data: {},
  });
  const [filteredColumns, setFilteredColumns] = useState({
    MENU_LIST: {
      searchID: "MENU_LIST",
      title: "Menu List",
      items: [],
    },
    PENDING_ACCESS: {
      searchID: "PENDING_ACCESS",
      title: "Pending Screen Access",
      items: [],
    },
    CURRENT_ACCESS: {
      searchID: "CURRENT_ACCESS",
      title: "Current Screen Access",
      items: [],
    },
  });
  const [columns, setColumns] = useState({
    MENU_LIST: {
      searchID: "MENU_LIST",
      title: "Menu List",
      items: [],
    },
    PENDING_ACCESS: {
      searchID: "PENDING_ACCESS",
      title: "Pending Screen Access",
      items: [],
    },
    CURRENT_ACCESS: {
      searchID: "CURRENT_ACCESS",
      title: "Current Screen Access",
      items: [],
    },
  });

  const {
    data: getData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<any, any>(
    ["getDBRDetailFormData", rows?.[0]?.data?.USER_NAME],
    () => API.getUserScreenAccessData(rows?.[0]?.data?.USER_NAME)
  );

  const saveRights = useMutation(API.saveUserScreenAccessRights, {
    onSuccess: (response: any) => {
      enqueueSnackbar("Success", {
        variant: "success",
      });
      closeDialog();
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      // setGroupRightsAvailable(false);
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    setColumns({
      MENU_LIST: {
        searchID: "MENU_LIST",
        title: "Menu List",
        items: getData?.[0]?.MENU_LIST ?? [],
      },
      PENDING_ACCESS: {
        searchID: "PENDING_ACCESS",
        title: "Pending Screen Access",
        items: [],
      },
      CURRENT_ACCESS: {
        searchID: "CURRENT_ACCESS",
        title: "Current Screen Access",
        items: [],
      },
    });
    setFilteredColumns({
      MENU_LIST: {
        searchID: "MENU_LIST",
        title: "Menu List",
        items: getData?.[0]?.MENU_LIST ?? [],
      },
      PENDING_ACCESS: {
        searchID: "PENDING_ACCESS",
        title: "Pending Screen Access",
        items: [],
      },
      CURRENT_ACCESS: {
        searchID: "CURRENT_ACCESS",
        title: "Current Screen Access",
        items: [],
      },
    });
  }, [getData?.[0]?.MENU_LIST]);

  useEffect(() => {
    setData({
      ...data,
      data: getData?.[0]?.ACCESS_DTL,
    });
  }, [getData?.[0]?.ACCESS_DTL]);

  const onDragEnd = (
    result,
    columns,
    setColumns,
    filteredColumns,
    setFilteredColumns
  ) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (destination.droppableId === "MENU_LIST") {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const index = sourceItems.findIndex(
        (item) => item.CODE.trim() === draggableId.trim()
      );
      const [removed] = sourceItems.splice(index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      setData({
        ...data,
        data: {
          ...data.data,
          [data.CODE]: {
            [source.droppableId]: sourceItems,
            [destination.droppableId]: destItems,
          },
        },
      });
      const filterSourceColumn = filteredColumns[source.droppableId];
      const filterDestColumn = filteredColumns[destination.droppableId];
      const filterSourceItems = [...filterSourceColumn.items];
      const filterDestItems = [...filterDestColumn.items];
      const [filterRemoved] = filterSourceItems.splice(source.index, 1);
      filterDestItems.splice(destination.index, 0, filterRemoved);

      setFilteredColumns({
        ...filteredColumns,
        [source.droppableId]: {
          ...filterSourceColumn,
          items: filterSourceItems,
        },
        [destination.droppableId]: {
          ...filterDestColumn,
          items: filterDestItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
      setData({
        ...data,
        data: {
          ...data.data,
          [data.CODE]: {
            ...data.data[data.id],
            [source.droppableId]: copiedItems,
          },
        },
      });

      const filterColumn = filteredColumns[source.droppableId];
      const filterCopiedItems = [...filterColumn.items];
      const [filterRemoved] = filterCopiedItems.splice(source.index, 1);
      filterCopiedItems.splice(destination.index, 0, filterRemoved);

      setFilteredColumns({
        ...filteredColumns,
        [source.droppableId]: {
          ...filterColumn,
          items: filterCopiedItems,
        },
      });
    }
  };

  const onClickFastForward = () => {
    const pendingAccessItems = [...columns.PENDING_ACCESS.items];

    for (let i = 0; i < filteredColumns.PENDING_ACCESS.items.length; i++) {
      const index = pendingAccessItems.findIndex(
        (item) =>
          //@ts-ignore
          item.CODE.trim() ===
          //@ts-ignore
          filteredColumns.PENDING_ACCESS.items[i].CODE.trim()
      );
      pendingAccessItems.splice(index, 1);
    }

    setColumns({
      ...columns,
      PENDING_ACCESS: {
        ...columns.PENDING_ACCESS,
        items: pendingAccessItems,
      },
      CURRENT_ACCESS: {
        ...columns.CURRENT_ACCESS,
        items: [
          ...columns.CURRENT_ACCESS.items,
          ...filteredColumns.PENDING_ACCESS.items,
        ],
      },
    });

    setFilteredColumns({
      ...filteredColumns,
      PENDING_ACCESS: {
        ...filteredColumns.PENDING_ACCESS,
        items: [],
      },
      CURRENT_ACCESS: {
        ...filteredColumns.CURRENT_ACCESS,
        items: [
          ...filteredColumns.CURRENT_ACCESS.items,
          ...filteredColumns.PENDING_ACCESS.items,
        ],
      },
    });

    setData({
      ...data,
      data: {
        ...data.data,
        [data.CODE]: {
          PENDING_ACCESS: pendingAccessItems,
          CURRENT_ACCESS: [
            ...filteredColumns.CURRENT_ACCESS.items,
            ...filteredColumns.PENDING_ACCESS.items,
          ],
        },
      },
    });
  };

  const onClickFastRewind = () => {
    const currentAccessItems = [...columns.CURRENT_ACCESS.items];

    for (let i = 0; i < filteredColumns.CURRENT_ACCESS.items.length; i++) {
      const index = currentAccessItems.findIndex(
        (item) =>
          //@ts-ignore
          item.CODE.trim() ===
          //@ts-ignore
          filteredColumns.CURRENT_ACCESS.items[i].CODE.trim()
      );
      currentAccessItems.splice(index, 1);
    }

    setColumns({
      ...columns,
      PENDING_ACCESS: {
        ...columns.PENDING_ACCESS,
        items: [
          ...columns.PENDING_ACCESS.items,
          ...filteredColumns.CURRENT_ACCESS.items,
        ],
      },
      CURRENT_ACCESS: {
        ...columns.CURRENT_ACCESS,
        items: currentAccessItems,
      },
    });

    setFilteredColumns({
      ...filteredColumns,
      PENDING_ACCESS: {
        ...filteredColumns.PENDING_ACCESS,
        items: [
          ...filteredColumns.PENDING_ACCESS.items,
          ...filteredColumns.CURRENT_ACCESS.items,
        ],
      },
      CURRENT_ACCESS: {
        ...filteredColumns.CURRENT_ACCESS,
        items: [],
      },
    });

    setData({
      ...data,
      data: {
        ...data.data,
        [data.CODE]: {
          PENDING_ACCESS: [
            ...filteredColumns.PENDING_ACCESS.items,
            ...filteredColumns.CURRENT_ACCESS.items,
          ],
          CURRENT_ACCESS: currentAccessItems,
        },
      },
    });
  };
  const handleSearchInputChange = (event, searchID) => {
    const value = event.target.value;
    setSearchQuery({ ...searchQuery, [searchID]: value });
    let columnsData = { ...columns };
    const pendingItems = columnsData[searchID].items.filter((item) =>
      //@ts-ignore
      item.NAME.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredColumns({
      ...filteredColumns,
      [searchID]: {
        ...filteredColumns[searchID],
        items: [...pendingItems],
      },
    });
  };

  const classes = useStyles();

  const onCloseDialog = () => {
    setCarryForwardRights(false);
    if (isDataChangedRef.current === true) {
      // refetch();
      closeDialog();
      isDataChangedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDBRDetailFormData",
        rows?.[0]?.data?.USER_NAME,
      ]);
    };
  }, []);

  return (
    <>
      {/* <Grid
        item
        xs={12}
        sm={12}
        md={12}
        style={{
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      > */}
      {isLoading || isFetching ? (
        <LoaderPaperComponent />
      ) : isError ? (
        <Alert
          severity="error"
          errorMsg={error?.error_msg ?? "Error"}
          errorDetail={error?.error_detail ?? ""}
          color="error"
        />
      ) : // ) : mutation.isError ? (
      //   <Alert
      //     severity="error"
      //     errorMsg={mutation.error?.error_msg ?? "Error"}
      //     errorDetail={mutation.error?.error_detail ?? ""}
      //     color="error"
      //   />
      null}
      <AppBar
        position="relative"
        color="secondary"
        style={{ marginBottom: "0px", overflow: "hidden" }}
      >
        <Toolbar className={classes.root} variant={"dense"}>
          <Typography
            className={classes.title1}
            color="inherit"
            variant={"h6"}
            component="div"
          >
            {`Screen Access Rights Of ` + rows?.[0]?.data?.USER_NAME + ` User`}
          </Typography>
          <GradientButton
            onClick={() => {
              setCarryForwardRights(true);
            }}
          >
            Assign User/Group Rights
          </GradientButton>
          <GradientButton
            onClick={() => {
              // onSaveData(smsText);
              saveRights.mutate({
                inputData: data,
                userName: rows?.[0]?.data?.USER_NAME,
              });
            }}
            endIcon={
              saveRights.isLoading ? <CircularProgress size={20} /> : null
            }
            disabled={saveRights.isLoading}
          >
            Save
          </GradientButton>
          <GradientButton onClick={closeDialog}>Close</GradientButton>
        </Toolbar>
      </AppBar>
      {/* </Grid> */}
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(
            result,
            columns,
            setColumns,
            filteredColumns,
            setFilteredColumns
          )
        }
      >
        <div className={classes.Container} key={"ScreenAccessDetail"}>
          <div className={classes.TaskColumnStyles}>
            {Object.entries(filteredColumns).map(
              ([columnId, column], index) => {
                return (
                  <>
                    <StrictModeDroppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        <div
                          className={classes.TaskList}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            marginRight:
                              column.searchID === "PENDING_ACCESS" && "5px",
                            marginLeft:
                              column.searchID === "CURRENT_ACCESS" && "5px",
                          }}
                        >
                          <div className={classes.Search}>
                            {column.title !== "Menu List" && (
                              <>
                                <div className={classes.Title}>
                                  {column.title}
                                </div>
                                <TextField
                                  // {...others
                                  placeholder="Search"
                                  id={column.title}
                                  name={column.title}
                                  value={searchQuery[column.searchID]}
                                  onChange={(event) => {
                                    handleSearchInputChange(
                                      event,
                                      column.searchID
                                    );
                                  }}
                                  style={{
                                    width: "65%",
                                    left: "10px",
                                  }}
                                  InputProps={{
                                    style: {
                                      margin: "0 auto",
                                      height: "2rem",
                                      width: "85%",
                                    },
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <SearchIcon
                                          style={{
                                            color: "var(--theme-color1)",
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                  //@ts-ignore
                                />
                              </>
                            )}
                            {column.title === "Menu List" && (
                              <div className={classes.Title}>
                                {column.title}
                              </div>
                            )}
                          </div>

                          <div className={classes.TaskList2}>
                            {column.items.map((item, index) => (
                              <TaskCard
                                key={index}
                                item={item}
                                index={index}
                                withOutDraggble={column.title === "Menu List"}
                                setColumns={setColumns}
                                productData={data}
                                setProductData={setData}
                                columnsFromBackend={columns}
                                setFilteredColumns={setFilteredColumns}
                                setSearchQuery={setSearchQuery}
                              />
                            ))}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </StrictModeDroppable>
                    {column.searchID === "PENDING_ACCESS" && (
                      <div style={{ alignSelf: "center" }}>
                        <Tooltip title="Fast Forward">
                          <IconButton
                            aria-label="delete"
                            style={{
                              background: "var(--theme-color1)",
                              height: "25px",
                              borderRadius: "10%",
                              marginBottom: "10px",
                              width: "45px",
                              display: "flex",
                            }}
                            onClick={() => onClickFastForward()}
                          >
                            <FastForwardIcon
                              fontSize="medium"
                              style={{ color: "var(--theme-color2)" }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Fast Rewind">
                          <IconButton
                            aria-label="delete"
                            style={{
                              background: "var(--theme-color1)",
                              height: "25px",
                              borderRadius: "10%",
                              width: "45px",
                            }}
                            onClick={() => onClickFastRewind()}
                          >
                            <FastRewindIcon
                              fontSize="medium"
                              style={{ color: "var(--theme-color2)" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </>
                );
              }
            )}
          </div>
        </div>
      </DragDropContext>
      {isCarryForwardRights ? (
        <CarryForwardScreenRightsGridWrapper
          open={isCarryForwardRights}
          userName={rows?.[0]?.data?.USER_NAME}
          closeDialog={onCloseDialog}
          isDataChangedRef={isDataChangedRef}
        />
      ) : null}
    </>
  );
};
export const ScreenAccessDetailWrapper = ({ handleDialogClose }) => {
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
        open={true}
        //@ts-ignore
        // TransitionComponent={Transition}
        PaperProps={{
          style: {
            overflow: "hidden",
            // width: "60%",
            // minHeight: "35vh",
            // height: "42vh",
          },
        }}
        fullScreen={true}
        // maxWidth="md"
        // classes={{
        //   scrollPaper: classes.topScrollPaper,
        //   paperScrollBody: classes.topPaperScrollBody,
        // }}
      >
        <ScreenAccessDetail closeDialog={handleDialogClose} />
      </Dialog>
    </>
  );
};
