Clips = new Mongo.Collection('clips')

if (Meteor.isClient) {
	Template.registerHelper('formatDate', function(date){
		return moment(date).format('DD-MM-YYYY');
	});

	Template.list.helpers({
		'list': function(){
			return Clips.find().fetch()
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('remote-desktop-clips', function(){
    return Clips.find({fromDesktop:false}, {sort:{created:-1}, limit:10});
  });

  Meteor.publish('remote-mobile-clips', function(){
  	return Clips.find({fromDesktop:true}, {sort:{created:-1}, limit:10});
  });

  Meteor.methods({

  	//remote server calls from clients
    'addClip': function(content, fromDesktop){

      Clips.insert({
          content:content,
          fromDesktop: fromDesktop, //boolean value
          created: new Date(),
          user: "abhi"
      });

    },

    'returnTopClip': function(){
      return Clips.findOne({},{sort:{created:-1}});
    }
  })
}
