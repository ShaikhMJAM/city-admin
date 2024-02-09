import { LoanReqGridMetaData } from "./gridMetadata";
import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getGridFormMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case "CCC/001":
        return LoanReqGridMetaData;
      default:
        /* eslint-disable no-throw-literal */
        throw { error_msg: "Invalid Product type" };
    }
  };

export const getLoanReqGridData = async ({ fromDate, toDate, screenID }) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("LOANAPPLYREQ", {
      FROM_DATE: fromDate,
      TO_DATE: toDate,
      SCREEN_ID: screenID,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const setLockUnlockRequest = async (props: lockUnlockType) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "LOCKUNLOCKLOANREQ",
    {
      TRAN_CD: props.tranCd,
      USER_TYPE: "TEST",
      TYPE: props.type,
    }
  );

  if (status === "0") {
    if (props.type === "C") {
      return setLockUnlockRequest({ ...props, type: "L" });
    } else {
      return message;
    }
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
