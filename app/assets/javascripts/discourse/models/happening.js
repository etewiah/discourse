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

  mainImageUrl: function() {
    if (!this.present('json_details')) return null;
    happeningDetails = JSON.parse(this.json_details);
    return happeningDetails.image[2]['#text'];
  }.property('json_details'),

  descriptionFromJson: function() {
    if (!this.present('json_details')) return null;
    happeningDetails = JSON.parse(this.json_details);
    return happeningDetails.description;
  }.property(),

  // fewParticipants: function() {
  //   if (!this.present('participants')) return null;
  //   return this.get('participants').slice(0, 3);
  // }.property('participants'),

  save: function(args) {
    var url = "/ed/happenings";
    if (this.get('id')) {
      url = "/ed/happenings/" + (this.get('id'));
    }
    // var topicId = null;
    if(this.get('happening_topic_ids')){
      var topicId = this.get('happening_topic_ids')[0];
    }
    return Discourse.ajax(url, {
      data: {
        happening: {
          title: this.get('title'),
          json_details: this.get('json_details'),
          start_date: this.get('start_date'),
          meta: this.get('meta'),
          source: this.get('source'),
          city: this.get('city'),
          country: this.get('country'),
          topic_id: topicId
        }
      },
      type: this.get('id') ? 'PUT' : 'POST'
    });
  }

});

Discourse.Happening.reopenClass({

    happeningCity: "",
    bulk_happenings_raw_json: "",
    pendingBulkSaveToServer: false,

    saveBulk: function() {
      var url = "/ed/bulk_happenings";
      Discourse.ajax(url, {
        data: {
            title: Discourse.Happening.happeningCity,
            raw_json: Discourse.Happening.bulk_happenings_raw_json,
            source: "last_fm"
        },
        type:  'POST'
      }).then(function(){
        debugger;
        Discourse.Happening.pendingBulkSaveToServer = false;
        Discourse.Happening.bulk_happenings_raw_json = "";
      });
    },

    loadFromRemote: function() {
      var url = "http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location="
      + Discourse.Happening.happeningCity.toLowerCase() + "&api_key=11c7b0fa1ebea56f97d90b605e6ace2e&format=json"
      
      return Discourse.ajax(url).then(function(response){
        // TODO: handle errors properly
        if(response.error){
          return [];
        };

          var happenings = [];
          // var happenings_json = JSON.parse( response.bulk_happening.raw_json);
          $(response.events.event).each(function() {  
           
                var happeningResource = Discourse.Happening.create({
                  title: this.title,
                  // description: this.description,
                  meta: this.id,
                  source: "last_fm",
                  starting_on: this.startDate,
                  external_urls: [ {url: this.url, trait: "source" }],
                  json_details: JSON.stringify(this),
                  id: "",
                  city: this.venue.location.city,
                  country: this.venue.location.country,
                  loaded_from_remote: true
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
         Discourse.Happening.bulk_happenings_raw_json = JSON.stringify(response);
         Discourse.Happening.pendingBulkSaveToServer = true;
         return happenings; 
      });

    },

    load: function() {
      var url = "/ed/bulk_happenings/" + Discourse.Happening.happeningCity + ".json";
      return Discourse.ajax(url).then(function(response){

          if(response === null){
            return Discourse.Happening.loadFromRemote()
          }

          var happenings = [];
          var happenings_json = JSON.parse( response.bulk_happening.raw_json);
          $(happenings_json.events.event).each(function() {  
           
                var happeningResource = Discourse.Happening.create({
                  title: this.title,
                  // description: this.description,
                  meta: this.id,
                  source: "last_fm",
                  starting_on: this.startDate,
                  external_urls: [ {url: this.url, trait: "source" }],
                  json_details: JSON.stringify(this),
                  id: "",
                  city: this.venue.location.city,
                  country: this.venue.location.country,
                  loaded_from_remote: true
                });

                if (this.image[1]['#text']){
                  var pictures = [{
                    alt: "medium",
                    url: this.image[1]['#text']
                  }];
                  happeningResource.set('pics', pictures);
                }
            happenings.push(happeningResource);
          });
         return happenings; 
      });

  },

  // save: function(raw_json) {
  //   var url = "/ed/bulk_happenings";

  //   return Discourse.ajax(url, {
  //     data: {
  //       title: "first",
  //       raw_json: raw_json
  //     },
  //     type: 'POST'
  //   });
  // },

  // findBySlugOrId: function(slugOrId) {
  //   return Discourse.ajax("/categories/" + slugOrId + ".json").then(function (result) {
  //     return Discourse.Category.create(result.category);
  //   });
  // }
  find: function(id) {
    return Discourse.ajax("/ed/happenings/" + id + ".json").then(function (result) {
      var happening = Discourse.Happening.create(result.happening);
      return happening;
    });
  }



});