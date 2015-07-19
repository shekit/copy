Clips = new Mongo.Collection('clips')

if (Meteor.isClient) {
    Template.create.events({
      'click .create':function(event){
        event.preventDefault();

        Meteor.call('addClip');
      }
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('remote-clips', function(){
    return Clips.find();
  })

  Meteor.methods({
    'addClip': function(){

      Clips.insert({
          name:"New Copy thing",
          created: new Date(),
          user: "abhi"
      });

    },

    'returnTopClip': function(){
      return Clips.findOne({},{sort:{created:-1}});
    }


  })
}
