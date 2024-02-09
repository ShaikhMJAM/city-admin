import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { format } from "date-fns";
import { UserCreationFormMetadata } from "./userCreationForm/metaData";

export const getUserCreationGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETADMINUSERGRID", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        ALLOW_RELEASE: item.ALLOW_RELEASE === "Y" ? true : false,
        ACTIVE_FLAG: item.ACTIVE_FLAG === "Y" ? true : false,
        INACTIVE_DATE: Boolean(item?.INACTIVE_DATE)
          ? format(new Date(item?.INACTIVE_DATE), "dd/MM/yyyy HH:mm:ss")
          : "",
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const getUserCreationConfirmGridData = async () => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETADMINUSERCONFIRMGRID", {});
  if (status === "0") {
    return data.map((item) => {
      return {
        ...item,
        ACTIVE_FLAG: item.ACTIVE_FLAG === "Y" ? true : false,
        ALLOW_RELEASE: item.ALLOW_RELEASE === "Y" ? true : false,
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

const getColumnNameByAccessor = (name, config) => {
  for (const column of config.fields) {
    if (column.name === name) {
      return column.label;
    }
  }
  return null; // Return null if the accessor is not found
};

export const getUpdateConfirmGridData = async (userName) => {
  const { status, data, message, messageDetails } =
    await AuthSDK.internalFetcher("GETAUDITDATA", {
      DOC_CD: "NETU/001",
      REQ_TYPE: "RK",
      REQUEST_DATA: { USER_NAME: userName },
    });
  if (status === "0") {
    // return data;
    return data.map((item) => {
      return {
        ...item,
        COLUMN_LABEL: getColumnNameByAccessor(
          item?.COLUMN_NAME,
          UserCreationFormMetadata
        ),
      };
    });
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
export const getUpdateSubConfirmGridData = async (confirmed, username) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPDSECURITYUSER",
    {
      CONFIRMED: confirmed,
      USER_NAME: username,
    }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
