import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AuthenticationMetrixGridMetaData,
  AuthenticationMetrixViewGridMetaData,
} from "./gridMetaData";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as API from "../../api";
import { ActionTypes } from "components/dataTable";
import { AuthContext } from "pages_audit/auth";

const actions: ActionTypes[] = [
  {
    actionName: "limit",
    actionLabel: "Limit",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const AuthenticationMetrix = ({ mode }) => {
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const isDataChangedRef = useRef(false);
  const [formMode, setFormMode] = useState(mode);

  const mysubdtlRef = useRef<any>({});

  const [isHoliday, setHoliday] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getAuthenticationMetrixData"], () => API.getAuthenticationMetrixData());
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getAuthenticationMetrixData"]);
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
        key={`AuthenticationMetrix` + mode}
        finalMetaData={
          formMode === "edit" || formMode === "add"
            ? AuthenticationMetrixGridMetaData
            : AuthenticationMetrixViewGridMetaData
        }
        // finalMetaData={AuthenticationMetrixMetaData}
        data={formMode === "add" ? [] : data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        // onClickActionEvent={(index, id, data) => {
        //   mysubdtlRef.current = {
        //     // ...mysubdtlRef.current,

        //   };
        //   setHoliday(true);
        // }}
      />

      <Routes>
        <Route
          path="add"
          element={
            // <CorporateUserRegistrationDetails
            //     isDataChangedRef={isDataChangedRef}
            //     closeDialog={handleDialogClose}
            //     defaultView={"new"}
            // />
            <></>
          }
        />
      </Routes>
    </Fragment>
  );
};

export const AuthenticationMetrixGridWrapper = ({ mode }) => {
  return (
    <ClearCacheProvider>
      <AuthenticationMetrix mode={mode} />
    </ClearCacheProvider>
  );
};
