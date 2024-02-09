import { useState } from "react";
import MenuList from "@mui/material/MenuList";
import { StyledMenuItem } from "./styledComponents";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";

const ITEM_HEIGHT = 48;

export const ColumnVisibility = ({
  visibleColumns,
  defaultHiddenColumns,
  classes,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //console.log("visibleColumns=>", visibleColumns);
  const menuItems = visibleColumns.reduce((accum, column) => {
    //console.log("column=>", column);
    const { checked, style, onChange } = column.getToggleHiddenProps();
    const isDisabled = column?.isColumnHidingDisabled ?? false;
    //console.log(style);
    if (
      defaultHiddenColumns.indexOf(column.id) === -1 ||
      column.isTableHidden === true
    ) {
      accum.push(
        <StyledMenuItem dense={true} key={column.id} onChange={onChange}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={onChange}
                name={column.id}
                color="secondary"
                disabled={isDisabled}
              />
            }
            label={column.columnName}
            style={style}
          />
        </StyledMenuItem>
      );
    }
    return accum;
  }, []);

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        className={classes.refreshiconhover}
      >
        <ViewColumnOutlinedIcon />
      </IconButton>
      <Popover
        id={"columnVisibility"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper
          style={{
            maxHeight: ITEM_HEIGHT * 4.5,
            overflow: "scroll",
          }}
        >
          <MenuList dense={true}>{menuItems}</MenuList>
        </Paper>
      </Popover>
    </div>
  );
};
