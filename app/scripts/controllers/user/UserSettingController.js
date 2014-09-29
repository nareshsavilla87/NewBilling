(function(module) {
  mifosX.controllers = _.extend(module, {
    UserSettingController: function(scope, translate,$rootScope,tmhDynamicLocale,localStorageService) {
      
    	scope.dateformat=localStorageService.get('dateformat');		
    	
    	scope.langs = mifosX.models.Langs;
    	if (localStorageService.get('Language')) {
            var temp = localStorageService.get('Language');
            for (var i in mifosX.models.Langs) {
                if (mifosX.models.Langs[i].code == temp.code) {
                	$rootScope.optlang = mifosX.models.Langs[i];
                	$rootScope.locale=mifosX.models.Langs[i];
                    tmhDynamicLocale.set(mifosX.models.Langs[i].code);
                }
            }
        } else {
        	$rootScope.optlang = scope.langs[0];
            tmhDynamicLocale.set(scope.langs[0].code);
        }
        translate.uses($rootScope.optlang.code);
        
        scope.changeLang = function (lang) {
            translate.uses(lang.code);
            $rootScope.optlang = lang;
            $rootScope.locale=lang;
            localStorageService.add('Language', lang);
            tmhDynamicLocale.set(lang.code);
        };
        
        scope.dates = [
	        'dd MMM yyyy',
            'dd MMMM yyyy',
            'dd/MMM/yyyy',
            'dd/MMMM/yyyy',
            'dd-MMM-yyyy',
            'dd-MMMM-yyyy',
            'MMM-dd-yyyy',
            'MMMM-dd-yyyy',
            'MMM dd yyyy',
            'MMMM dd yyyy',
            'MMM/dd/yyyy',
            'MMMM/dd/yyyy'
            
        ];
        scope.$watch(function () {
            return scope.dateformat;
        }, function () {
            localStorageService.add('dateformat', scope.dateformat);
            scope.df = scope.dateformat;
        });
        
    }
  });

  mifosX.ng.application.controller('UserSettingController', ['$scope', '$translate','$rootScope','tmhDynamicLocale','localStorageService', mifosX.controllers.UserSettingController]).run(function($log) {
    $log.info("UserSettingController initialized");
  });
}(mifosX.controllers || {}));