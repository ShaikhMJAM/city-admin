import { utils, writeFile } from "xlsx";

export const createNewWorkbook = ({ title = "sheet1", data }) => {
  const excelDataRows = data.map(({ _isNewRow, ...rest }) => rest);

  // console.log("Exceldata: ",excelDataRows)
  // return

  const excelData = utils.json_to_sheet(excelDataRows, { skipHeader: false });

  const wb = utils.book_new();
  utils.sheet_add_aoa(excelData, [["City Bank - Bangladesh"]], {
    origin: "A1",
  });

  utils.sheet_add_aoa(excelData, [[]], { origin: "A2" });

  // utils.book_append_sheet(wb, excelData);

  wb.Props = {
    Title: title,
    Author: "LOS",
    CreatedDate: new Date(),
  };

  wb.SheetNames.push(title);
  wb.Sheets[title] = excelData;
  writeFile(wb, `${title}.xlsx`);
};
