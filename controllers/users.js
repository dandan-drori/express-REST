const fs = require("fs");

var users = [];

fs.readFile("./db/users.txt", "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }
  users = JSON.parse(data);
});

exports.users_get_all = (req, res) => {
  res.status(200).send(users);
};

exports.users_add_user = (req, res) => {
  users.forEach((user) => {
    for (i = 0; i < req.body.length; i++) {
      if (user.id === req.body[i].id) {
        res.status(409).send(`User with id ${user.id} already exists!`);
        return;
      } else if (user.email === req.body[i].email) {
        res.status(409).send(`User with email ${user.email} already exists!`);
        return;
      }
    }
  });
  if (req.body) {
    users = [...users, ...req.body];
    fs.writeFile("./db/users.txt", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  if (
    !req.body ||
    !req.body[0].id ||
    !req.body[0].name ||
    !req.body[0].email ||
    !req.body[0].password
  ) {
    res.status(500).send("Post Operation Unsuccessful");
  } else {
    res.status(200).send("Post Operation Successful");
  }
};

exports.users_update_user = (req, res) => {
  if (req.body.name) {
    users.map((user) => {
      if (user.id == req.body.id) {
        user.name = req.body.name;
        fs.writeFile("./db/users.txt", JSON.stringify(users), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
  if (req.body.email) {
    users.map((user) => {
      if (user.id == req.body.id) {
        user.email = req.body.email;
      }
      fs.writeFile("./db/users.txt", JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  if (!req.body.name && !req.body.email) {
    res.status(404).send("Error");
  }
  res.status(200).send("Put Operation Successful");
};

exports.users_delete_user = (req, res) => {
  if (req.body.id) {
    const newUsers = users.filter((user) => user.id != req.body.id);
    fs.writeFile("./db/users.txt", JSON.stringify(newUsers), (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.status(500).send("Error, id is required");
  }
  res.status(200).send("Delete Operation Successful");
};
