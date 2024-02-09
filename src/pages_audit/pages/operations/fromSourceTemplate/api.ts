import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";

export const GetMiscValue = () => GeneralAPI.GetMiscValue("360_API");

export const getFromSourceTemplateGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFROMSOURCETEMPLATEGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getFromSourceTemplateDetailGridData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFROMSOURCETEMPLATEDTLDATA", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateFromSourceTemplateData = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("FROMSOURCETEMPLTDML", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getFromSourceConfigGridData = async (
  dbcolumn: string,
  trancd: string
) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFROMSOURCELIST", {
      DB_COLUMN: dbcolumn ?? "",
      TRAN_CD: trancd ?? "",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const fromSourceTemplatedata = async (Formdata: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SETFROMKEYTEMPLATE",
    Formdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
