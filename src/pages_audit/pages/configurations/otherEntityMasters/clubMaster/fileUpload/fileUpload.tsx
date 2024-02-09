import { ActionTypes, GridMetaDataType } from "components/dataTable";
import { FileUploadControl } from "components/fileUpload";
import { ConvertExcelToJSONData } from "components/utils";
import { useState } from "react";
// import { BankMasterGridUpdate } from "../bankMasterEdit";
// import { BankMasterUploadMetadata } from "./fileUploadMetadata";
// import { BankMasterUpdateViewMetaData } from "../gridMetadata";
import * as API from "../../api";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";
import { ClubMemberUpdateMetadata } from "../metaData";
import { useMutation } from "react-query";
import { Alert } from "components/common/alert";
import { LoadingTextAnimation } from "components/common/loader";
import { format, isValid, parse } from "date-fns";
import { getParsedDate } from "components/utils/utilFunctions/function";
// import { isValidDate } from "components/utils/utilFunctions/function";
// import { FdschemeMasterUpdateMetadata } from "../gridMetadata";

const actions: ActionTypes[] = [
  {
    actionName: "upload",
    actionLabel: "Upload",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "close",
    actionLabel: "Close",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];
interface updateFdschemeMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  tranCD?: any;
}
const updateFdschemeMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data, tranCD }: updateFdschemeMasterDataType) => {
    return updateMasterData(data, tranCD);
  };
export const UploadFileData = ({
  CloseFileUpload,
  data: rowData,
  isDataChangedRef,
  tranCD,
}) => {
  const [isFileUploadopen, setFileUpload] = useState(true);
  const [FileData, setFileData] = useState<any>([]);
  const [openAccept, setOpenAccept] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
    // proccessFunc(97);
    // setFileData(alldata);

    // proccessFunc(99);
    // setFileData(alldata);

    proccessFunc(100);
    setFileData(alldata);
    setTimeout(() => {
      setFileUpload(false);
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
    <div>
      {isFileUploadopen ? (
        <Dialog fullWidth maxWidth="md" open={isFileUploadopen}>
          <FileUploadControl
            key={"ClubMasterFileUploadData"}
            onClose={() => {
              CloseFileUpload();
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
      ) : (
        <Dialog
          fullWidth
          PaperProps={{
            style: {
              width: "60%",
            },
          }}
          maxWidth="md"
          open={!isFileUploadopen}
        >
          <div style={{ padding: "10px" }}>
            <GridWrapper
              key={"ClubMasterDetailsGrid"}
              finalMetaData={ClubMemberUpdateMetadata as GridMetaDataType}
              data={FileData}
              setData={() => {}}
              loading={false}
              actions={actions}
              setAction={(data) => {
                if (data?.name === "close") {
                  setFileUpload(true);
                  setFileData([]);
                } else if (data?.name === "upload") {
                  if (FileData.length === 0) {
                    enqueueSnackbar("No rows found for update", {
                      variant: "warning",
                    });
                  } else {
                    setOpenAccept(true);
                  }
                }
              }}
              refetchData={null}
            />
            {openAccept ? (
              <UploadFileSubmitConfirmation
                isOpen={openAccept}
                uploadData={FileData}
                CloseFileUpload={CloseFileUpload}
                ClosePopup={() => {
                  setOpenAccept(false);
                }}
                isDataChangedRef={isDataChangedRef}
                tranCD={tranCD}
              />
            ) : null}
          </div>
        </Dialog>
      )}
    </div>
  );
};

const UploadFileSubmitConfirmation = ({
  isOpen,
  uploadData,
  CloseFileUpload,
  ClosePopup,
  isDataChangedRef,
  tranCD,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(
    updateFdschemeMasterDataWrapperFn(API.uploadClubMastersDataFile),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });
        isDataChangedRef.current = true;
        if (typeof CloseFileUpload === "function") {
          CloseFileUpload();
        }
      },
    }
  );
  const validateDate = () => {
    const futureDateRows: any = [];
    const invalidDateRows: any = [];
    const requiredFieldsErrorRows: any = [];

    for (let i = 0; i < uploadData.length; i++) {
      const row = uploadData[i];
      const memberId: any = row.MEMBER_ID;
      const memberName: any = row.MEMBER_NAME;
      const memberSince: any = row.MEMBER_SINCE;
      const memberStatus: any = row.MEMBER_STATUS;

      const missingFields: any = [];

      if (!memberId) missingFields.push("Member ID");
      if (!memberName) missingFields.push("Member Name");
      if (!memberSince) missingFields.push("Member Since");
      if (!memberStatus) missingFields.push("Member Status");

      if (missingFields.length > 0) {
        requiredFieldsErrorRows.push({ missingFields });
        break;
      } else {
        const parsedDate = getParsedDate(memberSince, true, [
          "dd/MM/yyyy",
          "dd-MM-yyyy",
        ]);

        if (!isValid(parsedDate)) {
          invalidDateRows.push(row);
          break;
        } else if (parsedDate > new Date()) {
          futureDateRows.push(row);
          break;
        } else {
          row.MEMBER_SINCE = format(parsedDate, "dd/MM/yyyy");
        }
      }
    }
    if (requiredFieldsErrorRows.length > 0) {
      enqueueSnackbar(
        `Required fields cannot be null: ${requiredFieldsErrorRows[0].missingFields}`,
        {
          variant: "error",
        }
      );
    } else if (invalidDateRows.length > 0) {
      enqueueSnackbar("Invalid Date are Not Allowed in Member Since Column", {
        variant: "error",
      });
    } else if (futureDateRows.length > 0) {
      enqueueSnackbar("Future Date are Not Allowed in Member Since Column", {
        variant: "error",
      });
    }
    if (
      futureDateRows.length > 0 ||
      invalidDateRows.length > 0 ||
      requiredFieldsErrorRows.length > 0
    ) {
      ClosePopup();
      return false;
    }

    return true;
  };

  return (
    <Dialog open={isOpen} maxWidth="sm">
      <DialogTitle>Do you want to Update Club Member Data?</DialogTitle>
      <DialogContent>
        {mutation.isLoading ? (
          //   "Deleting..."
          <LoadingTextAnimation key={"loaderforUpdating"} text="Updating..." />
        ) : mutation.isError ? (
          <Alert
            severity="error"
            // I suspect this, mutation.error?.error_msg is misspelt. Try errorMessage
            errorMsg={mutation.error?.error_msg ?? "Unknown Error occured"}
            errorDetail={mutation.error?.error_detail ?? ""}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ClosePopup}
          color="secondary"
          disabled={mutation.isLoading}
        >
          No
        </Button>
        <Button
          // onClick={() => {
          //   mutation.mutate({ data: uploadData, tranCD });
          // }}
          onClick={() => {
            if (validateDate()) {
              mutation.mutate({ data: uploadData, tranCD });
            }
          }}
          color="secondary"
          disabled={mutation.isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
