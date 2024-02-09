import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getvCardProdTypeGridData = async (confirmed) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETVIRTUALCARDPRODTYPEGRID", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getvCardProdTypeDetailsGridData = async (
  transactionID,
  formMode
) => {
  if (formMode === "add") {
    return [];
  }
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETVCARDPRODTYPEDTLGRID", {
      TRAN_CD: transactionID,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const insertUpdateData = () => async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "VCARDPRODUCTTYPECONFIGDML",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updVirtualCardProdTypeConfirm = async ({ confirmed, trancd }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "VCARDPRODUCTTYPECONFIRM",
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
