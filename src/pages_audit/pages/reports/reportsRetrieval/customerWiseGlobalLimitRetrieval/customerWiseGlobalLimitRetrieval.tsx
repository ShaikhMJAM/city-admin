import { FC, useRef } from "react";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import { CustomerGlobalLimitRetrievalMetadata } from "./metaData";
import { format } from "date-fns";
import { useStyles } from "pages_audit/auth/style";
import { utilFunction } from "components/utils";

const CustomerGlobalLimitRetrieval: FC<{
  closeDialog?: any;
  metaData: any;
  defaultData: any;
  retrievalParaValues?: any;
}> = ({ closeDialog, metaData, defaultData, retrievalParaValues }) => {
  const actionClasses = useStyles();
  const inputButtonRef = useRef<any>(null);
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    // data["FILTER_VALUE"] = Boolean(data["MOBILE_NO"])
    //   ? data["MOBILE_NO"]
    //   : data["EMAIL_ID"]; // Assign new key
    // delete data["MOBILE_NO"];
    // delete data["EMAIL_ID"];
    const colomnKeyLabel = utilFunction.getMetadataLabelFromColumnName(
      CustomerGlobalLimitRetrievalMetadata,
      Object.keys(data)
    );
    const retrievalValues = Object.entries(data)
      .sort()
      .map((key, val) => {
        const [fieldName, value] = key;

        let displayValue = value;
        displayValue = displayData[fieldName].toString();
        if (fieldName === "ASON_DT" || fieldName === "A_TO_DT") {
          displayValue = format(new Date(value ?? new Date()), "dd/MM/yyyy");
        }
        return {
          id: key?.[0],
          value: {
            condition: "equal",
            value:
              key?.[0] === "ASON_DT" || key?.[0] === "A_TO_DT"
                ? format(new Date(key?.[1] ?? new Date()), "dd/MM/yyyy")
                : key?.[1],
            // value: format(
            //   new Date(selectedFromDate.toISOString() ?? new Date()),
            //   "dd/MM/yyyy"
            // ),
            columnName: key?.[0],
            label: colomnKeyLabel[key?.[0]] ?? key,
            displayValue: Boolean(displayValue) ? displayValue : key?.[1],
          },
        };
      });
    retrievalParaValues(retrievalValues, data);
  };

  return (
    <>
      <div
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            inputButtonRef?.current?.click?.();
          }
        }}
      >
        <FormWrapper
          key={"CustomerGlobalLimitRetrieval"}
          metaData={CustomerGlobalLimitRetrievalMetadata as MetaDataType}
          initialValues={defaultData as InitialValuesType}
          onSubmitHandler={onSubmitHandler}
          //@ts-ignore
          formStyle={{
            background: "white",
            // height: "calc(42vh - 100px)",
            // overflowY: "auto",
            // overflowX: "hidden",
          }}
          controlsAtBottom={true}
          containerstyle={{ padding: "10px" }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <>
              <Button
                className={actionClasses.button}
                onClick={(event) => {
                  handleSubmit(event, "Save");
                }}
                disabled={isSubmitting}
                color={"primary"}
                ref={inputButtonRef}
              >
                Ok
              </Button>
              <Button
                className={actionClasses.button}
                onClick={closeDialog}
                color={"primary"}
                disabled={isSubmitting}
              >
                Close
              </Button>
            </>
          )}
        </FormWrapper>
      </div>
    </>
  );
};

export const CustomerGlobalLimitRetrievalWrapper = ({
  open,
  handleDialogClose,
  metaData,
  defaultData,
  retrievalParaValues,
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
            width: "38%",
            // minHeight: "36vh",
            // height: "36vh",
          },
        }}
        maxWidth="sm"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <CustomerGlobalLimitRetrieval
          metaData={metaData}
          closeDialog={handleDialogClose}
          defaultData={defaultData}
          retrievalParaValues={retrievalParaValues}
        />
      </Dialog>
    </>
  );
};
