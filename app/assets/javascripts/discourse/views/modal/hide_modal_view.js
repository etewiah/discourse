/**
  An empty view for when we want to close a modal.

  @class HideModalView
  @extends Discourse.ModalBodyView
  @namespace Discourse
  @module Discourse
**/
Discourse.HideModalView = Discourse.ModalBodyView.extend({

  // No rendering!
  render: function(buffer) { },

  didInsertElement: function() {
    debugger;
    $('#discourse-modal').modal('hide');
  }

});