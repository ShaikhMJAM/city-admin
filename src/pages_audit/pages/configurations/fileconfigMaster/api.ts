import { AuthSDK } from "registry/fns/auth";
import { DefaultErrorObject } from "components/utils";
import { GeneralAPI } from "registry/fns/functions";
export const getUsecase = () => GeneralAPI.GetMiscValue("USECASES");

export const getFileconfigMasterGridData = async () => {
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFILECONFIGDATA", {});
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const getConfigFileData = async (transactionID, formMode) => {
  if (formMode === "new") {
    return [];
  }
  const { data, status, message, messageDetails } =
    await AuthSDK.internalFetcher("GETFILECONFIGFILEDATA", {
      TRAN_CD: transactionID,
    });
  if (status === "0") {
    return data;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};

export const updFileconfigMasterFormData = async ({
  data: formData,
  transactionID,
  fileName,
  fileType,
  trandate,
}) => {
  const { status, message, messageDetails } = await AuthSDK.internalFetcher(
    "UPDFILECONFIGDATA",
    formData
    // ,
    // {
    //   TRAN_CD: transactionID,
    //   FILE_NAME: fileName,
    //   FILE_TYPE: fileType,
    //   TRAN_DT: trandate,
    // }
  );
  if (status === "0") {
    return message;
  } else {
    throw DefaultErrorObject(message, messageDetails);
  }
};
