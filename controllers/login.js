const fs = require("fs");
const { addUserIfValid, handleUserAlreadyLoggedIn } = require("../helpers");

var login = [];
var users = [];

function postMethod() {}

fs.readFile("./db/login.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }
  login = JSON.parse(data);
});

fs.readFile("./db/users.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }
  users = JSON.parse(data);
});

exports.login_get_all = (req, res) => {
  res.status(200).json(login);
};

exports.login_login_user = (req, res) => {
  if (req.body) {
    // handle user is already logged in
    var alreadyLoggedIn = handleUserAlreadyLoggedIn(login, req, res);
    if (alreadyLoggedIn) {
      return;
    }
  }
  // handle invalid request data
  if (!req.body) {
    res.json({ message: "No Data Recieved" });
  } else if (!req.body[0].name) {
    res.json({ message: "Name Invalid" });
  } else if (!req.body[0].email) {
    res.json({ message: "Email Invalid" });
  } else if (!req.body[0].password) {
    res.json({ message: "Password Invalid" });
  }
  // handle no id given, only email (get id from the users database)
  login = addUserIfValid(users, req, res, login);
  fs.writeFile("./db/login.txt", JSON.stringify(login), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.login_signout_user = (req, res) => {
  if (req.body.email) {
    login = login.filter((user) => user.email !== req.body.email);
    fs.writeFile("./db/login.txt", JSON.stringify(login), (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.send({ message: "Error, email is required" });
  }
  res.json({ message: "Signout Operation Successful" });
};
