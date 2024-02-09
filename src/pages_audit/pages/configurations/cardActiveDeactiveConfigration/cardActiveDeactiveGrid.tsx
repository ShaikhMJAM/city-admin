import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { Alert } from "components/common/alert";

import { cardacticedeactive } from "./gridMetaData";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Cardactivedeactivewrapper } from "./cardActiveDeactiveCrud";
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
export const Cardactivedeativedata = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const isDataChangedRef = useRef(false);
  const [isDelete, SetDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const [rowData, setRowData] = useState({});
  const isDeleteDataRef = useRef<any>(null);
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getcardactivedeatvgrid"]);
    };
  }, [getEntries]);

  const { data, isLoading, isFetching, isError, error, refetch }: any =
    useQuery(["getcardactivedeatvgrid"], API.getcardactivedeatvgrid);

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

  const deleteMutation = useMutation(API.getcardactivedeativedml, {
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
  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      // isDataChangedRef.current = false;
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
        key={`cardacticedeactive`}
        finalMetaData={cardacticedeactive}
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
          path="view-details/*"
          element={
            <Cardactivedeactivewrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
            />
          }
        />
        <Route
          path="add/*"
          element={
            <Cardactivedeactivewrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"new"}
            />
          }
        />
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

export const Cardactivedeactivegridwrapper = () => {
  return (
    <ClearCacheProvider>
      <Cardactivedeativedata />
    </ClearCacheProvider>
  );
};
