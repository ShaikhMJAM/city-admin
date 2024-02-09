import { ClearCacheProvider, queryClient } from "cache";
import { Alert } from "components/common/alert";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import * as API from "./api";
import { UserCreationConfirmGridMetaData } from "./gridMetadata";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserConfirmFormWrapper } from "./userConfirmFormDetail";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const UserCreationConfirmGrid = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const isDataChangedRef = useRef(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getUserCreationConfirmGridData"], API.getUserCreationConfirmGridData);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getUserCreationConfirmGridData"]);
    };
  }, []);

  // const setCurrentAction = (data) => {
  //   if (data.name === "accept") {
  //     setIsOpenAccept(true);
  //   } else if (data.name === "reject") {
  //     setIsOpenReject(true);
  //   }
  // };
  const setCurrentAction = useCallback(
    (data) => {
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
    navigate(".");
  };
  return (
    <Fragment>
      <>
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
          key={`getUserCreationConfirmGridData`}
          finalMetaData={UserCreationConfirmGridMetaData as GridMetaDataType}
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          actions={actions}
          setAction={setCurrentAction}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
      </>

      <Routes>
        <Route
          path="view-details"
          element={
            <UserConfirmFormWrapper
              isDataChangedRef={isDataChangedRef}
              handleDialogClose={handleDialogClose}
              formView={"view"}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export const UserCreationConfirmGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <UserCreationConfirmGrid />
    </ClearCacheProvider>
  );
};
