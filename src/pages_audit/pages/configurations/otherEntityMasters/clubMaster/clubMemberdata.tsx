import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import Dialog from "@mui/material/Dialog";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Transition } from "pages_audit/common";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ClubMemberListMetaData, ClubMemberMasterMetaData } from "./metaData";
import { GridMetaDataType } from "components/dataTableStatic";
import { useMutation, useQuery } from "react-query";
import * as API from "../api";
import { Alert } from "components/common/alert";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import { ActionTypes } from "components/dataTable";
import FormWrapper from "components/dynamicForm";
import Button from "@mui/material/Button";
import { extractMetaData, utilFunction } from "components/utils";
import { format, parse } from "date-fns";
import { clone } from "lodash";
import { SubmitFnType } from "packages/form";
import { UploadFileData } from "./fileUpload/fileUpload";
import { SampleFileDownload } from "./fileUpload/sampleFIleDownload";
import { useSnackbar } from "notistack";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { getParsedDate } from "components/utils/utilFunctions/function";

const actions: ActionTypes[] = [
  {
    actionName: "download",
    actionLabel: "Download Sample",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "upload-file-data",
    actionLabel: "Upload File",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "edit",
    actionLabel: "Edit",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: true,
  },
];
const transformData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((one, index) => ({
      ...one,
      id: index,
      _hidden: false,
      _isNewRow: false,
    }));
  } else {
    return data;
  }
};
const ClubMemberListMaster = ({
  isDataChangedRef,
  handleDialogClose,
  description,
  tranCD,
}) => {
  const myGridRef = useRef<any>(null);
  const myMemberDataRef = useRef<any>({});
  const myEntryTypeRef = useRef<any>("edit");
  const myrefreshNeedRef = useRef(false);
  const [isClubEntry, SetClubEntry] = useState(false);
  const { state: rows }: any = useLocation();
  const { getEntries } = useContext(ClearCacheContext);
  const [isSampleFileDownload, setSampleFileDownload] = useState(false);
  const navigate = useNavigate();
  const [uploadFileOpen, setUploadFileOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getClubMemberDetailsList", rows?.[0]?.data?.TRAN_CD], () =>
    API.GetClubMemberDetailsList(rows?.[0]?.data?.TRAN_CD, description)
  );

  const isDeleteDataRef = useRef<any>(null);
  // const myGridRef = useRef<any>(null);
  const [isDelete, SetDelete] = useState(false);
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "close") {
        handleDialogClose();
      } else if (data?.name === "edit") {
        myMemberDataRef.current = data?.rows?.[0]?.data ?? {};
        myEntryTypeRef.current = "edit";
        SetClubEntry(true);
      } else if (data?.name === "delete") {
        // myMemberDataRef.current = data?.rows?.[0]?.data ?? {};
        isDeleteDataRef.current = data?.rows?.[0];
        myEntryTypeRef.current = "delete";
        SetDelete(true);
      } else if (data?.name === "add") {
        myMemberDataRef.current = {
          TRAN_DT: format(new Date(), "dd/MM/yyyy"),
          CLUB_TRAN_CD: rows?.[0]?.data?.TRAN_CD,
        };
        myEntryTypeRef.current = "new";
        SetClubEntry(true);
      } else if (data?.name === "download") {
        setSampleFileDownload(true);
      } else if (data?.name === "upload-file-data") {
        setUploadFileOpen(true);
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );
  // const deleteMutation = useMutation(API.updateOtherEntityData),
  const deleteMutation = useMutation(API.clubMemberDetail(), {
    onError: (error: any) => {},
    onSuccess: (data) => {
      enqueueSnackbar("Records successfully deleted", {
        variant: "success",
      });
      refetch();
      SetDelete(false);
    },
  });
  const onDeleteYes = (rows) => {
    deleteMutation.mutate({
      DETAILS_DATA: {
        isNewRow: [],
        isDeleteRow: [{ ...rows?.data, _isDeleteRow: true }],
        isUpdatedRow: [],
      },
    });
  };

  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries([
        "getClubMemberDetailsList",
        rows?.[0]?.data?.TRAN_CD,
      ]);
    };
  }, [getEntries]);
  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);
  const GidData = useMemo(() => transformData(data), [data]);

  const DownloadGidData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map((one, index) => ({
        MEMBER_ID: String(one?.MEMBER_ID ?? ""),
        MEMBER_NAME: one?.MEMBER_NAME,
        MEMBER_TYPE: one?.MEMBER_TYPE,
        MEMBER_SINCE: String(one?.MEMBER_SINCE ?? ""),
        MEMBER_STATUS: String(one?.MEMBER_STATUS ?? ""),
      }));
    } else {
      return data;
    }
  }, [data]);
  ClubMemberListMetaData.gridConfig.gridLabel =
    "Club Member Detail :  " + description;
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "75%",
          },
        }}
        maxWidth="lg"
      >
        <div style={{ padding: "10px" }}>
          {isError === true ? (
            <div style={{ paddingBottom: "5px" }}>
              <AppBar position="relative">
                <Alert
                  severity={error?.severity ?? "error"}
                  errorMsg={error?.error_msg ?? "Error"}
                  errorDetail={error?.error_detail ?? ""}
                />
              </AppBar>
            </div>
          ) : null}
          <GridWrapper
            key={"clubMemberDetailsList"}
            finalMetaData={ClubMemberListMetaData as GridMetaDataType}
            data={data || []}
            setData={() => {}}
            loading={isLoading || isFetching}
            actions={actions}
            setAction={setCurrentAction}
            refetchData={() => {
              refetch();
            }}
            ref={myGridRef}
          />
          {isClubEntry ? (
            <ClubMemberMasterData
              onClose={() => {
                if (myrefreshNeedRef.current === true) {
                  refetch();
                  myrefreshNeedRef.current = false;
                }
                SetClubEntry(false);
              }}
              initialValues={myMemberDataRef.current}
              mode={myEntryTypeRef.current}
              myrefreshNeedRef={myrefreshNeedRef}
            />
          ) : null}

          {uploadFileOpen && (
            <UploadFileData
              CloseFileUpload={() => {
                setUploadFileOpen(false);
                if (isDataChangedRef.current === true) {
                  refetch();
                  isDataChangedRef.current = false;
                }
              }}
              data={GidData}
              isDataChangedRef={isDataChangedRef}
              tranCD={tranCD}
            />
          )}

          {/* <Routes>
            <Route
              path="upload-file-data/*"
              element={
                <UploadFileData
                  CloseFileUpload={ClosedEventCall}
                  data={GidData}
                  isDataChangedRef={isDataChangedRef}
                />
              }
            />
          </Routes> */}
          {isSampleFileDownload ? (
            <SampleFileDownload
              isOpen={isSampleFileDownload}
              closeDialog={() => {
                setSampleFileDownload(false);
              }}
              fileData={DownloadGidData}
              filename={
                "Club-Member-" +
                  rows?.[0]?.data?.TRAN_CD +
                  "-" +
                  format(new Date(), "yyyyMMddHH") +
                  "-" +
                  DownloadGidData?.length ?? 0
              }
            />
          ) : null}

          {isDelete ? (
            <MessageBoxWrapper
              isOpen={isDelete}
              validMessage={"Would you like to delete the selected record?"}
              onActionYes={(rowVal) => onDeleteYes(rowVal)}
              onActionNo={() => {
                SetDelete(false);
              }}
              isLoading={deleteMutation.isLoading}
              isError={deleteMutation.isError}
              error_msg={
                deleteMutation.error?.error_msg ?? "Unknown Error occured"
              }
              error_detail={deleteMutation.error?.error_detail ?? ""}
              loadingText={"Deleting..."}
              rows={isDeleteDataRef.current}
            />
          ) : null}
        </div>
      </Dialog>
    </>
  );
};
const ClubMemberMasterData = ({
  onClose,
  initialValues,
  mode,
  myrefreshNeedRef,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const metaData = useMemo(() => {
    return extractMetaData(ClubMemberMasterMetaData, mode);
  }, [mode]);
  const intit = useMemo(() => {
    let localinit = clone(initialValues);
    if (mode === "edit") {
      let initSince = getParsedDate(localinit["MEMBER_SINCE"]).toString();
      // try {
      //   initSince = parse(initSince, "dd/MM/yyyy", new Date());
      //   initSince = format(initSince, "dd/MMM/yyyy");
      // } catch (error) { }
      localinit.MEMBER_SINCE = initSince;
    }
    return localinit;
  }, [initialValues, mode]);

  const mutation = useMutation(
    API.clubMemberDetail(),

    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });
        myrefreshNeedRef.current = true;
        onClose();
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data: any,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    // if (Boolean(data["MEMBER_SINCE"])) {
    //   data["MEMBER_SINCE"] = format(
    //     new Date(data["MEMBER_SINCE"]),
    //     "dd/MM/yyyy"
    //   );
    // }

    let updCol = utilFunction.transformDetailsData(data, intit);
    if (mode === "new") {
      delete data?.SR_CD;
    }
    let reqData = {
      DETAILS_DATA: {
        isNewRow: mode === "new" ? [data] : [],
        isDeleteRow: [],
        isUpdatedRow: mode === "edit" ? [{ ...data, ...updCol }] : [],
      },
    };
    const updatedRows =
      reqData.DETAILS_DATA["isUpdatedRow"][0]?._UPDATEDCOLUMNS;
    if (mode !== "new" && updatedRows.length === 0) {
      onClose();
      return;
    }

    mutation.mutate(reqData);
  };

  return (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
      maxWidth="md"
    >
      {mutation?.isError ? (
        <>
          <Alert
            severity="error"
            errorMsg={mutation?.error?.error_msg ?? ""}
            errorDetail={mutation?.error?.error_detail ?? ""}
          />
        </>
      ) : null}
      <FormWrapper
        key={"clubMemberDetail-Master"}
        metaData={metaData}
        initialValues={intit}
        //@ts-ignore
        displayMode={mode}
        formStyle={{
          background: "white",
          height: "40vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        onSubmitHandler={onSubmitHandler}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <Button
              onClick={(event) => {
                handleSubmit(event, "Save");
              }}
              // disabled={mutation.isLoading}
              endIcon={
                mutation.isLoading ? <CircularProgress size={20} /> : null
              }
              color={"primary"}
            >
              Save
            </Button>
            <Button onClick={onClose} color={"primary"} disabled={isSubmitting}>
              Close
            </Button>
          </>
        )}
      </FormWrapper>
    </Dialog>
  );
};
export const ClubMemberListMasterWrapper = ({
  isDataChangedRef,
  handleDialogClose,
  description,
  tranCD,
}) => {
  const { state: data }: any = useLocation();
  return (
    <ClearCacheProvider>
      <ClubMemberListMaster
        isDataChangedRef={isDataChangedRef}
        handleDialogClose={handleDialogClose}
        description={data?.[0]?.data?.DESCRIPTION}
        tranCD={data?.[0]?.data?.TRAN_CD}
      />
    </ClearCacheProvider>
  );
};
