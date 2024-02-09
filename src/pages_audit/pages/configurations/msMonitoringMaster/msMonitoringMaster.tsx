import { Alert } from "components/common/alert";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { MsMonitoringGridMetaData } from "./gridMetadata";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MsMonitoringDetails } from "./viewDetails";
import { MsMonitoringUpdateServices } from "./updateServices";
import * as API from "./api";
import { useQuery } from "react-query";
import { ClearCacheContext, queryClient } from "cache";

// commonServiceAPI/GETINSTANCEDETAILS
const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "update-services",
    actionLabel: "Update",
    multiple: true,
    rowDoubleClick: false,
  },
];

export const MsMonitoringGridWrapper = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getMsMonitoringGridData"], () => API.getMsMonitoringGridData());

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getMsMonitoringGridData"]);
    };
  }, [getEntries]);

  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );

  // handle dialog close
  const handleDialogClose = () => {
    navigate(".");
  };

  MsMonitoringGridMetaData.gridConfig.gridLabel = "MS Monitoring Master";
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
        key={`MsMonitoringGrid`}
        finalMetaData={MsMonitoringGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={() => refetch()}
        ref={myGridRef}
      />
      {/* routes */}
      <Routes>
        <Route
          path="view-details"
          element={<MsMonitoringDetails ClosedEventCall={handleDialogClose} />}
        />

        <Route
          path="update-services"
          element={
            <MsMonitoringUpdateServices ClosedEventCall={handleDialogClose} />
          }
        />
      </Routes>
    </Fragment>
  );
};
