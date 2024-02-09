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
  // corporateUseRegDetailMetaData,
  // corporateUseRegDtlMetaData,
  partnerUserGridMetaData,
  partnerUserViewGridMetaData,
} from "./gridMetaData";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as API from "../../api";
import { ActionTypes } from "components/dataTable";
import { AuthContext } from "pages_audit/auth";
import { UserLimitForm } from "../userLimit/userLimit";

const actions: ActionTypes[] = [
  {
    actionName: "limit",
    actionLabel: "Limit",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const PartnerUserGrid = ({ mode }) => {
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const isDataChangedRef = useRef(false);
  const [formMode, setFormMode] = useState(mode);
  const [rowsData, setRowsData] = useState({});

  const mysubdtlRef = useRef<any>({});

  const [isUser, setIsUser] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getPartnerUserGridData"], () => API.getPartnerUserGridData());

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getPartnerUserGridData"]);
    };
  }, [getEntries]);
  const setCurrentAction = useCallback(
    (data) => {
      setRowsData(data?.rows);
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
        key={`PartnerUserGrid` + mode}
        finalMetaData={partnerUserGridMetaData}
        data={formMode === "add" ? [] : data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        onClickActionEvent={(index, id, data) => {
          setRowsData(data);
          setIsUser(true);
        }}
      />
      <>
        {" "}
        {isUser ? (
          <UserLimitForm
            isOpen={isUser}
            formMode={formMode}
            onClose={() => {
              setIsUser(false);
            }}
            reqDataRef={mysubdtlRef}
            rowsData={rowsData}
          />
        ) : null}
      </>
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

export const PartnerUserGridWrapper = ({ mode }) => {
  return (
    <ClearCacheProvider>
      <PartnerUserGrid mode={mode} />
    </ClearCacheProvider>
  );
};
