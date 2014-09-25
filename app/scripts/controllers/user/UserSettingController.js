(function(module) {
  mifosX.controllers = _.extend(module, {
    UserSettingController: function(scope, translate,$rootScope,tmhDynamicLocale,localStorageService) {
      
      scope.langs = mifosX.models.Langs;

      scope.optlang = scope.langs[0]; 
      scope.changeLang = function (lang) {
    	
          translate.uses(lang.code);
          scope.optlang = lang;
          $rootScope.locale=lang;
          localStorageService.add('Language', lang);
          tmhDynamicLocale.set(lang.code);
      };

    }
  });

  mifosX.ng.application.controller('UserSettingController', ['$scope', '$translate','$rootScope','tmhDynamicLocale','localStorageService', mifosX.controllers.UserSettingController]).run(function($log) {
    $log.info("UserSettingController initialized");
  });
}(mifosX.controllers || {}));