const xlsx = require("xlsx");

const ExcelDateToJSDate = (date) => {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
};

const excel_data = () => {
  let data = [];
  try {
    const file = xlsx.readFile("./Assignment_Timecard.xlsx");
    const sheet = file.Sheets["Sheet1"];

    const sheetdata = xlsx.utils.sheet_to_json(sheet);

    // console.log(sheetdata)

    sheetdata.forEach((item) => {
      data.push({
        Position_ID: item["Position ID"] ? item["Position ID"] : null,

        Position_Status: item["Position Status"]
          ? item["Position Status"]
          : null,

        Time: item["Time"] ? ExcelDateToJSDate(item["Time"]) : null,

        Time_Out: item["Time Out"] ? ExcelDateToJSDate(item["Time Out"]) : null,

        Timecard_Hours: item["Timecard Hours (as Time)"]
          ? parseFloat(item["Timecard Hours (as Time)"].split(":")[0]) +
            parseFloat(item["Timecard Hours (as Time)"].split(":")[1]) / 60
          : null,

        Pay_Cycle_Start_Date: item["Pay Cycle Start Date"]
          ? ExcelDateToJSDate(item["Pay Cycle Start Date"])
          : null,

        Pay_Cycle_End_Date: item["Pay Cycle End Date"]
          ? ExcelDateToJSDate(item["Pay Cycle End Date"])
          : null,

        Employee_Name: item["Employee Name"].split(", "),

        File_Number: item["File Number"] ? item["File Number"] : null,
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = excel_data;
