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
    actionName: "disallow",
    actionLabel: "Disallow",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (data, authDetails) => {
      if (Array.isArray(data) && data.length > 0) {
        if (data[0]?.data?.ALLOW_STATUS != "Y") {
          return true;
        }
      }
      return false;
    },
  },
  {
    actionName: "allow",
    actionLabel: "Allow",
    multiple: false,
    rowDoubleClick: false,
    shouldExclude: (data, authDetails) => {
      if (Array.isArray(data) && data.length > 0) {
        if (data[0]?.data?.ALLOW_STATUS === "Y") {
          return true;
        }
      }
      return false;
    },
  },
];

export const RootDevicePermissionGrid = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState({});
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const navigate = useNavigate();
  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      if (data.name === "allow") {
        setIsOpenAccept(true);
      } else if (data.name === "disallow") {
        setIsOpenReject(true);
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
        // }
      }
    },
    [navigate]
  );
  RootDevrepoGridMetaData.gridConfig.gridLabel =
    "Rooted Device Repository Allow/Disallow";

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getRootDevGridData", "ALL", "A"], () =>
    API.getRootDevGridData({ confirmed: "ALL", flag: "A" })
  );
  const onActionCancel = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  };
  const result = useMutation(API.updRootDevicePermission, {
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
      queryClient.removeQueries(["getRootDevGridData", "ALL", "A"]);
    };
  }, [getEntries]);

  const allowRootDevice = (val, rows) => {
    result.mutate({
      allow_status: "Y",
      trancd: rows[0]?.data?.TRAN_CD ?? "",
      remarks: val,
    });
  };
  const disallowRootDevice = (val, rows) => {
    result.mutate({
      allow_status: "N",
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
        key={`RootDevrepoGrid`}
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
        TitleText={"Allow Remarks"}
        onActionNo={() => onActionCancel()}
        onActionYes={allowRootDevice}
        isLoading={result.isLoading}
        isEntertoSubmit={true}
        AcceptbuttonLabelText="Ok"
        CanceltbuttonLabelText="Cancel"
        open={isOpenAccept}
        rows={rowData}
      />
      <RemarksAPIWrapper
        TitleText={"Disallow Remarks"}
        onActionNo={() => onActionCancel()}
        onActionYes={disallowRootDevice}
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
