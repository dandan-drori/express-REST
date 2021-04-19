function addUserIfValid(users, req, res, login) {
  users.forEach((user) => {
    for (i = 0; i < req.body.length; i++) {
      if (user.email === req.body[i].email) {
        if (user.password === req.body[i].password) {
          login = [...login, user];
          res.json({ message: "Login Successful" });
        } else {
          res.json({ message: `Incorrect password for ${user.email}` });
        }
      }
    }
  });
  return login;
}

function handleUserAlreadyLoggedIn(login, req, res) {
  var isUserLoggedIn = false;
  login.forEach((user) => {
    if (user.email === req.body[0].email) {
      if (user.password === req.body[0].password) {
        res.json({ message: `${user.email} is currently logged in` });
      } else {
        res.json({ message: `Incorrect password for ${user.email}` });
      }
      isUserLoggedIn = true;
    }
  });
  return isUserLoggedIn;
}

module.exports = { addUserIfValid, handleUserAlreadyLoggedIn };
