import { ClearCacheProvider, queryClient } from "cache";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import * as API from "./api";
import { useMutation, useQuery } from "react-query";
import GridWrapper from "components/dataTableStatic";
import { LoanLockRelReqGridMetaData } from "./gridMetadata";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { setLockUnlockRequest } from "../loanRequest/api";
import { enqueueSnackbar } from "notistack";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";

const actions: ActionTypes[] = [
  {
    actionName: "release",
    actionLabel: "Release",
    multiple: false,
    rowDoubleClick: false,
  },
];

const LoanLockReleaseRequest = () => {
  const result = useQuery<any, any>(["LoanLockReleaseRequestGridData"], () =>
    API.getLoanLockReleaseReqGridData()
  );
  const [open, setOpen] = useState(false);
  const rowRef = useRef<any>(null);

  const setCurrentAction = useCallback((data) => {
    if (data.name === "release") {
      rowRef.current = data.rows[0];
      setOpen(true);
    }
  }, []);

  const releaseMutation = useMutation(setLockUnlockRequest, {
    onError: (error: any) => {
      enqueueSnackbar(error?.error_msg ?? "Something went to wrong...", {
        variant: "error",
      });
      onActionCancel();
    },
    onSuccess: (success: any) => {
      enqueueSnackbar("Request Released Successfully.", {
        variant: "success",
      });
      onActionCancel();
      result.refetch();
    },
  });

  const onActionCancel = () => {
    setOpen(false);
  };

  const onPopupYes = (rows) => {
    releaseMutation.mutate({ tranCd: rows?.data?.TRAN_CD ?? "", type: "R" });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["LoanLockReleaseRequestGridData"]);
    };
  }, []);

  return (
    <Fragment>
      {result.isError && (
        <Alert
          severity="error"
          errorMsg={result.error?.error_msg ?? "Something went to wrong.."}
          errorDetail={result.error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={"loanLockReleaseRequestGrid"}
        data={result.data ?? []}
        finalMetaData={LoanLockRelReqGridMetaData}
        setData={() => null}
        loading={result.isLoading}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => result.refetch()}
      />
      {open ? (
        <PopupMessageAPIWrapper
          key={"lockReleasePopUp"}
          MessageTitle={"Confirmation"}
          Message={"Are You Sure to Release Locked Request?"}
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          loading={releaseMutation.isLoading}
          rows={rowRef.current ?? []}
          open={open}
        />
      ) : null}
    </Fragment>
  );
};

export const LoanLockReleaseRequestGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <LoanLockReleaseRequest />
    </ClearCacheProvider>
  );
};
