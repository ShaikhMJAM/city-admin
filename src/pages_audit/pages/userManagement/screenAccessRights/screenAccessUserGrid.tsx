import {
  Fragment,
  useRef,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { useMutation, useQuery } from "react-query";
import { ScreenAccessRightsGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheProvider, queryClient } from "cache";
import * as API from "./api";
import { useSnackbar } from "notistack";
import { ActionTypes } from "components/dataTable";
import { ScreenAccessDetailWrapper } from "./screenAccessDetail";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";

const actions: ActionTypes[] = [
  {
    actionName: "groups",
    actionLabel: "Groups",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "access-details",
    actionLabel: "Access Detail",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const ScreenAccessRightsWrapper = () => {
  return (
    <ClearCacheProvider>
      <ScreenAccessRights />
    </ClearCacheProvider>
  );
};
const ScreenAccessRights = () => {
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const [retData, setRetData] = useState({
    SEARCH: "U",
  });
  const [actionMenu, setActionMenu] = useState(actions);
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState({});
  const [isGroupRightsAvailable, setGroupRightsAvailable] = useState(false);
  const authController = useContext(AuthContext);
  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
      if (data?.name === "groups") {
        setActionMenu((values: any) => {
          return values.map((item) => {
            if (item.actionName === "groups") {
              return {
                ...item,
                actionName: "users",
                actionLabel: "Users",
              };
            } else {
              return item;
            }
          });
        });
        setRetData({ SEARCH: "G" });
      } else if (data?.name === "users") {
        setActionMenu((values: any) => {
          return values.map((item) => {
            if (item.actionName === "users") {
              return {
                ...item,
                actionName: "groups",
                actionLabel: "Groups",
              };
            } else {
              return item;
            }
          });
        });
        setRetData({ SEARCH: "U" });
      } else if (data?.name === "access-details") {
        let userName = data?.rows[0]?.data?.USER_NAME;
        let userRightsCount: number = parseInt(
          data?.rows[0]?.data?.USER_RIGHTS_COUNT
        );
        let groupRightsCount: number = parseInt(
          data?.rows[0]?.data?.GROUP_RIGHTS_COUNT
        );
        if (
          (userName || "").toLowerCase() ===
          (authController?.authState?.user?.id || "").toLowerCase()
        ) {
          enqueueSnackbar("You can not modify your own rights.", {
            variant: "warning",
          });
        } else {
          if (
            retData?.SEARCH === "U" &&
            userRightsCount === 0 &&
            groupRightsCount > 0
          ) {
            setGroupRightsAvailable(true);
          } else {
            navigate(data?.name, {
              state: data?.rows,
            });
          }
        }
      }
    },
    [navigate]
  );

  const getData: any = useQuery(
    [
      "getDBRDetailFormData",
      {
        search: retData?.SEARCH,
      },
    ],
    () =>
      API.getUserOrGroupList({
        search: retData?.SEARCH,
      })
  );

  const defaultRights = useMutation(API.addGroupsDefaultRights, {
    onSuccess: (response: any) => {
      setGroupRightsAvailable(false);
      navigate("/access-details", {
        state: rowData,
      });
    },
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      setGroupRightsAvailable(false);
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
    },
  });

  const onAcceptPopupYes = (rows) => {
    defaultRights.mutate({
      USER_NAME: rows?.[0]?.data?.USER_NAME ?? "",
      GROUP_NAME: rows?.[0]?.data?.GROUP_NAME ?? "",
    });
  };
  const onActionCancel = () => {
    setGroupRightsAvailable(false);
    navigate("/access-details", {
      state: rowData,
    });
  };

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    // if (isDataChangedRef.current === true) {
    //   myGridRef.current?.refetch?.();
    //   isDataChangedRef.current = false;
    // }
  }, [navigate]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDBRDetailFormData",
        {
          search: retData?.SEARCH,
        },
      ]);
    };
  }, []);

  return (
    <Fragment>
      {getData.isError && (
        <Alert
          severity={getData.error?.severity ?? "error"}
          errorMsg={getData.error?.error_msg ?? "Something went to wrong.."}
          errorDetail={getData.error?.error_detail}
          color="error"
        />
      )}
      {defaultRights.isError && (
        <Alert
          severity={defaultRights.error?.severity ?? "error"}
          errorMsg={
            defaultRights.error?.error_msg ?? "Something went to wrong.."
          }
          errorDetail={defaultRights.error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={`ScreenAccessRightsGrid` + retData?.SEARCH}
        finalMetaData={ScreenAccessRightsGridMetaData as GridMetaDataType}
        data={getData.data ?? []}
        setData={() => null}
        loading={getData.isLoading || getData.isFetching}
        actions={actionMenu}
        setAction={setCurrentAction}
        refetchData={() => getData.refetch()}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="access-details"
          element={
            <ScreenAccessDetailWrapper handleDialogClose={ClosedEventCall} />
          }
        />
      </Routes>
      {isGroupRightsAvailable ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Are you want to populate it's Group Right ?"
          onActionYes={(rowVal) => onAcceptPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rowData}
          open={isGroupRightsAvailable}
          loading={defaultRights.isLoading}
        />
      ) : null}
    </Fragment>
  );
};
