/*global _gaq:true */

/**
  The base controller for all things Discourse

  @class ApplicationController
  @extends Discourse.Controller
  @namespace Discourse
  @module Discourse
**/
Discourse.ApplicationController = Discourse.Controller.extend({


  loginGuest: function() {
    this.set('loggingIn', true);

    var loginView = this;
    Discourse.ajax("/session", {
      // data: { login: this.get('loginName'), password: this.get('loginPassword') },
      data: { login: "guest", password: "guestuser"},
      type: 'POST'
    }).then(function (result) {
      // Successful login
      if (result.error) {
        loginView.set('loggingIn', false);
        if( result.reason === 'not_activated' ) {
          return loginView.showView(Discourse.NotActivatedView.create({
            username: loginView.get('loginName'),
            sentTo: result.sent_to_email,
            currentEmail: result.current_email
          }));
        }
        loginView.flash(result.error, 'error');
      } else {
        // Trigger the browser's password manager using the hidden static login form:
        var $hidden_login_form = $('#hidden-login-form');
        $hidden_login_form.find('input[name=username]').val(loginView.get('loginName'));
        $hidden_login_form.find('input[name=password]').val(loginView.get('loginPassword'));
        $hidden_login_form.find('input[name=redirect]').val(window.location.href);
        $hidden_login_form.find('input[name=authenticity_token]').val($('meta[name=csrf-token]').attr('content'));
        $hidden_login_form.submit();
      }

    }, function(result) {
      // Failed to login
      loginView.flash(Em.String.i18n('login.error'), 'error');
      loginView.set('loggingIn', false);
    })

    return false;
  },


  routeChanged: function(){
    if (window._gaq === undefined) { return; }

    if(this.afterFirstHit) {
      Em.run.schedule('afterRender', function() {
        _gaq.push(['_trackPageview']);
      });
    } else {
      this.afterFirstHit = true;
    }
  }.observes('currentPath')

});
