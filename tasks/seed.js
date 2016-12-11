const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const shows = data.shows;
const users = data.users;

/*  user passwords:
	steve: 
*/
dbConnection().then((db) => {
	return db.dropDatabase().then(() => {
		return dbConnection;
	}).then((db) => {
		return shows.addShow("westworld", "have you ever questioned the nature of your reality", "http://www.gstatic.com/tv/thumb/tvbanners/13108003/p13108003_b_v8_aa.jpg", "https://www.youtube.com/embed/1D-GWBgnTJU", 0, []);
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "steve", "good show", "i like this show", 9);
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "ricky", "bad show", "i hate this show", 1);
	}).then(() => {
		return shows.addReviewToShowByName("westworld", "LANA", "show", "show", 5);
	}).then(() => {
		return shows.addShow("Archer", "cel shaded guns", "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg3NTMwMzY2OF5BMl5BanBnXkFtZTgwMDcxMjQ0NDE@._V1_SY1000_CR0,0,666,1000_AL_.jpg", "https://www.youtube.com/watch?v=-K-Hd3tpk_0", 0,[]);
	}).then(() => {
		return shows.addShow("Game of Thrones", "sean bean dies", "https://images-na.ssl-images-amazon.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg", "", 0,[]);
	}).then(() => {
		return users.addUser("steve", "steverulez99","I really like shows");
	}).then(() => {
		return users.addUser("ricky", "dontcallmerick","I really hate shows");
	}).then(() => {
		return users.addUser("LANA", "fuckarcher", "Shows are okay I guess");
	}).then(() => {
		console.log("Database seeded");
		db.close();
	})
}, (error) => {
	console.error(error);
});