// Description: This module contains the logic for Task 2.
const mapData = require("./mapData");

const task2 = () => {
  const data = mapData();

  const result = {};

  // Iterate through each Position_ID
  for (const positionID in data) {
    const shifts = data[positionID];

    // Sort shifts by Time in ascending order
    shifts.sort((a, b) => new Date(a.item.Time) - new Date(b.item.Time));

    // Initialize an array to store unique names
    const uniqueNames = [];

    for (let i = 0; i < shifts.length - 1; i++) {
      const currentShift = shifts[i].item;
      const nextShift = shifts[i + 1].item;

      // Calculate the time difference between shifts in hours
      const timeDiffHours =
        (new Date(nextShift.Time) - new Date(currentShift.Time_Out)) / 3600000;

      if (timeDiffHours > 1 && timeDiffHours < 10) {
        // Add unique names to the array
        currentShift.Employee_Name.forEach((name) => {
          if (!uniqueNames.includes(name)) {
            uniqueNames.push(name);
          }
        });
      }
    }

    // Store unique names for this Position_ID
    if (uniqueNames.length === 0) {
      delete data[positionID];
    } else {
      result[positionID] = uniqueNames;
    }
  }

  return result;
};

module.exports = task2;
