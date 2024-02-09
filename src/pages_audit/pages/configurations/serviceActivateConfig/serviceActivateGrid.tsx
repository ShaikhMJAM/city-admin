import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import { Fragment, useEffect, useContext, useRef, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import { ServiceActiveConfigViewGridMetaData } from "./gridMetadata";
import { ServiceActiveDeactiveViewDetail } from "./serviceActiveView/serviceActiveViewDetails";
import { ServiceActiveConfigDetail } from "./serviceConfigDetail";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "date-service-disable",
    actionLabel: "Date Wise Service Disable",
    multiple: false,
  },
];

export const ServiceActiveDeactive = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const isDeleteDataRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "delete") {
        isDeleteDataRef.current = data?.rows?.[0];
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getServiceActiveConfigGridData"], () =>
    API.getServiceActiveConfigGridData()
  );

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getServiceActiveConfigGridData"]);
    };
  }, [getEntries]);

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);

  const handelCloseEvent = useCallback(() => {
    navigate(".");
  }, [navigate]);

  return (
    <Fragment>
      {isError && (
        <Alert
          severity="error"
          errorMsg={error?.error_msg ?? "Something went to wrong.."}
          errorDetail={error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={`ServiceActiveDeactiveGrid`}
        finalMetaData={ServiceActiveConfigViewGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="view-details"
          element={
            <ServiceActiveDeactiveViewDetail
              isDataChangedRef={isDataChangedRef}
              closeDialog={ClosedEventCall}
              formView={"view"}
            />
          }
        />
        <Route
          path="date-service-disable"
          element={
            <ServiceActiveConfigDetail ClosedEventCall={handelCloseEvent} />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const ServiceActiveDeactiveGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <ServiceActiveDeactive />
    </ClearCacheProvider>
  );
};
