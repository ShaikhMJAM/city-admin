import { FC, useEffect, useRef } from "react";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import { utilityRetrievalMetadata } from "./metaData";
import { format } from "date-fns";
import { useStyles } from "pages_audit/auth/style";
import { queryClient } from "cache";
import { utilFunction } from "components/utils";

const UtilityRetrieval: FC<{
  closeDialog?: any;
  metaData: any;
  defaultData: any;
  retrievalParaValues?: any;
  retrievalType: String;
}> = ({
  closeDialog,
  metaData,
  defaultData,
  retrievalParaValues,
  retrievalType,
}) => {
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
    const colomnKeyLabel = utilFunction.getMetadataLabelFromColumnName(
      utilityRetrievalMetadata,
      Object.keys(data)
    );
    const retrievalValues = Object.entries(data)
      .sort()
      .map((key, val) => {
        const [fieldName, value] = key;

        let displayValue = value;
        displayValue = displayData[fieldName].toString();

        if (fieldName === "A_FROM_DT" || fieldName === "A_TO_DT") {
          displayValue = format(new Date(value ?? new Date()), "dd/MM/yyyy");
        }
        return {
          id: key?.[0],
          value: {
            condition: "equal",
            value:
              key?.[0] === "A_FROM_DT" || key?.[0] === "A_TO_DT"
                ? format(new Date(key?.[1] ?? new Date()), "dd/MM/yyyy")
                : key?.[1],
            columnName: key?.[0],
            label: colomnKeyLabel[key?.[0]] ?? key,
            displayValue: Boolean(displayValue) ? displayValue : key?.[1],
          },
        };
      });
    retrievalParaValues(retrievalValues, data);
  };
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["GetMiscValue"]);
    };
  }, []);

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
          key={"utilityRetrievalMetadata" + retrievalType}
          metaData={utilityRetrievalMetadata as MetaDataType}
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

export const UtilityRetrievalWrapper = ({
  open,
  handleDialogClose,
  metaData,
  defaultData,
  retrievalParaValues,
  retrievalType,
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
        <UtilityRetrieval
          metaData={metaData}
          closeDialog={handleDialogClose}
          defaultData={defaultData}
          retrievalParaValues={retrievalParaValues}
          retrievalType={retrievalType}
        />
      </Dialog>
    </>
  );
};
