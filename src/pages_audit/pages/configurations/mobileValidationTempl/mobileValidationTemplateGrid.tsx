import { ClearCacheContext, queryClient } from "cache";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { MobileValidationTemplateGridMetaData } from "./gridMetadata";
import { useNavigate, Routes, Route } from "react-router-dom";
import { MobileValidationTemplateDetails } from "./crud";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { useSnackbar } from "notistack";
const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: true,
    alwaysAvailable: true,
  },
];

export const MobileValidationTemplateGridWrapper = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const isDeleteDataRef = useRef<any>(null);
  const [isDelete, SetDelete] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getMobileValidationTemplateGridData"], () =>
    API.getMobileValidationTemplateGridData()
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      queryClient.removeQueries(["getMobileValidationTemplateGridData"]);
    };
  }, [getEntries]);

  const setCurrentAction = useCallback(
    (data) => {
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
  const deleteMutation = useMutation(API.updateMobileValidationTemplateData, {
    onError: (error: any) => {},
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar("Records successfully deleted", {
        variant: "success",
      });
      SetDelete(false);
      refetch();
    },
  });

  const onDeleteYes = (rowsData) => {
    deleteMutation.mutate({ ...rowsData?.data, _isDeleteRow: true });
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
        key={`MobileValidationTemplateGrid`}
        finalMetaData={MobileValidationTemplateGridMetaData as GridMetaDataType}
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
          path="add"
          element={
            <MobileValidationTemplateDetails
              isDataChangedRef={isDataChangedRef}
              ClosedEventCall={handleDialogClose}
              defaultmode={"new"}
            />
          }
        />
        <Route
          path="view-details"
          element={
            <MobileValidationTemplateDetails
              isDataChangedRef={isDataChangedRef}
              ClosedEventCall={handleDialogClose}
              defaultmode={"view"}
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
