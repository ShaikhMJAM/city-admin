import { CardGridMetaData } from "./gridMetadata";
import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getGridFormMetaData =
  ({ gridCode }) =>
  async () => {
    switch (gridCode) {
      case "CCC/001":
        return CardGridMetaData;
      default:
        /* eslint-disable no-throw-literal */
        throw { error_msg: "Invalid Product type" };
    }
  };

export const getCardBinImageGridData = async (confirmed) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETCARDBINIMGGRIDDATA", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateCardBinImageEntry = async ({ data: reqdata }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "CARDBINIMAGEDML",
    reqdata
    // {
    //   RESPONSE: reqdata,
    // }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const confirmCardBinImageReq = async ({
  confirmed,
  companyCode,
  tranCode,
}) => {
  if (!Boolean(confirmed)) {
    throw DefaultErrorObject(
      "Required value missing for confirmed.",
      "warning"
    );
  } else if (!Boolean(companyCode)) {
    throw DefaultErrorObject(
      "Required value missing for Company Code.",
      "warning"
    );
  } else if (!Boolean(tranCode)) {
    throw DefaultErrorObject(
      "Required value missing for Transaction Code.",
      "warning"
    );
  } else {
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "",
      {
        CONFIRMED: confirmed,
        COMP_CD: companyCode,
        TRAN_CD: tranCode,
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, "error", messageDetails);
    }
  }
};

export const deleteBillerConfigConfirm = async ({
  categoryID,
  subCategoryID,
  billerID,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "",
    {
      CATEGORY_ID: categoryID,
      SUB_CATEGORY_ID: subCategoryID,
      BILLER_ID: billerID,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const deleteCardBinImage = async (formData: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "DELCARDBINIMG",
    formData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
