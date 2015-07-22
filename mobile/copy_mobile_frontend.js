if (Meteor.isClient) {
  // counter starts at 0
  var remote = DDP.connect("http://128.122.6.145:3000/");
  Clips = new Mongo.Collection('clips', remote);
  remote.subscribe('remote-mobile-clips');

  Template.registerHelper('ifRouteIs', function(routeName){
  	if(Router.current().route.getName() == routeName){
  		return "hidden";
  	}
  	return "visible";
  });

  Template.list.helpers({
    list: function(){
      return Clips.findOne({fromDesktop:true},{sort:{created:-1}});

    }
  });

  Template.list.events({
    'submit #paste': function(event) {
      event.preventDefault();
      var content = event.target.content.value;
      if(content){
      	remote.call('addClip', content, false);  //false is for this text being sent from mobile
      }
      event.target.content.value = ''
    }
  });

  Template.archive.helpers({
  	archive: function(){
  		return Clips.find({fromDesktop: true},{sort:{created:-1}, limit: 5});
  	}
  });
}

Router.configure({
	layoutTemplate: 'main'
})

Router.route('/', {
	name: 'home',
	action: function(){
		this.render('list');
	}

})

Router.route('/archive', {
	name: 'archive',
	action: function(){
		this.render('archive');
	}
})

