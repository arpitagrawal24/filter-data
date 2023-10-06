// Description: This module contains the logic for Task 3.
const mapData = require("./mapData");

const getDay = (date) => {
  const dateObject = new Date(date);

  // Get the date in YYYY-MM-DD format
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  return day;
};

const task3 = () => {
  const data = mapData();

  const result = {};

  // Iterate through each Position_ID
  for (const positionID in data) {
    const shifts = data[positionID];

    // Sort shifts by Time in ascending order
    shifts.sort((a, b) => new Date(a.item.Time) - new Date(b.item.Time));

    let shiftDuration = 0,
      preDay = getDay(shifts[0].item.Time),
      i = 0;
    const uniqueNames = new Set();

    while (i < shifts.length) {
      const currentDate = shifts[i].item;

      if (getDay(currentDate.Time) === preDay) {
        shiftDuration +=
          (new Date(currentDate.Time_Out) - new Date(currentDate.Time)) /
          3600000;
        currentDate.Employee_Name.forEach((name) => {
          uniqueNames.add(name);
        });
        i++;
      } else {
        if (shiftDuration >= 12) {
          result[positionID] = [...uniqueNames];
          break;
        }
        uniqueNames.clear();
        shiftDuration = 0;
        preDay = getDay(currentDate.Time);

      }
    }
  }

  return result;
};

module.exports = task3;
