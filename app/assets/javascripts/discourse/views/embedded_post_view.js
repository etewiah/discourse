/**

**/
Discourse.HappeningView = Discourse.View.extend({


  didInsertElement: function() {
    $( "#datepicker" ).datepicker();
    // Discourse.ScreenTrack.instance().track(this.get('elementId'), this.get('post.post_number'));
  },

  willDestroyElement: function() {
    // Discourse.ScreenTrack.instance().stopTracking(this.get('elementId'));
  }

});


