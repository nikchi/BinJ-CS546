const mongoCollections = require("../config/mongoCollections");
const shows = mongoCollections.shows;
const users = require("./users");
const reviewsData = require("./reviews");
const uuid = require('node-uuid');

let exportedMethods = {
  getAllShows() {
    return shows().then((showCollection) => {
      return showCollection.find({}).toArray();
    })
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
        return show;
      });
    });
  },
  changeReviewRateUp(showId, reviewId) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ _id: id }).then((show) => {
        if (!show) throw "show not found";
        return show.reviews.updateOne({ _id: reviewId }, { $inc: { "reviews.rating": 1 } });
      });
    });
  },
  changeReviewRateUp(showId, reviewId) {
    return shows().then((showCollection) => {
      return showCollection.findOne({ _id: id }).then((show) => {
        if (!show) throw "show not found";
        return show.reviews.updateOne({ _id: reviewId }, { $inc: { "reviews.rating": -1 } });
      });
    });
  },
  addReviewToShow(showId, poster, title, body) {
    let newReview = {
      _id : uuid.v4(),
      title: title,
      body: body,
      poster: poster,
      rating: 0,
      flagged: false
    };
    return shows().then((showCollection) => {
      return showCollection.findOne({ _id: showId}).then((show) => {
        if (!show) throw "show not find";
        show.reviews.push(newReview);
        return newReview;
      });
    });
  },
  addReviewToShowByName(showName, poster, title, body) {
    let newReview = {
      _id : uuid.v4(),
      title: title,
      body: body,
      poster: poster,
      rating: 0,
      flagged: false
    };
    return shows().then((showCollection) => {
      return showCollection.findOne({ name: showName}).then((show) => {
        if (!show) throw "show not found";
        show.reviews.push(newReview);
        return newReview;
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