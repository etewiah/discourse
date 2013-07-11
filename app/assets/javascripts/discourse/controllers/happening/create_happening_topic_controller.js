
Discourse.CreateHappeningTopicController =  Discourse.Controller.extend(Discourse.ModalFunctionality, {

    createHappeningTopic: function() {

      // var createHappeningTopicController = this;

      // this.set('saving', true);

      // 

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

      // "{"raw":"To see net trace when creating new topic","title":"Created from native ui",
      // "reply_to_post_number":null,"imageSizes":{},"post_number":null,"index":null,
      // "cooked":"<p>To see net trace when creating new topic</p>","reply_count":0,
      // "display_username":"happensesame","username":"happensesame","user_id":1,"metaData":null,
      // "archetype":"regular","post_type":1,
      // "actions_summary":[],"moderator":true,"yours":true,"newPost":true,"actionByName":{}}"



      var happening  = this.get('model');

      //Below comes from composer.js
      createdPost.save(function(result) {
        // TODO - set this on happening and save to server... result.topic_slug;
        $('#discourse-modal').modal('hide');
        createHappeningTopicController.transitionToRoute('happening.show', happening);
        // var addedPost = false,
        //     saving = true;

        // createdPost.updateFromSave(result);
        // if (topic) {
        //   // It's no longer a new post
        //   createdPost.set('newPost', false);
        //   topic.set('draft_sequence', result.draft_sequence);
        // } else {
        //   // We created a new topic, let's show it.
        //   composer.set('composeState', CLOSED);
        //   saving = false;
        // }

        // composer.set('reply', '');
        // composer.set('createdPost', createdPost);
        // if (addedToStream) {
        //   composer.set('composeState', CLOSED);
        // } else if (saving) {
        //   composer.set('composeState', SAVING);
        // }
        // return promise.resolve({ post: result });
      }, function(error) {
        // If an error occurs
        // if (topic) {
        //   topic.posts.removeObject(createdPost);
        //   topic.set('filtered_posts_count', topic.get('filtered_posts_count') - 1);
        // }
        // promise.reject($.parseJSON(error.responseText).errors[0]);
        // composer.set('composeState', OPEN);
      });


      // happening.save().then(function(result) {
      //   // createHappeningTopicController.send('closeModal');
      //   // above seems to call the closeModal event in application_route which renders a view
      //   // which simply does the same as below:
      //   $('#discourse-modal').modal('hide');
      //   createHappeningTopicController.transitionToRoute('happening.show', happening);

      //   // Discourse.URL.redirectTo("/happening/" + "1");
      //       //Discourse.Category.slugFor(result.category));
      // }, function(errors) {
      //   // errors
      // debugger;
      //   if(errors.length === 0) errors.push(Em.String.i18n("category.creation_error"));
      //   createHappeningTopicController.displayErrors(errors);
      //   createHappeningTopicController.set('saving', false);
      // });
    },






      // Below is from composer.js, used for creating new post and also new topics..
  createPost: function(opts) {
    var post = this.get('post'),
        topic = this.get('topic'),
        currentUser = Discourse.User.current(),
        addedToStream = false;

    // The post number we'll probably get from the server
    var probablePostNumber = this.get('topic.highest_post_number') + 1;

    // Build the post object
    var createdPost = Discourse.Post.create({
        raw: this.get('reply'),
        title: this.get('title'),
        category: this.get('categoryName'),
        topic_id: this.get('topic.id'),
        reply_to_post_number: post ? post.get('post_number') : null,
        imageSizes: opts.imageSizes,
        post_number: probablePostNumber,
        index: probablePostNumber,
        cooked: $('#wmd-preview').html(),
        reply_count: 0,
        display_username: currentUser.get('name'),
        username: currentUser.get('username'),
        user_id: currentUser.get('id'),
        metaData: this.get('metaData'),
        archetype: this.get('archetypeId'),
        post_type: Discourse.Site.instance().get('post_types.regular'),
        target_usernames: this.get('targetUsernames'),
        actions_summary: Em.A(),
        moderator: currentUser.get('moderator'),
        yours: true,
        newPost: true,
        auto_close_days: this.get('auto_close_days')
      });

    // If we're in a topic, we can append the post instantly.
    if (topic) {

      // Increase the reply count
      if (post) {
        post.set('reply_count', (post.get('reply_count') || 0) + 1);
      }
      topic.set('posts_count', topic.get('posts_count') + 1);

      // Update last post
      topic.set('last_posted_at', new Date());
      topic.set('highest_post_number', createdPost.get('post_number'));
      topic.set('last_poster', Discourse.User.current());
      topic.set('filtered_posts_count', topic.get('filtered_posts_count') + 1);

      // Set the topic view for the new post
      createdPost.set('topic', topic);
      createdPost.set('created_at', new Date());

      // If we're near the end of the topic, load new posts
      var lastPost = topic.posts[topic.posts.length-1];
      if (lastPost) {
        var diff = topic.get('highest_post_number') - lastPost.get('post_number');

        // If the new post is within a threshold of the end of the topic,
        // add it and scroll there instead of adding the link.

        if (diff < 5) {
          createdPost.set('scrollToAfterInsert', createdPost.get('post_number'));
          topic.pushPosts([createdPost]);
          addedToStream = true;
        }
      }
    }

    // Save callback
    var composer = this;
    return Ember.Deferred.promise(function(promise) {
      createdPost.save(function(result) {
        var addedPost = false,
            saving = true;

        createdPost.updateFromSave(result);
        if (topic) {
          // It's no longer a new post
          createdPost.set('newPost', false);
          topic.set('draft_sequence', result.draft_sequence);
        } else {
          // We created a new topic, let's show it.
          composer.set('composeState', CLOSED);
          saving = false;
        }

        composer.set('reply', '');
        composer.set('createdPost', createdPost);
        if (addedToStream) {
          composer.set('composeState', CLOSED);
        } else if (saving) {
          composer.set('composeState', SAVING);
        }
        return promise.resolve({ post: result });
      }, function(error) {
        // If an error occurs
        if (topic) {
          topic.posts.removeObject(createdPost);
          topic.set('filtered_posts_count', topic.get('filtered_posts_count') - 1);
        }
        promise.reject($.parseJSON(error.responseText).errors[0]);
        composer.set('composeState', OPEN);
      });
    });
  }


});






