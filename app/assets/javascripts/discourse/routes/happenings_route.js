// TODO - remove
Discourse.ListHappeningsRoute = Ember.Route.extend({
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
    var happeningsController = this.controllerFor('listHappenings');
    // below is used by nav_item_view to calculate which tab is active:
    if (happeningsController) happeningsController.set('filterMode', "happenings");
    // return Discourse.Happening.getFromLastfm();
    // debugger;
    // var happeningsModel = this.modelFor('happening');
    return Discourse.Happening.load();
    // happeningsController.load();
  },

  renderTemplate: function() {
    this.render('happenings', {
      into: 'list', 
      outlet: 'listView',
      controller: 'listHappenings'
    });
  },

  setupController: function(controller, model) {
    controller.set('content', model);

  }


});
