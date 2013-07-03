
Discourse.CreateHappeningTopicController =  Discourse.Controller.extend({

   createHappeningTopic: function() {
      // relies on:
      // http://wjlroe.github.io/2013/06/06/ember-transition-to-new-model-hack.html
      // saveTheWidget: function() {
      //   var model = App.Widget.createRecord({name: "very_special_widget"});
      //   model.addObserver('id', this, this.showWidget);
      //   model.get('store').commit();
      // },
      // showWidget: function(model) {
      //   model.removeObserver('id', this, this.showWidget);
      //   this.transitionToRoute('widgets.show', model);
      // }

      debugger;
      happening  = this.get('model');
      // var model = App.Widget.createRecord({name: "special_widget"});

      happening.addObserver('id', this, this.happeningCreated);

      // can't get id from methods below so using addObserver as above
      // happening.one('didCreate', function() {
      //   debugger;
      // });

      // happening.one('didCommit', function() {
      //   debugger;
      //   // this.transitionToRoute('widgets.show', happening);
      // });

      // happening.get('store').commit();
      // above saves all pending happenings...
      happening.save();
    }


});






