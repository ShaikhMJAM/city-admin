import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "../auth";
import { format } from "date-fns";

const GeneralAPISDK = () => {
  const GetMiscValue = async (ReqData) => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMISCVALUE", {
        CATEGORY_CD: ReqData,
        DISPLAY_LANGUAGE: "en",
        ACTION: "",
      });
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetChargeTemplates = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETCHARGETEMPLATELIST", {});
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ VALUE, LABEL, ...other }) => {
          //let { VALUE, LABEL, ...other } = one;
          return {
            value: VALUE,
            label: LABEL,
            ...other,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const getValidateValue = async (fieldData) => {
    if (
      //fieldData.value === "X" || --if any issue doing validation uncomment and check
      fieldData.value === "" ||
      fieldData.value === "0" ||
      fieldData.value === false ||
      fieldData.value === null ||
      fieldData.value === "00" ||
      (Array.isArray(fieldData.value) && fieldData.value.length <= 0)
    ) {
      return "This field is required";
    } else {
      return "";
    }
  };
  const putOpenWindowName = async (item) => {
    //console.log(item);
  };
  const getTranslateDataFromGoogle = async (data, fromLang, toLang) => {
    try {
      data = data.trim().replace(/%/g, encodeURIComponent("%"));
      let URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
        fromLang
      )}&tl=${encodeURIComponent(toLang)}&dt=t&q=${data}`;
      let response = await fetch(encodeURI(URL));
      // let response = await fetch(
      //   encodeURI(
      //     "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
      //       fromLang +
      //       "&tl=" +
      //       toLang +
      //       "&dt=t&q=" +
      //       data
      //   )
      // );
      if (String(response.status) === "200") {
        let resData: any = await response.json();
        if (Array.isArray(resData)) {
          let finalData = resData?.[0]?.map((item) => {
            return decodeURIComponent(item?.[0] ?? "");
          });
          return finalData.join("");
        } else {
          return "";
        }
      } else {
        return "";
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  };
  const GetDistrictList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETDISTRICTLIST", {});
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ NEW_DIST_CD, DIST_NM }) => {
          return {
            value: NEW_DIST_CD,
            label: DIST_NM,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const setDocumentName = (text) => {
    let titleText = document.title;
    document.title = titleText.split(" - ")[0] + " - " + text;
  };
  const GetSecurityGroupingList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETSECURITYGROUPINGLIST", {});
    if (status === "0") {
      return data.map((item) => {
        return { label: item?.GROUP_NAME, value: item?.GROUP_NAME };
      });
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetUsersNotificationTemplateList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETUSERSNOTIFTEMPLIST", {});
    if (status === "0") {
      return data.map((item) => {
        return {
          label: item?.DESCRIPTION,
          value: item?.TRAN_CD,
          disabled: item?.CONFIRMED === "N" ? true : false,
        };
      });
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetPGWMerchantList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMERCHANTMASTERDATA", {});
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ TRAN_CD, DESCRIPTION }) => {
          return {
            value: TRAN_CD,
            label: DESCRIPTION,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetPGWList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMERCHONBOARDGRID", { CONFIRMED: "Y" });
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ TRAN_CD, PID }) => {
          return {
            value: TRAN_CD,
            label: PID,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetMobiletemplList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMOBILEVALTEMPLLIST", {});
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ TRAN_CD, DESCRIPTION }) => {
          return {
            value: TRAN_CD,
            label: DESCRIPTION,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const GetFromSourceTemplateList = async (ReqData) => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETFROMSOURCETEMPLATEDD", {
        A_DB_COLUMN: ReqData,
      });
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ TRAN_CD, DESCRIPTION }) => {
          return {
            value: TRAN_CD,
            label: DESCRIPTION,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  const getUserDetailThroughLoginID = async (currentField, _, __) => {
    if (currentField?.value) {
      const { status, data } = await AuthSDK.internalFetcher(
        "GETEUSERMSTDATA",
        {
          CUSTOM_USER_NM: currentField?.value,
        }
      );
      if (status === "0") {
        if (data?.length > 0) {
          const lastLoginDate = data?.[0]?.LAST_LOGIN_DT;
          const formattedLastLoginDate = lastLoginDate
            ? format(new Date(lastLoginDate), "dd/MM/yyyy HH:mm:ss")
            : "";
          return {
            CUST_NAME: { value: data?.[0]?.CUST_NAME },
            MAIL_ID: { value: data?.[0]?.MAIL_ID },
            MOTHERS_NAME: { value: data?.[0]?.MOTHERS_NAME },
            MOBILE_NO: { value: data?.[0]?.MOBILE_NO },
            LAST_LOGIN_DT: { value: formattedLastLoginDate },
            CUSTOMER_ID: { value: data?.[0]?.CUSTOMER_ID },
            BIRTH_DATE: { value: data?.[0]?.BIRTH_DATE },
            PASSWORD_CHANGE_DT: { value: data?.[0]?.PASSWORD_CHANGE_DT },
            GENDER: { value: data?.[0]?.GENDER },
            USER_NAME: { value: data?.[0]?.USER_NAME },
            FATHERS_NAME: { value: data?.[0]?.FATHERS_NAME },
          };
        } else {
          return {
            CUSTOM_USER_NM: { error: "Invalid Login ID." },
            CUSTOME_USER_NM: { error: "Invalid Login ID." },
            MAIL_ID: { value: "" },
            MOTHERS_NAME: { value: "" },
            MOBILE_NO: { value: "" },
            LAST_LOGIN_DT: { value: "" },
            CUSTOMER_ID: { value: "" },
            BIRTH_DATE: { value: "" },
            PASSWORD_CHANGE_DT: { value: "" },
            GENDER: { value: "" },
            USER_NAME: { value: "" },
            FATHERS_NAME: { value: "" },
            CUST_NAME: { value: "" },
          };
        }
      } else {
        return {
          MAIL_ID: { value: "" },
          MOTHERS_NAME: { value: "" },
          MOBILE_NO: { value: "" },
          LAST_LOGIN_DT: { value: "" },
          CUSTOMER_ID: { value: "" },
          BIRTH_DATE: { value: "" },
          PASSWORD_CHANGE_DT: { value: "" },
          GENDER: { value: "" },
          USER_NAME: { value: "" },
          FATHERS_NAME: { value: "" },
          CUST_NAME: { value: "" },
        };
      }
    }
  };
  const GetSecurityUsersList = async () => {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETSECURITYUSERSLIST", {});
    if (status === "0") {
      let responseData = data;
      if (Array.isArray(responseData)) {
        responseData = responseData.map(({ USER_NAME, DESCRIPTION }) => {
          return {
            value: USER_NAME,
            label: DESCRIPTION,
          };
        });
      }
      return responseData;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  };
  return {
    GetMiscValue,
    getValidateValue,
    putOpenWindowName,
    GetChargeTemplates,
    getTranslateDataFromGoogle,
    GetDistrictList,
    setDocumentName,
    GetSecurityGroupingList,
    GetUsersNotificationTemplateList,
    GetPGWMerchantList,
    GetPGWList,
    GetFromSourceTemplateList,
    GetMobiletemplList,
    getUserDetailThroughLoginID,
    GetSecurityUsersList,
  };
};

export const GeneralAPI = GeneralAPISDK();
