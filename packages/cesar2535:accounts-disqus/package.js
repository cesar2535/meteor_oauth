Package.describe({
  name: 'cesar2535:accounts-disqus',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'client');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.add_files('disqus_server.js', 'server');

  api.add_files(
    ['disqus_login_button.css', 'disqus_client.js', 'disqus_configure.html', 'disqus_configure.js'],
    'client');

  api.add_files("disqus.js");
});