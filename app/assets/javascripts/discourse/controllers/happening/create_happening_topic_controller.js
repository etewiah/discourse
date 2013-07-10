
Discourse.CreateHappeningTopicController =  Discourse.Controller.extend(Discourse.ModalFunctionality, {

   createHappeningTopic: function() {
      var createHappeningTopicController = this;
      this.set('saving', true);
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

      happening  = this.get('model');
      // var model = App.Widget.createRecord({name: "special_widget"});

      // happening.addObserver('id', this, this.happeningCreated);

      happening.save().then(function(result) {
        // createHappeningTopicController.send('closeModal');
        // above seems to call the closeModal event in application_route which renders a view
        // which simply does the same as below:
        $('#discourse-modal').modal('hide');
        createHappeningTopicController.transitionToRoute('happening.show', happening);

        // Discourse.URL.redirectTo("/happening/" + "1");
            //Discourse.Category.slugFor(result.category));
      }, function(errors) {
        // errors
      debugger;
        if(errors.length === 0) errors.push(Em.String.i18n("category.creation_error"));
        createHappeningTopicController.displayErrors(errors);
        createHappeningTopicController.set('saving', false);
      });
    }


});






