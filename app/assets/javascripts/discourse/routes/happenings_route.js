Discourse.HappeningsRoute = Ember.Route.extend({
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
