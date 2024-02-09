import { GridMetaDataType } from "components/dataTable/types";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ClearCacheContext, queryClient } from "cache";
import * as API from "./api";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ActionTypes } from "components/dataTable";
// import { Alert } from "reactstrap";
import { MarqueMessageGridMetaData } from "./gridMetadata";
import { AuthContext } from "pages_audit/auth";
import { useMutation, useQuery } from "react-query";
import { MarqueeViewDetails } from "./viewDetails/marqueeViewDetails";
import { Alert } from "components/common/alert";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { useSnackbar } from "notistack";
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
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const MarqueMessageGrid = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const [isDelete, SetDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  const isDataChangedRef = useRef(false);
  const [rowData, setRowData] = useState({});
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
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getMarqueeMessagegridData", authState.companyID], () =>
    API.getMarqueeMessagegridData(authState.companyID)
  );

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries();
        });
      }
      queryClient.removeQueries([
        "getMarqueeMessagegridData",
        authState.companyID,
      ]);
    };
  }, [getEntries]);

  const deleteMutation = useMutation(API.deleteMarqueeMessage, {
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
      isDataChangedRef.current = false;
    }
    navigate(".");
  };

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
        key={`MarqueMessageGrid`}
        finalMetaData={MarqueMessageGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        // ref={myGridRef}
      />
      <Routes>
        <Route
          path="view-details"
          element={
            <MarqueeViewDetails
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              formView={"view"}
            />
          }
        />
        <Route
          path="add"
          element={
            <MarqueeViewDetails
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              formView={"add"}
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
