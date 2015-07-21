if (Meteor.isClient) {
  // counter starts at 0
  var remote = DDP.connect("http://localhost:3000/");
  Clips = new Mongo.Collection('clips', remote);
  remote.subscribe('remote-mobile-clips');

  Template.list.helpers({
    list: function(){
      return Clips.findOne({fromDesktop:true},{sort:{created:-1}});
    }
  });

  Template.list.events({
    'submit #paste': function(event) {
      event.preventDefault();
      var content = event.target.content.value;
      remote.call('addClip', content, false);  //false is for this text being sent from mobile
      event.target.content.value = ''
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
