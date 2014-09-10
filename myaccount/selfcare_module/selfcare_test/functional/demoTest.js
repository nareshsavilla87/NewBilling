define(['selfcare', 'selfcare_services/HttpServiceProvider', 'selfcare_services/RequestSender'], {
  configure: function(url) {
    var baseUrl = url || "https://demo.openmf.org";
    selfcare.ng.services.config(['HttpServiceProvider', 'RequestSender', '$httpProvider', function(httpServiceProvider, RequestSender, httpProvider) {
    	RequestSender.setBaseUrl(baseUrl);
      httpServiceProvider.addRequestInterceptor('demoUrl', function(config) {
        return _.extend(config, {url: baseUrl + config.url});
      });

      httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'] = 'default';
    }]).run(function($log) {
      $log.warn("Using live demo server api -> " + baseUrl);
    });
  }
});
