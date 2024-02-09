import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { PageContainGridMetaData } from "./gridMetaData";
import * as API from "./api";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PageContainEditWrapper } from "./editPageContent";
const actions: ActionTypes[] = [
  {
    actionName: "edit-detail",
    actionLabel: "Edit Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const PageContain = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const { data, isLoading, isFetching, isError, error, refetch }: any =
    useQuery(["getPageContentGridData"], API.getPageContentGridData);

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getPageContentGridData"]);
    };
  }, [getEntries]);

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      // myGridRef.current?.refetch?.();
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);

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
        key={`PageContentGrid`}
        finalMetaData={PageContainGridMetaData}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={() => refetch()}
      />
      <Routes>
        <Route
          path="edit-detail/*"
          element={
            <PageContainEditWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              defaultmode={"view"}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const PageContainGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <PageContain />
    </ClearCacheProvider>
  );
};
