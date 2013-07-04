
// Discourse.HappeningsController = Ember.ArrayController.extend({
// // Discourse.Controller.extend({
//   // categoryBinding: 'topicList.category',
//   // canCreateCategory: false,
//   // canCreateTopic: false,
  
//   // // needs: ['composer', 'modal', 'listTopics'],
//   // needs: ['composer','listTopics'],


//   // availableNavItems: function() {
//   //   var summary = this.get('filterSummary');
//   //   var loggedOn = false;
//   //   // !!Discourse.User.current();
//   //   // return Discourse.SiteSettings.top_menu.split("|").map(function(i) {
//   //   return "music|meetups".split("|").map(function(i) {
//   //     return Discourse.NavItem.fromText(i, {
//   //       loggedOn: loggedOn
//   //     });
//   //   }).filter(function(i) {
//   //     return i !== null;
//   //   });
//   // }.property(),


//   // availableNavItems: function() {
//   //   var loggedOn = !!Discourse.User.current();

//   //   return Discourse.SiteSettings.top_menu.split("|").map(function(i) {
//   //     return Discourse.NavItem.fromText(i, {
//   //       loggedOn: loggedOn
//   //     });
//   //   }).filter(function(i) {
//   //     return i !== null;
//   //   });
//   // }.property(),


//   happeningsOdd: function() {
//     debugger;
//       var content = this.get('content');

//       // if (!content || !this.get('hideInactive'))
//       //     return content;


//       // if (this.blank('categories')) return Em.A();
//       return content.filter(function(item, index) {
//         return (index % 2) === 1;
//       });
//   }.property('content.isLoaded'),

// // Ed: TODO: figure out what dif 'content.isLoaded' makes
//    happeningsEven: function() {
//   debugger;
//       var content = this.get('content');

//       return content.filter(function(item, index) {
//         return (index % 2) === 0;
//       });
//   }.property(),

//   // Put in the appropriate page title based on our view
//   updateTitle: function() {
//     if (this.get('filterMode') === 'music') {
//       return Discourse.set('title', "Music");
//     } else {

//       // if (this.present('category')) {
//       //   return Discourse.set('title', this.get('category.name').capitalize() + " " + Em.String.i18n('topic.list'));
//       // } else {
//       //   return Discourse.set('title', Em.String.i18n('topic.list'));
//       // }
//     }
//   }.observes('filterMode', 'category')


// });






