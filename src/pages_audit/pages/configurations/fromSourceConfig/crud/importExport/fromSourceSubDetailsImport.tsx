import { Dialog } from "@mui/material";
import { FileUploadControl } from "components/fileUpload";
import { ConvertExcelToJSONData } from "components/utils";
import React, { useState } from "react";

interface IProps {
  open: boolean;
  closeDialog: Function;
  setImportedData: Function;
}

export const FromSourceSubDetailImport: React.FC<IProps> = ({
  open,
  closeDialog,
  setImportedData,
}) => {
  const [isFileUploadopen, setFileUpload] = useState(true);
  const [FileData, setFileData] = useState<any>([]);

  const handleDialogClose = () => {
    closeDialog();
  };

  const getJsonData = (other, dataJSON, proccessFunc, endIndex) => {
    proccessFunc(endIndex - 10);
    return dataJSON;
  };

  const processData = async (base64Object, proccessFunc) => {
    proccessFunc(20);
    let proccessLength =
      80 / (base64Object.length > 0 ? base64Object.length : 1);
    let alldata: any = [];
    base64Object.forEach((element, index) => {
      let jsonData = ConvertExcelToJSONData({
        data: element,
      });

      let { blob, ...other } = element;
      let data: any = getJsonData(
        other,
        jsonData,
        proccessFunc,
        10 + proccessLength * (index + 1)
      );
      alldata = [...(alldata ?? []), ...data];
    });

    proccessFunc(95);
    alldata = alldata.map((item, index) => {
      return {
        ...item,
        SR_CD: index + 1,
      };
    });

    proccessFunc(100);
    setFileData(alldata);
    setImportedData(alldata);
    setTimeout(() => {
      setFileUpload(false);
      handleDialogClose();
    }, 1000);
    proccessFunc(97);
    alldata = alldata.filter((item) => {
      return Boolean(item?._isNewRow);
    });
    proccessFunc(99);
    alldata = alldata.map((item, index) => {
      return { ...item, TRAN_CD: index + 1 };
    });
  };

  return (
    <>
      {isFileUploadopen ? (
        <Dialog fullWidth maxWidth="md" open={open}>
          <FileUploadControl
            key={"FromSrcKeySubDtlFileUploadData"}
            onClose={() => {
              handleDialogClose();
            }}
            additionalColumns={[]}
            editableFileName={false}
            // dataChangedRef={isDataChangedRef}
            defaultFileData={[]}
            onUpload={(
              formDataObj,
              proccessFunc,
              ResultFunc,
              base64Object,
              result
            ) => {
              if (base64Object.length > 0) {
                proccessFunc(10);
                setTimeout(async () => {
                  try {
                    processData(base64Object, proccessFunc);
                  } catch (error) {
                    ResultFunc({
                      status: "failed",
                      data: {
                        error_msg: "Error in file read " + String(error),
                      },
                    });
                  }
                }, 1000);
              } else {
                ResultFunc({
                  status: "failed",
                  data: { error_msg: "Error in file read" },
                });
              }
            }}
            gridProps={{}}
            maxAllowedSize={1024 * 1204 * 10} //10Mb file
            allowedExtensions={["xlsx", "csv"]}
            onUpdateFileData={(files) => {}}
          />
        </Dialog>
      ) : null}
    </>
  );
};
