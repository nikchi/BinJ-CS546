const userRoutes = require("./users");
const showsRoutes = require("./shows");

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/shows", showsRoutes);

    app.use("*", (req, res) => {
        res.redirect("/shows");
    })
};

module.exports = constructorMethod;