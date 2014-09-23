var selfcare = (function(selfcare_module) {
 selfcare_module.ng = {
	config: angular.module('config_params' , ['configurations']),
    services: angular.module('SelfCare_Services', ['ngResource']),
    application: angular.module('SelfCare_Application', ['SelfCare_Services','config_params', 'webStorageModule', 'ui.bootstrap' , 'pascalprecht.translate','notificationWidget', 'angularFileUpload','modified.datepicker',
                                                         'ngRoute','ngSanitize'])
  };
  return selfcare_module;
}(selfcare || {}));

