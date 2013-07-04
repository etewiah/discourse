Discourse.HappeningShowRoute = Ember.Route.extend({

  activate: function() {
    // debugger;
  },

  deactivate: function() {
    // debugger;
  },


  model: function(params) {
    // var record = App.Project.find(params.project_id);
    var happeningController = this.controllerFor('happeningShow');
    if (happeningController) happeningController.set('filterMode', "happenings");
    // return Discourse.Happening.getFromLastfm();
    // debugger;
    var record = Discourse.Happening.find(params.id);
    // happeningController.load();
    // var promise = Ember.Deferred.create();
    // record.addObserver('isLoaded', function() {
    //   promise.resolve(record);
    // });

    // return promise;

    return record;
  },


// http://stackoverflow.com/questions/16811553/ember-transitiontoroute-and-currentmodel-issue
// needed to ensure transitionToRoute works
  serialize: function(model) {
    return model;  
  },

  // setupController: function(controller, model) {
  //   // var result = Ember.Object.create({title: "11111", isLoaded: true});
  //   // var result = Ember.Object.create({content: {title: "boooo"}, isLoaded: true});
  //   // controller.set('content', result);
  //   controller.set('model', model);    // debugger;
  //   // this.controllerFor('activedataset.index').set('content', App.ActiveDataSet.findAll(model.id));
  // }

  setupController: function(controller, model) {
    controller.set('model', model)
    if( model.get('loaded_from_remote'))
    {
      model.save().then(function(result){
      });
    }
  },

  // renderTemplate: function() {
  //   this.render('happenings', {
  //     into: 'list.list', 
  //     outlet: 'listView'
  //   });
  // }

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
