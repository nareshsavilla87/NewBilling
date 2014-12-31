UserSettingController = function(scope,rootScope,translate,localStorageService,tmhDynamicLocale) {
		 
		  scope.dateformat=localStorageService.get('dateformat');	
		  
		  scope.langs = Langs;
	    	if (localStorageService.get('Language')) {
	            var temp = localStorageService.get('Language');
	            for (var i in Langs) {
	                if (Langs[i].code == temp) {
	                	rootScope.optlang = Langs[i];
	                	rootScope.locale=Langs[i];
	                    tmhDynamicLocale.set(Langs[i].code);
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
	            localStorageService.add('Language', lang.code);
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
	        
		  
    };

selfcareApp.controller('UserSettingController',['$scope',
                                                '$rootScope',
                                                '$translate',
                                                'localStorageService',
                                                'tmhDynamicLocale',
                                                UserSettingController]);
