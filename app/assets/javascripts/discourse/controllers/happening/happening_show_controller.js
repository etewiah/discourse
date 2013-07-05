
Discourse.HappeningShowController =  Discourse.Controller.extend({

  availableNavItems: function() {
    var loggedOn = !!Discourse.User.current();

    return Discourse.SiteSettings.top_menu.split("|").map(function(i) {
      return Discourse.NavItem.fromText(i, {
        loggedOn: loggedOn
      });
    }).filter(function(i) {
      return i !== null;
    });
  }.property(),


  navLeftItems: function() {
    var loggedOn = !!Discourse.User.current();

    return "Madrid|Barcelona".split("|").map(function(i) {
      return Discourse.NavLeftItem.fromText(i, {
        loggedOn: loggedOn
      });
    }).filter(function(i) {
      return i !== null;
    });
  }.property()


});






