import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getOtpSmsConfigGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETOTPSMSCONFIGGRID", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getOtpSmsTagList = async ({ companyCode, activityType }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETTRANOTPSMSTAGLIST", {
      COMP_CD: companyCode,
      TRIG_CD: activityType,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateOtpSmsConfigGridData = async (reqdata) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "OTPMESSAGECONFIG",
    reqdata
  );

  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
