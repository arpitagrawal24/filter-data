const express = require("express");
const fs = require("fs");

const task2 = require("./utils/task2");
const task3 = require("./utils/task3");
const task1 = require("./utils/task1");
const mapData = require("./utils/mapData");
const excel_data = require("./utils/excel_data");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Shifts API!" });
});

app.get("/exceldata", (req, res) => {
  const data = excel_data();

  res.json({ "excel data": data });
});

app.get("/mapdata", (req, res) => {
  const data = mapData();

  res.json({ mapData: data });
});

app.get("/task1", (req, res) => {
  const data = { "task 1 data": task1() };

  res.json(data);

  fs.writeFileSync("output1.txt", JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

app.get("/task2", (req, res) => {
  const data = { "task 2 data": task2() };

  res.json(data);

  fs.writeFileSync("output2.txt", JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

app.get("/task3", (req, res) => {
  const data = { "task 3 data": task3() };

  res.json(data);

  fs.writeFileSync("output3.txt", JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
