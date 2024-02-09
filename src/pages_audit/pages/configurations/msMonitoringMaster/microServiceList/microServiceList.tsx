import Dialog from "@mui/material/Dialog";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { Transition } from "pages_audit/common";
import { Fragment, useCallback } from "react";
import { MicroServiceListGridMetaData } from "./metadata";
import { ActionTypes } from "components/dataTable";

const actions: ActionTypes[] = [
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    alwaysAvailable: true,
    rowDoubleClick: false,
  },
];

export const MicroServiceList = ({ open, setShowModal, response }) => {
  const handleActionEvent = useCallback((data) => {
    if (data?.name === "close") setShowModal(false);
  }, []);

  return (
    <Fragment>
      <Dialog
        open={open}
        //@ts-ignore
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
      >
        <div style={{ padding: "9px" }}>
          <GridWrapper
            key={`MicroServiceListUpdateServiceGrid`}
            finalMetaData={MicroServiceListGridMetaData as GridMetaDataType}
            loading={response.isLoading || response.isFetching}
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
