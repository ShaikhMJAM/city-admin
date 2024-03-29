import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";

export const getUserDetails = async ({ userID }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMPLOYEEDTL", { USERID: userID });
  if (status === "0") {
    let responseData = data[0];
    if (responseData?.ALLOW_RELEASE === "Y") {
      responseData.ALLOW_RELEASE = true;
    } else {
      responseData.ALLOW_RELEASE = false;
    }
    return responseData;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getUserLoginDetails = async ({ userID }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("ADMINPANELUSERACTIVITY", {
      USERID: userID,
      A_USER_NAME: userID,
    });

  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const changeEmployeePassword = async ({
  userID,
  currentPassword,
  password,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "DOUPDATEPASSWORD",
    {
      USER_ID: userID,
      OLD_PASSWORD: currentPassword,
      PASSWORD: password,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateUserProfilePic = async ({ userID, imageData, blob }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("UPDATEPROFILEPIC", {
      USER_ID: userID,
      IMAGE_DATA: imageData,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updateTOTPAuth = async ({ userID, currentPassword, flag }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("DOTOTPAUTHUPDATE", {
      USER_ID: userID,
      PASSWORD: currentPassword,
      AUTH_FLAG: flag,
    });
  if (status === "0") {
    if (flag === "DISABLED") {
      return message;
    }
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const updateTOTPAuthVerify = async ({
  userID,
  secretToken,
  otpNumber,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "DOTOTPAUTHUPDATEVERIFY",
    {
      USER_ID: userID,
      SECRET_TOKEN: secretToken,
      OTP: otpNumber,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
