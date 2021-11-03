const passport = require("passport");
const LocalStrategy = require("passport-local");
const argon2 = require("argon2");
const db = require("../config/firebase");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            const userRef = db.collection("users").doc(email);
            const user = await userRef.get();
            if (!user.exists) {
                console.log("user does not exixt");
                return done(null, false);
            } else {
                try {
                    if (await argon2.verify(user.data().password, password)) {
                        return done(null, user.data());
                    } else {
                        console.log("password does not match");
                        return done(null, false);
                    }
                } catch (err) {
                    console.log("error verifying password hash");
                    return done(null, false);
                }
            }
        }
    )
);
passport.serializeUser((user, done) => {
    const usr = {
        email: user.email,
        id: user.id,
    };
    done(null, usr);
});

passport.deserializeUser(async (usr, done) => {
    const userRef = db.collection("users").doc(usr.email);
    const user = await userRef.get();
    if (!user.exists) {
        console.log("error finding user->deserializer");
        return done(null, false);
    }
    return done(null, user);
});

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
