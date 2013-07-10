
Discourse.CreateHappeningAndTopicController =  Discourse.Controller.extend(Discourse.ModalFunctionality, {

   createHappeningAndTopic: function() {

      var createHappeningTopicController = this;

      var currentUser = Discourse.User.current();
      var createdPost = Discourse.Post.create({
        raw: "from create happ ctrl",
        title: this.get('content.title'),
        reply_to_post_number:  null,
        imageSizes: {},
        post_number: null,
        index: null,
        cooked: "from create happ ctrl",
        reply_count: 0,
        display_username: currentUser.get('name'),
        username: currentUser.get('username'),
        user_id: currentUser.get('id'),
        metaData: null,
        archetype: "regular",
        post_type: Discourse.Site.instance().get('post_types.regular'),
        actions_summary: Em.A(),
        moderator: false,
        yours: true,
        newPost: true
      });

      var happening  = this.get('model');

      createdPost.save(function(result) {
        debugger;
        happening.set('topic_id', result.topic_id);
         happening.save().then(function(result) {
            $('#discourse-modal').modal('hide');
            createHappeningTopicController.transitionToRoute('happening.show', happening);
          }, function(errors) {
            debugger;
          });


      }, function(error) {
        debugger;
      });

    }

});






