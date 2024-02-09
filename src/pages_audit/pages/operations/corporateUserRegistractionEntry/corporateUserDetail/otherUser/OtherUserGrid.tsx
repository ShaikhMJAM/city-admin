import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  OtherUserGridMetaData,
  OtherUserViewGridMetaData,
} from "./gridMetaData";
import { useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as API from "../../api";
import { ActionTypes } from "components/dataTable";
import { AuthContext } from "pages_audit/auth";
import { UserLimitForm } from "../userLimit/userLimit";
import { GradientButton } from "components/styledComponent/button";
import {
  ImageViewer,
  NoPreview,
  PDFViewer,
} from "components/fileUpload/preView";
import Dialog from "@mui/material/Dialog";
import { utilFunction } from "components/utils";

const actions: ActionTypes[] = [
  {
    actionName: "limit",
    actionLabel: "Limit",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const OtherUserGrid = ({ mode }) => {
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { authState } = useContext(AuthContext);
  const isDataChangedRef = useRef(false);
  const [formMode, setFormMode] = useState(mode);
  const [rowsData, setRowsData] = useState({});

  const lastFileData = useRef<any>(null);

  const mysubdtlRef = useRef<any>({});

  const [isUser, setIsUser] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState<any>(false);
  const [isOpenPdf, setIsOpenPdf] = useState<any>(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getOtherUserGridData"], () => API.getOtherUserGridData());
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getOtherUserGridData"]);
    };
  }, [getEntries]);
  const setCurrentAction = useCallback(
    (data) => {
      setRowsData(data?.rows);
      if (data?.name === "add") {
        navigate(data?.name, {
          state: [],
        });
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );
  const handleDialogClose = () => {
    setIsOpenImage(false);
    setIsOpenPdf(false);
  };
  return (
    <Fragment>
      {isError ? (
        <Alert
          severity={error?.severity ?? "error"}
          errorMsg={error?.error_msg ?? "Error"}
          errorDetail={error?.error_detail ?? ""}
        />
      ) : (
        ""
      )}
      <GridWrapper
        key={`OtherUserGrid` + mode}
        finalMetaData={
          formMode === "edit" || formMode === "add"
            ? OtherUserGridMetaData
            : OtherUserViewGridMetaData
        }
        data={formMode === "add" ? [] : data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        // onClickActionEvent={(index, id, data) => {
        //   setIsUser(true);
        // }
        onClickActionEvent={(index, id, data) => {
          setRowsData(data);
          if (id === "AUTH_LETTER") {
            if (data?.AUTH_LETTER) {
              lastFileData.current = {
                AUTH_LETTER: utilFunction.blobToFile(
                  utilFunction.base64toBlob(
                    data?.AUTH_LETTER,
                    data?.AUTH_FILE_TYPE === "pdf"
                      ? "application/pdf"
                      : "image/" + data?.AUTH_FILE_TYPE
                  ),
                  data?.AUTH_FILE_NAME
                ),
                AUTH_FILE_TYPE: data?.AUTH_FILE_TYPE,
                AUTH_FILE_NAME: data?.AUTH_FILE_NAME,
              };
            } else {
              lastFileData.current = {};
            }
            setIsOpenPdf(true);
            setIsOpenImage(true);
          } else if (id === "UPLOAD_DOCUMENT") {
            if (data?.UPLOAD_DOCUMENT) {
              lastFileData.current = {
                UPLOAD_DOCUMENT: utilFunction.blobToFile(
                  utilFunction.base64toBlob(
                    data?.UPLOAD_DOCUMENT,
                    data?.FILE_TYPE === "pdf"
                      ? "application/pdf"
                      : "image/" + data?.FILE_TYPE
                  ),
                  data?.FILE_NAME
                ),
                FILE_TYPE: data?.FILE_TYPE,
                FILE_NAME: data?.FILE_NAME,
              };
            } else {
              lastFileData.current = {};
            }
            setIsOpenImage(true);
          } else if (id === "USER_RIGHTS") {
            setIsUser(true);
          }
        }}
      />
      <>
        {" "}
        {isUser ? (
          <UserLimitForm
            isOpen={isUser}
            formMode={formMode}
            onClose={() => {
              setIsUser(false);
            }}
            // reqDataRef={mysubdtlRef}
            reqDataRef={mysubdtlRef}
            rowsData={rowsData}
          />
        ) : null}
      </>
      {isOpenImage ? (
        <Dialog
          fullWidth
          maxWidth="md"
          open={true}
          PaperProps={{
            style: {
              width: "80%",
              height: "90%",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <GradientButton
              style={{ width: "22px", margin: "6px" }}
              onClick={handleDialogClose}
            >
              Close
            </GradientButton>
          </div>
          {lastFileData.current?.FILE_TYPE?.includes("pdf") ? (
            <PDFViewer
              blob={lastFileData.current?.UPLOAD_DOCUMENT ?? null}
              fileName={lastFileData.current?.FILE_NAME ?? ""}
            />
          ) : lastFileData.current?.FILE_TYPE?.includes("png") ||
            lastFileData.current?.FILE_TYPE?.includes("jpg") ||
            lastFileData.current?.FILE_TYPE?.includes("jpeg") ? (
            <ImageViewer
              blob={lastFileData.current?.UPLOAD_DOCUMENT ?? null}
              fileName={lastFileData.current?.FILE_NAME ?? ""}
            />
          ) : (
            <NoPreview fileName={lastFileData.current?.FILE_NAME ?? ""} />
          )}
        </Dialog>
      ) : null}

      {isOpenPdf ? (
        <Dialog
          fullWidth
          maxWidth="md"
          open={true}
          PaperProps={{
            style: {
              width: "80%",
              height: "90%",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <GradientButton
              style={{ width: "22px", margin: "6px" }}
              onClick={handleDialogClose}
            >
              Close
            </GradientButton>
          </div>
          {lastFileData.current?.AUTH_FILE_TYPE?.includes("pdf") ? (
            <PDFViewer
              blob={lastFileData.current?.AUTH_LETTER ?? null}
              fileName={lastFileData.current?.AUTH_FILE_NAME ?? ""}
            />
          ) : lastFileData.current?.AUTH_FILE_TYPE?.includes("png") ||
            lastFileData.current?.AUTH_FILE_TYPE?.includes("jpg") ||
            lastFileData.current?.AUTH_FILE_TYPE?.includes("jpeg") ? (
            <ImageViewer
              blob={lastFileData.current?.AUTH_LETTER ?? null}
              fileName={lastFileData.current?.AUTH_FILE_NAME ?? ""}
            />
          ) : (
            <NoPreview fileName={lastFileData.current?.AUTH_FILE_NAME ?? ""} />
          )}
        </Dialog>
      ) : null}
      <Routes>
        <Route
          path="add"
          element={
            // <CorporateUserRegistrationDetails
            //     isDataChangedRef={isDataChangedRef}
            //     closeDialog={handleDialogClose}
            //     defaultView={"new"}
            // />
            <></>
          }
        />
      </Routes>
    </Fragment>
  );
};

export const OtherUserGridWrapper = ({ mode }) => {
  return (
    <ClearCacheProvider>
      <OtherUserGrid mode={mode} />
    </ClearCacheProvider>
  );
};
