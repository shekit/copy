Clips = new Mongo.Collection('clips')

if (Meteor.isClient) {
  // counter starts at 0

  Template.list.helpers({
    list: function () {
      return Clips.find().fetch();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
