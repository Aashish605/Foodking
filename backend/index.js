import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./Db/db.js";
import items from "./Routes/items.Route.js";
import orderitem from "./Routes/orderitem.Route.js";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import { Strategy as LocalStrategy } from "passport-local";
import loginSchema from "./Models/login.Model.js";
import bcrypt from 'bcryptjs'

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://foodking-eta.vercel.app",
      "https://foodking-s5cg.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());


//session which is saved in the same database as other data and we save the collection inside the same db.
const MongoStore = new connectMongo({
  mongoUrl: process.env.MONGOURL, // Reuse the same MongoDB connection string
  collectionName: "sessions", // Custom collection for sessions
});

app.use(session({
  store: MongoStore,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // domain: "https://foodking-s5cg.vercel.app/",
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // sameSite: "lax"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", items);
app.use("/", orderitem);


passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await loginSchema.findOne({ username })
      if (!user) return done(null, false, { message: "User not found" })

      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) return done(null, user)
      else return done(null, false, { message: "incorrect password" })
    } catch (error) {
      return done(error)
    }
  }
));

passport.serializeUser((user, done) => {
  console.log("we in searlize");
  done(null, user._id)
}
)
passport.deserializeUser(async (_id, done) => {
  try {
    console.log("in desearlize");
    const user = await loginSchema.findById(_id);
    done(null, user)
  } catch (error) {
    done(error)
  }
}
)

app.post("/register", async (req, res) => {
  try {
    const data = await loginSchema.find()
    if (data.length === 0) {
      const { username, password, Gmail } = req.body;
      const hashedPass = await bcrypt.hash(password, 10)
      const newUser = new loginSchema({ username, Gmail, password: hashedPass })
      console.log("new user", newUser);
      await newUser.save()
      res.status(201).json({ message: "user registered" })
    } else {
      console.log("data already present")
    }
  } catch (error) {
    res.status(500).json({ error: "error registering asshihs user", message: error })
  }

})

app.post("/logIn", passport.authenticate("local"), async (req, res) => {
  console.log("the auth user is : ", req.user);
  res.status(200).json({
    message: "login success",
    username: req.user.username
  })
})

app.get("/check", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "auth success",
      username: req.user.username
    })
  }
  else {
    res.status(401).json({
      message: "unauth user"
    })
  }
})


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
