const userRoutes = require("./users");
const showsRoutes = require("./shows");
const path = require("path");

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/shows", showsRoutes);

    app.use("*", (req, res) => {
      let route = path.resolve("public/html/404.html");
      res.status(404);
      res.sendFile(route);
    });
};

module.exports = constructorMethod;
