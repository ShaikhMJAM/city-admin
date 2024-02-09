import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getMerchantOnboardinggridData = async (compCode) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETMERCHONBOARDGRID", {
      COMP_CD: compCode,
      CONFIRMED: "ALL",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getMerchantOnboardingglDetails = async ({
  formView,
  tranCode,
}) => {
  if (formView === "new") {
    return {};
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMERCHONBOARDGLDTL", {
        TRAN_CD: tranCode,
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

// // MERCHANTONBOARDCONFIG

export const merchantOnbordingConfig = async (reqdata) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "MERCHANTONBOARDCONFIG",
    {
      MERCHANT_MST: reqdata,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

// CONFIRMMERCHANTONBOARD

export const confirmMerchantOnboard = async (reqdata) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "CONFIRMMERCHANTONBOARD",
    reqdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
