Discourse.HappeningsRoute = Ember.Route.extend({
  model: function() {
    var happeningsController = this.controllerFor('happenings');
    if (happeningsController) happeningsController.set('filterMode', "music");
    // return Discourse.Happening.getFromLastfm();
    return happeningsController.load();
  }

});
