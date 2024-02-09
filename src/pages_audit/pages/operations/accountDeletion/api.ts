import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getAccountDeletionReqGridData = async (confirmed) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETACCTDELETIONCONFIRMLIST", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateAccuntDeleteReq = async ({
  trancd,
  remarks,
  confirmed,
  reqflag,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPDACCOUNTDELETIONREQ",

    {
      TRAN_CD: trancd,
      REMARKS: remarks,
      CONFIRMED: confirmed,
      REQ_FLAG: reqflag,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
