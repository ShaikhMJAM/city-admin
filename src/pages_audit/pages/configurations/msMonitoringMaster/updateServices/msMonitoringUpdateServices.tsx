import Dialog from "@mui/material/Dialog";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic/";
import { Transition } from "pages_audit/common";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MsUpdateServicesGridMetaData } from "./metadata";
import { ActionTypes } from "components/dataTable";
import { useMutation, useQuery } from "react-query";
import * as API from "../api";
import { ClearCacheContext, queryClient } from "cache";
import { useLocation } from "react-router-dom";
import { MicroServiceList } from "../microServiceList";
import { Alert } from "components/common/alert";
import { GeneralAPI } from "registry/fns/functions";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";

const actions: ActionTypes[] = [
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "update",
    actionLabel: "Update",
    multiple: false,
    alwaysAvailable: false,
  },
];

export const MsMonitoringUpdateServices = ({ ClosedEventCall }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const { getEntries } = useContext(ClearCacheContext);
  const { state: rows }: any = useLocation();
  const reqParamsRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isFetching, isError, error } = useQuery<any, any>(
    ["GetMiscValue"],
    () => GeneralAPI.GetMiscValue("MS_PROPERTIES")
  );

  const mutation = useMutation(API.getMsRefreshProperties, {
    onError: (error) => {
      setShowModal(false);
    },
    onSuccess: (data) => {
      if (typeof data === "string") {
        enqueueSnackbar(data, { variant: "error" });
        onActionCancel();
        return;
      }
      onActionCancel();
      setShowModal(true);
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["GetMiscValue"]);
    };
  }, [getEntries]);

  const microServiceList: string[] = useMemo(() => {
    return rows.map((row) => row.id);
  }, []);

  const handleActionEvent = useCallback((data) => {
    switch (data?.name) {
      case "close":
        ClosedEventCall();
        break;
      case "update":
        reqParamsRef.current = {
          PROPERTY_NAME: data?.rows[0]?.data?.value ?? "",
          UPDATESERLIST: microServiceList ?? [],
        };
        setIsOpenUpdate(true);
        break;
      default:
        return;
    }
  }, []);

  const onPopupYes = (data) => {
    mutation.mutate(data);
  };

  const onActionCancel = () => {
    setIsOpenUpdate(false);
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
      {mutation.isError && (
        <Alert
          severity="error"
          errorMsg={"Something went to wrong.."}
          errorDetail={""}
          color="error"
        />
      )}
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
        <div style={{ padding: "9px" }}>
          <GridWrapper
            key={`MsUpdateServicesGrid`}
            finalMetaData={MsUpdateServicesGridMetaData as GridMetaDataType}
            data={data ?? []}
            loading={isLoading || isFetching}
            setData={() => null}
            actions={actions}
            setAction={handleActionEvent}
          />
        </div>
      </Dialog>
      {isOpenUpdate && (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Are you sure to update services?"
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={reqParamsRef.current}
          open={isOpenUpdate}
          loading={mutation.isLoading}
        />
      )}
      {showModal && (
        <MicroServiceList
          open={showModal}
          setShowModal={setShowModal}
          response={mutation}
        />
      )}
    </Fragment>
  );
};
