import * as XLSX from "xlsx";
import { utilFunction } from "../utilFunctions";
import { getParsedDate } from "../utilFunctions/function";
import { isValid } from "date-fns";

export const ConvertExcelToJSONData = ({ title = "sheet1", data }) => {
  //let base64Data = await utilFunction.convertBlobToBase64(blob);
  let wb = XLSX.read(data.blob, { type: "base64", raw: true });
  let fileJsonData: any = [];
  if (wb?.SheetNames?.length > 0) {
    wb?.SheetNames.forEach((item) => {
      let JSONData: any = XLSX.utils.sheet_to_json(wb.Sheets[item], {
        defval: "",
        raw: false,
      });
      JSONData.forEach((json) => {
        for (let key in json) {
          const cellValue = getParsedDate(json[key], true);
          json[key] =
            cellValue instanceof Date && isValid(cellValue)
              ? cellValue.toLocaleDateString("en-UK")
              : cellValue;
        }
      });
      fileJsonData = [...fileJsonData, ...JSONData];
    });
    return fileJsonData;
  } else {
    return [];
  }
  //const excelData = utils.json_to_sheet(data);
};
