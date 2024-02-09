import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getServiceMonitorGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETSERVMONITORGRID", {});
  if (status === "0") {
    return data.map((item) => {
      if (item?.STATUS.trim() === "N") {
        return {
          ...item,
          _rowColor: "grey",
        };
      } else {
        return {
          ...item,
          _rowColor: "green",
        };
      }
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
