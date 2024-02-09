import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
// import { GeneralAPI } from "registry/fns/functions";

// export const GetMiscValue = () => GeneralAPI.GetMiscValue("BEN_RESTRICT");

export const getFdschemeMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFDCONFIGDATA", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const uploadFdschemeMastersDataFile = async (formData: any, trancd) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPLOADFDRSCHEMEDATA",
    {
      SCHEME_DATA: formData,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
// export const uploadFdschemeMastersDataFile = async (formData: any) => {
//   const { status, message, messageDetails } = await AuthSDK.internalFetcher(
//     "UPLOADFDRSCHEMEDATA",
//     formData
//   );
//   if (status === "0") {
//     return message;
//   } else {
//     throw DefaultErrorObject(message, messageDetails);
//   }
// };
