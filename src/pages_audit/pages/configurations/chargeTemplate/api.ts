import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const insertMastersData = () => async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SERVICECHARGEDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const getDetailsGridData = async (transactionID: number) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(`GETCHARGETEMPLATEDTL`, {
      TRAN_CD: transactionID + "",
    });
  if (status === "0") {
    return data.map((item) => {
      return {
        SR_CD: item.serialNo,
        MIN_AMT: item.minAmount,
        MAX_AMT: item.maxAmount,
        FROM_LIMIT: item.fromLimitAmount,
        TO_LIMIT: item.toLimitAmount,
        CHARGE_AMT: item.chargeAmount,
        CHARGE_PERC: item.chargePercentage,
        COMPARE_OR_ADD: item.compareOrAdd,
        ...item,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updServiceChargeConfigConfirm = async ({ confirmed, trancd }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SERVICECHARGECONFIRM",
    {
      CONFIRMED: confirmed,
      TRAN_CD: trancd,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMastersFormData = async (transactionID: number) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(`GETCHARGETEMPLATEMST`, {
      TRAN_CD: transactionID + "",
    });
  if (status === "0") {
    return data[0];
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMastersGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(`GETCHARGETEMPLATEGRID`, {
      COMP_CD: "001 ",
      BRANCH_CD: "001 ",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getChargeConfirmationGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher(`GETCONFCHARGETEMPLATEGRID`, {
      COMP_CD: "001 ",
      BRANCH_CD: "001 ",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateMastersData = () => async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "SERVICECHARGEDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const deleteBytransactionID = async (data) => {
  const { status, message } = await AuthSDK.internalFetcher(
    "SERVICECHARGEDML",
    data
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message);
  }
};
