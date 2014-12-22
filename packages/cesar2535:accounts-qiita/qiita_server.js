Qiita = {};

OAuth.registerService('qiita', 2, null, function(query) {
  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.user_id,
      accessToken: accessToken
    },
    options: {
      profile: {
        name: identity.name,
        user_id: identity.id,
        profile_image_url: identity.profile_image_url,
        website_url: identity.website_url
      }
    }
  };
});

var userAgent = 'Meteor';
if (Meteor.release)
  userAgent += '/' + Meteor.release;


var getAccessToken = function(query) {
  var config = ServiceConfiguration.configurations.findOne({
    service: 'qiita'
  });
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  check(query.code, String);
  check(config.clientId, String);
  check(config.secret, String);

  var response;
  try {
    response = HTTP.post(
      "https://qiita.com/api/v2/access_tokens", {
        headers: {
          Accept: 'application/json',
          'User-Agent': userAgent,
          'Content-Type': 'application/json'
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: config.secret
          // redirect_uri: Meteor.absoluteUrl("_oauth/slack?close")
          // redirect_uri: OAuth._redirectUri('qiita', config),
          // state: query.state
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Qiita. " + err.message), {
      response: err.response
    });
  }

  if (!response.data.ok) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Qiita. " + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getIdentity = function(accessToken) {
  try {
    var response = HTTP.get(
      "https://qiita.com/api/v2/authenticated_user", {
        params: {
          token: accessToken
        }
      });

    return response.data.ok && response.data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Qiita. " + err.message), {
      response: err.response
    });
  }
};


Qiita.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
