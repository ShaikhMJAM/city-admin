import { useCallback, useEffect, forwardRef, useContext } from "react";
import DataGrid from "components/dataTable";
import { useQuery } from "react-query";
import { queryClient } from "cache";
import { ActionTypes } from "components/dataTable";
import {
  ServerGridContext,
  ServerGridContextProvider,
  serverGridContextGenerator,
} from "./context";

interface ServerGridType {
  dataGridKey: string;
  getAPIReqPara?: any;
  metaData?: any;
  getAPIFn?: any;
  actions?: ActionTypes[];
  setAction: any;
  defaultSortOrder?: any;
  defaultFilter?: any;
  dataTransformer?: any;
  autoRefreshInterval?: any;
}

export const ServerGrid = forwardRef<ServerGridType, any>(
  (
    {
      dataGridKey,
      getAPIReqPara,
      actions,
      setAction,
      defaultSortOrder,
      defaultFilter,
      dataTransformer,
      autoRefreshInterval,
    },
    myRef
  ) => {
    const { getGridData, getGridMetaData } = useContext(ServerGridContext);
    // getGridDataFn ~ API.getBankMasterGridDataForServer(reqPara)
    /* eslint-disable react-hooks/exhaustive-deps */
    const getGridDataFn = useCallback(getGridData.fn(getGridData.args), [
      getAPIReqPara,
    ]);
    // const result = useQuery(["gridMetaData", getAPIReqPara], () =>
    //   getGridMetaData.fn(getGridMetaData.args)()
    // );
    useEffect(() => {
      return () => {
        queryClient.removeQueries(["gridMetaData", getAPIReqPara]);
      };
    }, [getAPIReqPara]);

    //const loading = result.isLoading || result.isFetching;
    //let isError = result.isError;

    return (
      <DataGrid
        //@ts-ignore
        ref={myRef}
        key={dataGridKey}
        metaData={getGridMetaData.fn}
        gridCode={getAPIReqPara}
        getGridData={getGridDataFn}
        actions={actions}
        setAction={setAction}
        defaultSortOrder={defaultSortOrder}
        defaultFilter={defaultFilter}
        dataTransformer={dataTransformer}
        autoRefreshInterval={autoRefreshInterval}
      />
    );
  }
);

export const ServerGridWrapper = forwardRef<ServerGridType, any>(
  (
    {
      dataGridKey,
      metaData,
      getAPIFn = () => {},
      getAPIReqPara,
      actions,
      setAction,
      defaultFilter,
      defaultSortOrder,
      dataTransformer,
      autoRefreshInterval,
    },
    ref
  ) => {
    return (
      <ServerGridContextProvider
        {...serverGridContextGenerator(metaData, getAPIFn, getAPIReqPara)}
      >
        <ServerGrid
          dataGridKey={dataGridKey}
          getAPIReqPara={getAPIReqPara}
          actions={actions}
          setAction={setAction}
          defaultFilter={defaultFilter}
          defaultSortOrder={defaultSortOrder}
          dataTransformer={dataTransformer}
          ref={ref}
          autoRefreshInterval={autoRefreshInterval}
        />
      </ServerGridContextProvider>
    );
  }
);
