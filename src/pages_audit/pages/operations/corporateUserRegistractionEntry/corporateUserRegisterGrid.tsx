import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import { Fragment, useCallback, useContext, useEffect, useRef } from "react";
import { corporateUserRegistration } from "./gridMetaData";
import * as API from "./api";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CorporateUserRegistrationDetails } from "./corporateUserDetail/corporateUserDetailForm";

import { ActionTypes } from "components/dataTable";
import { AuthContext } from "pages_audit/auth";
// import { RefreshBillersData } from "./refreshBillerData";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "view-detail",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const CorporateUserRegistrationGrid = () => {
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const isDataChangedRef = useRef(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getCorporateUserRegistration"], () => API.getCorporateUserRegistration());
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries();
        });
      }
      queryClient.removeQueries([
        "getCorporateUserRegistration",
        authState.companyID,
      ]);
    };
  }, [getEntries]);
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
  const handleDialogClose = () => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      myGridRef.current?.refetch?.();
      isDataChangedRef.current = false;
    }
  };
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
        key={`CorporateUserRegistrationGrid`}
        finalMetaData={corporateUserRegistration}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
      />
      <Routes>
        <Route
          path="add"
          element={
            <CorporateUserRegistrationDetails
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"add"}
            />
          }
        />
        <Route
          path="view-detail"
          element={
            <CorporateUserRegistrationDetails
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"edit"}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const CorporateUserRegistractionGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <CorporateUserRegistrationGrid />
    </ClearCacheProvider>
  );
};
