const mapData = require("./mapData");

const isConsecutiveDates = (date1, date2) => {
  const oneDay = Math.abs(getDay(date1) - getDay(date2));
  return oneDay === 1;
};

const getDay = (date) => {
  const dateObject = new Date(date);

  // Get the date in YYYY-MM-DD format
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  return day;
};

const task1 = () => {
  const data = mapData();

  const result = {};
  const threshold = 7;

  // Iterate through each Position_ID
  for (const positionID in data) {
    const shifts = data[positionID];

    // Sort shifts by Time in ascending order
    shifts.sort((a, b) => new Date(a.item.Time) - new Date(b.item.Time));

    let count = 1,
      i = 0,
      j = 1;
    const uniqueNames = new Set();

    while (j < shifts.length) {
      const currentDate = shifts[i].item;
      const nextDate = shifts[j].item;

      if (getDay(currentDate.Time) === getDay(nextDate.Time)) {
        j++;
      } else if (isConsecutiveDates(currentDate.Time, nextDate.Time)) {
        j++;
        count++;
        currentDate.Employee_Name.forEach((name) => {
          uniqueNames.add(name);
        });
      } else {
        if (count >= threshold) {
          result[positionID] = [...uniqueNames];
          break;
        }
        count = 1;
        i = j;
        j++;
        uniqueNames.clear();
      }
    }
  }

  return result;
};

module.exports = task1;
