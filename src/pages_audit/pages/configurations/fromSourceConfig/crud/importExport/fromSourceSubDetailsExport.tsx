import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Alert } from "components/common/alert";
import { LoadingTextAnimation } from "components/common/loader";
import {
  ExportCSVFileFromData,
  ExportExcelFileFromData,
} from "components/utils";
import React, { useState } from "react";

interface IProps {
  open: boolean;
  closeDialog: Function;
  gridData: any;
  fileName: string;
}

export const FromSourceSubDetailExport: React.FC<IProps> = ({
  open,
  closeDialog,
  gridData,
  fileName,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDialogClose = () => {
    closeDialog();
  };

  const FileDownload = (format: string) => {
    setLoading(true);
    setError("");

    try {
      if (format.toLowerCase() === "excel") {
        ExportExcelFileFromData({ data: gridData, title: fileName });
      } else if (format.toLowerCase() === "csv") {
        ExportCSVFileFromData({ data: gridData, title: fileName });
      }
    } catch (error) {
      setError(String(error));
    }

    setTimeout(() => {
      setLoading(false);
      handleDialogClose();
    }, 1000);
  };

  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle>Which format do you want to download?</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingTextAnimation
            key={"loaderforExporting"}
            text="Exporting..."
          />
        ) : Boolean(error) ? (
          <Alert severity="error" errorMsg={error} />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            FileDownload("Excel");
          }}
          color="secondary"
          disabled={isLoading}
        >
          Excel
        </Button>
        <Button
          onClick={() => {
            FileDownload("CSV");
          }}
          color="secondary"
          disabled={isLoading}
        >
          CSV
        </Button>
        <Button
          onClick={handleDialogClose}
          color="secondary"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
