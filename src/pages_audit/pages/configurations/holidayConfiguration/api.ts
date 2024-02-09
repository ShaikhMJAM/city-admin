import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
import { GeneralAPI } from "registry/fns/functions";

export const GetChargeTemplates = () => GeneralAPI.GetChargeTemplates();

//grid
export const getHolidayConfig = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETHOLIDAYCONFIGGRID", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

//getdata
export const getDetailsHolidayGridData = async (
  transactionID: number,
  compCD: number,
  formMode: string
) => {
  if (formMode === "new") {
    return [];
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETHOLIDAYCONFIGDTLDATA", {
        TRAN_CD: transactionID + "",
        COMP_CD: compCD + "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

//detaildata
export const updHolidayConfigInsert = async (Formdata: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "HOLIDAYHDRDTLDML",
    Formdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

//select
export const GetBranchList = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBRANCHLIST", {});
  if (status === "0") {
    let responseData = data;
    if (Array.isArray(responseData)) {
      responseData = responseData.map(({ BRANCH_NM, BRANCH_CD, ...other }) => {
        return {
          value: BRANCH_CD,
          label: BRANCH_NM,
          ...other,
        };
      });
    }
    return responseData;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

// insertgrid;
export const getHolidaydetailsdata = async (reqdata) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETHOLIDAYCONFIGSDTDATA", reqdata);
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

//insertdetaildata
export const HolidayConfigInsertData = async (Formdata: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "HOLIDAYSDTDML",
    Formdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const generateBusinessDay = async (tranCode) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "GENBUSINESSDAY",
    { TRAN_CD: tranCode }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

//Business Day
//getdata
export const getBusinessDayDetailGridData = async (
  transactionID: number,
  compCD: number
) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETBUSINESSDAYDTLGRID", {
      TRAN_CD: transactionID + "",
      COMP_CD: compCD + "",
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

//detaildata
export const updBusinessDayConfig = async (Formdata: any) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "BUSINESSDAYCONFIGDML",
    Formdata
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
