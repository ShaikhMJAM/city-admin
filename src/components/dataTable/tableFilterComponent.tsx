import { useRef, useCallback, useState, createElement, useEffect } from "react";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const filterReducer = (state: any = [], action: any = {}) => {
  switch (action.type) {
    case "setValue": {
      const { id, ...others } = action.payload;
      let index = state.findIndex((one) => one.id === id);
      if (index >= 0) {
        state[index].value = others;
        return [...state];
      }
      return [...state, { id, value: others }];
    }
    case "removeValue": {
      const { id } = action.payload;
      /* eslint-disable eqeqeq */
      let result = state.filter((one) => one.id != id);
      return result;
    }
    case "resetAll": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export const useFilterState = (reducer) => {
  const filterState = useRef<object>([]);
  /* eslint-disable react-hooks/exhaustive-deps */
  const dispatch = useCallback((action) => {
    let newState = reducer(filterState.current, action);
    filterState.current = newState;
  }, []);

  return {
    dispatch,
    filterState,
  };
};

export const TableFilterComponent = ({
  filters,
  setAllFilters,
  filterMeta,
  setSortBy,
  gotoPage,
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const { filterState, dispatch } = useFilterState(filterReducer);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClearFilter = () => {
    filterState.current = [];
    setAllFilters(filterState.current);
    setSortBy([]);
    gotoPage(0);
    setOpen(false);
  };

  const handleFilterChange = () => {
    setAllFilters(filterState.current);
    setSortBy([]);
    gotoPage(0);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    filterState.current = filters;
  }, [filters]);

  let filterColumns: any = [];
  //console.log("TableFilterComponent", filterMeta);
  if (Array.isArray(filterMeta)) {
    filterColumns = filterMeta.filter(
      (one) => typeof one.Filter === "function"
    );
    // console.log("TableFilterComponent", filterColumns);
    filterColumns = filterColumns.map((one) => {
      const { Filter, accessor, ...others } = one;
      //console.log("TableFilterComponent", filters);
      return (
        //@ts-ignore

        createElement(Filter, {
          key: accessor,
          filterValue: filters.filter((one) => one.id === accessor)?.[0]?.value,
          id: accessor,
          dispatch,
          ...others,
        })
      );
    });
  }
  //console.log("TableFilterComponent", filterColumns);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="primary"
        className={classes.refreshiconhover}
      >
        <FilterListTwoToneIcon />
      </IconButton>
      <Drawer
        anchor="right"
        id={"columnVisibility"}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 1300 }}
        PaperProps={{
          style: { width: "520px" },
        }}
      >
        <AppBar position="relative" color="secondary">
          <Toolbar variant="dense">
            <Typography variant="h6">Filter</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button onClick={handleFilterChange} color="primary">
              Apply
            </Button>
            <Button onClick={handleClearFilter} color="primary">
              Clear
            </Button>
          </Toolbar>
        </AppBar>
        <CardContent>
          <Grid container spacing={2}>
            {filterColumns}
          </Grid>
        </CardContent>
      </Drawer>
    </LocalizationProvider>
  );
};
