const mongoCollections = require("../config/mongoCollections");
const shows = mongoCollections.shows;
const users = require("./users");
const reviewsData = require("./reviews");
const uuid = require('node-uuid');

getAverageScore = (show) => {
  if (show.reviews.length == 0)
    show.rating = 0;
  else
    show.rating /= show.reviews.length;
  return show;
}

let exportedMethods = {
  getAllShows() {
    return shows().then((showCollection) => {
      let showsArray = showCollection.find({}).toArray();
      return showsArray.then((returnArray) => {
        returnArray.map(getAverageScore);
        return returnArray;
      });
    });
  },
  getShowById(id) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ _id: id }).then((show) => {
        if (!show) throw "show not found";
        return show;
      });
    });
  },
  getShowByName(name) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ name: name }).then((show) => {
        if (!show) throw "show not found";
        if (show.reviews.length == 0) show.reviews.length = 1;
        show.rating /= show.reviews.length;
        return show;
      });
    });
  },
  changeReviewRateUp(showName, reviewId) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ name: showName }).then((show) => {
        if (!show) throw "show not found";
        let newScore = ++show.reviews.find(review => review._id == reviewId).score;
        if (newScore < -20) show.reviews.find(review => review._id == reviewId).flagged = true;
        if (newScore > -20) show.reviews.find(review => review._id == reviewId).flagged = false;
        return showCollection.updateOne({ _id: show._id }, show, { upsert: true }).then(() => {
          return newScore;
        });
      });
    });
  },
  changeReviewRateDown(showName, reviewId) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ name: showName }).then((show) => {
        if (!show) throw "show not found";
        let newScore = --show.reviews.find(review => review._id == reviewId).score;
        if (newScore < -20) show.reviews.find(review => review._id == reviewId).flagged = true;
        if (newScore > -20) show.reviews.find(review => review._id == reviewId).flagged = false;
        return showCollection.updateOne({ _id: show._id }, show, { upsert: true }).then(() => {
          return newScore;
        });
      });
    });
  },
  addReviewToShow(showId, poster, title, body) {
    let newReview = {
      _id: uuid.v4(),
      title: title,
      body: body,
      poster: poster,
      rating: 0,
      flagged: false
    };
    return shows().then((showCollection) => {
      return showCollection.findOne({ _id: showId }).then((show) => {
        if (!show) throw "show not find";
        show.reviews.push(newReview);
        return newReview;
      });
    });
  },
  addReviewToShowByName(showName, poster, title, body, rating) {
    if (rating < 0) rating = 0;
    if (rating > 10) rating = 10;
    let newReview = {
      _id: uuid.v4(),
      title: title,
      body: body,
      poster: poster? poster : "Anonymous",
      rating: rating,
      score: 0,
      flagged: false
    };
    return shows().then((showCollection) => {
      return showCollection.findOne({ name: showName }).then((show) => {
        if (!show) throw "show not found";
        return showCollection.updateOne({ _id: show._id }, {
          $addToSet: {
            reviews: newReview
          },
          $inc: {
            rating: rating
          }
        });
      });
    });
  },
  addShow(name, description, thumbnail, preview, rating, reviews) {
    return shows().then((showCollection) => {
      let newShow = {
        name: name,
        description: description,
        thumbnail: thumbnail,
        preview: preview,
        rating: rating,
        reviews: [],
        _id: uuid.v4()
      };

      return showCollection.insertOne(newShow).then((newInsertInformation) => {
        return newInsertInformation.insertedId;
      }).then((newId) => {
        return this.getShowById(newId);
      });
    });
  },
  removeShow(id) {
    return shows().then((showCollection) => {
      return showCollection.removeOne({ _id: id }).then((deletionInfo) => {
        if (deletionInfo.deletedCount === 0) {
          throw (`Could not delete post with id of ${id}`)
        } else { }
      });
    });
  }
}

module.exports = exportedMethods;
