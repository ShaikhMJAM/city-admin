import { useRef, useCallback, useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateRetrievalDialog } from "components/custom/dateRetrievalPara";
import { useStyles } from "pages_audit/style";
import { CustomRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/customRetrieval";
import { DateUserRetrievalDialog } from "pages_audit/pages/reports/reportsRetrieval/dateUserRetrieval";
import { FundTrfRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/fundTRFRetrieval/fundTrfRetrieval";
import { SmsEmailRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/smsEmailRetrievaldata/smsEmailRetrieval";
import { QrGeneratedRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/qrGeneratRetrievaldata/qrGeneratedRetrieval";
import { DateListRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/dateListRetrieval/dateListRetrieval";
import { DateServiceChannelRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/dateServiceChannelRetrieval/dateServiceChannelRetrieval";
import { UtilityRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/utilityPayment/utilitybillPayment";
import { CustomerGlobalLimitRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/customerWiseGlobalLimitRetrieval/customerWiseGlobalLimitRetrieval";
import { ClubMemberRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/clubMemberRetrieval/clubMemberRetrieval";
import { MerchantTranRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/merchantTransction/merchantTran";
import { VirtualCardReqRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/virtualCardReq/virtualCardReqRetrieval";
// import { MerchantTranRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/merchantTransction/merchantTran";
// import { DateServiceChannelRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/dateServiceChannelRetrieval/dateServiceChannelRetrieval";
// import { PaymentRetrievalWrapper } from "pages_audit/pages/reports/reportsRetrieval/paymentRetrievaldata/paymentDetailsRetrieval";

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

export const FilterComponent = ({
  setQueryFilters,
  filterMeta,
  filterData,
  retrievalType,
  isOpenRetrievalDefault,
  setShowFilters,
  setAllFilters,
}) => {
  const [open, setOpen] = useState(isOpenRetrievalDefault);
  // const { filterState, dispatch } = useFilterState(filterReducer);
  const refFilteredData = useRef<any>(filterData);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setShowFilters(false);
    setAllFilters([]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "R" || event.key === "r")) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, []);

  // const handleFilterChange = () => {
  //   setQueryFilters(filterState.current);
  //   setOpen(false);
  // };

  // const selectedDates = (fromDate, toDate) => {
  //   setQueryFilters([
  //     {
  //       id: "FROM_DT",
  //       value: {
  //         condition: "equal",
  //         value: format(
  //           new Date(fromDate.toISOString() ?? new Date()),
  //           "dd/MM/yyyy"
  //         ),
  //         columnName: "From Date",
  //       },
  //     },
  //     {
  //       id: "TO_DT",
  //       value: {
  //         condition: "equal",
  //         value: format(
  //           new Date(toDate.toISOString() ?? new Date()),
  //           "dd/MM/yyyy"
  //         ),
  //         columnName: "To Date",
  //       },
  //     },
  //   ]);
  //   setOpen(false);
  // };

  const retrievalParaValues = (retrievalValues, orgData) => {
    setQueryFilters(retrievalValues);
    setOpen(false);
    if (orgData) {
      refFilteredData.current = orgData;
    }
  };

  const setRetrievalData = (data) => {
    setQueryFilters([data]);
    setOpen(false);
  };

  const handleClearFilter = () => {
    setQueryFilters([]);
    setOpen(false);
  };

  // let filterColumns: any = [];
  // if (Array.isArray(filterMeta)) {
  //   filterColumns = filterMeta.filter(
  //     (one) => typeof one.Filter === "function"
  //   );
  //   filterColumns = filterColumns.map((one) => {
  //     const { Filter, accessor, ...others } = one;
  //     return (
  //       //@ts-ignore
  //       createElement(Filter, {
  //         key: accessor,
  //         filterValue: filterData.filter((one) => one.id === accessor)?.[0]
  //           ?.value,
  //         id: accessor,
  //         dispatch,
  //         ...others,
  //       })
  //     );
  //   });
  // }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        {Boolean(retrievalType) ? (
          <>
            {(retrievalType === "CUSTOM" && filterMeta?.fields?.length > 0) ||
            retrievalType !== "CUSTOM" ? (
              <Button onClick={handleOpen} color="primary">
                Retrieve Data
              </Button>
            ) : null}
          </>
        ) : (
          <></>
        )}
        {/* <Drawer
        anchor="right"
        id={"columnVisibility"}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { width: "520px" },
        }}
      >
        <AppBar position="relative" color="secondary">
          <Toolbar variant="dense">
            <Typography variant="h6">Filter</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button onClick={handleFilterChange}>Apply</Button>
            <Button onClick={handleClearFilter}>Clear</Button>
            <Button onClick={handleClose}>Close</Button>
          </Toolbar>
        </AppBar>
        <CardContent>
          <Grid container spacing={2}>
            {filterColumns}
          </Grid>
        </CardContent>
      </Drawer> */}
        {open && retrievalType === "DATE" ? (
          <DateRetrievalDialog
            classes={classes}
            open={open}
            handleClose={handleClose}
            loginState={{}}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
          />
        ) : open &&
          (retrievalType === "DATEUSERNM" ||
            retrievalType === "DATEUSERNMNOREQ") ? (
          <DateUserRetrievalDialog
            classes={classes}
            open={open}
            handleClose={handleClose}
            loginState={{}}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open &&
          (retrievalType === "FUNDTRAN" ||
            retrievalType === "EMAILTRAN" ||
            retrievalType === "CREDITTRAN" ||
            retrievalType === "MFSTRAN") ? (
          <FundTrfRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "SMSEMAIL" ? (
          <SmsEmailRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
          />
        ) : open && retrievalType === "QRGENERATE" ? (
          <QrGeneratedRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
          />
        ) : open &&
          (retrievalType === "PAYMENTDETAILS" ||
            retrievalType === "DATEAPUSERSLIST" ||
            retrievalType === "CARDACTIVEPIN") ? (
          <DateListRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open &&
          (retrievalType === "DATESERVICECHANNEL" ||
            retrievalType === "DAILYUSERWISECHANNEL") ? (
          <DateServiceChannelRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "CUSTOMERLIMIT" ? (
          <CustomerGlobalLimitRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
          />
        ) : open && retrievalType === "CLUBMEMBER" ? (
          <ClubMemberRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "CUSTOM" ? (
          <CustomRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalData={setRetrievalData}
          />
        ) : open && retrievalType === "UTILITY" ? (
          <UtilityRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "MERCHANTRAN" ? (
          <MerchantTranRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "CLUBMEMBER" ? (
          <ClubMemberRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : open && retrievalType === "VIRTUALCARD" ? (
          <VirtualCardReqRetrievalWrapper
            open={open}
            handleDialogClose={handleClose}
            metaData={filterMeta}
            defaultData={refFilteredData.current}
            retrievalParaValues={retrievalParaValues}
            retrievalType={retrievalType}
          />
        ) : (
          <></>
        )}
      </>
    </LocalizationProvider>
  );
};
