import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getServMobileValidGridData = async (confirmed, flag) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETSERVMOBILVALGRID", {
      CONFIRMED: confirmed,
    });
  if (status === "0") {
    return data.map((item) => {
      if (item?.CONFIRMED === "N" && flag === "ENTRY") {
        return {
          ...item,
          CONFIRMED_STATUS:
            item.CONFIRMED === "Y" ? "Confirmed" : "Confirmation Pending",
          _rowColor: "var(--theme-color3)",
        };
      } else {
        return {
          ...item,
          CONFIRMED_STATUS:
            item.CONFIRMED === "Y" ? "Confirmed" : "Confirmation Pending",
        };
      }
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const confirmServMobilValidReq = async ({
  confirmed,
  tranCode,
  trnType,
}) => {
  if (!Boolean(confirmed)) {
    throw DefaultErrorObject(
      "Required value missing for confirmed.",
      "warning"
    );
    // } else if (!Boolean(companyCode)) {
    //   throw DefaultErrorObject(
    //     "Required value missing for Company Code.",
    //     "warning"
    //   );
  } else if (!Boolean(tranCode)) {
    throw DefaultErrorObject(
      "Required value missing for Transaction Code.",
      "warning"
    );
  } else if (!Boolean(trnType)) {
    throw DefaultErrorObject(
      "Required value missing for Transaction Type.",
      "warning"
    );
  } else {
    const { status, message, messageDetails } = await AuthSDK.internalFetcher(
      "SERVICEMOBVALIDCONFIRM",
      {
        CONFIRMED: confirmed,
        TRAN_CD: tranCode,
        TRN_TYPE: trnType,
      }
    );
    if (status === "0") {
      return message;
    } else {
      throw DefaultErrorObject(message, "error", messageDetails);
    }
  }
};
