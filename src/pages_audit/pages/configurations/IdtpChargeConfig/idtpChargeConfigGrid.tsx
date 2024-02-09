import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { Alert } from "components/common/alert";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import {
  IdtpChargeConfigGridMetaData,
  IdtpChargeConfigGridViewMetaData,
} from "./gridMetadata";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { ActionTypes } from "components/dataTable";
import { useSnackbar } from "notistack";
import { CreateDetailsRequestData } from "components/utils";

const actions: ActionTypes[] = [
  {
    actionName: "edit",
    actionLabel: "Edit",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  // {
  //   actionName: "save",
  //   actionLabel: "Save",
  //   multiple: undefined,
  //   rowDoubleClick: false,
  //   alwaysAvailable: true,
  // },
];
const action_edit: ActionTypes[] = [
  {
    actionName: "save",
    actionLabel: "Save",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "cancel",
    actionLabel: "Cancel",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const IdtpChargeConfigGrid = () => {
  const [isOpenSave, setIsOpenSave] = useState(false);
  const myGridRef = useRef<any>(null);

  const [girdData, setGridData] = useState<any>([]);
  const [mode, setMode] = useState<any>("view");
  const { enqueueSnackbar } = useSnackbar();
  const isDataChangedRef = useRef(false);
  const isSubmitDataRef = useRef<any>(null);

  const { getEntries } = useContext(ClearCacheContext);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getIdtpChargeConfigGridData"], API.getIdtpChargeConfigGridData);

  const mutation = useMutation(API.updIdtpChargeConfigGridData, {
    onError: (error: any, { setServerError }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      setServerError(errorMsg);
      // if (isErrorFuncRef.current == null) {
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });

      onActionCancel();
    },
    onSuccess: (data) => {
      enqueueSnackbar(data, {
        variant: "success",
      });
      isDataChangedRef.current = true;
      setIsOpenSave(false);
      refetch();
    },
  });
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getIdtpChargeConfigGridData"]);
    };
  }, [getEntries]);

  const onPopupYes = (rows) => {
    mutation.mutate({
      data: rows,
      setServerError: undefined,
    });
    setMode("view");
  };

  const setCurrentAction = async (data) => {
    if (data.name === "edit") {
      setMode("edit");
    } else if (data.name === "cancel") {
      setGridData(girdData);
      setMode("view");
    } else if (data.name === "save") {
      let { hasError, data: dataold } = await myGridRef.current?.validate();
      if (hasError === true) {
        if (dataold) {
          setGridData(dataold);
        }
      } else {
        let result = myGridRef?.current?.cleanData?.();
        if (!Array.isArray(result)) {
          result = [result];
        }
        let finalResult = result.filter(
          (one) => !(Boolean(one?._hidden) && Boolean(one?._isNewRow))
        );
        if (finalResult.length === 0) {
          // setMode("view");
        } else {
          finalResult = CreateDetailsRequestData(finalResult);
          if (
            finalResult?.isDeleteRow?.length === 0 &&
            finalResult?.isNewRow?.length === 0 &&
            finalResult?.isUpdatedRow?.length === 0
          ) {
            setMode("view");
          } else {
            let reqData = {
              _isNewRow: false,
              _UPDATEDCOLUMNS: [],
              _OLDROWVALUE: {},
              DETAILS_DATA: finalResult,
            };

            isSubmitDataRef.current = reqData;
            setIsOpenSave(true);
          }
        }
      }
    }
  };
  const onActionCancel = () => {
    setIsOpenSave(false);
    setMode("edit");
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setGridData(data);
    } else {
      setGridData([]);
    }
  }, [data]);

  return (
    <Fragment>
      <>
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
          key={`idtpChargeConfigGrid` + mode}
          finalMetaData={
            mode === "edit"
              ? IdtpChargeConfigGridMetaData
              : (IdtpChargeConfigGridViewMetaData as GridMetaDataType)
          }
          data={girdData}
          setData={setGridData}
          loading={isLoading || isFetching}
          actions={mode === "edit" ? action_edit : actions}
          setAction={setCurrentAction}
          refetchData={() => refetch()}
          ref={myGridRef}
        />

        {isOpenSave ? (
          <PopupMessageAPIWrapper
            MessageTitle="Confirmation"
            Message="Do you want to save this Request?"
            onActionYes={(rowVal) => onPopupYes(rowVal)}
            onActionNo={() => onActionCancel()}
            rows={isSubmitDataRef.current}
            open={isOpenSave}
            loading={mutation.isLoading}
          />
        ) : null}
      </>
    </Fragment>
  );
};

export const IdtpChargeConfigGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <IdtpChargeConfigGrid />
    </ClearCacheProvider>
  );
};
