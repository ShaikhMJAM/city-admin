import Dialog from "@mui/material/Dialog";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic/";
import { Transition } from "pages_audit/common";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MsMonitoringGridMetaData } from "../../msMonitoringMaster/gridMetadata";
import { ActionTypes } from "components/dataTable";
import { useLocation } from "react-router-dom";
import { ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import * as API from "../../msMonitoringMaster/api";
import { Alert } from "components/common/alert";
import { MicroServiceList } from "../../msMonitoringMaster/microServiceList";
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
    multiple: true,
    rowDoubleClick: false,
  },
];

export const MsPropertiesUpdateServices = ({ ClosedEventCall }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const reqParamsRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { state: rows }: any = useLocation();

  const { getEntries } = useContext(ClearCacheContext);

  const { data, isLoading, isFetching, isError, error } = useQuery<any, any>(
    ["getMsMonitoringGridData"],
    () => API.getMsMonitoringGridData()
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
      queryClient.removeQueries(["getMsMonitoringGridData"]);
    };
  }, [getEntries]);

  const handleActionEvent = useCallback((data) => {
    if (data?.name === "close") {
      ClosedEventCall();
    }
    if (data?.name === "update") {
      const microServiceList: string[] = data.rows.map((row) => row.id);
      reqParamsRef.current = {
        PROPERTY_NAME: rows[0]?.data?.LABEL ?? "",
        UPDATESERLIST: microServiceList ?? [],
      };
      setIsOpenUpdate(true);
    }
  }, []);

  const onPopupYes = (data) => {
    mutation.mutate(data);
  };

  const onActionCancel = () => {
    setIsOpenUpdate(false);
  };

  // change title in metadata
  MsMonitoringGridMetaData.gridConfig.gridLabel = "Micro Service List";

  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
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
        <div style={{ padding: "9px" }}>
          <GridWrapper
            key={`msPropUpdateServicesGrid`}
            finalMetaData={MsMonitoringGridMetaData as GridMetaDataType}
            loading={isLoading || isFetching}
            data={data ?? []}
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
      {showModal ? (
        <MicroServiceList
          open={showModal}
          setShowModal={setShowModal}
          response={mutation}
        />
      ) : null}
    </Fragment>
  );
};
