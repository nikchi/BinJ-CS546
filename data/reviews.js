const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = require("./users");
const uuid = require('node-uuid');

let exportedMethods = {
  getAllReviews() {
    return reviews().then((reviewsCollection) => {
      return reviewsCollection.find({}).toArray();
    })
  },
  getReviewById(id) {
    return reviews().then((reviewsCollection) => {
      return reviewsCollection.findOne({_id: id}).then((review) => {
        if (!review) throw "review not found";
        return review;
      });
    });
  },
  addReview(title, poster, body) {
    return reviews().then((reviewsCollection) => {
      let newReview = {
        _id: uuid.v4(),
        title: title,
        poster: poster,
        body: body,
        rating: 0,
        flagged: false
      };
      return reviewsCollection.insertOne(newReview).then((newInsertedInformation) => {
        return newInsertedInformation.insertedId;
      }).then((newId) => {
        return this.getReviewById(newId);
      });    
    });
  }
};


module.exports = exportedMethods;