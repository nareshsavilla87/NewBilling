(function(mifosX) {
  var defineHeaders = function($httpProvider , $translateProvider,$idleProvider, $keepaliveProvider, IDLE_DURATION, WARN_DURATION, KEEPALIVE_INTERVAL) {

  	//Set headers
    $httpProvider.defaults.headers.common['X-Obs-Platform-TenantId'] = 'default';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';


    // Configure i18n and preffer language
 	  //$translateProvider.translations('en', translationsEN);
  	//$translateProvider.translations('de', translationsDE);

    $translateProvider.useStaticFilesLoader({
          prefix: 'global-translations/locale-',
          suffix: '.json'
    });

  	$translateProvider.preferredLanguage('en');
  	$translateProvider.fallbackLanguage('en');
  	
  	/**
  	 * Timeout settings.
  	 * */
 	 $idleProvider.idleDuration(IDLE_DURATION); //Idle time 
 	 $idleProvider.warningDuration(WARN_DURATION); //warning time(sec)
 	 $keepaliveProvider.interval(KEEPALIVE_INTERVAL); //keep-alive ping

  };
  mifosX.ng.application.config(defineHeaders).run(function($log,$idle) {
    $log.info("Initial tasks are done!");
    $idle.watch();
  });
}(mifosX || {}));
