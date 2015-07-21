

if (Meteor.isClient) {
  var remote = DDP.connect("http://localhost:3000/");
  Clips = new Mongo.Collection('clips', remote);
  remote.subscribe('remote-desktop-clips');

  Template.list.helpers({
    list: function(){
      return Clips.findOne({fromDesktop:false},{sort:{created:-1}});
    }
  });

  Template.list.events({
    'submit #paste': function(event) {
      event.preventDefault();
      var content = event.target.content.value;
      if(content){
      	remote.call('addClip', content, true);  //true is for this text being sent from desktop
      }
      event.target.content.value = ''
    },

    'click .pasted-from': function(event){
    	$(event.target).select();
    }
  });

  Template.archive.helpers({
  	archive: function(){
  		return Clips.find({fromDesktop: false},{sort:{created:-1}, limit: 5});
  	}
  });

  Template.archive.events({
  	'click .pasted-from': function(event){
  		$(event.target).select();
  	}
  })

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

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
