import { FC, useRef } from "react";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import { MerchantTranRetrievalMetadata } from "./metaData";
import { format } from "date-fns";
import { useStyles } from "pages_audit/auth/style";
import { utilFunction } from "components/utils";
// import { GetMiscValue } from "../../api";
// import { queryClient } from "cache";

const MerchantTranRetrieval: FC<{
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
  // const isErrorFuncRef = useRef<any>(null);
  const actionClasses = useStyles();
  const inputButtonRef = useRef<any>(null);
  // const classes = useDialogStyles();
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
      MerchantTranRetrievalMetadata,
      Object.keys(data)
    );

    const retrievalValues = Object.entries(data)
      .sort()
      .map((key, val) => {
        let valuedata =
          key?.[0] === "A_FROM_DT" || key?.[0] === "A_TO_DT"
            ? format(new Date(key?.[1] ?? new Date()), "dd/MM/yyyy")
            : key?.[1];
        return {
          id: key?.[0],
          value: {
            condition: "equal",
            value: valuedata,
            columnName: key?.[0],
            label: colomnKeyLabel[key?.[0]] ?? key,
            displayvalue:
              key?.[0] === "A_MER_TRAN_CD"
                ? displayData["A_MER_TRAN_CD"] ?? valuedata
                : valuedata,
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
          key={"MerchantTranRetrievalMetadata" + retrievalType}
          metaData={MerchantTranRetrievalMetadata as MetaDataType}
          initialValues={defaultData as InitialValuesType}
          onSubmitHandler={onSubmitHandler}
          //@ts-ignore

          formStyle={{
            background: "white",
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

export const MerchantTranRetrievalWrapper = ({
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
        <MerchantTranRetrieval
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
