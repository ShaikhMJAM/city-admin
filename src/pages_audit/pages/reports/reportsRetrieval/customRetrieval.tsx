import { FC, useRef } from "react";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";

const CustomRetrieval: FC<{
  closeDialog?: any;
  metaData: any;
  defaultData: any;
  retrievalData?: any;
}> = ({ closeDialog, metaData, defaultData, retrievalData }) => {
  const isErrorFuncRef = useRef<any>(null);
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
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    retrievalData(data);
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
          key={"dynamicRetrieval"}
          metaData={metaData as MetaDataType}
          initialValues={defaultData as InitialValuesType}
          onSubmitHandler={onSubmitHandler}
          //@ts-ignore
          // displayMode={formMode}
          formStyle={{
            background: "white",
            // height: "calc(42vh - 100px)",
            // overflowY: "auto",
            // overflowX: "hidden",
          }}
          containerstyle={{ padding: "10px" }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <>
              <Button
                onClick={(event) => {
                  handleSubmit(event, "Save");
                }}
                disabled={isSubmitting}
                color={"primary"}
                ref={inputButtonRef}
              >
                Retrieve
              </Button>
              <Button
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

export const CustomRetrievalWrapper = ({
  open,
  handleDialogClose,
  metaData,
  defaultData,
  retrievalData,
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
        <CustomRetrieval
          metaData={metaData}
          closeDialog={handleDialogClose}
          defaultData={defaultData}
          retrievalData={retrievalData}
        />
      </Dialog>
    </>
  );
};
