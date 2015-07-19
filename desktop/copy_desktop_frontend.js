

if (Meteor.isClient) {
  var remote = DDP.connect("http://localhost:3000/");
  Clips = new Mongo.Collection('clips', remote);
  remote.subscribe('remote-clips');

  Template.list.helpers({
    list: function(){
      return Clips.findOne({},{sort:{created:-1}});
    }
  });

  Template.list.events({
    'click .add': function(event) {
      event.preventDefault();
      remote.call('addClip');
    }
  })

}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
