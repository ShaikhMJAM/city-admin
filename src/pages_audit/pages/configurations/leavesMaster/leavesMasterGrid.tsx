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
import { leavesmstgrid } from "./gridMetaData";
import * as API from "./api";
import { useMutation, useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  // AddLeavesMasterWrapper,
  // ViewEditLeavesMasterWrapper,
  // DeleteLeavesMaster,
  ViewEditLeavesMasterWrapperForm,
} from "./leavesMasterCrud";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: true,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const Leavesmasterdata = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const [rowData, setRowData] = useState({});
  const [isDelete, SetDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const isDeleteDataRef = useRef<any>(null);
  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      if (data?.name === "delete") {
        isDeleteDataRef.current = data?.rows?.[0];
        SetDelete(true);
      } else if (data?.name === "add") {
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
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getleavesmstgrid"]);
    };
  }, [getEntries]);

  const { data, isLoading, isFetching, isError, error, refetch }: any =
    useQuery(["getleavesmstgrid"], API.getleavesmstgrid);

  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      // isDataChangedRef.current = false;
    }
    navigate(".");
  };

  const deleteMutation = useMutation(API.leavessavedata(), {
    onError: (error: any) => {},
    onSuccess: (data) => {
      enqueueSnackbar("Records successfully deleted", {
        variant: "success",
      });
      refetch();
      SetDelete(false);
    },
  });

  const onDeleteYes = (rows) => {
    deleteMutation.mutate({
      ...rows?.data,
      _isDeleteRow: true,
    });
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
        key={`leavesMasterGrid`}
        finalMetaData={leavesmstgrid}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="add/*"
          element={
            <ViewEditLeavesMasterWrapperForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"new"}
            />
          }
        />

        <Route
          path="view-details/*"
          element={
            <ViewEditLeavesMasterWrapperForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
            />
          }
        />
        {/* <Route
          path="delete"
          element={
            <DeleteLeavesMaster
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              isOpen={true}
            />
          }
        /> */}
      </Routes>
      {isDelete ? (
        <MessageBoxWrapper
          isOpen={isDelete}
          validMessage={"Would you like to delete the selected record?"}
          onActionYes={(rowVal) => onDeleteYes(rowVal)}
          onActionNo={() => {
            SetDelete(false);
          }}
          isLoading={deleteMutation.isLoading}
          isError={deleteMutation.isError}
          error_msg={deleteMutation.error?.error_msg ?? "Unknown Error occured"}
          error_detail={deleteMutation.error?.error_detail ?? ""}
          loadingText={"Deleting..."}
          rows={isDeleteDataRef.current}
        />
      ) : null}
    </Fragment>
  );
};

export const LeaveMasterGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <Leavesmasterdata />
    </ClearCacheProvider>
  );
};
