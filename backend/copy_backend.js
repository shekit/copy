Clips = new Mongo.Collection('clips')

if (Meteor.isClient) {

	Meteor.subscribe('local');

	Template.registerHelper('formatDate', function(date){
		return moment(date).format('DD-MM-YYYY');
	});

	Template.list.helpers({
		'list': function(){
			return Clips.find();
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // enables cross site scripting allowing clients to access server
    WebApp.connectHandlers.use(function(req,res,next){
    	res.setHeader('Access-Control-Allow-Origin','*');
    	return next();
    })
  });

  Meteor.publish('local', function(){
  	return Clips.find({},{sort:{created:-1}});
  })

  Meteor.publish('remote-desktop-clips', function(){
    return Clips.find({fromDesktop:false}, {sort:{created:-1}, limit:5});
  });

  Meteor.publish('remote-mobile-clips', function(){
  	return Clips.find({fromDesktop:true}, {sort:{created:-1}, limit:5});
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
