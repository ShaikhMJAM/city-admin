import { FC } from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
// import { lighten, makeStyles } from "@material-ui/core/styles";
import { lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import clsx from "clsx";
import { TableActionType, RenderActionType } from "./types";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { filterAction } from "./utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  highlight:
    theme?.palette?.mode === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.secondary.dark,
          background: theme.palette.secondary.dark,
        },
  // highlight: {
  //   color: theme.palette.secondary.main,
  //   backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  // },
  title: {
    flex: "1 1 100%",
  },
}));

export const TableActionToolbar: FC<TableActionType> = ({
  dense,
  selectedFlatRows,
  multipleActions,
  singleActions,
  setGridAction,
}) => {
  const classes = useStyles();
  const selectedCount = selectedFlatRows.length;
  const selectedRows = selectedFlatRows.map((one) => {
    return {
      data: one.original,
      id: one.id,
    };
  });
  if (selectedCount <= 0) {
    return null;
  }
  if (typeof setGridAction !== "function") {
    setGridAction = () => {};
  }
  return (
    <Toolbar
      className={clsx(classes.root, classes.highlight)}
      variant={dense ? "dense" : "regular"}
    >
      <Typography
        className={classes.title}
        color="inherit"
        variant={selectedCount > 0 ? "subtitle1" : "h6"}
        component="div"
      >
        Selected {selectedCount}
      </Typography>
      {selectedCount === 1 ? (
        <RenderActions
          key="singleFilters"
          actions={singleActions}
          setAction={setGridAction}
          selectedRows={selectedRows}
          buttonTextColor={"var(--theme-color1)"}
        />
      ) : null}
      {selectedCount > 0 ? (
        <RenderActions
          key="multipleFilters"
          actions={multipleActions ?? []}
          setAction={setGridAction}
          selectedRows={selectedRows}
          buttonTextColor={"var(--theme-color1)"}
        />
      ) : null}
    </Toolbar>
  );
};

//@ts-ignore
export const RenderActions: FC<RenderActionType> = ({
  actions,
  setAction,
  selectedRows,
  buttonTextColor = "var(--white)",
}) => {
  if (Array.isArray(actions) && actions.length > 0) {
    return actions.map((one) => (
      <Tooltip title={one.tooltip ?? one.actionLabel} key={one.actionName}>
        <Button
          onClick={() => {
            setAction({
              name: one.actionName,
              rows: selectedRows,
            });
          }}
          //color="secondary"
          // style={{
          //   //background: "var(--theme-color1)",
          //   color: "var(--theme-color3)", //"var(--white)",
          //   marginRight: "10px",
          // }}
          style={{
            //background: "rgb(239, 224, 224)",
            color: buttonTextColor,
            //marginRight: "10px",
          }}
        >
          {one.actionLabel}
        </Button>
      </Tooltip>
    ));
  } else {
    return null;
  }
};

export const ActionContextMenu: FC<TableActionType> = ({
  singleActions,
  multipleActions,
  setGridAction,
  contextMenuRow,
  selectedFlatRows,
  mouseX,
  mouseY,
  handleClose,
  authState,
}) => {
  const selectedRows = selectedFlatRows.map((one) => {
    return {
      data: one.original,
      id: one.id,
    };
  });
  let menuItems: null | JSX.Element[] = null;
  if (typeof setGridAction !== "function") {
    setGridAction = () => {};
  }
  let allActions = [...singleActions, ...(multipleActions ?? [])];
  if (
    Array.isArray(allActions) &&
    allActions.length > 0 &&
    selectedFlatRows.length <= 1 &&
    contextMenuRow !== null
  ) {
    allActions = filterAction(allActions, [contextMenuRow], authState, false);
    menuItems = allActions.map((one) => (
      <MenuItem
        key={one.actionName}
        onClick={() => {
          setGridAction({
            name: one.actionName,
            rows: [
              {
                data: contextMenuRow?.original,
                id: contextMenuRow?.id,
              },
            ],
          });
          handleClose();
        }}
      >
        {one.actionLabel}
      </MenuItem>
    ));
  } else if (
    Array.isArray(multipleActions) &&
    multipleActions.length > 0 &&
    selectedFlatRows.length > 1 &&
    selectedFlatRows !== null
  ) {
    menuItems = multipleActions?.map((one) => (
      <MenuItem
        key={one.actionName}
        onClick={() => {
          setGridAction({
            name: one.actionName,
            rows: selectedRows,
          });
          handleClose();
        }}
      >
        {one.actionLabel}
      </MenuItem>
    ));
  }

  return (
    <>
      {/* {console.log(menuItems)} */}
      {menuItems !== null &&
      Array.isArray(menuItems) &&
      menuItems.length > 0 ? (
        <Menu
          onContextMenu={(e) => {
            e.preventDefault();
            handleClose();
          }}
          // open={mouseY !== null && singleActions.length > 0}
          open={mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            mouseY !== null && mouseX !== null
              ? {
                  top: mouseY,
                  left: mouseX,
                }
              : undefined
          }
        >
          {menuItems}
        </Menu>
      ) : null}
    </>
  );
};
