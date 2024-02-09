import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getRootDevGridData = async ({ confirmed, flag }) => {
  if (!Boolean(confirmed)) {
    throw DefaultErrorObject("Please Select Release Type.", "warning");
  } else if (!Boolean(flag)) {
    throw DefaultErrorObject("Please Select Block Type.", "warning");
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETROOTDEVLIST", {
        CONFIRMED: confirmed,
        FLAG: flag,
        DISPLAY_LANGUAGE: "en",
        ACTION: "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const updRootDevicePermission = async ({
  trancd,
  allow_status,
  remarks,
}) => {
  if (!Boolean(trancd)) {
    throw DefaultErrorObject("Required value missing for tran cd.", "warning");
  } else if (!Boolean(allow_status)) {
    throw DefaultErrorObject("Required value missing for status", "warning");
  } else if (!Boolean(remarks)) {
    throw DefaultErrorObject("Required value missing for remarks.", "warning");
  } else {
    // var remarkskey = remark_by;
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "UPDROOTDEVICEPERM",
      {
        CONFIRMED: "N",
        ALLOW_STATUS: allow_status,
        TRAN_CD: trancd,
        MAKER_REMARKS: remarks,
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, "error", messageDetails);
    }
  }
};

export const updRootDeviceConfirm = async ({ confirmed, trancd, remarks }) => {
  if (!Boolean(confirmed)) {
    throw DefaultErrorObject(
      "Required value missing for confirmed.",
      "warning"
    );
  } else if (!Boolean(remarks)) {
    throw DefaultErrorObject("Required value missing for remarks.", "warning");
  } else if (!Boolean(trancd)) {
    throw DefaultErrorObject("Required value missing for tran cd.", "warning");
  } else {
    // var remarkskey = remark_by;
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "CONFROOTDEVICEPERM",
      {
        CONFIRMED: confirmed,
        TRAN_CD: trancd,
        CHECKER_REMARKS: remarks,
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, "error", messageDetails);
    }
  }
};
