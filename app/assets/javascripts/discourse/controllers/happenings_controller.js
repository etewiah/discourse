
Discourse.HappeningsController = Ember.ArrayController.extend({
// Discourse.Controller.extend({
  // categoryBinding: 'topicList.category',
  // canCreateCategory: false,
  // canCreateTopic: false,
  
  // // needs: ['composer', 'modal', 'listTopics'],
  // needs: ['composer','listTopics'],

  // categoriesEven: function() {
  //   debugger;
  //   if (this.blank('categories')) return Em.A();

  //   return this.get('categories').filter(function(item, index) {
  //     return (index % 2) === 0;
  //   });
  // }.property('categories.@each'),

  // categoriesOdd: function() {
  //   if (this.blank('categories')) return Em.A();
  //   return this.get('categories').filter(function(item, index) {
  //     return (index % 2) === 1;
  //   });
  // }.property('categories.@each'),


  availableNavItems: function() {
    var summary = this.get('filterSummary');
    var loggedOn = false;
    // !!Discourse.User.current();
    // return Discourse.SiteSettings.top_menu.split("|").map(function(i) {
    return "music|meetups".split("|").map(function(i) {
      return Discourse.NavItem.fromText(i, {
        loggedOn: loggedOn
      });
    }).filter(function(i) {
      return i !== null;
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
  }.observes('filterMode', 'category'),

  load: function(subreddit) {

      var save_bulk = this.save;

      var url = "/data/madrid.json";
      return $.getJSON(url).then(function (response) {
          var links = [];
          $(response.events.event).each(function() {  
             
               
                var happeningResource = Discourse.Happening.create({
                  title: this.title,
                  // description: this.description,
                  origin: "last_fm",
                  start_date: this.startDate,
                  external_urls: [ {url: this.url, trait: "source" }],
                  json_details: JSON.stringify(this)
                });

                if (this.image[1]['#text']){
                  var pictures = [{
                    alt: "medium",
                    url: this.image[1]['#text']
                  }];
                  happeningResource.set('pics', pictures);
                  // happeningResource.set('description', pictures);
                  // happeningResource.set('traits', pictures)
                }
            links.push(happeningResource);
          });
         return links; 
      });
  },

  save: function(args) {
    var url = "/categories";
    if (this.get('id')) {
      url = "/categories/" + (this.get('id'));
    }

    return Discourse.ajax(url, {
      data: {
        name: this.get('name'),
        color: this.get('color'),
        text_color: this.get('text_color'),
        hotness: this.get('hotness'),
        secure: this.get('secure'),
        group_names: this.get('groups').join(","),
        auto_close_days: this.get('auto_close_days')
      },
      type: this.get('id') ? 'PUT' : 'POST'
    });
  }


});






