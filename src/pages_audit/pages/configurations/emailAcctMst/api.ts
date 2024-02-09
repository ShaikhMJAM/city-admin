import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getEmailAcctMstGridData = async (companyID) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMAILACCTGRID", {
      COMP_CD: companyID,
    });
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,

        SSL: item.SSL === "Y" ? true : false,
        SPA: item.SPA === "Y" ? true : false,
        SMTP_PASS_AUTH: item.SMTP_PASS_AUTH === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
