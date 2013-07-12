Discourse.HappeningShowRoute = Ember.Route.extend({


  events: {
    talkAboutHappening: function(happening){
      Discourse.Route.showModal(this, 'createHappeningTopic', happening);
    },

    //below are events copied from 'topic_route'
    // Modals that can pop up within a topic

    showFlags: function(post) {
      Discourse.Route.showModal(this, 'flag', post);
      this.controllerFor('flag').setProperties({ selected: null });
    },

    showAutoClose: function() {
      Discourse.Route.showModal(this, 'editTopicAutoClose', this.modelFor('topic'));
      this.controllerFor('modal').set('modalClass', 'edit-auto-close-modal');
    },

    showInvite: function() {
      // Discourse.Route.showModal(this, 'invite', this.modelFor('topic'));
// Ed:
      Discourse.Route.showModal(this, 'invite', this.controllerFor('topic').get('content') );

      this.controllerFor('invite').setProperties({
        email: null,
        error: false,
        saving: false,
        finished: false
      });
    },

    showPrivateInvite: function() {
      Discourse.Route.showModal(this, 'invitePrivate', this.modelFor('topic'));
      this.controllerFor('invitePrivate').setProperties({
        email: null,
        error: false,
        saving: false,
        finished: false
      });
    },

    showHistory: function(post) {
      Discourse.Route.showModal(this, 'history', post);
      this.controllerFor('history').refresh();
      this.controllerFor('modal').set('modalClass', 'history-modal');
    },

    mergeTopic: function() {
      Discourse.Route.showModal(this, 'mergeTopic', this.modelFor('topic'));
    },

    splitTopic: function() {
      Discourse.Route.showModal(this, 'splitTopic', this.modelFor('topic'));
    }

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
          topic.happeningUrl = "/happening/" + model.city + "/details/" + model.id;
          topic.happening = model;

          topicController.set('content', topic);
          topicController.cancelFilter();
          topicController.loadPosts(params);
        }
        else{
          // Ed: hasComments is used when rendering to decide if to render 
          // 'talk about this' button
          controller.set('hasComments', false);
          // Ed: attempt to clean up ghost topic content from previous happening...
          topicController.set('content', topic);
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

