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
import {
  AddCardCategoryMasterWrapper,
  ViewEditCardCategoryMasterWrapper,
} from "./cardCategoryMasterCrud";
import * as API from "./api";
import { CardCategoryMasterGridMetaData } from "./gridMetaData";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
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
export const CardCategoryMaster = () => {
  const navigate = useNavigate();
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const [isDelete, SetDelete] = useState(false);
  const isDeleteDataRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "delete") {
        isDeleteDataRef.current = data?.rows?.[0];
        SetDelete(true);
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
      queryClient.removeQueries(["getMastersGridData"]);
    };
  }, [getEntries]);

  const { refetch, data, isLoading, isFetching, isError, error } = useQuery(
    ["getMastersGridData"],
    API.getMastersGridData
  );
  // const setCurrentAction = useCallback(
  //   (data) => {
  //     navigate(data?.name, {
  //       state: data?.rows,
  //     });
  //   },
  //   [navigate]
  // );
  const deleteMutation = useMutation(API.deleteBytransactionID, {
    onError: (error: any) => {},
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar("Records successfully deleted", {
        variant: "success",
      });
      // closeDialog();
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
        finalMetaData={CardCategoryMasterGridMetaData}
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
            <AddCardCategoryMasterWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        />
        {/* <Route
          path="delete"
          element={
            <DeleteCardCategoryMasterWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
            />
          }
        /> */}

        <Route
          path="view-details/*"
          element={
            <ViewEditCardCategoryMasterWrapper
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
