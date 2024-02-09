import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getIdtpChargeConfigGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETIDTPCHARGEMSTGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updIdtpChargeConfigGridData = async ({ data, setServerError }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "IDTPCHARGEMSTDML",
    data
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getIdtpChargeConfirmConfigGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETIDTPCHARGECONFIRMGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const upConfirmIdtpCharge = async ({
  confirmed,
  receiverFitype,
  trantype,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "IDTPCHARGEMSTCONFIRM",
    {
      CONFIRMED: confirmed,
      RECEIVER_FITYPE: receiverFitype,
      TRN_TYPE: trantype,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
