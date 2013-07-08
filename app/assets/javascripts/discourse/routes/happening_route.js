// Thought I might have needed to setup left nav items here but it turns out
// its not necessary...
Discourse.HappeningRoute = Ember.Route.extend({


  model: function(params) {
    // Ed: below is the only way I have found to be able to set the city so I can 
    // retrieve it again in another method (if I need to get happenings from remote api..)
    Discourse.Happening.happeningCity = params.city;
    // var controller = this.controllerFor('happening');
    // controller.set('happeningCity', 'Madrid');
      // params.city);
  }

  // renderTemplate: function() {
  //   this.render('happenings', {
  //     into: 'list', 
  //     outlet: 'listView',
  //     controller: 'listHappenings'
  //   });
  // },

  // setupController: function(controller, model) {
  //   controller.set('content', model);

  // }


});
