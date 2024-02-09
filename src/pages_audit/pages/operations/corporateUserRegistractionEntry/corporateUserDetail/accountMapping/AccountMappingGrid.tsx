import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AccountMappingGridMetaData,
  AccountMappingViewGridMetaData,
} from "./gridMetaData";
import { useQuery } from "react-query";

import { utilFunction } from "components/utils";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as API from "../../api";
import { ActionTypes } from "components/dataTable";
import Dialog from "@mui/material/Dialog";
import {
  ImageViewer,
  NoPreview,
  PDFViewer,
} from "components/fileUpload/preView";
import { GradientButton } from "components/styledComponent/button";

const actions: ActionTypes[] = [
  {
    actionName: "limit",
    actionLabel: "Limit",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const AccountMappingGrid = ({ mode }) => {
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState(mode);
  const lastFileData = useRef<any>(null);

  const [isOpenImage, setIsOpenImage] = useState<any>(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getAccountMappingGridData"], () => API.getAccountMappingGridData());

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getAccountMappingGridData"]);
    };
  }, [getEntries]);
  const setCurrentAction = useCallback(
    (data) => {
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
        key={`AccountMappingGrid` + mode}
        finalMetaData={
          formMode === "edit" || formMode === "add"
            ? AccountMappingGridMetaData
            : AccountMappingViewGridMetaData
        }
        // finalMetaData={AccountMappingGridMetaData}
        data={formMode === "add" ? [] : data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        loading={isLoading || isFetching}
        refetchData={refetch}
        onClickActionEvent={(index, id, data) => {
          if (data?.FILE_DATA) {
            lastFileData.current = {
              FILE_DATA: utilFunction.blobToFile(
                utilFunction.base64toBlob(
                  data?.FILE_DATA,
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
        }}
      />

      {isOpenImage ? (
        <Dialog
          fullWidth
          maxWidth="md"
          open={true}
          PaperProps={{
            style: {
              width: "60%",
              height: "70%",
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
              blob={lastFileData.current?.FILE_DATA ?? null}
              fileName={lastFileData.current?.FILE_NAME ?? ""}
            />
          ) : lastFileData.current?.FILE_TYPE?.includes("png") ||
            lastFileData.current?.FILE_TYPE?.includes("jpg") ||
            lastFileData.current?.FILE_TYPE?.includes("jpeg") ? (
            <ImageViewer
              blob={lastFileData.current?.FILE_DATA ?? null}
              fileName={lastFileData.current?.FILE_NAME ?? ""}
            />
          ) : (
            <NoPreview fileName={lastFileData.current?.FILE_NAME ?? ""} />
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

export const AccountMappingGridWrapper = ({ mode }) => {
  return (
    <ClearCacheProvider>
      <AccountMappingGrid mode={mode} />
    </ClearCacheProvider>
  );
};
