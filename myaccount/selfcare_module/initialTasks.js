(function(selfcare) {
  var defineHeaders = function($httpProvider , $translateProvider) {

  	//Set headers
    $httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'] = 'gdh';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

    $translateProvider.useStaticFilesLoader({
          prefix: 'selfcare_module/global-translations/locale-',
          suffix: '.json'
    });

  	$translateProvider.preferredLanguage(selfcare.models.locale);
  	//$translateProvider.fallbackLanguage('en');
  	
  };
  selfcare.ng.application.config(defineHeaders).run(function($log) {
	    $log.info("Initial tasks are done!");
	  });
}(selfcare || {}));
