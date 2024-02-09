import { ClearCacheProvider, ClearCacheContext } from "cache";
import { Fragment, useContext, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import { AllScreensGridMetaData } from "./gridMetadata";
import { AuthContext } from "pages_audit/auth";
import { utilFunction } from "components/utils/utilFunctions";
const actions: ActionTypes[] = [
  {
    actionName: "allScreens",
    actionLabel: "Release",
    multiple: true,
    rowDoubleClick: true,
  },
];
export const ReleaseUsers = () => {
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const result: any = {};
  const allScreenData = useMemo(() => {
    let responseData = utilFunction.GetAllChieldMenuData(
      authState.menulistdata,
      true
    );
    return responseData;
  }, [authState.menulistdata]);
  // const handleStoreRecent = (data) => {
  //   const storedPaths = JSON.parse(
  //     localStorage.getItem("routeHistory") || "[]"
  //   );
  //   const duplicate = storedPaths.filter(
  //     (item) => item.system_code === data.system_code
  //   );
  //   if (duplicate.length === 0) {
  //     const updatedPaths = [data, ...storedPaths].slice(0, 5);
  //     localStorage.setItem("routeHistory", JSON.stringify(updatedPaths));
  //   }
  // };
  const setCurrentAction = useCallback(
    (data) => {
      console.log(">>data", data);
      if ((data?.name ?? "") === "allScreens") {
        // handleStoreRecent(data?.rows?.[0]?.data)
        let path = data?.rows?.[0]?.data?.href;
        let urlParms = new URLSearchParams(
          data?.rows?.[0]?.data?.navigationProps
        ).toString();
        if (urlParms !== "") path += `?${urlParms}`;
        if (Boolean(path)) {
          if ((path ?? "") === "report") {
            // Extract navigationProps from the first row's data
            const navigationProps = data?.rows?.[0]?.data?.navigationProps;

            // Construct the URL with navigation props
            const urlWithProps = `../${path}?reportID=${navigationProps?.reportID}`;
            navigate(urlWithProps);
          } else {
            navigate("../" + path);
          }
        }
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );

  return (
    <Fragment>
      {result.isError && (
        <Alert
          severity="error"
          errorMsg={result.error?.error_msg ?? "Something went to wrong.."}
          errorDetail={result.error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={`allScreensGrid`}
        finalMetaData={AllScreensGridMetaData as GridMetaDataType}
        data={allScreenData}
        setData={() => null}
        loading={false}
        actions={actions}
        setAction={setCurrentAction}
        ref={myGridRef}
      />
    </Fragment>
  );
};

export const AllScreensGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <ReleaseUsers />
    </ClearCacheProvider>
  );
};
