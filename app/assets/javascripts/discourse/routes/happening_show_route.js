Discourse.HappeningShowRoute = Ember.Route.extend({

  events: {
    talkAboutHappening: function(happening){
      Discourse.Route.showModal(this, 'createHappeningTopic', happening);
    }
    // createCategory: function() {
    //   Discourse.Route.showModal(this, 'editCategory', Discourse.Category.create({ color: 'AB9364', text_color: 'FFFFFF', hotness: 5 }));
    //   this.controllerFor('editCategory').set('selectedTab', 'general');
    // }
  },

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
    return happening;
    
    // return { 
    //   topic: topic,
    //   happening: happening
    // }
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
    // if(!model.hasOwnProperty('topic')){
    //   if( model.get('loaded_from_remote')){
    //     var happeningShowController = this.controllerFor('happeningShow');
    //     //for some reason 'controller' is not available within the function below so I 
    //     //am created another instance of it and assigned it to a var
    //     model.save().then(function(result){
    //       var happening = Discourse.Happening.create(result.happening);
    //       happeningShowController.transitionToRoute('happening.show', happening);
    //     });
    //     //controller.transitionToRoute('happening.show', happening)
    //   }
    //   else {
    //     controller.set('content', {happening: model});
    //   }
    // }
    // else{

      // Happenings with ids already exist on the server so go ahead and display
    if(model.id){
      var topic = Discourse.Topic.create({});
      // controller.set('content', topic);
      
      // below is a bit silly - its so side nav knows what to highlight
      // what I really need to do is use model.city directly in the side nav
      // controller.set('happeningCity', model.city);
      
      var topicController = this.controllerFor('topic');
      // var happeningShowController = this.controllerFor('happeningShow');
      //for some reason 'controller' is not available within the function below so I 
      //am created another instance of it and assigned it to a var


        // var happening = Discourse.Happening.create(model.happening);
        controller.set('content', {happening: model});

        var params =  {};
        params.trackVisit = true;
        params.happening = model;
        if(model.happening_topic_ids[0]){
          controller.set('hasComments', true);
          // topic.slug = model.happening_topic_ids[0].slug;
          // "test-from-library";
          // "madrid-emprende";
          topic.id = model.happening_topic_ids[0];
          // "37";

          //this value only exists clientside - its not persisted to the server
          // good and bad in a way....
          topic.hasHappening = true;
          topic.happening = model;

          topicController.set('content', topic);
          topicController.cancelFilter();
          topicController.loadPosts(params);
        }
        else{
          controller.set('hasComments', false);
          topicController.set('content', '');
        }
      }
      //otherwise create on server first
      else{
        var happeningShowController = this.controllerFor('happeningShow');
        //for some reason 'controller' is not available within the function below so I 
        // created another instance of it and assigned it to a var
        model.save().then(function(result){
          var happening = Discourse.Happening.create(result.happening);
          happeningShowController.transitionToRoute('happening.show', happening);
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

});

