import { ClearCacheContext, queryClient } from "cache";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import * as API from "./api";
import { MobileValidationTemplateGridMetaData } from "./gridMetadata";
import { useNavigate, Routes, Route } from "react-router-dom";
import { MsPropertiesDetails } from "./crud";
import { DeleteMsProperties } from "./crud/deletemsProperties";
import { MsPropertiesUpdateServices } from "./updateServices";

const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "Edit Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "update-services",
    actionLabel: "Update",
    multiple: false,
    rowDoubleClick: false,
    alwaysAvailable: false,
  },
  // {
  //   actionName: "delete",
  //   actionLabel: "Delete",
  //   multiple: false,
  //   rowDoubleClick: false,
  // },
  // {
  //   actionName: "add",
  //   actionLabel: "Add",
  //   multiple: undefined,
  //   rowDoubleClick: true,
  //   alwaysAvailable: true,
  // },
];

export const MsPropertiesGridWrapper = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const isDataChangedRef = useRef(false);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getMsPropertiesGridData"], () => API.getMsPropertiesGridData());
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      queryClient.removeQueries(["getMsPropertiesGridData"]);
    };
  }, [getEntries]);
  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "update-services") {
        setShowModal(true);
      }
      navigate(data?.name, {
        state: data?.rows,
      });
    },
    [navigate]
  );
  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      refetch();
      isDataChangedRef.current = false;
    }
    navigate(".");
  };
  return (
    <Fragment>
      {isError && (
        <Alert
          severity="error"
          errorMsg={error?.error_msg ?? "Something went to wrong.."}
          errorDetail={error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={`MsPropertiesGrid`}
        finalMetaData={MobileValidationTemplateGridMetaData as GridMetaDataType}
        data={data ?? []}
        setData={() => null}
        loading={isLoading || isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        ref={myGridRef}
      />
      <Routes>
        <Route
          path="add"
          element={
            <MsPropertiesDetails
              isDataChangedRef={isDataChangedRef}
              ClosedEventCall={handleDialogClose}
              defaultmode={"new"}
            />
          }
        />
        <Route
          path="view-details/*"
          element={
            <MsPropertiesDetails
              isDataChangedRef={isDataChangedRef}
              ClosedEventCall={handleDialogClose}
              defaultmode={"edit"}
            />
          }
        />
        <Route
          path="update-services"
          element={
            showModal ? (
              <MsPropertiesUpdateServices ClosedEventCall={handleDialogClose} />
            ) : null
          }
        />
        {
          <Route
            path="delete"
            element={
              <DeleteMsProperties
                isDataChangedRef={isDataChangedRef}
                closeDialog={handleDialogClose}
                isOpen={true}
              />
            }
          />
        }
      </Routes>
    </Fragment>
  );
};
