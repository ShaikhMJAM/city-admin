//import { LOSSDK } from "registry/fns/functions";
import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const GetEmailAcctConfigDD = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMAILACCTCONFIGDROPDOWN", {});
  if (status === "0") {
    let responseData = data;
    if (Array.isArray(responseData)) {
      responseData = responseData.map(({ TRAN_CD, CONFIG_NM }) => {
        //let { VALUE, LABEL, ...other } = one;
        return {
          value: TRAN_CD,
          label: CONFIG_NM,
        };
      });
    }
    return responseData;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getEmailSMSConfigDtlList = async (tranCode) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMAILSMSCONFIGDTLLIST", {
      TRAN_CD: tranCode,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updateEmailSMSConfig = async (reqdata) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "EMAILMSGCONFIGUPDATEDML",
    reqdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getSmsTemplate = async (tranCode) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETSMSTEMPLATE", { TRAN_CD: tranCode });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getEmailTemplate = async (tranCode) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMAILTEMPLATE", { TRAN_CD: tranCode });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
