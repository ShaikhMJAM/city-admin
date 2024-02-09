import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("MS_PROPERTIES");

export const getMsMonitoringGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETINSTANCEDETAILS", {});
  if (status === "0") {
    return data.map((data, index) => {
      return {
        ...data,
        status: data.status === "Y" ? "UP" : "DOWN",
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMsRefreshProperties = async (reqParams) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("REFRESHPROPERTIES", reqParams);
  if (status === "0") {
    if (Object.entries(data[0]).length === 0) return messageDetails;
    const newData: object[] = [];
    for (const obj in data[0]) {
      const serviceData = data[0][obj][0];
      newData.push({
        SERVICE: obj,
        INSTANCE_ID: serviceData.INSTANCE_ID,
        INSTANCE_STATUS: serviceData.INSTANCE_STATUS,
        UPD_STATUS: serviceData.UPD_STATUS,
        RESPONSE: serviceData.RESPONSE ?? serviceData.FAILED_REASON,
      });
    }
    return newData;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
