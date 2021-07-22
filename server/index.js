const express = require("express");
const filesUpload = require("express-fileupload");
require("dotenv").config();
const fs = require("fs");
const app = express();
const db = require("./lib/db");
const cors = require("cors");

app.use(
  cors({
    origin: function (origin, callback) {
      // let list = [
      // 	process.env.DEV_APP_URL,
      // 	process.env.PROD_APP_URL,
      // ];
      callback(null, origin);
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
app.use(
  session({
    secret: "street",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.set("view engine", "ejs");
app.use(
  filesUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

let baseUrl;
if (process.env.NODE_ENV === "production") baseUrl = "/api";
else baseUrl = "/";

app.get(baseUrl, async (req, res) => {
  let result = await db.User().find({});
  console.log("index.js>55", result);
  res.send("hello");
});
app.use(async (req, res, next) => {
  db.User().remove({});
  let admin_id = req.cookies[process.env.ADMIN_COOKIE];

  req.auth = {
    admin_id,
  };
  next();
});

const mainRouter = express.Router();

mainRouter.post("/countries", (req, res) => {
  let list = fs
    .readdirSync("countries", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((d) => d.name);
  res.send(list);
});
mainRouter.use("/auth", require("./routes/auth"));
mainRouter.use("/users", require("./routes/users"));

//production enviornment
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(baseUrl, mainRouter);
app.listen(process.env.PORT || 3001);
