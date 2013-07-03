Discourse.HappeningTopic = Discourse.Model.extend({
  // name: DS.attr("string"),
  // happening: DS.belongsTo('Discourse.Happening')
});

Discourse.Happening = Discourse.Model.extend({
  // title: DS.attr('string'),
  // // description: DS.attr('string')
  // // pics: DS.attr('string'),
  // // start_slot: DS.attr('string'),
  // // start_date: DS.attr('date'),
  // // end_slot: DS.attr('string'),
  // // address: DS.attr('string'),
  // // coordinates: DS.attr('string'),
  // // meta: DS.attr('string'),
  // // traits: DS.attr('string'),
  // json_details: DS.attr('string'),
  // topics: DS.hasMany('Discourse.HappeningTopic')

});

Discourse.Happening.reopenClass({

    load: function() {

      // var save_bulk = this.save;
      // var parent = this;


      var url = "/ed/bulk_happenings/madrid.json"; 
      // "/data/madrid.json";


    // return Discourse.ajax("/posts/" + (this.get('id')) + "/replies").then(function(loaded) {
    //   var replies = parent.get('replies');
    //   _.each(loaded,function(reply) {
    //     var post = Discourse.Post.create(reply);
    //     post.set('topic', parent.get('topic'));
    //     replies.pushObject(post);
    //   });
    //   parent.set('loadingReplies', false);
    // });

    return Discourse.ajax(url).then(function(response){

// Ed: TODO: get directly from eventful and fallback to server if needed
        // var url = "/ed/bulk_happenings";

        // Discourse.ajax(url, {
        //   data: {
        //     title: "first",
        //     raw_json: JSON.stringify(response)
        //   },
        //   type: 'POST'
        // });

          var happenings = [];
          var happenings_json = JSON.parse( response.bulk_happening.raw_json)
          $(happenings_json.events.event).each(function() {  
             
               
                var happeningResource = Discourse.Happening.create({
                  title: this.title,
                  // description: this.description,
                  origin: "last_fm",
                  start_date: this.startDate,
                  external_urls: [ {url: this.url, trait: "source" }],
                  json_details: JSON.stringify(this)
                });

                if (this.image[1]['#text']){
                  var pictures = [{
                    alt: "medium",
                    url: this.image[1]['#text']
                  }];
                  happeningResource.set('pics', pictures);
                  // happeningResource.set('description', pictures);
                  // happeningResource.set('traits', pictures)
                }
            happenings.push(happeningResource);
          });
         return happenings; 

    });

  },

  save: function(raw_json) {
    var url = "/ed/bulk_happenings";

    return Discourse.ajax(url, {
      data: {
        title: "first",
        raw_json: raw_json
      },
      type: 'POST'
    });
  }

});