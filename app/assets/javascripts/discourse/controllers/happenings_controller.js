
Discourse.HappeningsController = Ember.ArrayController.extend({
// Discourse.Controller.extend({
  // categoryBinding: 'topicList.category',
  // canCreateCategory: false,
  // canCreateTopic: false,
  
  // // needs: ['composer', 'modal', 'listTopics'],
  // needs: ['composer','listTopics'],


  // availableNavItems: function() {
  //   var summary = this.get('filterSummary');
  //   var loggedOn = false;
  //   // !!Discourse.User.current();
  //   // return Discourse.SiteSettings.top_menu.split("|").map(function(i) {
  //   return "music|meetups".split("|").map(function(i) {
  //     return Discourse.NavItem.fromText(i, {
  //       loggedOn: loggedOn
  //     });
  //   }).filter(function(i) {
  //     return i !== null;
  //   });
  // }.property(),


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

//   load: function(subreddit) {

//       var save_bulk = this.save;
//       var parent = this;

// debugger;

//       var url = "/data/madrid.json";


//     // return Discourse.ajax("/posts/" + (this.get('id')) + "/replies").then(function(loaded) {
//     //   var replies = parent.get('replies');
//     //   _.each(loaded,function(reply) {
//     //     var post = Discourse.Post.create(reply);
//     //     post.set('topic', parent.get('topic'));
//     //     replies.pushObject(post);
//     //   });
//     //   parent.set('loadingReplies', false);
//     // });

//     return Discourse.ajax(url).then(function(response){
//       debugger;
//     });


//       // return $.getJSON(url).then(function (response) {
//       //     var links = [];
//       //     $(response.events.event).each(function() {  
             
               
//       //           var happeningResource = Discourse.Happening.create({
//       //             title: this.title,
//       //             // description: this.description,
//       //             origin: "last_fm",
//       //             start_date: this.startDate,
//       //             external_urls: [ {url: this.url, trait: "source" }],
//       //             json_details: JSON.stringify(this)
//       //           });

//       //           if (this.image[1]['#text']){
//       //             var pictures = [{
//       //               alt: "medium",
//       //               url: this.image[1]['#text']
//       //             }];
//       //             happeningResource.set('pics', pictures);
//       //             // happeningResource.set('description', pictures);
//       //             // happeningResource.set('traits', pictures)
//       //           }
//       //       links.push(happeningResource);
//       //     });
//       //    return links; 
//       // });
//   },

//   save: function(raw_json) {
//     var url = "/ed/bulk_happenings";

//     return Discourse.ajax(url, {
//       data: {
//         title: "first",
//         raw_json: raw_json
//       },
//       type: 'POST'
//     });
//   }


});






