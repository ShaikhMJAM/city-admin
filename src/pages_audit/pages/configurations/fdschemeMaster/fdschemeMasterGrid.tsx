import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import {
  Fragment,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import * as APIDTL from "./fdschemeMasterForm/api";
import { FdschemeMasterGridMetaData } from "./gridMetadata";
import { useSnackbar } from "notistack";
import { FdschemeMasterFormWrapper } from "./fdschemeMasterForm";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { UploadFileData } from "./fileUpload/fileUpload";
import { SampleFileDownload } from "./fileUpload/sampleFIleDownload";
import { format } from "date-fns";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "sample-file-download",
    actionLabel: "Sample File Download",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "upload-file-data",
    actionLabel: "Upload File",
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
const transformData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((one, index) => ({
      ...one,
      id: index,
      _hidden: false,
      _isNewRow: false,
    }));
  } else {
    return data;
  }
};

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
export const FdschemeMaster = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const isDeleteDataRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const [isDelete, SetDelete] = useState(false);
  const [isSampleFileDownload, setSampleFileDownload] = useState(false);
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "delete") {
        isDeleteDataRef.current = data?.rows?.[0];
        SetDelete(true);
      } else if (data?.name === "sample-file-download") {
        setSampleFileDownload(true);
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
  >(["getFdschemeMasterGridData"], () => API.getFdschemeMasterGridData());

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getFdschemeMasterGridData"]);
    };
  }, [getEntries]);

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(APIDTL.updFdschemeMasterFormData),
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
  const GidData = useMemo(() => transformData(data), [data]);
  const DownloadGidData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map((one, index) => ({
        NATURE_OF_ACCOUNT: one?.NATURE_OF_ACCOUNT ?? "",
        CURRENCY: one?.CURRENCY ?? "",
        FDR_ACCT_TYPE: one?.FDR_ACCT_TYPE,
        TENOR_TYPE_FINACLE: one?.TENOR_TYPE_FINACLE ?? "",
        TENOR: String(one?.TENOR ?? ""),
        TENOR_TYPE_RATE: one?.TENOR_TYPE_RATE,
        RENEWAL: one?.RENEWAL,
        MATURITY_INST: one?.MATURITY_INST,
        SCHEME_CODE: one?.SCHEME_CODE,
        SCHEME_DESC: one?.SCHEME_DESC,
        GEN_LEDGER_SUB_HEAD_CODE: one?.GEN_LEDGER_SUB_HEAD_CODE,
        TD_MOD_AMT: one?.TD_MOD_AMT ?? "",
      }));
    } else {
      return data;
    }
  }, [data]);
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
        key={`FdschemeMasterGrid`}
        finalMetaData={FdschemeMasterGridMetaData as GridMetaDataType}
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
            <FdschemeMasterFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="edit"
            />
          }
        />
        <Route
          path="add/*"
          element={
            <FdschemeMasterFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="new"
            />
          }
        />
        <Route
          path="upload-file-data/*"
          element={
            <UploadFileData
              CloseFileUpload={ClosedEventCall}
              data={GidData}
              isDataChangedRef={isDataChangedRef}
            />
          }
        />
      </Routes>
      {isSampleFileDownload ? (
        <SampleFileDownload
          isOpen={isSampleFileDownload}
          closeDialog={() => {
            setSampleFileDownload(false);
          }}
          fileData={DownloadGidData}
          filename={
            "Fdscheme-Master-" +
              format(new Date(), "yyyyMMddHH") +
              "-" +
              DownloadGidData?.length ?? 0
          }
        />
      ) : null}
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

export const FdschemeMasterGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <FdschemeMaster />
    </ClearCacheProvider>
  );
};
