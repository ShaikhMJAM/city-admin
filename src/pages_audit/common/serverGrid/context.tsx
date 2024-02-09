import { createContext, FC, ReactNode } from "react";
import * as API from "./api";

interface CRUDFNType {
  fn: any;
  args: any;
}

interface ServerGridProviderType {
  getGridMetaData: CRUDFNType;
  getGridData: CRUDFNType;
  children?: ReactNode;
}

export const ServerGridContext = createContext<ServerGridProviderType>(
  {} as ServerGridProviderType
);

export const ServerGridContextProvider: FC<ServerGridProviderType> = ({
  children,
  getGridMetaData,
  getGridData,
}) => {
  return (
    <ServerGridContext.Provider value={{ getGridMetaData, getGridData }}>
      {children}
    </ServerGridContext.Provider>
  );
};

export const serverGridContextGenerator = (
  gridMetaData,
  gridData,
  reqPara
) => ({
  getGridData: { fn: gridData, args: { reqPara } },
  getGridMetaData: { fn: gridMetaData, args: { reqPara } },
});
