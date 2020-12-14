const { user } = require("../models");

module.exports = {
  signInController: async (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    // console.log(req.body);
    const { email, password } = req.body;
    let userInfo = await user.findOne({
      where: { email, password },
    });

    // console.log(userInfo);
    if (!userInfo) {
      res.status(404).send("invalid user");
    } else {
      req.session.userid = userInfo.id;
      res.status(200).send({
        id: userInfo.id,
      });
    }
  },

  signUpController: async (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    const { username, password, mobile, email } = req.body;

    if (!username || !password || !mobile || !email) {
      res.status(422).send("insufficient parameters supplied");
      return;
    }

    let [userInfo, created] = await user.findOrCreate({
      where: { email },
      defaults: { email, password, username, mobile },
    });

    if (!created) {
      res.status(409).send("email exists");
    } else {
      res.status(201).send({
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
        mobile: userInfo.mobile,
      });
    }
  },

  signOutController: (req, res) => {
    // TODO: 로그아웃 로직 작성
    req.session.destroy();
    res.status(205).send("Logged out successfully");
  },

  userController: async (req, res) => {
    // TODO : 유저 회원정보 요청 로직 작성

    if (req.session.userid) {
      let findUserData = await user.findOne({
        where: { id: req.session.userid },
      });

      if (findUserData) {
        res.status(200).send({
          id: req.session.userid,
          username: findUserData.username,
          email: findUserData.email,
          mobile: findUserData.mobile,
        });
      }
    } else {
      res.status(401).send("");
    }
  },
};
