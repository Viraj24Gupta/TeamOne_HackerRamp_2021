let express = require("express");
let app = express();
let path = require("path");
let session = require("express-session");
let redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
require("dotenv").config();
let cors = require("cors");
let { urlencoded, json } = require("body-parser");
let passport = require("passport");
let passportLocal = require("./config/passport-local");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(express.static(path.join(__dirname, "./")));

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

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

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
    console.log("http://localhost:" + process.env.PORT);
});
