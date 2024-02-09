import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import * as API from "./api";
import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { productnamedata } from "./gridMetaData";
import { Alert } from "components/common/alert";
import { useMutation, useQuery } from "react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ActionTypes } from "components/dataTable";

import {
  ViewEditProductDisplayWrapperForm,
  // DeleteProductName,
} from "./productDisplayCrud";
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

export const Productnamedata = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isDelete, SetDelete] = useState(false);
  const navigate = useNavigate();
  const { getEntries } = useContext(ClearCacheContext);
  const myGridRef = useRef<any>(null);
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
  const { data, isLoading, isError, error, isFetching, refetch }: any =
    useQuery(["getProductNameGrid"], API.getProductNameGrid);

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getProductNameGrid"]);
    };
  }, [getEntries]);

  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      // isDataChangedRef.current = false;
    }
    navigate(".");
  };

  const deleteMutation = useMutation(API.ProductNameInsert, {
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
        key={`productnamedatagrid`}
        finalMetaData={productnamedata}
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
            <ViewEditProductDisplayWrapperForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"new"}
            />
          }
        />

        <Route
          path="view-details/*"
          element={
            <ViewEditProductDisplayWrapperForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
            />
          }
        />
        {/* <Route
          path="delete"
          element={
            <DeleteProductName
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
// ProductNameGridWrapper

export const ProductNameGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <Productnamedata />
    </ClearCacheProvider>
  );
};
