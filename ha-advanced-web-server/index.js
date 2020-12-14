const express = require("express");
require("./models");
const session = require("express-session");
const cors = require("cors");

// TODO : express-session, cors 등 필요한 middleware를 추가하세요.

const mainController = require("./controllers");

const app = express();

const port = 4000;

let corsOption = {
  origin: ["http://localhost:3000"],
  method: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(
  session({
    secret: "HAiseasypeasy",
    resave: false,
    saveUninitialized: true,
  })
);

// TODO : express-session, cors 등 필요한 middleware를 적용하세요.

app.get("/user", mainController.userController);
app.post("/signin", mainController.signInController);
app.post("/signup", mainController.signUpController);
app.post("/signout", mainController.signOutController);

// NOTICE 테스트를 위한 코드 입니다. 건들지 않으셔도 좋습니다.
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
}

module.exports = app;

// npx sequelize-cli model:generate --name user --attributes username:string,password:string,email:string,mobile:integer
