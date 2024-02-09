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
import { AppReviewGridMetaData } from "./gridMetadata";
import * as API from "./api";
import { useMutation, useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ViewEditAppReviewUserFormWrapper } from "./appReviewMasterForm";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { useSnackbar } from "notistack";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "Edit Detail",
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

interface updateAUTHDetailDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
}
const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData({ data });
  };

export const AppReviewGrid = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const isDeleteDataRef = useRef<any>(null);
  const myGridRef = useRef<any>(null);
  const [isDelete, SetDelete] = useState(false);

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getAppReviewGridData"]);
    };
  }, [getEntries]);

  // const { data, isLoading, isFetching, isError, error, refetch }: any =
  //   useQuery(["getAppReviewGridData"], API.getAppReviewGridData);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getAppReviewGridData"], () => API.getAppReviewGridData());

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updAppReviewGridData),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar("Records successfully deleted", {
          variant: "success",
        });
        refetch();
        SetDelete(false);
      },
    }
  );

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

  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
    navigate(".");
  };

  const onDeleteYes = (rows) => {
    deleteMutation.mutate({ data: { ...rows?.data, _isDeleteRow: true } });
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
        key={`AppReviewUsersGrid`}
        finalMetaData={AppReviewGridMetaData}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={() => refetch()}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="add/*"
          element={
            <ViewEditAppReviewUserFormWrapper
              isDataChangedRef={isDataChangedRef}
              handleDialogClose={handleDialogClose}
              formView={"add"}
            />
          }
        />

        <Route
          path="view-details/*"
          element={
            <ViewEditAppReviewUserFormWrapper
              isDataChangedRef={isDataChangedRef}
              handleDialogClose={handleDialogClose}
              formView={"edit"}
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

export const AppReviewGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <AppReviewGrid />
    </ClearCacheProvider>
  );
};
