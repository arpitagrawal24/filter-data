const excel_data = require("./excel_data");

const mapData = () => {
  const data = excel_data();

  const result = {};

  data.map((item) => {
    const positionID = item.Position_ID;

    if (!result[positionID]) {
      result[positionID] = [];
    }
    result[positionID].push({ item });
  });

  return result;
};

module.exports = mapData;
