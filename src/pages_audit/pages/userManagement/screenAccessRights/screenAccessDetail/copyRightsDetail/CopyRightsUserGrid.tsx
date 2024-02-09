import { ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import { useEffect, useContext, useCallback, useState } from "react";
import * as API from "../../api";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import Dialog from "@mui/material/Dialog";
import { Transition } from "pages_audit/common/transition";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";
import { CarryForwardScreenRightsGridMetaData } from "./gridMetadata";
import { ActionTypes } from "components/dataTable";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const actions: ActionTypes[] = [
  {
    actionName: "groups",
    actionLabel: "Groups",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "ok",
    actionLabel: "Ok",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const CarryForwardScreenRights = ({
  userName,
  closeDialog,
  isDataChangedRef,
}) => {
  const { getEntries } = useContext(ClearCacheContext);
  const [actionMenu, setActionMenu] = useState(actions);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [retData, setRetData] = useState({
    SEARCH: "U",
  });

  const setCurrentAction = useCallback(
    (data) => {
      // setRowData(data?.rows);
      if (data?.name === "close") {
        closeDialog();
      } else if (data?.name === "groups") {
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
      } else if (data?.name === "ok") {
        if (
          userName.toLowerCase() ===
          (data?.rows?.[0]?.data?.USER_NAME).toLowerCase()
        ) {
          enqueueSnackbar("You can not Carry Forward Rights for same user.", {
            variant: "warning",
          });
        } else {
          mutation.mutate({
            USER_NAME: userName ?? "",
            COPY_USER: data?.rows?.[0]?.data?.USER_NAME ?? "",
          });
        }
      }
      // navigate(data?.name, {
      //   state: data?.rows,
      // });
    },
    [navigate]
  );
  const { data, isLoading, isFetching, refetch } = useQuery<any, any>(
    ["getCustomerActivationData", { search: retData?.SEARCH }],
    () => API.getUserOrGroupList({ search: retData?.SEARCH })
  );

  const mutation = useMutation(API.carryForwardScreenRights, {
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
    },
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar(data, {
        variant: "success",
      });
      closeDialog();
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
      queryClient.removeQueries(["getCustomerActivationData", { search: "U" }]);
    };
  }, [getEntries]);

  CarryForwardScreenRightsGridMetaData.gridConfig.gridLabel =
    "Assign User/Group Rights To " + userName;
  return (
    <>
      <div style={{ padding: "10px" }}>
        <GridWrapper
          key={`CarryForwardRights` + retData?.SEARCH}
          finalMetaData={CarryForwardScreenRightsGridMetaData}
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          actions={actionMenu}
          setAction={setCurrentAction}
          refetchData={() => refetch()}
        />
      </div>
    </>
  );
};

export const CarryForwardScreenRightsGridWrapper = ({
  open,
  userName,
  closeDialog,
  isDataChangedRef,
}) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={open}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        maxWidth={"md"}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <CarryForwardScreenRights
          userName={userName}
          closeDialog={closeDialog}
          isDataChangedRef={isDataChangedRef}
        />
      </Dialog>
    </>
  );
};
