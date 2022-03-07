const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const path = require("path");

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});

//POST endpoint
app.post("/fetchData", (req, res) => {
  console.log("body =  ", req.body);
  let name = req.body.name;
  let date = new Date(req.body.date);

  const day = date.getDay();
  const dayMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const message = "Hi " + name + ", you were born on a " + dayMap[day] + " !";

  console.log(message);

  res.send(JSON.stringify({ message: message }));
});
