import fs from "fs";

export function readDataFromFile(path) {
  try {
    const data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading from db.json", err);
  }
}

// Helper function to write data to db.json asynchronously
export function writeDataToFile(path, data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to db.json", err);
  }
}
