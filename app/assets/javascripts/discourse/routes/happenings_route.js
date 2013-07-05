Discourse.HappeningInCityRoute = Ember.Route.extend({
  events: {
    talkAboutHappening: function(happening){
      Discourse.Route.showModal(this, 'createHappeningTopic', happening);
    }
    // createCategory: function() {
    //   Discourse.Route.showModal(this, 'editCategory', Discourse.Category.create({ color: 'AB9364', text_color: 'FFFFFF', hotness: 5 }));
    //   this.controllerFor('editCategory').set('selectedTab', 'general');
    // }
  },

  model: function(params) {
    var controller = this.controllerFor('happeningInCity');
    controller.set('happeningCity', params.city);
    // var happeningsController = this.controllerFor('listHappenings');
    // // below is used by nav_item_view to calculate which tab is active:
    // if (happeningsController) happeningsController.set('filterMode', "happenings");

    // Ed: below is the only way I have found to be able to set the city so I can 
    // retrieve it again in another method (if I need to get happenings from remote api..)
    Discourse.Happening.happeningCity = params.city;
    return Discourse.Happening.load(params.city);
    // happeningsController.load();
  },

  renderTemplate: function() {
    this.render('happenings', {
    });
  },

  setupController: function(controller, model) {
    controller.set('content', model);
  }


});


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
