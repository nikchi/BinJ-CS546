const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const shows = data.shows;
const users = data.users;

dbConnection().then((db) => {
	return db.dropDatabase().then(() => {
		return dbConnection;
	}).then((db) => {
		return shows.addShow("westworld", "have you ever questioned the nature of your reality", "http://www.gstatic.com/tv/thumb/tvbanners/13108003/p13108003_b_v8_aa.jpg", "https://www.youtube.com/embed/1D-GWBgnTJU", 0, []);
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "steve", "good show", "i like this show");
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "ricky", "bad show", "i hate this show");
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "LANA", "show", "show");
	}).then(() => {
		return shows.addShow("Archer", "cel shaded guns", "archer pict", "", 0,[]);
	}).then(() => {
		return shows.addShow("Game of Thrones", "sean bean dies", "thrones pict", "", 0,[]);
	}).then(() => {
		console.log("Database seeded");
		db.close();
	})
}, (error) => {
	console.error(error);
});