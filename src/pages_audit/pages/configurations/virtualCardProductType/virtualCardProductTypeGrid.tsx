import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import { Fragment, useEffect, useContext, useRef, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import { VirtualCardProdTypeGridMetaData } from "./gridMetadata";
import { ViewEditVCardProdTypeWrapper } from "./viewEditDetail";
//import { ReleaseUsersAPIWrapper } from "../releaseUsers";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "view-details",
    actionLabel: "Edit Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];
const initlanguageData: { isOpen: boolean; rowdata: any } = {
  isOpen: false,
  rowdata: [],
};
export const VirtualCardProductType = () => {
  const isDataChangedRef = useRef(false);
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
  >(["getvCardProdTypeGridData", "ALL"], () =>
    API.getvCardProdTypeGridData("ALL")
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getvCardProdTypeGridData", "ALL"]);
    };
  }, [getEntries]);

  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
    navigate(".");
  };

  VirtualCardProdTypeGridMetaData.gridConfig.gridLabel =
    "Virtual Card Product Type Configuration";
  VirtualCardProdTypeGridMetaData.gridConfig.allowRowSelection = true;
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
        key={`virtualCardProdTypeGrid`}
        finalMetaData={VirtualCardProdTypeGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
      />
      <Routes>
        <Route
          path="view-details"
          element={
            <ViewEditVCardProdTypeWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
            />
          }
        />
        <Route
          path="add"
          element={
            <ViewEditVCardProdTypeWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"add"}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const VirtualCardProductTypeGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <VirtualCardProductType />
    </ClearCacheProvider>
  );
};
