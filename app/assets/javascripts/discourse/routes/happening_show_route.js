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
    var topic = {}; 
    // Discourse.HappeningTopic.create(params);

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


// TODO:::
// CLEAN UP ALL THE SHIT I HAVE THAT GETS A TOPIC AND A HAPPENING IN THE MODELL!!!!
  setupController: function(controller, model) {
    //topic property is not set when I reach here through
    //the linkto helper which bypasses the model function in this class....
    if(!model.hasOwnProperty('topic')){
      if( model.get('loaded_from_remote')){
        var happeningShowController = this.controllerFor('happeningShow');
        //for some reason 'controller' is not available within the function below so I 
        //am created another instance of it and assigned it to a var
        model.save().then(function(result){
          var happening = Discourse.Happening.create(result.happening);
          happeningShowController.transitionToRoute('happening.show', happening);
        });
        //controller.transitionToRoute('happening.show', happening)
      }
      else {
        controller.set('content', {happening: model});
      }
    }
    else{
      model.topic = Discourse.HappeningTopic.create({});
      // controller.set('content', model.topic);
      
      // below is a bit silly - its so side nav knows what to highlight
      // what I really need to do is use model.city directly in the side nav
      // controller.set('happeningCity', model.city);
      
      var topicController = this.controllerFor('topic');
      var happeningShowController = this.controllerFor('happeningShow');
      //for some reason 'controller' is not available within the function below so I 
      //am created another instance of it and assigned it to a var

      model.happening.then( function(result){
        var happening = Discourse.Happening.create(result.happening);
        happeningShowController.set('content', {happening: happening});
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
    }
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
