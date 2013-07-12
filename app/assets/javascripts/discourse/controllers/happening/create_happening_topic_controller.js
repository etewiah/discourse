
Discourse.CreateHappeningTopicController =  Discourse.Controller.extend(Discourse.ModalFunctionality, {

  needs: 'topic',

   createHappeningTopic: function() {

debugger;
      var createHappeningTopicController = this;

      var currentUser = Discourse.User.current();
      var createdPost = Discourse.Post.create({
        raw: "smm page cmmmtttt",
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

      var topic = Discourse.Topic.create({});      
      var topicController = this.controllerFor('topic');
      var happeningShowController = this.controllerFor('happening_show');

      createdPost.save(function(result) {


       var params =  {};
        params.trackVisit = true;
        // params.happening = model;
          topic.id = result.topic_id;
          topicController.set('content', topic);
          //topicController.cancelFilter();
          topicController.loadPosts(params);

        happening.set('happening_topic_ids', [result.topic_id]);

        happeningShowController.set('hasComments', true);

         happening.save().then(function(result) {

            $('#discourse-modal').modal('hide');
            // createHappeningTopicController.transitionToRoute('happening.show', happening);
          }, function(errors) {
            //The update was just to add a comment - ignore any error
            $('#discourse-modal').modal('hide');
            // createHappeningTopicController.transitionToRoute('happening.show', happening);
          });


      }, function(error) {
        debugger;
      });

    }

});






