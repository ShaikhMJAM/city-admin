import { ClearCacheProvider, queryClient } from "cache";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import * as API from "./api";
import { OTPSMSConfigGridMetaData } from "./gridMetadata";
import { useNavigate, Routes, Route } from "react-router-dom";
import { OtpSmsConfigFormWrapper } from "./otpSmsConfigDetail";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];
export const OtpSmsConfigGridWrapper = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const isDataChangedRef = useRef(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getOtpSmsConfigGridData"], API.getOtpSmsConfigGridData);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getOtpSmsConfigGridData"]);
    };
  }, []);

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
        key={`otpSmsConfigGrid`}
        finalMetaData={OTPSMSConfigGridMetaData as GridMetaDataType}
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
            <OtpSmsConfigFormWrapper
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

export const OtpSmsConfigGridWrapperform = () => {
  return (
    <ClearCacheProvider>
      <OtpSmsConfigGridWrapper />
    </ClearCacheProvider>
  );
};
