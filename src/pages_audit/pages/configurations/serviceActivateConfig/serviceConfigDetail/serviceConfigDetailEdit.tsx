import { useRef, useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { Alert } from "components/common/alert";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { CreateDetailsRequestData, utilFunction } from "components/utils";
export const useDialogStyles = makeStyles({
  topScrollPaper: {
    alignItems: "center",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
});

const initialData = {
  SUB_TRN_TYPE: "",
  FROM_DT: new Date(),
  TO_DT: new Date(),
  ACTIVE: "Y",
  DISPLAY_MSG: "",
  CONFIG_TYPE: "R",
  EXPIRE: "N",
  TRN_TYPE: "",
  DISPLAY_MSG_BN: "",
  _isNewRow: true,
};
export const ServiceConfigGridUpdate = (
  {
    metadata,
    ClosedEventCall,
    data: initConfigData,
    children,
    isLoading = false,
    isError = false,
    ErrorMessage = "",
    actions = [],
    mode = "view",
    isEditableForm = false,
    refID = {},
    trnType = "",
    onSubmit = (req) => {},
  },
  ref
) => {
  const [girdData, setGridData] = useState<any>(initConfigData);
  const classes = useDialogStyles();
  const myGridRef = useRef<any>(null);
  const [serverError, setServerError] = useState("");
  const handelCloseEvent = () => {
    ClosedEventCall();
  };
  const metaData = useMemo(() => {
    let myColumns = metadata.columns;
    if (mode === "view") {
      myColumns = metadata.columns.filter((one) => one.accessor !== "_hidden");
    }
    return { ...metadata, columns: myColumns };
  }, [mode, metadata]);
  const handelActionEvent = async (data) => {
    if (data.name === "Add") {
      initialData.SUB_TRN_TYPE = trnType;
      initialData.TRN_TYPE = trnType;
      let { hasError, data: dataold } = await myGridRef.current?.validate(true);
      if (hasError === true) {
        if (dataold) {
          setGridData(dataold);
        }
      } else {
        setGridData((old) => {
          if (!Array.isArray(old)) {
            return [
              {
                ...initialData,
                id: 1,
                TRAN_CD: "",
                // SR_CD: 1,
                SR_NO: 1,
              },
            ];
          } else {
            let srCount = utilFunction.GetMaxCdForDetails(old, "SR_NO");
            const myNewRowObj = {
              ...initialData,
              id: srCount,
              TRAN_CD: "",
              // SR_CD: srCount,
              SR_NO: srCount,
            };
            return [...old, myNewRowObj];
          }
        });
      }
    } else if (data.name === "close") {
      ClosedEventCall();
    } else if (data.name === "save") {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    let { hasError, data: dataold } = await myGridRef.current?.validate(true);

    if (hasError === true) {
      if (dataold) {
        setGridData(dataold);
      }
    } else {
      let result = myGridRef?.current?.cleanData?.();
      if (!Array.isArray(result)) {
        result = [result];
      }
      let finalResult = result.filter(
        (one) => !(Boolean(one?._hidden) && Boolean(one?._isNewRow))
      );
      if (finalResult.length === 0) {
      } else {
        finalResult = CreateDetailsRequestData(finalResult);
        if (
          finalResult?.isDeleteRow?.length === 0 &&
          finalResult?.isNewRow?.length === 0 &&
          finalResult?.isUpdatedRow?.length === 0
        ) {
        } else {
          let data = {
            ...refID,
            DETAILS_DATA: finalResult,
          };
          onSubmit({ data, mode, setServerError });
        }
      }
    }
  };

  return (
    <div>
      {isError ? (
        <Alert
          severity="error"
          errorMsg={ErrorMessage}
          errorDetail={""}
          color="error"
        />
      ) : Boolean(serverError) ? (
        <Alert errorMsg={serverError} errorDetail="" severity="error" />
      ) : null}

      {typeof children === "function"
        ? children({
            handelCloseEvent,
            handleSubmit,
            classes,
            handelActionEvent,
          })
        : children}
      {isLoading ? (
        <LoaderPaperComponent />
      ) : (
        <GridWrapper
          key={"customerDetailsGrid"}
          finalMetaData={metaData as GridMetaDataType}
          data={girdData}
          setData={setGridData}
          loading={isEditableForm ? mode === "view" : isLoading}
          actions={actions}
          setAction={handelActionEvent}
          refetchData={null}
          ref={myGridRef}
        />
      )}
    </div>
  );
};
