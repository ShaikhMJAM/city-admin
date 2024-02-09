import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const ProductNameInsert = async (data: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "PRODUCTDISPNMDML",
    data
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getProductNameGrid = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETPRODUCTDISPNMGRID", {});
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,
        ACTIVE: item.ACTIVE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getProductNameDetail = async (
  transactionID: number,
  companyID: string,
  lineID: string,
  srCode: string,
  formMode: string
) => {
  if (formMode === "new") {
    return [];
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETPRODUCTDISPNMDTLDATA", {
        TRAN_CD: transactionID + "",
        COMP_CD: companyID,
        LINE_ID: lineID + "",
        SR_CD: srCode,
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};
