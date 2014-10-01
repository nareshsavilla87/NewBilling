(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  UserSettingController: function(scope,rootScope,translate,localStorageService,tmhDynamicLocale) {
		 
		  /*scope.langs = selfcare.models.Langs;

	      scope.optlang = scope.langs[1]; 
	      scope.changeLang = function (lang) {
	    	
	          translate.uses(lang.code);
	          scope.optlang = lang;
	      };*/
		  
		  scope.dateformat=localStorageService.get('dateformat');	
		  
		  scope.langs = selfcare.models.Langs;
	    	if (localStorageService.get('Language')) {
	            var temp = localStorageService.get('Language');
	            for (var i in selfcare.models.Langs) {
	                if (selfcare.models.Langs[i].code == temp.code) {
	                	rootScope.optlang = selfcare.models.Langs[i];
	                	rootScope.locale=selfcare.models.Langs[i];
	                    tmhDynamicLocale.set(selfcare.models.Langs[i].code);
	                }
	            }
	        } else {
	        	rootScope.optlang = scope.langs[0];
	            tmhDynamicLocale.set(scope.langs[0].code);
	        }
	        translate.uses(rootScope.optlang.code);
	        
	        scope.changeLang = function (lang) {
	            translate.uses(lang.code);
	            rootScope.optlang = lang;
	            rootScope.locale=lang;
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
  selfcare.ng.application.controller('UserSettingController', 
 ['$scope','$rootScope','$translate','localStorageService','tmhDynamicLocale',selfcare.controllers.UserSettingController]).run(function($log) {
      $log.info("UserSettingController initialized");
  });
}(selfcare.controllers || {}));
