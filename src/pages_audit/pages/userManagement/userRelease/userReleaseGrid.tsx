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
import { useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import { UserReleaseGridMetaData } from "./gridMetadata";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { UserBlockGridMetaData } from "./gridMetadataBlckUser";
import { UserFailAttempt } from "./userFailAttempt/userFailAttemptGrid";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
const actions: ActionTypes[] = [
  {
    actionName: "viewall",
    actionLabel: "View All",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "releaseuser",
    actionLabel: "Release Blocked User",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "release",
    actionLabel: "Release User(s)",
    multiple: true,
    rowDoubleClick: true,
    alwaysAvailable: false,
  },
];
interface updateAUTHDetailDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
  usernames?: any;
  username?: any;
  password?: any;
  compCD?: any;
  branchCD?: any;
  userflag?: any;
  remarks?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({
    data,
    username,
    usernames,
    password,
    userflag,
    remarks,
    compCD,
    branchCD,
  }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData({
      data,
      username,
      usernames,
      password,
      userflag,
      remarks,
      compCD,
      branchCD,
    });
  };

export const UserRelease = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const usrfailRef = useRef<any>(null);
  const [isOpenSave, SetOpenSave] = useState(false);
  const { getEntries } = useContext(ClearCacheContext);
  const { authState } = useContext(AuthContext);
  const [actionMenu, setActionMenu] = useState(actions);
  const [isOpendtl, setOpendtl] = useState(false);

  const [isUserflgl1, setUserflgl1] = useState("L");
  const [isUserflgk2, setUserflgk2] = useState("0");
  const [isUserflgo3, setUserflgo3] = useState("0");
  const [isGridmetadata, setGridmetadata] = useState(UserReleaseGridMetaData);
  const [isCallfrom, setCallfrom] = useState("GETUSERSESSDATA");
  const { enqueueSnackbar } = useSnackbar();
  const [isMsg, setMsg] = useState("");
  const [currentActionData, setCurrentActionData] = useState<any>([]);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getUserReleaseGridData", isUserflgl1, isUserflgk2, isUserflgo3], () =>
    API.getUserReleaseGridData({
      compCode: authState.companyID,
      branchCode: authState.companyID,
      userName: authState.user?.id,
      userFlagl1: isUserflgl1,
      userFlagk2: isUserflgk2,
      userFlago3: isUserflgo3,
      callFrom: isCallfrom,
    })
  );

  const result = useMutation(updateAUTHDetailDataWrapperFn(API.updUsrGrpData), {
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      enqueueSnackbar(errorMsg, { variant: "error" });
      onActionCancel();
    },
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar("User is successfully released", {
        variant: "success",
      });
      onActionCancel();
      refetch();
    },
  });
  const mutationRef = useMutation(
    updateAUTHDetailDataWrapperFn(API.updateSubUserdata),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        enqueueSnackbar(errorMsg, { variant: "error" });
        onActionCancel();
      },
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("User is successfully released", {
          variant: "success",
        });
        onActionCancel();
        refetch();
      },
    }
  );

  const onActionCancel = () => {
    SetOpenSave(false);
  };
  const onPopupYes = (rows) => {
    if (rows.name === "release") {
      mutationRef.mutate({
        data: undefined,
        usernames: rows?.rows?.[0]?.data.USERNAME ?? "",
        password: "RELEASED",
        userflag: "K",
        remarks: "User Released.",
        compCD: rows?.rows?.[0]?.data.COMP_CD ?? "",
        branchCD: rows?.rows?.[0]?.data.BRANCH_CD ?? "",
      });
    } else if (rows.name === "releaseusers") {
      result.mutate({
        username: rows?.rows?.[0]?.data.USER_NAME ?? "",
        data: undefined,
      });
    }
  };

  const navigate = useNavigate();

  const setCurrentAction = useCallback(
    (data) => {
      setCurrentActionData(data);
      if (data?.name === "viewall") {
        setActionMenu((values: any) => {
          return values.map((item) => {
            //change the
            if (item.actionName === "viewall") {
              return {
                ...item,
                actionName: "loggedin",
                actionLabel: "Logged in",
              };
            } else if (item.actionName === "release") {
              return {
                ...item,
                actionLabel: "Release User(s)",
                rowDoubleClick: false,
              };
            } else {
              return item;
            }
          });
          //return { ...value };
        });
        setGridmetadata(UserReleaseGridMetaData);
        setCallfrom("GETUSERSESSDATA");
        isGridmetadata.gridConfig.allowRowSelection = false;

        setUserflgl1("K");
        setUserflgk2("O");
        setUserflgo3("L");
      } else if (data.name === "loggedin") {
        setActionMenu((values: any) => {
          return values.map((item) => {
            if (item.actionName === "loggedin") {
              return {
                ...item,
                actionName: "viewall",
                actionLabel: "View All",
              };
            } else if (item.actionName === "releaseusers") {
              return {
                ...item,
                actionName: "release",
                actionLabel: "Release User(s)",
                rowDoubleClick: true,
              };
            } else {
              return item;
            }
          });
        });
        setGridmetadata(UserReleaseGridMetaData);
        setCallfrom("GETUSERSESSDATA");
        isGridmetadata.gridConfig.allowRowSelection = true;
        setUserflgl1("L");
        setUserflgk2("0");
        setUserflgo3("0");
      } else if (data.name === "releaseuser") {
        // setActionMenu((values: any) => {
        //   return values.map((item) => {
        //     if (item.actionName === "release") {
        //       return {
        //         ...item,
        //         actionName: "releaseusers",
        //         actionLabel: "Release Blocked User(s)",
        //         rowDoubleClick: true,
        //       };
        //     } else {
        //       return item;
        //     }
        //   });
        // });
        setActionMenu((values: any) => {
          return values.map((item) => {
            if (item.actionName === "viewall") {
              return {
                ...item,
                actionName: "loggedin",
                actionLabel: "Logged in",
              };
            } else if (item.actionName === "release") {
              return {
                ...item,
                actionName: "releaseusers",
                actionLabel: "Release Blocked User(s)",
                rowDoubleClick: true,
              };
            } else {
              return item;
            }
          });
          //return { ...value };
        });
        setGridmetadata(UserBlockGridMetaData);
        isGridmetadata.gridConfig.allowRowSelection = true;
        setCallfrom("GETUSERBLOKDATA");
        setUserflgl1("0");
        setUserflgk2("0");
        setUserflgo3("0");
      } else if (data.name === "release" || data.name === "releaseusers") {
        setActionMenu((values: any) => {
          return values.map((item) => {
            if (item.actionLabel === "Release Blocked User(s)") {
              setMsg("Would you like to release the selected Blocked User(s)?");
              return {
                ...item,
                actionName: "releaseusers",
                actionLabel: "Release Blocked User(s)",
                rowDoubleClick: true,
              };
            } else if (item.actionLabel === "Release User(s)") {
              setMsg(
                "Would you like to release the selected Logged in User(s)?"
              );
              return {
                ...item,
                actionName: "release",
                actionLabel: "Release User(s)",
                rowDoubleClick: true,
              };
            } else {
              return item;
            }
          });
        });
        // mutationRef.mutate({ ...data });

        SetOpenSave(true);
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
      queryClient.removeQueries(["getUserReleaseGridData"]);
    };
  }, [getEntries]);

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
        key={`UserReleaseGrid` + isUserflgl1 + isUserflgk2 + isUserflgo3}
        finalMetaData={isGridmetadata as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actionMenu}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        ref={myGridRef}
        onClickActionEvent={(index, id, data) => {
          setOpendtl(true);
          usrfailRef.current = data?.USER_NAME;
        }}
      />

      {isOpendtl && (
        <UserFailAttempt
          isOpen={isOpendtl}
          onCloseDialog={() => {
            setOpendtl(false);
          }}
          userName={usrfailRef.current}
        />
      )}
      {isOpenSave ? (
        <>
          <PopupMessageAPIWrapper
            MessageTitle="Confirmation"
            Message={isMsg}
            onActionYes={(rowVal) => onPopupYes(rowVal)}
            onActionNo={() => onActionCancel()}
            rows={currentActionData}
            open={isOpenSave}
            loading={mutationRef.isLoading || result.isLoading}
          />
        </>
      ) : null}
    </Fragment>
  );
};

export const UserReleaseGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <UserRelease />
    </ClearCacheProvider>
  );
};
