
Discourse.HappeningInCityController = Ember.ArrayController.extend({
// Discourse.Controller.extend({
  // categoryBinding: 'topicList.category',
  // canCreateCategory: false,
  // canCreateTopic: false,
  
  // // needs: ['composer', 'modal', 'listTopics'],
  // needs: ['composer','listTopics'],


  navLeftItems: function() {
    var loggedOn = !!Discourse.User.current();

    return "Madrid|Barcelona".split("|").map(function(i) {
      return Discourse.NavLeftItem.fromText(i, {
        loggedOn: loggedOn
      });
    }).filter(function(i) {
      return i !== null;
    });
  }.property(),


  happeningsOdd: function() {
      var content = this.get('content');

      // if (!content || !this.get('hideInactive'))
      //     return content;


      // if (this.blank('categories')) return Em.A();
      return content.filter(function(item, index) {
        return (index % 2) === 1;
      });
  }.property('content.isLoaded'),

// Ed: TODO: figure out what dif 'content.isLoaded' makes
// I think the above gets called again when I navigate back client side.....

   happeningsEven: function() {
      var content = this.get('content');

      return content.filter(function(item, index) {
        return (index % 2) === 0;
      });
  }.property(),

  // Put in the appropriate page title based on our view
  updateTitle: function() {
    if (this.get('filterMode') === 'music') {
      return Discourse.set('title', "Music");
    } else {

      // if (this.present('category')) {
      //   return Discourse.set('title', this.get('category.name').capitalize() + " " + Em.String.i18n('topic.list'));
      // } else {
      //   return Discourse.set('title', Em.String.i18n('topic.list'));
      // }
    }
  }.observes('filterMode', 'category')


});






