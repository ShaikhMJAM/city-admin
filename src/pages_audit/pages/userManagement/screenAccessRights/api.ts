import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getUserOrGroupList = async ({ search }) => {
  if (!Boolean(search)) {
    throw DefaultErrorObject(
      "Required value missing for Search.",
      "",
      "warning"
    );
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher(
        search === "U" ? "GETSECURITYUSERSLIST" : "GETSECURITYGROUPINGLIST",
        {}
      );
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const getUserScreenAccessData = async (userName) => {
  if (!Boolean(userName)) {
    throw DefaultErrorObject(
      "Required value missing for User Name.",
      "",
      "warning"
    );
  } else {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher("GETMENUUSERRIGHTS", {
        USERNAME: userName,
        BRANCH_CD: "001 ",
        COMP_CD: "001 ",
      });
    if (status === "0") {
      Object.keys(data?.[0]?.ACCESS_DTL).forEach(function (key) {
        data[0].ACCESS_DTL[key].PENDING_ACCESS = data?.[0]?.ACCESS_DTL?.[
          key
        ]?.PENDING_ACCESS.map((item) => {
          return { ...item, COLOR: "rgb(169 53 53)" };
        });

        data[0].ACCESS_DTL[key].CURRENT_ACCESS = data?.[0]?.ACCESS_DTL?.[
          key
        ]?.CURRENT_ACCESS.map((item) => {
          return { ...item, COLOR: "#1E5128" };
        });
      });
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const addGroupsDefaultRights = async (inputData) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "DEFAULTSCREENRIGHT",
    inputData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const carryForwardScreenRights = async (inputData) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "COPYMENURIGHTS",
    inputData
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const saveUserScreenAccessRights = async ({ inputData, userName }) => {
  let defaultArrayValue: any = [];
  let finalReqData = Object.entries(inputData?.data).reduce(
    (accu, [columnId, column], index) => {
      let localdata: any = column;
      return [...accu, ...localdata.CURRENT_ACCESS];
    },
    defaultArrayValue
  );
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "ADDMENURIGHTS",
    { USER_NAME: userName, ACCESS_DTL: finalReqData }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
