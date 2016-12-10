const myRoutes = require("./myRoutes");

const constructorMethod = (app) => {
    app.use("/", myRoutes);

    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = constructorMethod;