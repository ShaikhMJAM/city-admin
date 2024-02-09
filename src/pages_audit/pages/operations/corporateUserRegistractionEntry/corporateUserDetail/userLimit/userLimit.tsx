import { Button, Dialog } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Transition } from "pages_audit/common";
import { Alert } from "components/common/alert";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { useContext, useEffect, useRef, useState } from "react";
import { UserLimitMetaData } from "./gridMetaData";
import { useMutation, useQuery } from "react-query";
import * as API from "../../api";
import { ClearCacheContext, queryClient } from "cache";
import { useSnackbar } from "notistack";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useNavigate } from "react-router-dom";
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
export const UserLimitForm = ({
  isOpen,
  formMode,
  onClose,
  reqDataRef,
  rowsData,
}) => {
  const classes = useDialogStyles();
  const [girdData, setGridData] = useState<any>([]);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getPartnerUserDetailsdata", { ...reqDataRef.current }], () =>
    API.getPartnerUserGridData()
  );

  const mutation = useMutation([], {
    onError: (error: any) => {},
    onSuccess: (data) => {
      // enqueueSnackbar(data, {
      //     variant: "success",
      // });
      onClose();
    },
  });
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getpartnerdetailsdata"]);
    };
  }, [getEntries]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setGridData(data);
    } else {
      setGridData([]);
    }
  }, [data]);

  const onSaveRecord = async () => {};
  return (
    <Dialog
      open={isOpen}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "55%",
          // height: "65%",
          // overflow: "hidden",
        },
      }}
      maxWidth="lg"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <div style={{ padding: "10px" }}>
        {isLoading || isFetching ? (
          <LoaderPaperComponent />
        ) : isError ? (
          <Alert
            severity="error"
            errorMsg={error?.error_msg ?? "Error"}
            errorDetail={error?.error_detail ?? ""}
            color="error"
          />
        ) : mutation.isError ? (
          <Alert
            severity="error"
            errorMsg={mutation.error?.error_msg ?? "Error"}
            errorDetail={mutation.error?.error_detail ?? ""}
            color="error"
          />
        ) : null}

        <FormWrapper
          key={"UserLimit" + rowsData?.CUSTOMER_ID}
          metaData={UserLimitMetaData as MetaDataType}
          data={girdData}
          setData={setGridData}
          loading={isLoading || isFetching || isError}
          formStyle={{
            background: "white",
          }}
          actions={[]}
          setAction={() => {}}
          refetchData={refetch}
          ref={myGridRef}
        >
          {({ isSubmitting, handleSubmit }) => (
            <>
              <Button
                onClick={(event) => {
                  handleSubmit(event, "Save");
                }}
                // disabled={isSubmitting}
                //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                color={"primary"}
                // disabled={isSubmitting}
              >
                Close
              </Button>
              {/* <Button
            onClick={moveToViewMode}
            disabled={isSubmitting}
																		  
            color={"primary"}
          >
            Cancel
          </Button> */}
            </>
          )}
        </FormWrapper>
      </div>
    </Dialog>
  );
};
