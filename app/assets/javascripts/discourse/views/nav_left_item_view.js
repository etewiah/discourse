/**
  This view handles rendering of a navigation item

  @class NavLeftItemView
  @extends Discourse.View
  @namespace Discourse
  @module Discourse
**/
Discourse.NavLeftItemView = Discourse.View.extend({
  tagName: 'li',
  classNameBindings: ['isActive', 'content.hasIcon:has-icon'],
  attributeBindings: ['title'],
  countBinding: Ember.Binding.oneWay('content.count'),

  title: function() {
    // var categoryName, extra, name;
    // name = this.get('content.name');
    // categoryName = this.get('content.categoryName');
    // if (categoryName) {
    //   extra = { categoryName: categoryName };
    //   name = "category";
    // }
    // return Ember.String.i18n("filters." + name + ".help", extra);
    return this.get('content.name');
  }.property("content.filter"),

  isActive: function() {
    if(this.get('controller.happeningCity').toLowerCase() === this.get('content.name').toLowerCase() ) return "active";
    // if(this.get('controller.filterMode') === undefined && this.get('content.name') === "happenings") return "active";
    // if (this.get("content.name").toLowerCase().replace(' ','-') === this.get("controller.filterMode")) return "active";
    return "";
  }.property("content.name", "controller.filterMode"),

  hidden: Em.computed.not('content.visible'),

  countChanged: function(){
    this.rerender();
  }.observes('count'),

  name: function() {
    // var categoryName, extra, name;
    // name = this.get('content.name');
    // categoryName = this.get('content.categoryName');
    // extra = {
    //   count: this.get('content.count') || 0
    // };
    // if (categoryName) {
    //   name = 'category';
    //   extra.categoryName = Discourse.Formatter.toTitleCase(categoryName);
    // }
    // debugger;
    // return I18n.t("js.filters." + name + ".title", extra);
    return this.get('content.name');
  }.property('count'),

  render: function(buffer) {
    var content = this.get('content');
    buffer.push("<a href='" + content.get('href') + "'>");
    if (content.get('hasIcon')) {
      buffer.push("<span class='" + content.get('name') + "'></span>");
    }
    buffer.push(this.get('name'));
    buffer.push("</a>");
  }

});


