const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
/*
{
	_id:1111-2222-3333-4444
	sessionId:cookies1234
	hashedPassword:#hunter1
	Username:”i-like-shows”
	profilePicture:”picturedata”
	Bio:”text bio”
}
*/
let exportedMethods = {
  getAllUsers() {
    return users().then((userCollection) => {
      return userCollection.find({}).toArray();
    });
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  getUserById(id) {
    return users().then((userCollection) => {
      return userCollection.findOne({ _id: id }).then((user) => {
        if (!user) throw "User not found";

        return user;
      });
    });
  },
  addUser(username, hashedPassword, profilePicture, bio) {
    return users().then((userCollection) => {
      let newUser = {
        username: username,
        hashedPassword: hashedPassword,
        _id: uuid.v4(),
        profilePicture: profilePicture,
        bio: bio
      };

      return userCollection.insertOne(newUser).then((newInsertInformation) => {
        return newInsertInformation.insertedId;
      }).then((newId) => {
        return this.getUserById(newId);
      });
    });
  },
  
  removeUser(id) {
    return users().then((userCollection) => {
      return userCollection.removeOne({ _id: id }).then((deletionInfo) => {
        if (deletionInfo.deletedCount === 0) {
          throw (`Could not delete user with id of ${id}`)
        }
      });
    });
  }
}

module.exports = exportedMethods;