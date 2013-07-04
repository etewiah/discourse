// Discourse.HappeningsRoute = Ember.Route.extend({
//   events: {
//  	  talkAboutHappening: function(happening){
// 	    Discourse.Route.showModal(this, 'createHappeningTopic', happening);
// 	  }
//     // createCategory: function() {
//     //   Discourse.Route.showModal(this, 'editCategory', Discourse.Category.create({ color: 'AB9364', text_color: 'FFFFFF', hotness: 5 }));
//     //   this.controllerFor('editCategory').set('selectedTab', 'general');
//     // }
//   },

//   model: function() {
// debugger;
//     var happeningsController = this.controllerFor('happenings');
//     if (happeningsController) happeningsController.set('filterMode', "music");
//     // return Discourse.Happening.getFromLastfm();
//     // debugger;
//     // var happeningsModel = this.modelFor('happening');
//     debugger;
//     return Discourse.Happening.load();
//     // happeningsController.load();
//   }

//   // renderTemplate: function() {
//   //   this.render('happenings', {

//   //     controller: 'happenings'
//   //   });
//   // }

// });



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
    var happeningsController = this.controllerFor('happenings');
    if (happeningsController) happeningsController.set('filterMode', "music");
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
    // var listTopicsController = this.controllerFor('listTopics');
    // if (listTopicsController) {
    //   var listContent = listTopicsController.get('content');
    //   if (listContent) {
    //     listContent.set('loaded', false);
    //   }
    // }

    // var listController = this.controllerFor('list');
    // var urlId = Discourse.Category.slugFor(category);
    // listController.set('filterMode', "category/" + urlId);

    // var router = this;
    // listController.load("category/" + urlId).then(function(topicList) {
    //   listController.set('canCreateTopic', topicList.get('can_create_topic'));
    //   listController.set('category', category);
    //   router.controllerFor('listTopics').set('content', topicList);
    //   router.controllerFor('listTopics').set('category', category);
    // });
  }


});
