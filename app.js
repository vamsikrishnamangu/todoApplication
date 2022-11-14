const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server started running http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Db error ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const getQuery = `SELECT * FROM todo;`;
  const getQueryResponse = await db.all(getQuery);
  response.send(getQueryResponse);
  console.log(getQueryResponse);
});
