
if (Meteor.isClient) {
  Template.test.events({
    'submit #request': function () {
      var code = $('#code').val();
      var clientId = $('#client-id').val();
      var clientSecret = $('#client-secret').val();

      Meteor.http.call('POST', 'https://qiita.com/api/v2/access_tokens',{
        params: {
          code: code,
          client_id: clientId,
          client_secret: clientSecret
        }
      }, function (err, result) {
        console.error(err);
        console.info(result);
      });
    }
  });
}