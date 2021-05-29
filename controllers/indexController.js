const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//////////////asyncawait
const user_register = async (req, res) => {
  const { user, pwd1, pwd2 } = req.body;

  if (pwd1 != pwd2)
    return res
      .status(400)
      .json({ error: null, message: `Password doesn't match` });

  try {
    const existedUser = await User.findOne({ user: user });
    if (existedUser)
      return res
        .status(402)
        .json({ error: true, message: `${user} is already existed` });
    const createdUser = await User.create({
      user,
      pwd: bcrypt.hashSync(pwd1, 10),
    });
    res
      .status(201)
      .json({ error: false, message: `${createdUser.user} has been created` });
  } catch {
    res
      .status(400)
      .json({ error: true, message: `Error processing with Database` });
  }
};

//////////////////callback
const user_register2 = (req, res) => {
  const { user, pwd1, pwd2 } = req.body;

  if (pwd1 != pwd2)
    return res
      .status(400)
      .json({ error: true, message: `Password doesn't match` });

  User.findOne({ user: user }, (err, data) => {
    if (err)
      return res
        .status(400)
        .json({ error: true, message: `Error processing with Database` });

    if (data)
      return res
        .status(400)
        .json({ error: false, message: `${user} has already existed` });

    User.create({ user, pwd: bcrypt.hashSync(pwd1, 10) }, (err, data) => {
      if (err)
        return res
          .status(400)
          .json({ error: true, message: `Error processing with Database` });
      res
        .status(201)
        .json({ error: false, message: `${user} has been created` });
    });
  });
};

/////promise
const user_register3 = (req, res) => {
  const { user, pwd1, pwd2 } = req.body;

  if (pwd1 != pwd2)
    return res
      .status(400)
      .json({ error: true, message: `Password doesn't match` });

  User.findOne({ user })
    .then((x) => {
      if (x)
        return res
          .status(400)
          .json({ error: true, message: `${user} has already existed` });

      User.create({ user, pwd: bcrypt.hashSync(pwd1, 10) }).then(
        res
          .status(201)
          .json({ error: false, message: `${user} has been created` })
      );
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ error: true, message: `Error processing with Database` });
    });
};

module.exports = {
  user_register,
  user_register2,
  user_register3,
};
