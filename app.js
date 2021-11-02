let express = require("express");
const path = require("path");
let session = require("express-session");
let redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
require("dotenv").config();
let app = express();
const cors = require("cors");
const { urlencoded, json } = require("body-parser");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./")));
app.use(
  session({
    name: "user_id",
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, //10min
      httpOnly: true,
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.secret,
    resave: false,
  })
);

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  if (!req.session.currentUser) {
    res.render("home.ejs", { title: "Myntra Ambassador" });
  } else {
    res.render("dashboard.ejs");
  }
});

let login = require("./routes/login");
app.use("/", login);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});
