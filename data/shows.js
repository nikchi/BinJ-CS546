const mongoCollections = require("../config/mongoCollections");
const shows = mongoCollections.shows;
const users = require("./users");
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
        if (!show) throw "Review not found";
        return show;
      });
    });
  },
  addShow(name, description, thumbnail, preview, rating, reviews) {
    return reviews().then((reviewsCollection) => {
      return users.getUserById(posterId)
        .then((userThatPosted) => {
          let newShow = {
            name: name,
            description: description,
            thumbnail: thumbnail,
            preview: preview,
            rating: rating,
            reviews: [],
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