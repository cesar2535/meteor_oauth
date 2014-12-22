Accounts.oauth.registerService('qiita');

if (Meteor.isClient) {
  Meteor.loginWithQiita = function(options, callback) {
    // support a callback without options
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    options.requestPermissions = ['read_qiita'];
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Qiita.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on
    // localhost). http://www.meetup.com/meetup_api/auth/#oauth2implicit
    forLoggedInUser: ['services.qiita'],
    forOtherUsers: ['services.qiita.id']
  });
}
