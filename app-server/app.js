const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const csvParser = require("csv-parser");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

let uploadedData = []; // This will store our CSV data in memory

app.use(cors());
app.use(bodyParser.json());

app.post("/upload", upload.single("file"), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      uploadedData = results;
      console.log(uploadedData);
      fs.unlinkSync(req.file.path); // Remove the file after parsing
      res
        .status(200)
        .json({ message: "File uploaded and parsed successfully" });
    });
});

app.get("/data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const search = (req.query.search || "").toLowerCase();
  console.log(`page: ${page}, pageSize: ${pageSize}, search: ${search}`);

  const filteredData = uploadedData.filter((entry) =>
    Object.values(entry).some((value) => value.toLowerCase().includes(search))
  );

  const offset = (page - 1) * pageSize;
  const paginatedItems = filteredData.slice(offset, offset + pageSize);

  res.json({
    page,
    pageSize,
    total: filteredData.length,
    totalPages: Math.ceil(filteredData.length / pageSize),
    data: paginatedItems,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
