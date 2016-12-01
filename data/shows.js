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
  getReviewsById(id) {
    return reviews().then((reviewsCollection) => {
      return reviewsCollection.findOne({ _id: id }).then((reviews) => {
        if (!reviews) throw "Review not found";
        return reviews;
      });
    });
  },
  //WORK ON THIS
  addPost(title, body, posterId) {
    return reviews().then((reviewsCollection) => {
      return users.getUserById(posterId)
        .then((userThatPosted) => {
          let newPost = {
            title: title,
            body: body,
            poster: {
              id: posterId,
              name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
            },
            _id: uuid.v4()
          };

          return postCollection.insertOne(newPost).then((newInsertInformation) => {
            return newInsertInformation.insertedId;
          }).then((newId) => {
            return this.getPostById(newId);
          });
        });
    });
  },
  removeReviews(id) {
    return reviews().then((reviewsCollection) => {
      return reviewsCollection.removeOne({ _id: id }).then((deletionInfo) => {
        if (deletionInfo.deletedCount === 0) {
          throw (`Could not delete post with id of ${id}`)
        } else { }
      });
    });
  },
  //WORK ON THIS
  updatePost(id, title, body, posterId) {
    return posts().then((postCollection) => {
      return users.getUserById(posterId)
        .then((userThatPosted) => {
          let updatedPost = {
            title: title,
            body: body,
            poster: {
              id: posterId,
              name: userThatPosted.name
            }
          };

          return postCollection.updateOne({ _id: id }, updatedPost).then((result) => {
            return this.getPostById(id);
          });
        });
    });
  }
}

module.exports = exportedMethods;