import { PrimaryIDChangeGridMetaData } from "./gridMetadata";
import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getGridFormMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case "CCC/001":
        return PrimaryIDChangeGridMetaData;
      default:
        /* eslint-disable no-throw-literal */
        throw { error_msg: "Invalid Product type" };
    }
  };

export const getPrimaryIDConfirmGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("PENPRIMARYSOURCE", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const confirmPrimaryIDChangeReq = async ({ confirmed, trancd }) => {
  if (!Boolean(confirmed)) {
    throw DefaultErrorObject(
      "Required value missing for confirmed.",
      "warning"
    );
  } else if (!Boolean(trancd)) {
    throw DefaultErrorObject("Required value missing for tran cd.", "warning");
  } else {
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "CONFPRIMARYSOURCE",
      {
        CONFIRMED: confirmed,
        TRAN_CD: trancd,
        VERIFIED_BY: "sys",
        VERIFIED_MACHINE_NM: "test",
        DISPLAY_LANGUAGE: "en",
        ACTION: "",
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, "error", messageDetails);
    }
  }
};
