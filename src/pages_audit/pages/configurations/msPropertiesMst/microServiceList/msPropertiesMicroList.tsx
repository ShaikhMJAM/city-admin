import Dialog from "@mui/material/Dialog";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic/";
import { Transition } from "pages_audit/common";
import { Fragment, useCallback } from "react";
import { ActionTypes } from "components/dataTable";
import { MicroServiceListGridMetaData } from "../../msMonitoringMaster/microServiceList/metadata";

const actions: ActionTypes[] = [
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const MsPropertiesMicroList = ({ open, setShowModal, response }) => {
  const handleActionEvent = useCallback((data) => {
    if (data?.name === "close") setShowModal(false);
  }, []);

  return (
    <Fragment>
      <Dialog
        open={open}
        // @ts-ignore
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
        <div style={{ padding: "9px" }}>
          <GridWrapper
            key={`MsPropMicroListGrid`}
            finalMetaData={MicroServiceListGridMetaData as GridMetaDataType}
            data={response.data ?? []}
            setData={() => null}
            actions={actions}
            setAction={handleActionEvent}
          />
        </div>
      </Dialog>
    </Fragment>
  );
};
