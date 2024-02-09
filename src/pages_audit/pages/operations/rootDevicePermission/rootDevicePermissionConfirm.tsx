import {
  useRef,
  useCallback,
  useEffect,
  useContext,
  Fragment,
  useState,
} from "react";
import { RootDevrepoGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheContext, queryClient } from "cache";
import { useQuery, useMutation } from "react-query";
import * as API from "./api";
import { RemarksAPIWrapper } from "components/custom/Remarks";
import { useSnackbar } from "notistack";

const actions: ActionTypes[] = [
  {
    actionName: "confirm",
    actionLabel: "Confirm",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "reject",
    actionLabel: "Reject",
    multiple: true,
    rowDoubleClick: false,
  },
];

const RootDevicePermissionConfirmGrid = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState({});
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const navigate = useNavigate();
  RootDevrepoGridMetaData.gridConfig.gridLabel =
    "Rooted Device Allow/Disallow Confirmation";
  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      let confirmed = data?.rows[0]?.data?.CONFIRMED;
      if (confirmed === "Y") {
        enqueueSnackbar("Request has been already accepted.", {
          variant: "warning",
        });
      } else if (confirmed === "R") {
        enqueueSnackbar("Request has been already rejected.", {
          variant: "warning",
        });
      } else {
        if (data.name === "confirm") {
          setIsOpenAccept(true);
        } else if (data.name === "reject") {
          setIsOpenReject(true);
        } else {
          navigate(data?.name, {
            state: data?.rows,
          });
        }
      }
    },
    [navigate]
  );
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getRootDevGridData", "N", "A"], () =>
    API.getRootDevGridData({ confirmed: "N", flag: "A" })
  );
  const onActionCancel = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  };
  const result = useMutation(API.updRootDeviceConfirm, {
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
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getRootDevGridData", "N", "A"]);
    };
  }, [getEntries]);

  const onClickAccept = (val, rows) => {
    result.mutate({
      confirmed: "Y",
      trancd: rows[0]?.data?.TRAN_CD ?? "",
      remarks: val,
    });
  };
  const onClickReject = (val, rows) => {
    result.mutate({
      confirmed: "R",
      trancd: rows[0]?.data?.TRAN_CD ?? "",
      remarks: val,
    });
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
        key={`RootDevConfirmGrid`}
        finalMetaData={RootDevrepoGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        ref={myGridRef}
      />
      <RemarksAPIWrapper
        TitleText={"Confirmation Remarks"}
        onActionNo={() => onActionCancel()}
        onActionYes={onClickAccept}
        isLoading={result.isLoading}
        isEntertoSubmit={true}
        AcceptbuttonLabelText="Ok"
        CanceltbuttonLabelText="Cancel"
        open={isOpenAccept}
        rows={rowData}
      />
      <RemarksAPIWrapper
        TitleText={"Rejection Remarks"}
        onActionNo={() => onActionCancel()}
        onActionYes={onClickReject}
        isLoading={result.isLoading}
        isEntertoSubmit={true}
        AcceptbuttonLabelText="Ok"
        CanceltbuttonLabelText="Cancel"
        open={isOpenReject}
        rows={rowData}
      />
    </Fragment>
  );
};

export default RootDevicePermissionConfirmGrid;
