import Dialog from "@mui/material/Dialog";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common";
import { Fragment, useMemo } from "react";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic/";
import { MsMonitoringDetailsGridMetaData } from "./metadata";
import { ActionTypes } from "components/dataTable";
import { useLocation } from "react-router-dom";

const action: ActionTypes[] = [
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const MsMonitoringDetails = ({ ClosedEventCall }) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();

  const gridData = useMemo(() => {
    return rows[0]?.data?.details.map((data) => {
      return {
        ...data,
        status: data?.status === "Y" ? "UP" : "DOWN",
      };
    });
  }, []);

  const handleActionEvent = (data) => {
    if (data?.name === "close") ClosedEventCall();
  };

  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <div style={{ padding: "9px" }}>
          <GridWrapper
            key={`MsInstanceInformationsGrid`}
            finalMetaData={MsMonitoringDetailsGridMetaData as GridMetaDataType}
            data={gridData ?? []}
            setData={() => null}
            actions={action}
            setAction={handleActionEvent}
          />
        </div>
      </Dialog>
    </Fragment>
  );
};
