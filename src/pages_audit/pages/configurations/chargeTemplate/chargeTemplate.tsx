import {
  useRef,
  Fragment,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { queryClient, ClearCacheContext } from "cache";
import { useMutation, useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import GridWrapper from "components/dataTableStatic";
import { chargeTempMasterGridMetaData } from "./metadata/grid";
import {
  AddChargeTempMasterWrapper,
  ViewEditChargeTempMasterWrapper,
} from "./crud";
import * as API from "./api";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { AuthContext } from "pages_audit/auth";
import { useSnackbar } from "notistack";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const ChargeTemplateMaster = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const [rowData, setRowData] = useState({});
  const isDeleteDataRef = useRef<any>(null);
  const [isDelete, SetDelete] = useState(false);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getMastersGridData"]);
    };
  }, [getEntries]);

  const { refetch, data, isLoading, isFetching, isError, error } = useQuery(
    ["getMastersGridData"],
    API.getMastersGridData
  );
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

  const deleteMutation = useMutation(API.deleteBytransactionID, {
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
      COMP_CD: authState.companyID,
      BRANCH_CD: authState.user.branchCode,
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
  let reqerror =
    typeof error === "object"
      ? { ...error }
      : { severity: undefined, error_msg: "", error_detail: "" };
  return (
    <Fragment>
      {isError === true ? (
        <Alert
          severity={reqerror?.severity ?? "error"}
          errorMsg={reqerror?.error_msg ?? "Error"}
          errorDetail={reqerror?.error_detail ?? ""}
        />
      ) : null}
      <GridWrapper
        key={`staticGrid`}
        //@ts-ignore
        finalMetaData={chargeTempMasterGridMetaData}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        ref={myGridRef}
        // defaultSortOrder={[{ id: "TRAN_CD", desc: false }]}
      />
      <Routes>
        <Route
          path="add"
          element={
            <AddChargeTempMasterWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        <Route
          path="view-details/*"
          element={
            <ViewEditChargeTempMasterWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
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
