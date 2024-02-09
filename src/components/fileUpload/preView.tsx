import { Fragment, FC, useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import Close from "@mui/icons-material/Close";
import { downloadFile } from "./utils";

import * as XLSX from "xlsx";
// for csv upload
import Papa from "papaparse";

import "../../assets/css/bootstrap.min.css";
import { LoadingTextAnimation } from "components/common/loader";
import { getParsedDate } from "components/utils/utilFunctions/function";
import { isValid } from "date-fns";

export const ExcelViewer: FC<{
  blob: File;
  fileName: string;
  onClose?: any;
}> = ({ blob, fileName, onClose }) => {
  const [excelData, setExcelData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = () => {
    const reader = new FileReader();

    setIsLoading(true);
    reader.onload = (event: any) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
        raw: false,
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonSheet: any = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      });
      const parsedSheet = jsonSheet.map((row) => {
        return row.map((cell) => {
          const dateCell = getParsedDate(cell, true);
          if (dateCell instanceof Date && isValid(dateCell)) {
            return dateCell.toLocaleDateString("en-UK");
          }
          return cell;
        });
      });
      setIsLoading(false);
      setExcelData(parsedSheet);
    };
    if (blob) reader.readAsBinaryString(blob);
    else setExcelData([]);
  };

  useEffect(() => {
    handleFileUpload();
  }, []);

  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        {/* <IconButton
          color="secondary"
          onClick={() => downloadFile(blob, fileName)}
        >
          <GetAppRoundedIcon />
        </IconButton> */}
        {typeof onClose === "function" ? (
          <IconButton color="secondary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        {isLoading ? <LoadingTextAnimation /> : null}
        {excelData.length > 0 ? (
          <table className="table table-bordered">
            <thead
              style={{ backgroundColor: "var(--theme-color1)", color: "#fff" }}
            >
              <tr>
                {excelData[0].map((cell: string, index: number) => (
                  <th key={`th-${index}`} style={{ whiteSpace: "nowrap" }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`}>
                  {row.getArrayEmptyResolved().map((cell, cellIndex) => (
                    <td
                      key={`td-${rowIndex}${cellIndex}`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            <em>Empty file found!!!</em>
          </p>
        )}
      </DialogContent>
    </Fragment>
  );
};

//csv
export const CsvViewer: FC<{
  blob: File;
  fileName: string;
  onClose?: any;
}> = ({ blob, fileName, onClose }) => {
  const [csvData, setCsvData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async () => {
    setIsLoading(true);
    Papa.parse(blob, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        setIsLoading(false);
        const parsedSheet = result.data.map((row) => {
          return row.map((cell) => {
            const dateCell = getParsedDate(cell, true);
            if (dateCell instanceof Date && isValid(dateCell)) {
              return dateCell.toLocaleDateString("en-UK");
            }
            return cell;
          });
        });
        setCsvData(parsedSheet);
      },
      error: (error) => {
        setIsLoading(false);
        setCsvData([]);
      },
    });
  };

  useEffect(() => {
    handleFileUpload();
  }, []);

  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        {typeof onClose === "function" ? (
          <IconButton color="secondary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        {isLoading ? <LoadingTextAnimation /> : null}
        {csvData.length > 0 ? (
          <table className="table table-bordered">
            <thead
              style={{ backgroundColor: "var(--theme-color1)", color: "#fff" }}
            >
              <tr>
                {csvData[0].map((cell: string, index: number) => (
                  <th key={`th-${index}`} style={{ whiteSpace: "nowrap" }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`td-${rowIndex}${cellIndex}`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            <em>Empty file found!!!</em>
          </p>
        )}
      </DialogContent>
    </Fragment>
  );
};

export const PDFViewer: FC<{ blob: File; fileName: string; onClose?: any }> = ({
  blob,
  fileName,
  onClose,
}) => {
  const [urlObj, setUrlObj] = useState(
    typeof blob === "object" && Boolean(blob)
      ? URL.createObjectURL(blob as any)
      : null
  );
  //console.log(blob, urlObj);
  useEffect(() => {
    let toRemoveURL = urlObj ?? "";
    return () => {
      URL.revokeObjectURL(toRemoveURL);
    };
  }, []);
  useEffect(() => {
    setUrlObj(
      typeof blob === "object" && Boolean(blob)
        ? URL.createObjectURL(blob as any)
        : null
    );
  }, [blob]);

  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton
          color="secondary"
          onClick={() => downloadFile(blob, fileName)}
        >
          <GetAppRoundedIcon />
        </IconButton>
        {typeof onClose === "function" ? (
          <IconButton color="secondary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <iframe
          title="Document Preview"
          src={`${urlObj}`}
          style={{ height: "100%", width: "100%" }}
          aria-label="PDF Preview"
        />
      </DialogContent>
    </Fragment>
  );
};

export const ImageViewer: FC<{
  blob: File;
  fileName: string;
  onClose?: any;
}> = ({ blob, fileName, onClose }) => {
  const [urlObj, setUrlObj] = useState(
    typeof blob === "object" && Boolean(blob)
      ? URL.createObjectURL(blob as any)
      : ""
  );

  useEffect(() => {
    let toRemoveURL = urlObj ?? "";

    return () => URL.revokeObjectURL(toRemoveURL);
  }, []);
  useEffect(() => {
    setUrlObj(
      typeof blob === "object" && Boolean(blob)
        ? URL.createObjectURL(blob as any)
        : ""
    );
  }, [blob]);
  return (
    <Fragment>
      <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
        <Typography variant="h6" color="textSecondary">
          File:
        </Typography>
        <Typography variant="h6">{fileName}</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton
          color="secondary"
          onClick={() => downloadFile(blob, fileName)}
        >
          <GetAppRoundedIcon />
        </IconButton>
        {typeof onClose === "function" ? (
          <IconButton color="secondary" onClick={onClose}>
            <Close />
          </IconButton>
        ) : null}
      </DialogActions>
      <DialogContent>
        <img width="60%" src={`${urlObj}`} alt="Preview of document" />
      </DialogContent>
    </Fragment>
  );
};

export const NoPreview: FC<{
  fileName: string;
  onClose?: any;
  message?: string;
}> = ({ onClose, fileName, message }) => (
  <Fragment>
    <DialogActions style={{ display: "flex", padding: "8px 24px" }}>
      <Typography variant="h6" color="textSecondary">
        File:
      </Typography>
      <Typography variant="h6">{fileName}</Typography>
      <div style={{ flexGrow: 1 }}></div>
      {typeof onClose === "function" ? (
        <IconButton color="secondary" onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </DialogActions>
    <DialogContent>{message}</DialogContent>
  </Fragment>
);
