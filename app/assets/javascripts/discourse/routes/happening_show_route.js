Discourse.HappeningShowRoute = Ember.Route.extend({

  activate: function() {
    // debugger;
  },

  deactivate: function() {
    // debugger;
  },


  model: function(params) {
    var happening = Discourse.Happening.find(params.id);
    // return happening;

    params = {};
    // {slug: "madrid-emprende", id: "29"};
    // var currentModel, _ref;
    // if (currentModel = (_ref = this.controllerFor('topic')) ? _ref.get('content') : void 0) {
    //   if (currentModel.get('id') === parseInt(params.id, 10)) {
    //     return currentModel;
    //   }
    // }
    var topic = Discourse.HappeningTopic.create(params);
    // return topic;
    return { 
      topic: topic,
      happening: happening
    }
  },


// http://stackoverflow.com/questions/16811553/ember-transitiontoroute-and-currentmodel-issue
// needed to ensure transitionToRoute works
  serialize: function(model) {
    return model;  
  },

  setupController: function(controller, model) {
    // var record = Discourse.Happening.find(48);
    controller.set('content', model.topic);
    
    // below is a bit silly - its so side nav knows what to highlight
    // what I really need to do is use model.city directly in the side nav
    // controller.set('happeningCity', model.city);
    

    // if( model.get('loaded_from_remote'))
    // {
    //   model.save().then(function(result){
    //   });
    // }

    var topicController = this.controllerFor('topic');


    model.happening.then( function(result){
    // below from topic_from_params route:
        var params =  {};
        params.trackVisit = true;
        params.happening = result.happening;

    model.topic.slug = result.happening_topics[0].slug;
    // "test-from-library";
    // "madrid-emprende";
    model.topic.id = result.happening_topics[0].id;
    // "37";

        topicController.set('content', model.topic);
        topicController.cancelFilter();
        topicController.loadPosts(params);
    });
  },

  renderTemplate: function() {
    this.render('happening_show', {
    });
    this.render('happening_topic', {
      outlet: 'topic',
      controller: 'topic'
    });
  }

  //   renderTemplate: function() {
  //    // debugger;
  //   this.render('list/categories', { into: 'list', outlet: 'listView' });

  // }
});


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
//     var happeningsController = this.controllerFor('happenings');
//     if (happeningsController) happeningsController.set('filterMode', "music");
//     // return Discourse.Happening.getFromLastfm();
//     // debugger;
//     // var happeningsModel = this.modelFor('happening');
//     return Discourse.Happening.load();
//     // happeningsController.load();
//   }

// });
