import {
  useRef,
  useCallback,
  useEffect,
  useContext,
  Fragment,
  useState,
} from "react";
import {
  AccountDeletionReqGridMetaData,
  AccountDeletionReqGridCheckerMetaData,
} from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { RemarksAPIWrapper } from "components/custom/Remarks";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";

const actions: ActionTypes[] = [
  {
    actionName: "accept",
    actionLabel: "Accept",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "reject",
    actionLabel: "Reject",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const AccountDeletionReqWrapper = ({ screenFlag }) => {
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState({});
  const [isOpenAcceptRemark, setIsOpenAcceptRemark] = useState(false);
  const [isOpenRejectRemark, setIsOpenRejectRemark] = useState(false);
  const navigate = useNavigate();
  const authController = useContext(AuthContext);

  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      let acceptedBy = data?.rows[0]?.data?.MAKER_ENTERED_BY;
      if (data.name === "accept") {
        if (screenFlag === "P") {
          if (
            (acceptedBy || "").toLowerCase() ===
            (authController?.authState?.user?.id || "").toLowerCase()
          ) {
            enqueueSnackbar("You can not accept your own request.", {
              variant: "warning",
            });
          } else {
            setIsOpenAcceptRemark(true);
          }
        } else {
          setIsOpenAcceptRemark(true);
        }
      } else if (data.name === "reject") {
        if (screenFlag === "P") {
          if (
            (acceptedBy || "").toLowerCase() ===
            (authController?.authState?.user?.id || "").toLowerCase()
          ) {
            enqueueSnackbar("You can not reject your own request.", {
              variant: "warning",
            });
          } else {
            setIsOpenRejectRemark(true);
          }
        } else {
          setIsOpenAcceptRemark(true);
        }
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
  >(["getAccountDeletionReqGridData", screenFlag], () =>
    API.getAccountDeletionReqGridData(screenFlag)
  );

  const result = useMutation(API.updateAccuntDeleteReq, {
    onSuccess: (response: any) => {
      refetch();

      enqueueSnackbar(response, { variant: "success" });
      onActionCancel();
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
      queryClient.removeQueries(["getAccountDeletionReqGridData", screenFlag]);
    };
  }, [getEntries, screenFlag]);

  const onAcceptRematk = (val, rows) => {
    result.mutate({
      reqflag: screenFlag === "P" ? "CHECKER" : "MAKER",
      confirmed: screenFlag === "P" ? "Y" : "P",
      trancd: rows[0]?.data?.TRAN_CD,
      remarks: val,
    });
  };
  const onRejectRematk = (val, rows) => {
    result.mutate({
      reqflag: screenFlag === "P" ? "CHECKER" : "MAKER",
      confirmed: "R",
      trancd: rows[0]?.data?.TRAN_CD,
      remarks: val,
    });
  };

  const onActionCancel = () => {
    setIsOpenAcceptRemark(false);
    setIsOpenRejectRemark(false);
  };

  let metaData;
  if (screenFlag === "P") {
    metaData = AccountDeletionReqGridMetaData;
  } else {
    metaData = AccountDeletionReqGridCheckerMetaData;
  }

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
        key={`accountDeletionGrid${screenFlag}`}
        finalMetaData={metaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        ref={myGridRef}
      />

      {isOpenAcceptRemark ? (
        <RemarksAPIWrapper
          TitleText={"Accept Remarks"}
          onActionNo={() => onActionCancel()}
          onActionYes={onAcceptRematk}
          isLoading={result.isLoading}
          isEntertoSubmit={true}
          AcceptbuttonLabelText="Ok"
          CanceltbuttonLabelText="Cancel"
          open={isOpenAcceptRemark}
          rows={rowData}
        />
      ) : null}
      {isOpenRejectRemark ? (
        <RemarksAPIWrapper
          TitleText={"Reject Remarks"}
          onActionNo={() => onActionCancel()}
          onActionYes={onRejectRematk}
          isLoading={result.isLoading}
          isEntertoSubmit={true}
          AcceptbuttonLabelText="Ok"
          CanceltbuttonLabelText="Cancel"
          open={isOpenRejectRemark}
          rows={rowData}
        />
      ) : null}
    </Fragment>
  );
};
