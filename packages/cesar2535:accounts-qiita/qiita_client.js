Qiita = {};

// Request Slack credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Qiita.requestCredential = function(options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({
    service: 'qiita'
  });
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  // For some reason, slack converts underscores to spaces in the state
  // parameter when redirecting back to the client, so we use
  // `Random.id()` here (alphanumerics) instead of `Random.secret()`
  // (base 64 characters).
  var credentialToken = Random.id();

  var scope = (options && options.requestPermissions) || [];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginStyle = OAuth._loginStyle('qiita', config, options);

  var loginUrl =
    'https://qiita.com/api/v2/oauth/authorize' +
    '?client_id=' + config.clientId +
    '&scope=' + flatScope +
    // '&redirect_uri=' + OAuth._redirectUri('qiita', config) +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  // slack box gets taller when permissions requested.
  var height = 620;
  if (_.without(scope, 'basic').length)
    height += 130;

  OAuth.launchLogin({
    loginService: 'qitta',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {
      width: 900,
      height: height
    }
  });

  /*
    OAuth.showPopup(
      loginUrl,
      _.bind(credentialRequestCompleteCallback, null, credentialToken),
      {width: 900, height: height}
    );
  */
};
