import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";

export const getUserReleaseGridData = async ({
  compCode,
  branchCode,
  userName,
  userFlagl1,
  userFlagk2,
  userFlago3,
  callFrom,
}) => {
  if (callFrom === "GETUSERSESSDATA") {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher(callFrom, {
        COMP_CD: compCode,
        BRANCH_CD: branchCode,
        LOG_IN_USER: userName,
        USER_FLAG_L1: userFlagl1,
        USER_FLAG_K2: userFlagk2,
        USER_FLAG_O3: userFlago3,
      });
    if (status === "0") {
      return data.map((item) => {
        if (item?.USER_FLAG.trim() !== "L") {
          return {
            ...item,
            _rowColor: "grey",
          };
        } else {
          return {
            ...item,
          };
        }
      });
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  } else if (callFrom === "GETUSERBLOKDATA") {
    const { data, status, message, messageDetails } =
      await AuthSDK.internalFetcher(callFrom, {});
    if (status === "0") {
      return data;
    } else {
      throw DefaultErrorObject(message, messageDetails);
    }
  }
};

export const getUsrBlckDtlData = async ({ userName }) => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETUSERBLOKDTLDATA", { USERNAME: userName });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updUsrGrpData = async ({ username }) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "LOGINBLOCKUSER",
    { USER_NAME: username }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updateSubUserdata = async ({
  usernames,
  password,
  compCD,
  branchCD,
  userflag,
  remarks,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "APPLYSESSIONTRAN",
    {
      USER_NAME: usernames,
      PASSWORD: password,
      COMP_CD: compCD,
      BRANCH_CD: branchCD,
      USER_FLAG: userflag,
      REMARKS: remarks,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
