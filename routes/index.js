const userRoutes = require("./user");
const showsRoutes = require("./shows");
const reviewsRoutes = require("./reviews");

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/shows", showsRoutes);
    app.use("/reviews", reviewsRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;