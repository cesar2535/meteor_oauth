Template.configureLoginServiceDialogForQiita.siteUrl = function() {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForQiita.fields = function() {
  return [{
    property: 'clientId',
    label: 'Client ID'
  }, {
    property: 'secret',
    label: 'Client Secret'
  }];
};
