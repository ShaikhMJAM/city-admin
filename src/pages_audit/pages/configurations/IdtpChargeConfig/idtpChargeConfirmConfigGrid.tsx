import { ClearCacheProvider, queryClient } from "cache";
import { Alert } from "components/common/alert";
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
import { IdtpChargeConfigConfirmGridMetaData } from "./gridMetadata";
import { ActionTypes } from "components/dataTable";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { useNavigate } from "react-router-dom";
const actions: ActionTypes[] = [
  {
    actionName: "accept",
    actionLabel: "Accept",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (data, authDetails) => {
      if (Array.isArray(data) && data.length > 0) {
        if (
          data[0]?.data?.CONFIRMED === "R" ||
          data[0]?.data?.CONFIRMED === "Y"
        ) {
          return true;
        }
      }
      return false;
    },
  },
  {
    actionName: "reject",
    actionLabel: "Reject",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (data, authDetails) => {
      if (Array.isArray(data) && data.length > 0) {
        if (
          data[0]?.data?.CONFIRMED === "R" ||
          data[0]?.data?.CONFIRMED === "Y"
        ) {
          return true;
        }
      }
      return false;
    },
  },
];
export const IdtpChargeConfirmConfigGrid = () => {
  const myGridRef = useRef<any>(null);
  const [rowData, setRowData] = useState({});
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const authController = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(
    ["getIdtpChargeConfirmConfigGridData"],
    API.getIdtpChargeConfirmConfigGridData
  );

  const result = useMutation(API.upConfirmIdtpCharge, {
    onSuccess: (response: any) => {
      enqueueSnackbar(response, { variant: "success" });
      refetch();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.error_msg ?? "error", { variant: "error" });
    },
    onSettled: () => {
      onActionCancel();
    },
  });
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getIdtpChargeConfirmConfigGridData"]);
    };
  }, []);

  const onAcceptPopupYes = (rows) => {
    result.mutate({
      confirmed: "Y",
      trantype: rows[0]?.data?.TRN_TYPE ?? "",
      receiverFitype: rows[0]?.data?.RECEIVER_FITYPE ?? "",
    });
  };
  const onRejectPopupYes = (rows) => {
    result.mutate({
      confirmed: "R",
      trantype: rows[0]?.data?.TRN_TYPE ?? "",
      receiverFitype: rows[0]?.data?.RECEIVER_FITYPE ?? "",
    });
  };

  const onActionCancel = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    // if (isDataChangedRef.current === true) {
    //   refetch();
    //   isDataChangedRef.current = false;
    // }
  };

  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      let confirmed = data?.rows[0]?.data?.TRN_TYPE;
      let enteredBy = data?.rows[0]?.data?.LAST_ENTERED_BY;
      if (confirmed === "Y") {
        enqueueSnackbar("Request has been already accepted.", {
          variant: "warning",
        });
      } else if (confirmed === "R") {
        enqueueSnackbar("Request has been already rejected.", {
          variant: "warning",
        });
      } else {
        if (data.name === "accept") {
          if (
            (enteredBy || "").toLowerCase() ===
            (authController?.authState?.user?.id || "").toLowerCase()
          ) {
            enqueueSnackbar("You can not accept your own entry.", {
              variant: "warning",
            });
          } else {
            setIsOpenAccept(true);
          }
        } else if (data.name === "reject") {
          if (
            (enteredBy || "").toLowerCase() ===
            (authController?.authState?.user?.id || "").toLowerCase()
          ) {
            enqueueSnackbar("You can not reject your own entry.", {
              variant: "warning",
            });
          } else {
            setIsOpenReject(true);
          }
        } else {
          navigate(data?.name, {
            state: data?.rows,
          });
        }
      }
    },
    [navigate]
  );
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
          key={`idtpChargeConfirmConfigGrid`}
          finalMetaData={
            IdtpChargeConfigConfirmGridMetaData as GridMetaDataType
          }
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          actions={actions}
          setAction={setCurrentAction}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
      </>
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to accept this Request?"
          onActionYes={(rowVal) => onAcceptPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rowData}
          open={isOpenAccept}
          loading={result.isLoading}
        />
      ) : null}
      {isOpenReject ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to reject this Request?"
          onActionYes={(rowVal) => onRejectPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rowData}
          open={isOpenReject}
          loading={result.isLoading}
        />
      ) : null}
    </Fragment>
  );
};

const IdtpChargeConfigConfirmGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <IdtpChargeConfirmConfigGrid />
    </ClearCacheProvider>
  );
};

export default IdtpChargeConfigConfirmGridWrapper;
