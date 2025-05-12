import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./Db/db.js";
import items from "./Routes/items.Route.js";
import orderitem from "./Routes/orderitem.Route.js";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import localStrategy from "passport-local";
const LocalStrategy = localStrategy.Strategy; //initializing local strategy
import loginSchema from "./Models/login.Model.js";
//use express validation for the backend validation of data.

dotenv.config();

const app = express();
//middleware
app.use(
  cors({
    origin: [
      "https://foodking-eta.vercel.app/"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

//Routes
app.use("/", items);
app.use("/", orderitem);

//session which is saved in the same database as other data and we save the collection inside the same db.
const MongoStore = new connectMongo({
  mongoUrl: process.env.MONGOURL, // Reuse the same MongoDB connection string
  collectionName: "sessions", // Custom collection for sessions
});

const sessionProperty = {
  secure: true,
  store: MongoStore,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    // httpOnly: true,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24,
  },
};
app.use(session(sessionProperty));

//initialize passport and use session
app.use(passport.initialize());
app.use(passport.session());

// //Local authentication
passport.use(new LocalStrategy(loginSchema.authenticate()));
passport.serializeUser(loginSchema.serializeUser());
passport.deserializeUser(loginSchema.deserializeUser());

//this is post signup
app.post("/signup", async (req, res) => {
  try {
    let { username, Gmail, password } = req.body;
    if (!Gmail || !password || !username) {
      return res
        .status(400)
        .json({ error: "Username or Gmail or password is missing" });
    }
    const existinguser = await loginSchema.findOne({ Gmail });
    if (existinguser) {
      return res.status(400).send("Email is registered already please login");
    }
    //password-local-mongoose handle the hashing
    const newUser = new loginSchema({ username, Gmail });
    const registeredUser = await loginSchema.register(newUser, password); //this will automatically hashed the password and data is saved internally into the database.
    console.log(registeredUser);
    res.status(201).send("Users registered successfully!!!");
  } catch (error) {
    console.log("error during user registration", error.message);
    res
      .status(500)
      .json({ error: "Internal sever error.Please try again later." });
  }
});

// Login post route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed", ...info });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      // Session cookie will be set automatically after req.logIn
      return res.status(200).json({
        message: "Login successful",
        user: { id: user._id, username: user.username },
      });
    });
  })(req, res, next);
});

//login get route
app.get("/auth/check", (req, res) => {
  console.log(
    "Inside /auth/check - req.isAuthenticated():",
    req.isAuthenticated()
  );
  res.json({ isAuthenticated: req.isAuthenticated() });
});

async function startServer() {
  try {
    await ConnectDB();
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error during starting server", error.message);
  }
}
startServer();
