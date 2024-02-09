import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import {
  Fragment,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";
import { AuthContext } from "pages_audit/auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import * as APIDTL from "./emailAcctMstForm/api";
import { EmailAcctMstGridMetaData } from "./gridMetadata";
import { useSnackbar } from "notistack";
// import { EmailAcctMstFormWrapper } from "./emailAcctMstForm";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";

import { EmailAcctMstFormWrapper } from "./emailAcctMstForm";

//import { ReleaseUsersAPIWrapper } from "../releaseUsers";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "edit-detail",
    actionLabel: "Edit Detail",
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
export const EmailAcctMst = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const isDeleteDataRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const [isDelete, SetDelete] = useState(false);
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
  const { authState } = useContext(AuthContext);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getEmailAcctMstGridData"], () =>
    API.getEmailAcctMstGridData(authState.companyID)
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getEmailAcctMstGridData"]);
    };
  }, [getEntries]);

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(APIDTL.updEmailAcctMstFormData),
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

  const onDeleteYes = (rows) => {
    deleteMutation.mutate({ data: { ...rows?.data, _isDeleteRow: true } });
  };

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);
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
        key={`EmailAcctMstGrid`}
        finalMetaData={EmailAcctMstGridMetaData as GridMetaDataType}
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
          path="edit-detail/*"
          element={
            <EmailAcctMstFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="edit"
            />
          }
        />
        <Route
          path="add/*"
          element={
            <EmailAcctMstFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="new"
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

export const EmailAcctMstGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <EmailAcctMst />
    </ClearCacheProvider>
  );
};

// const DeleteEmailAcctMst = ({ closeDialog, isDataChangedRef, rows }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   // const { authState } = useContext(AuthContext);
//   const mutation = useMutation(
//     updateAUTHDetailDataWrapperFn(APIDTL.updEmailAcctMstFormData),
//     {
//       onError: (error: any) => {},
//       onSuccess: (data) => {
//         isDataChangedRef.current = true;
//         enqueueSnackbar("Records successfully deleted", {
//           variant: "success",
//         });
//         closeDialog();
//       },
//     }
//   );
//   const onDeleteEvent = () => {
//     mutation.mutate({ data: { ...rows?.data, _isDeleteRow: true } });
//   };
//   return (
//     <Dialog open={true} maxWidth="sm">
//       <DialogTitle>Would you like to delete the selected record?</DialogTitle>
//       <DialogContent>
//         {mutation.isLoading ? (
//           "Deleting..."
//         ) : mutation.isError ? (
//           <Alert
//             severity="error"
//             // I suspect this, mutation.error?.error_msg is misspelt. Try errorMessage
//             errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
//             errorDetail={mutation.error?.error_detail ?? ""}
//           />
//         ) : null}
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={closeDialog}
//           color="secondary"
//           disabled={mutation.isLoading}
//         >
//           No
//         </Button>
//         <Button
//           onClick={onDeleteEvent}
//           color="secondary"
//           disabled={mutation.isLoading}
//         >
//           Yes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
