import { DefaultErrorObject } from "components/utils";
import { AuthSDK } from "registry/fns/auth";
export const getUserProfileImage = async ({ userID }) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETEMPLOYEEPROFILEPIC", { USER_ID: userID });
  if (status === "0") {
    let responseData = data[0];
    return responseData;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
