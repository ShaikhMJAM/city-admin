import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { WebReroutingConfigGridMetaData } from "./gridMetadata";
import * as API from "./api";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { WebReroutingFormWrapper } from "./webReroutingForm";

const actions: ActionTypes[] = [
  {
    actionName: "view-detail",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const WebRerouting = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "add") {
        navigate(data?.name, {
          state: [],
        });
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
  >(["getWebReroutingGrid", "ALL"], () => API.getWebReroutingGrid("ALL"));

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getWebReroutingGrid", "ALL"]);
    };
  }, [getEntries]);

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current) {
      isDataChangedRef.current = false;
      refetch();
    }
  }, [navigate]);

  WebReroutingConfigGridMetaData.gridConfig.gridLabel =
    "Web Rerouting Configuration";
  return (
    <Fragment>
      {isError ? (
        <Alert
          severity={error?.severity ?? "error"}
          errorMsg={error?.error_msg ?? "Error"}
          errorDetail={error?.error_detail ?? ""}
        />
      ) : (
        ""
      )}
      <GridWrapper
        key={`weReroutingConfig`}
        finalMetaData={WebReroutingConfigGridMetaData as GridMetaDataType}
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
          path="view-detail/*"
          element={
            <WebReroutingFormWrapper
              isDataChangedRef={isDataChangedRef}
              defaultmode={"view"}
              handleDialogClose={ClosedEventCall}
              moduleType={"cardUpload"}
            />
          }
        />
        <Route
          path="add/*"
          element={
            <WebReroutingFormWrapper
              isDataChangedRef={isDataChangedRef}
              defaultmode={"add"}
              handleDialogClose={ClosedEventCall}
              moduleType={"cardUpload"}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const WebReroutingGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <WebRerouting />
    </ClearCacheProvider>
  );
};
