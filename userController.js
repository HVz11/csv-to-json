const {
  addUsers_query,
  getAgeDistribution_query,
} = require("./userQuery");

const addUsers = async (req, res, next) => {
  try {
    const csvFile = req.files.csvFile;
    if (!csvFile) {
      return res.status(400).json({ error: " CSV file is required." });
    }
    const data = csvFile.data.toString("utf8");
    const lines = data.trim().split("\n");
    const headers = lines.shift().split(",");
    const jsonData = lines.map((line) => {
      const values = line.split(",");
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : "";
      });
      return obj;
    });
    const response = await addUsers_query(jsonData);
    return res.json({ message: "User is added to Database" });
  } catch (error) {
    console.log(error);
  }
};

const getAgeDistribution = async (req, res, next) => {
  try {
    const response = await getAgeDistribution_query();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUsers, getAgeDistribution };
