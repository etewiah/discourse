Discourse.HappeningsRoute = Ember.Route.extend({
  events: {
 	  talkAboutHappening: function(happening){
	    Discourse.Route.showModal(this, 'createHappeningTopic', happening);
	  }
    // createCategory: function() {
    //   Discourse.Route.showModal(this, 'editCategory', Discourse.Category.create({ color: 'AB9364', text_color: 'FFFFFF', hotness: 5 }));
    //   this.controllerFor('editCategory').set('selectedTab', 'general');
    // }
  },

  model: function() {
    var happeningsController = this.controllerFor('happenings');
    if (happeningsController) happeningsController.set('filterMode', "music");
    // return Discourse.Happening.getFromLastfm();
    // debugger;
    // var happeningsModel = this.modelFor('happening');
    return Discourse.Happening.load();
    // happeningsController.load();
  }

});
